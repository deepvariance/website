import {
  Building2,
  Cpu,
  Factory,
  Layers,
  Microscope,
  type LucideIconData,
} from 'lucide-angular';

export interface UseCaseKpi {
  value: string;
  label: string;
  qualifier?: string;
  highlight?: boolean;
}

export interface UseCaseTechnical {
  title: string;
  paragraphs: string[];
  highlight?: string;
  asideTitle: string;
  asideItems: string[];
}

export interface UseCaseDetail {
  id: string;
  icon: LucideIconData;
  label: string;
  bentoTitle: string;
  bentoSubtitle: string;
  bentoMetric: string;
  bentoMetricLabel: string;
  detailHeading: string;
  heroLead: string;
  bodyParagraphs: string[];
  productLinks: { route: string; fragment?: string; label: string }[];
  kpis: UseCaseKpi[];
  addresses: string[];
  ctaLabel: string;
  heroImage: string;
  sectionHeading: string;
  technical: UseCaseTechnical;
  bottomCtaTitle: string;
  bottomCtaBody: string;
  seo: { title: string; description: string };
}

export const USE_CASES: UseCaseDetail[] = [
  {
    id: 'hpc-infrastructure',
    icon: Layers,
    label: 'HPC Infrastructure',
    bentoTitle: 'Training and inference at scale',
    bentoSubtitle:
      'Long-running GPU workloads — from multi-week training jobs to high-throughput LLM inference — waste energy and compute. DeepTuner and Optimemory optimize power, memory, and throughput without changing your code.',
    bentoMetric: '−50%',
    bentoMetricLabel: 'Energy per token',
    detailHeading: 'Cut energy costs and boost throughput for long-running jobs',
    heroLead:
      'HPC clusters running large-scale training and LLM inference face the same compounding problem: small GPU inefficiencies multiply across weeks of training or millions of inference calls into significant energy waste and slower results. Serving large language models amplifies this further — each token generated draws power across hundreds of attention heads, and most clusters run those kernels at a fraction of their theoretical efficiency.',
    bodyParagraphs: [
      '<strong class="text-on-surface">DeepTuner</strong> automatically identifies the optimal GPU configuration for your workload — whether it\'s a multi-week fine-tune or a latency-sensitive inference endpoint — before it runs. <strong class="text-on-surface">Optimemory</strong> recovers VRAM headroom so you can serve larger LLMs on existing hardware or pack more concurrent inference requests per node without OOM failures.',
    ],
    productLinks: [
      { route: '/platform', fragment: 'deeptuner', label: 'DeepTuner' },
      { route: '/platform', fragment: 'optimemory', label: 'Optimemory' },
    ],
    kpis: [
      { value: '50%', label: 'Less energy per token', qualifier: 'Up to', highlight: true },
      { value: '1.5x', label: 'Throughput on LLMs', qualifier: 'Up to', highlight: true },
    ],
    addresses: [
      'Energy costs compounding over multi-week training runs and high-throughput LLM inference',
      'VRAM limits forcing smaller models or fewer concurrent inference requests per node',
      'Manual GPU tuning that breaks on every hardware or model architecture update',
      'Memory fragmentation that slows or crashes long-running jobs',
    ],
    ctaLabel: 'Talk to us about HPC pilots',
    heroImage: '/use-cases-hpc.webp',
    sectionHeading: 'Cut waste across training and inference workloads',
    technical: {
      title: 'Why manual profiling fails at scale',
      paragraphs: [
        "Traditional GPU profiling requires running every kernel configuration across every workload pattern. For a typical transformer training loop with 8 tunable parameters, that's 256 benchmark runs per GPU model.",
        'Each benchmark consumes energy and cluster time. At scale, the profiling overhead itself becomes a cost center, and the results expire when you upgrade hardware or change batch sizes.',
      ],
      highlight:
        'DeepTuner bypasses runtime profiling entirely. It analyzes kernel intermediate representations to predict optimal configurations, delivering tuning recommendations in seconds instead of hours.',
      asideTitle: 'Integration requirements',
      asideItems: [
        'PyTorch 2.0+ or vLLM 0.5+',
        'CUDA 12.0+ (NVIDIA) or ROCm 6.0+ (AMD)',
        'Single import in training script',
        'No model architecture changes required',
      ],
    },
    bottomCtaTitle: 'Ready to <span class="text-white">optimize your HPC infrastructure</span>?',
    bottomCtaBody:
      'We scope HPC pilots around your cluster topology, workload mix, and energy targets — not a generic benchmark deck.',
    seo: {
      title: 'HPC Infrastructure Use Case | Deep Variance',
      description:
        'Cut energy costs by up to 50% and boost throughput by up to 1.5x for multi-week GPU training runs with DeepTuner and Optimemory.',
    },
  },
  {
    id: 'gpu-providers',
    icon: Cpu,
    label: 'GPU Providers',
    bentoTitle: 'Turn idle GPU capacity into revenue',
    bentoSubtitle:
      'Customers over-provision GPUs to avoid out-of-memory errors, leaving capacity stranded. Optimemory unlocks that capacity automatically.',
    bentoMetric: '+38%',
    bentoMetricLabel: 'Fleet utilization',
    detailHeading: 'Boost GPU fleet utilization without changing tenant workloads',
    heroLead:
      'GPU providers face a utilization challenge: customers allocate 2x the memory they actually need to prevent crashes, then run at 40-50% capacity. Out-of-memory errors drive support costs and customer churn.',
    bodyParagraphs: [
      '<strong class="text-on-surface">Optimemory</strong> extends the effective memory of each GPU, letting you fit larger models or more tenants on the same hardware. <strong class="text-on-surface">HyperRAG</strong> accelerates RAG-based inference by caching KV blocks across requests. <strong class="text-on-surface">DeepTuner</strong> reduces idle energy costs when utilization is low.',
    ],
    productLinks: [
      { route: '/platform', fragment: 'optimemory', label: 'Optimemory' },
      { route: '/platform', fragment: 'hyperrag', label: 'HyperRAG' },
      { route: '/platform', fragment: 'deeptuner', label: 'DeepTuner' },
    ],
    kpis: [
      { value: '50%', label: 'Fewer OOM errors', qualifier: 'Up to', highlight: true },
      { value: '38%', label: 'Fleet utilization gain', qualifier: 'Up to' },
    ],
    addresses: [
      'Customers over-provisioning to avoid out-of-memory crashes',
      'Uneven workload distribution leaving capacity unused',
      'Support costs from memory-related failures and restarts',
      'Revenue left on the table from idle GPU capacity',
    ],
    ctaLabel: 'Talk to us about GPU provider pricing',
    heroImage: '/use-cases-cloud.webp',
    sectionHeading: 'Unlock stranded capacity on every node',
    technical: {
      title: 'The GPU provider capacity problem',
      paragraphs: [
        'GPU-as-a-service economics hinge on utilization. When customers provision a 40GB A100 but only use 18GB, the remaining 22GB generates zero revenue and cannot be sold to another tenant.',
        'Memory over-provisioning is rational risk management: an OOM crash mid-training costs hours and triggers support escalation. So customers allocate 2x headroom, and fleet density drops below 50%.',
      ],
      highlight:
        'Optimemory breaks this tradeoff. Tenants can request larger instances while you provision smaller physical cards, or you can pack more tenants per node without increasing failure rates.',
      asideTitle: 'Deployment model',
      asideItems: [
        'Driver-level integration, transparent to tenants',
        'No changes to tenant containers or workflows',
        'Compatible with Kubernetes, Slurm, RunPod',
        'Revenue share or flat licensing available',
      ],
    },
    bottomCtaTitle: 'Ready to <span class="text-white">unlock your fleet capacity</span>?',
    bottomCtaBody:
      'We model fleet economics with your utilization data, tenant mix, and provisioning rules before recommending a rollout.',
    seo: {
      title: 'GPU Providers Use Case | Deep Variance',
      description:
        'Boost GPU fleet utilization by 38% with Optimemory and HyperRAG. Reduce OOM errors and unlock stranded capacity without changing tenant workloads.',
    },
  },
  {
    id: 'enterprise-training',
    icon: Building2,
    label: 'Enterprise Training',
    bentoTitle: 'On-premise ML for regulated industries',
    bentoSubtitle:
      'Financial, healthcare, and insurance firms need on-premise infrastructure that stays efficient across long training runs and strict compliance requirements.',
    bentoMetric: '11w → 3d',
    bentoMetricLabel: 'Development cycle',
    detailHeading: 'Enterprise ML infrastructure that stays compliant and efficient',
    heroLead:
      'Enterprise ML teams in regulated industries face a dual challenge: data must stay on-premise for compliance, and long training runs amplify every inefficiency in memory and energy usage.',
    bodyParagraphs: [
      '<strong class="text-on-surface">Optimemory</strong> prevents memory fragmentation that slows down multi-step training pipelines. <strong class="text-on-surface">DeepTuner</strong> optimizes GPU energy usage automatically, reducing power costs before they show up on the bill.',
      'Both products run entirely on your infrastructure with zero data transmission. One integration gives you visibility into memory, latency, and energy across your training workloads.',
    ],
    productLinks: [
      { route: '/platform', fragment: 'optimemory', label: 'Optimemory' },
      { route: '/platform', fragment: 'deeptuner', label: 'DeepTuner' },
    ],
    kpis: [
      { value: '50%', label: 'Less energy per run', qualifier: 'Up to' },
    ],
    addresses: [
      'Data compliance requirements preventing use of cloud ML services',
      'Long training runs with compounding memory and energy inefficiencies',
      'Need for full audit trail and reproducibility in model training',
      'High infrastructure costs from suboptimal GPU utilization',
    ],
    ctaLabel: 'Talk to us about enterprise deployments',
    heroImage: '/use-cases-enterprise.webp',
    sectionHeading: 'Stay compliant without sacrificing efficiency',
    technical: {
      title: 'Why regulated industries stay on-premise',
      paragraphs: [
        'Financial services, healthcare, and insurance firms operate under strict data governance: PII cannot leave the corporate network, and every model decision must be auditable for compliance.',
        "Cloud ML platforms solve the wrong problem for these teams. The bottleneck isn't access to compute. It's that long training runs accumulate inefficiencies that compound into weeks of wasted time and energy.",
      ],
      highlight:
        'Our stack runs entirely on your infrastructure. No raw data, model weights, or training logs ever leave your environment. You get the efficiency of cloud-native ML with the compliance posture you require.',
      asideTitle: 'Compliance & security',
      asideItems: [
        'SOC 2 Type II certified deployment',
        'Air-gapped installation available',
        'Full audit trail of tuning decisions',
        'HIPAA and GDPR compliant by design',
      ],
    },
    bottomCtaTitle: 'Ready to <span class="text-white">optimize your enterprise ML infrastructure</span>?',
    bottomCtaBody:
      'We align pilots with your compliance posture, audit requirements, and on-prem hardware footprint.',
    seo: {
      title: 'Enterprise Training Use Case | Deep Variance',
      description:
        'On-premise ML for regulated industries. Optimemory and DeepTuner keep enterprise training compliant and efficient with zero data transmission.',
    },
  },
  {
    id: 'research-institutions',
    icon: Microscope,
    label: 'Research Institutions',
    bentoTitle: 'Train larger models on limited research budgets',
    bentoSubtitle:
      'Research labs hit memory limits before they can test their hypotheses. Optimemory doubles the model size you can train on existing hardware.',
    bentoMetric: '3B → 6B',
    bentoMetricLabel: 'Model scale',
    detailHeading: 'Break through memory limits without buying more GPUs',
    heroLead:
      'Academic research groups face a fundamental constraint: the models needed for breakthrough discoveries are too large for the GPUs they can afford. Memory fragmentation makes this worse, causing out-of-memory errors on models that should technically fit.',
    bodyParagraphs: [
      '<strong class="text-on-surface">Optimemory</strong> extends the effective memory of your GPUs, letting you train 2x larger models on the same hardware. In genomics research, this enabled moving from 3B to 6B parameter models on a four-GPU setup. <strong class="text-on-surface">HyperRAG</strong> accelerates literature search and RAG queries across research databases.',
      '<strong class="text-on-surface">DeepTuner</strong> optimizes GPU configurations across your cluster, reducing energy per experiment and cutting iteration time.',
    ],
    productLinks: [
      { route: '/platform', fragment: 'optimemory', label: 'Optimemory' },
      { route: '/platform', fragment: 'hyperrag', label: 'HyperRAG' },
      { route: '/platform', fragment: 'deeptuner', label: 'DeepTuner' },
    ],
    kpis: [
      { value: '3B → 6B', label: 'Model scale, same GPU', highlight: true },
      { value: '2x', label: 'More experiments per week', qualifier: 'Up to', highlight: true },
      { value: '25%', label: 'Less wall-clock time', qualifier: 'Up to' },
    ],
    addresses: [
      'Budget constraints limiting model size and research scope',
      'Out-of-memory errors forcing architecture compromises',
      'Slow iteration cycles delaying scientific discovery',
      'Clinical models too large for edge or mobile deployment',
    ],
    ctaLabel: 'Talk to us about academic licensing',
    heroImage: '/use-cases-research.webp',
    sectionHeading: 'Train larger models on the hardware you have',
    technical: {
      title: 'The research compute ceiling',
      paragraphs: [
        "Academic labs operate under budget constraints that commercial teams don't face. A 4-GPU A100 node is a significant capital expense, and hardware upgrades happen on 3-5 year cycles.",
        "Meanwhile, model complexity grows faster than Moore's Law. A genomics researcher designing a 6B-parameter sequence classifier will hit OOM errors on a configuration that should technically fit, not because the math is wrong, but because CUDA's allocator fragments memory across training steps.",
      ],
      highlight:
        "Optimemory recovers the stranded capacity. In computational biology experiments, we've seen effective ceilings move from 3B to 6B parameters on identical hardware, unlocking model architectures that were previously inaccessible.",
      asideTitle: 'Academic licensing',
      asideItems: [
        'Discounted rates for .edu institutions',
        'Publication rights retained for research results',
        'Co-authorship opportunities for novel applications',
      ],
    },
    bottomCtaTitle: 'Ready to <span class="text-white">accelerate your research</span>?',
    bottomCtaBody:
      'Academic licensing is scoped to your lab size, publication goals, and existing GPU allocation.',
    seo: {
      title: 'Research Institutions Use Case | Deep Variance',
      description:
        'Train 2x larger models on existing GPU hardware. Optimemory, HyperRAG, and DeepTuner for academic research labs and institutions.',
    },
  },
  {
    id: 'manufacturing',
    icon: Factory,
    label: 'Manufacturing',
    bentoTitle: 'Real-time AI quality control at the edge',
    bentoSubtitle:
      'Vision models for quality inspection must run on factory-floor hardware with no cloud latency and no data leaving the facility.',
    bentoMetric: '1.5x',
    bentoMetricLabel: 'Faster inference',
    detailHeading: 'Deploy larger vision models on edge hardware without cloud dependency',
    heroLead:
      'Manufacturing operations need AI inference to happen in real-time on the factory floor, not in the cloud. Edge hardware has limited GPU capacity, and data sovereignty requirements prevent sending production data externally.',
    bodyParagraphs: [
      '<strong class="text-on-surface">Optimemory</strong> lets you run larger, more accurate vision models on constrained edge GPUs. <strong class="text-on-surface">DeepTuner</strong> optimizes GPU settings for the specific hardware on your factory floor, minimizing latency and energy usage.',
      'Everything runs on-premise and air-gapped if needed. No production data leaves your facility at any point.',
    ],
    productLinks: [
      { route: '/platform', fragment: 'optimemory', label: 'Optimemory' },
      { route: '/platform', fragment: 'deeptuner', label: 'DeepTuner' },
    ],
    kpis: [
      { value: '50%', label: 'Less VRAM', qualifier: 'Up to', highlight: true },
      { value: '1.5x', label: 'Faster inference', qualifier: 'Up to', highlight: true },
    ],
    addresses: [
      'Edge hardware constraints limiting model accuracy and capability',
      'Cloud latency making real-time quality control impractical',
      'Data sovereignty requirements preventing cloud-based inference',
      'Energy and cost concerns from running high-power GPUs continuously',
    ],
    ctaLabel: 'Talk to us about manufacturing deployments',
    heroImage: '/use-cases-manufacturing.webp',
    sectionHeading: 'Run larger vision models on the factory floor',
    technical: {
      title: 'The edge AI constraint',
      paragraphs: [
        'Vision models for quality inspection face requirements that cloud-based inference cannot meet: real-time latency for production lines, zero network dependency for facility uptime, and complete data sovereignty for IP protection.',
        'NVIDIA edge GPUs have memory and power budgets that force accuracy tradeoffs. A ResNet-101 that achieves 98% classification accuracy in the lab will OOM on the factory floor GPU, so teams deploy smaller models that hit 94% and accept the defect rate.',
      ],
      highlight:
        'Optimemory extends the effective memory ceiling on constrained edge nodes. Deploy larger, more accurate vision architectures without upgrading hardware. DeepTuner minimizes energy per inference for battery-powered or passively-cooled installations.',
      asideTitle: 'Edge deployment',
      asideItems: [
        'Runs on NVIDIA Jetson and NVIDIA edge GPUs',
        'Air-gapped, no internet required for inference',
        'Compatible with TensorRT, ONNX Runtime',
        'Model training remains on your servers',
      ],
    },
    bottomCtaTitle: 'Ready to <span class="text-white">deploy AI at the edge</span>?',
    bottomCtaBody:
      'We validate latency, accuracy, and data sovereignty on your actual line hardware before production rollout.',
    seo: {
      title: 'Manufacturing Use Case | Deep Variance',
      description:
        'Real-time vision AI on factory-floor GPUs. Optimemory and DeepTuner for edge deployment with full data sovereignty.',
    },
  },
];

export function findUseCase(id: string): UseCaseDetail | undefined {
  return USE_CASES.find((uc) => uc.id === id);
}
