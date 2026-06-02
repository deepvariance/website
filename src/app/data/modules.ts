export interface ModuleDef {
  slug: 'optimemory' | 'hyperrag' | 'deeptuner';
  title: string;
  subtitle: string;
  status: 'Live' | 'Beta' | 'Early';
  tagline: string;
  metric: string;
  metricLabel: string;
  proof: string;
  problem: string;
  mechanism: string;
  steps: string[];
  stack: string;
  // Detail-page-only fields
  longProblem: string;
  longMechanism: string;
  install: string;
  codeSnippet: string;
  benchmarkRows: Array<{ label: string; baseline: string; deepVariance: string; delta: string }>;
  benchmarkNote: string;
  whatItDoesNot: string[];
  faqs: Array<{ q: string; a: string }>;
}

export const MODULES: ModuleDef[] = [
  {
    slug: 'optimemory',
    title: 'Optimemory',
    subtitle: 'Memory Layer \u00B7 Training + Serving',
    status: 'Live',
    tagline: 'Run a bigger model or a bigger cache on the GPUs you already have.',
    metric: '+65%',
    metricLabel: 'more usable VRAM per card',
    proof: 'H100 80GB · LLaMA-3 70B · default PyTorch allocator baseline',
    problem:
      'Default PyTorch allocators fragment memory under churn. Allocations come back, but they come back in pieces. The model sees less usable VRAM than the GPU actually has.',
    mechanism:
      'Optimemory replaces the default CUDA allocator with a VMM-backed layer. Physical chunks are cached, tensors are served from the virtual pool via DLPack-backed handles, and contiguous address space is restored.',
    steps: [
      'Intercepts CUDA memory allocation at the runtime optimization layer',
      'Maps physical chunks behind a virtual address pool',
      'Serves tensors via DLPack-backed handles with zero copy',
      'Returns fragmented memory to usable, contiguous capacity',
    ],
    stack: 'PyTorch 2.x · CUDA 12 · DDP · FSDP',
    longProblem:
      'PyTorch\u2019s default caching allocator is fast, but it is not designed for long-running training jobs with high allocation churn. As tensors of varying shapes are created and freed, the allocator\u2019s free pool fragments. Free memory exists, but no single contiguous block is large enough for the next allocation. Training stalls, OOM errors appear with VRAM apparently free, and effective capacity drops well below the GPU\u2019s nameplate spec. On an 80GB H100 running a 70B model with high batch variance, the usable working set can collapse to under 50GB.',
    longMechanism:
      'Optimemory inserts a virtual-memory layer between the framework and the CUDA driver. Physical chunks are allocated lazily and pooled. Tensors are served from a virtual address pool through DLPack-backed handles, so the framework sees contiguous addresses even when the physical pages behind them are not. Coalescing happens in the background, defragmentation is non-blocking, and the original tensor semantics are preserved bit-for-bit. The framework call graph is identical. The model is identical. The bytes that come back are identical. There is just more of them.',
    install: 'pip install deep-variance && export DV_OPTIMEMORY=1',
    codeSnippet:
      '# No code changes. Set the env var, run your job.\n$ export DV_OPTIMEMORY=1\n$ python train.py --model llama3-70b --batch 8\n\n# Optimemory attaches at import time and routes every\n# torch.cuda allocation through the VMM-backed pool.\n# Your training script is untouched.',
    benchmarkRows: [
      { label: 'Effective VRAM (LLaMA-3 70B, batch 8)', baseline: '48.1 GB', deepVariance: '79.3 GB', delta: '+65%' },
      { label: 'OOM rate over 24h training run',         baseline: '6 events', deepVariance: '0 events', delta: '\u22126' },
      { label: 'Max batch size before OOM',              baseline: '8', deepVariance: '14', delta: '+75%' },
      { label: 'Allocator overhead (% step time)',       baseline: '4.2%', deepVariance: '1.8%', delta: '\u221257%' },
    ],
    benchmarkNote:
      'Measured on H100 80GB SXM, CUDA 12.4, PyTorch 2.3, LLaMA-3 70B FSDP. Baseline is the default PyTorch caching allocator. Full methodology published.',
    whatItDoesNot: [
      'Does not require model code changes',
      'Does not change numerical results',
      'Does not require root or kernel modules',
      'Does not phone home or transmit telemetry',
    ],
    faqs: [
      {
        q: 'Does it work with FSDP and DDP?',
        a: 'Yes. Optimemory operates at the CUDA allocation layer, below the framework\u2019s parallelism strategy. FSDP, DDP, and tensor parallelism all see standard tensor handles.',
      },
      {
        q: 'What is the per-step overhead?',
        a: 'On steady-state training, allocator overhead drops from ~4% to under 2% of step time. The first ~30 steps include warmup as the VMM pool fills.',
      },
      {
        q: 'Can I disable it at runtime?',
        a: 'Yes. Unset DV_OPTIMEMORY and the job returns to the default allocator on next process start. No code changes, no restart of the cluster.',
      },
    ],
  },

  {
    slug: 'hyperrag',
    title: 'HyperRAG',
    subtitle: 'KV Cache Layer \u00B7 Serving',
    status: 'Beta',
    tagline: 'When the same RAG context comes back, serve it from cache instead of recomputing prefill.',
    metric: '6x',
    metricLabel: 'faster first token on cache hits',
    proof: 'A100 40GB · multi-doc RAG · 94.2% hit rate · 54% TTFT reduction (avg)',
    problem:
      'RAG pipelines recompute the same document context across requests. Every recomputation is wasted GPU time that delays the first token.',
    mechanism:
      'HyperRAG intercepts KV cache policy in vLLM, SGLang, and TensorRT-LLM. Shared contexts are identified, deduplicated, and served from cache. Pareto scheduling routes cache-eligible requests on the fast path.',
    steps: [
      'Hooks into the KV cache policy of your serving backend',
      'Detects shared document contexts across requests',
      'Routes cache hits on the fast path, skipping recomputation',
      'Falls back to compute when context is novel',
    ],
    stack: 'vLLM · SGLang · TensorRT-LLM',
    longProblem:
      'In a typical RAG workload, the same top-K documents are retrieved for thousands of related queries per hour. Every time a request lands, the serving backend recomputes the KV cache for the entire context, including the documents that have not changed since the last query. The GPU spends a large fraction of its prefill budget reproducing identical work, and the user waits for a first token that did not need to be re-derived.',
    longMechanism:
      'HyperRAG intercepts the KV cache policy at the serving layer. It fingerprints incoming prompt prefixes, identifies the document-context segments, and looks them up in a deduplicated KV store keyed by content hash. On a hit, the cached KV is reused and only the user-specific tail is computed. On a miss, the request takes the normal path and the result is admitted to the cache. A Pareto scheduler keeps the hottest contexts resident and evicts the rest. The serving backend\u2019s API surface, sampling parameters, and output tokens are unchanged.',
    install: 'pip install deep-variance && deep-variance attach --serving=vllm',
    codeSnippet:
      '# vLLM, drop-in. No serving code changes.\n$ deep-variance attach --serving=vllm --cache-size=24GB\n$ python -m vllm.entrypoints.openai.api_server \\\n    --model meta-llama/Llama-3-70B-Instruct\n\n# HyperRAG sits in front of vLLM\u2019s KV cache.\n# Cache hits skip prefill. Cache misses go through normally.',
    benchmarkRows: [
      { label: 'TTFT, cache-eligible request',  baseline: '480 ms', deepVariance: '80 ms',  delta: '6.0x' },
      { label: 'TTFT, mixed workload (avg)',    baseline: '410 ms', deepVariance: '188 ms', delta: '\u221254%' },
      { label: 'Cache hit rate (multi-doc RAG)', baseline: 'n/a',     deepVariance: '94.2%',  delta: 'n/a' },
      { label: 'Tokens/sec, fast-path requests', baseline: '1x',     deepVariance: '6.2x',   delta: '6x' },
    ],
    benchmarkNote:
      'Measured on A100 40GB, vLLM 0.5.x, multi-document RAG workload with 1024-token average context and 128-token average completion. Baseline is unmodified vLLM with prefix caching disabled.',
    whatItDoesNot: [
      'Does not change vLLM\u2019s sampling behavior',
      'Does not modify retrieval results',
      'Does not require schema or prompt template changes',
      'Does not affect quality metrics on benchmark sets',
    ],
    faqs: [
      {
        q: 'How is HyperRAG different from vLLM prefix caching?',
        a: 'vLLM prefix caching is per-process and scoped to the active KV pool. HyperRAG operates across the request stream with a deduplicated content-addressed store, a Pareto admission policy, and works the same way across vLLM, SGLang, and TensorRT-LLM.',
      },
      {
        q: 'What happens on a cache miss?',
        a: 'The request takes the unmodified serving path. There is no penalty on miss other than the standard prefill cost. The cache is populated for future hits.',
      },
      {
        q: 'Does it support streaming responses?',
        a: 'Yes. Streaming is preserved end-to-end. On a hit, the first token is emitted as soon as the cached KV is loaded and the user-specific tail is computed.',
      },
    ],
  },

  {
    slug: 'deeptuner',
    title: 'DeepTuner',
    subtitle: 'Kernel Layer \u00B7 Training + Serving',
    status: 'Early',
    tagline: 'Keep the same QPS while cutting energy per token. No new hardware required.',
    metric: '\u221250%',
    metricLabel: 'lower energy per token',
    proof: 'H100 SXM · MHA kernel · seq 512 · -79% J/tok validated',
    problem:
      'Default kernel configurations are tuned for the general case, not your workload. Long-running jobs compound this inefficiency on every iteration.',
    mechanism:
      'DeepTuner performs static analysis of the target kernel and hardware. It predicts an energy-efficient config space, searches it, and selects the candidate that minimizes J/tok for the target sequence length.',
    steps: [
      'Statically analyzes the target kernel and hardware',
      'Predicts the energy-efficient config space',
      'Searches candidates without runtime profiling sweeps',
      'Selects the config that minimizes J/tok for your workload',
    ],
    stack: 'CUDA · ROCm (roadmap) · ARM · Intel',
    longProblem:
      'A kernel ships with a configuration that is competitive across the distribution of workloads its author tested. Your workload sits somewhere on that distribution. For most production deployments, "somewhere" leaves a measurable amount of energy and throughput on the table on every single forward pass. Multiplied across a fleet running 24/7, that gap becomes a meaningful fraction of the power bill.',
    longMechanism:
      'DeepTuner uses static analysis of the kernel\u2019s IR and the target hardware\u2019s microarchitecture to predict a small, energy-aware configuration space. It then searches that space without expensive runtime sweeps, using a cost model calibrated against measured J/token on representative shapes. The selected configuration is dropped in via the framework\u2019s standard kernel registry. The model, the math, and the output are unchanged.',
    install: 'pip install deep-variance && deep-variance tune --kernel=mha --shape=auto',
    codeSnippet:
      '# Tune for your workload\u2019s shape distribution\n$ deep-variance tune \\\n    --kernel=mha \\\n    --shape="seq=512,heads=64,head_dim=128" \\\n    --target=energy\n\n# Generates a config artifact. Load it at import time.\n$ export DV_DEEPTUNER_CONFIG=./mha_h100_seq512.dvcfg\n$ python serve.py',
    benchmarkRows: [
      { label: 'Energy per token (MHA, seq 512)', baseline: '1.00x', deepVariance: '0.50x', delta: '\u221250%' },
      { label: 'Validated worst-case J/tok',      baseline: '1.00x', deepVariance: '0.21x', delta: '\u221279%' },
      { label: 'Throughput (tokens/sec)',          baseline: '1.00x', deepVariance: '1.12x', delta: '+12%' },
      { label: 'Tuning time (one-time, per shape)', baseline: 'n/a', deepVariance: '\u224811 min', delta: 'n/a' },
    ],
    benchmarkNote:
      'Measured on H100 SXM, MHA kernel at seq=512, heads=64, head_dim=128. Baseline is the default cuBLAS / cuDNN kernel configuration shipped with CUDA 12.4. -79% is the validated lower bound on a single representative shape; -50% is the typical steady-state result across a production shape distribution.',
    whatItDoesNot: [
      'Does not change kernel correctness',
      'Does not affect numerical output within float tolerance',
      'Does not require shipping custom CUDA',
      'Does not need a tuning cluster. Runs on a single node.',
    ],
    faqs: [
      {
        q: 'How long does tuning take?',
        a: 'Roughly 10\u201315 minutes per shape on the target hardware, one-time. The resulting config artifact is reusable across deployments with the same shape distribution.',
      },
      {
        q: 'What kernels are supported today?',
        a: 'MHA / GQA attention kernels and feed-forward GEMMs on H100 / A100. SXM and PCIe variants. ROCm and ARM are on the roadmap.',
      },
      {
        q: 'Is the output bit-identical?',
        a: 'Within standard float tolerance for the operation. We publish numerical comparison reports for every supported kernel.',
      },
    ],
  },
];

export const MODULE_SLUGS = MODULES.map(m => m.slug);

export function findModule(slug: string): ModuleDef | undefined {
  return MODULES.find(m => m.slug === slug);
}
