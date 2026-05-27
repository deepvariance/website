# Deep Variance — FAQ

Single source of truth for FAQ copy.
Same tone as the platform page: brutally honest, short, no marketing fluff, no em dashes,
no repetition. Translate every claim to an action a buyer can take.

Each entry is keyed by `id` so it can be rendered in any combination on any page
(platform, docs, per-module, dedicated /faq) without duplicating the copy.

---

## Categories

1. Product — what it is, what it does
2. Integration — how it slots into an existing stack
3. Performance — what to expect on real workloads
4. Compatibility — frameworks, hardware, OS
5. Security & deployment — telemetry, permissions, audit
6. Operations — rollback, observability, support
7. Commercial — pricing, contracts, pilots

---

## 1. Product

### product.what-is-it
**Q:** What is Deep Variance?
**A:** A runtime layer between your ML framework and the CUDA driver. Three modules
intercept memory allocation, KV cache scheduling, and kernel dispatch. The framework
sees the same call graph. The GPU does less wasted work.

### product.who-is-it-for
**Q:** Who is this built for?
**A:** Teams running production training or inference at GPU-fleet scale where
silicon is the line item. Typical first install is on a cluster between 50 and
2,000 GPUs.

### product.not-for
**Q:** Who should not use it?
**A:** Hobby workloads, a single notebook, or anything where the model fits comfortably
with headroom to spare. There is nothing to recover.

### product.how-different
**Q:** How is this different from tuning the framework myself?
**A:** Framework-level tuning operates above the allocator and the kernel registry.
Deep Variance operates below them. The two are additive, not competing.

### product.vs-vendor
**Q:** Doesn't NVIDIA / AMD already optimize this in the driver?
**A:** The driver optimizes for the general case. We optimize for your workload's
shape distribution and your job churn. The gap is measurable on most production
fleets we have benchmarked.

---

## 2. Integration

### integration.install-time
**Q:** How long does the first install take?
**A:** One command for OptiMemory. For HyperRAG and DeepTuner, plan a half-day to
wire the serving backend or generate a tuning artifact. No code changes to your
training or model code.

### integration.code-changes
**Q:** Do I need to change my model or training code?
**A:** No. Deep Variance attaches at import time. Your script is untouched.

### integration.partial-install
**Q:** Can I install just one module?
**A:** Yes. Each module is independent. Most teams start with OptiMemory because it
ships and the install is one command.

### integration.coexist
**Q:** Does it coexist with FSDP, DDP, tensor parallelism, Megatron, DeepSpeed?
**A:** Yes. We operate below the parallelism strategy. Your sharding plan is unchanged.

### integration.vs-prefix-caching
**Q:** Is HyperRAG just vLLM prefix caching?
**A:** No. Prefix caching is per-process and scoped to the active KV pool. HyperRAG
deduplicates context across the full request stream with a content-addressed store
and a Pareto admission policy. It also works the same way across vLLM, SGLang, and
TensorRT-LLM.

---

## 3. Performance

### performance.what-to-expect
**Q:** What gains should I actually expect?
**A:** OptiMemory: fit a 70B model on a single H100 where you needed two before, or
push batch size 75% higher without OOM. HyperRAG: first-token latency from 480ms
to 80ms on cache-eligible RAG requests, ~94% hit rate on multi-document workloads.
DeepTuner: half the energy per token on tuned kernels for your shape.

### performance.workload-dependence
**Q:** How workload-dependent are these numbers?
**A:** Very. The benchmarks are measured on real production shape distributions, not
synthetic micro-benchmarks. The fleet-wide median is usually within 10 to 20 percent
of the published number. Outliers exist in both directions.

### performance.proof
**Q:** Can I see the methodology?
**A:** Yes. Every published benchmark has a hardware, framework, model, and baseline
spec. Pilots include a full report with your own baseline measurements.

### performance.what-it-costs-at-runtime
**Q:** Does the layer itself have overhead?
**A:** OptiMemory replaces ~4% allocator overhead with ~2% allocator overhead in
steady state. HyperRAG adds a content hash on the prompt prefix. DeepTuner adds zero
runtime overhead, the work is one-time at tune step.

### performance.no-improvement
**Q:** What if my workload shows no improvement?
**A:** The pilot is free to that point. If the report comes back flat, you walk away.
We will only quote a contract when we can name the saving in your environment.

---

## 4. Compatibility

### compat.frameworks
**Q:** Which frameworks are supported today?
**A:** PyTorch 2.x, vLLM, SGLang, TensorRT-LLM. JAX is on the roadmap.

### compat.gpus
**Q:** Which GPUs?
**A:** NVIDIA H100, A100, V100 ship today. AMD MI300X is in active development on
the DeepTuner path. Other vendors are R&D.

### compat.cuda
**Q:** Which CUDA versions?
**A:** CUDA 11.x and 12.x. We track the current stable driver from NVIDIA.

### compat.os
**Q:** Which operating systems?
**A:** Ubuntu 20.04+, RHEL 8+, CentOS 8+. Other modern Linux distributions on request.

### compat.orchestration
**Q:** Will it work with my scheduler?
**A:** Kubernetes, Slurm, and bare-metal are tested. Runs as a normal user process
inside whatever container or job environment you already use.

---

## 5. Security & deployment

### security.telemetry
**Q:** Does Deep Variance phone home?
**A:** No. Zero telemetry. Zero external data transfer. The runtime stays on your
infrastructure.

### security.permissions
**Q:** What permissions does it need?
**A:** Standard user permissions for most deployments. Root is not required. No kernel
module. No daemon.

### security.audit
**Q:** Can I audit before deploying?
**A:** Yes. Full deployment manifest and module source are available for security
review before onboarding.

### security.air-gapped
**Q:** Will it work in an air-gapped environment?
**A:** Yes. Bring the artifact across the gap once. No network calls at runtime.

### security.data
**Q:** Does any model input or output leave the process?
**A:** No. Memory, KV cache, and kernel dispatch decisions stay inside the GPU host.

---

## 6. Operations

### ops.rollback
**Q:** How do I roll back?
**A:** Disable the module with a config flag. The workload returns to its original
execution path on next process start. No cluster restart required.

### ops.observability
**Q:** What metrics do I get?
**A:** Per-job memory reclamation, KV cache hit rate, kernel energy per token, and
allocator overhead. Exported as Prometheus or pushed to your existing observability
stack.

### ops.failure-mode
**Q:** What happens if a module crashes?
**A:** Fail-open by default. The original execution path takes over and the job
continues. Failures are logged for our team.

### ops.upgrades
**Q:** How are upgrades shipped?
**A:** Pinned versions. You decide when to roll forward. We do not push to production
silently.

### ops.support
**Q:** What is the support model?
**A:** A shared Slack or Teams channel with the engineering team that wrote the module
you are running. Response time inside 4 working hours for paying customers.

---

## 7. Commercial

### commercial.pricing
**Q:** How is it priced?
**A:** Per GPU per month, with volume tiers. No usage metering, no surprise overage
billing.

### commercial.pilot
**Q:** Is there a pilot?
**A:** Yes. Two-week structured pilot on a representative workload. You get a written
report comparing your baseline to Deep Variance. No contract until that report is in
your hands.

### commercial.contract-length
**Q:** What contract lengths do you offer?
**A:** Annual is the default. Multi-year is available with a discount. No long lock-in
for the first contract.

### commercial.byo-cloud
**Q:** Does it work on my cloud GPU rental?
**A:** Yes, if you control the container image. Most major cloud GPU providers are
covered. Some serverless GPU products do not allow the level of process access we
need, those are excluded.

### commercial.proof-points
**Q:** Who is already running this?
**A:** A supercomputing facility with a 600-H100 fleet runs OptiMemory in production.
Several pilots are active in financial services and enterprise R&D. Named references
on request under NDA.

---

## Recommended placement

The full set is too long for any single page on the marketing site. Recommended
splits:

- **Per-module page (existing `faqs` array on each `ModuleDef`)** — only the 3 most
  relevant entries from the categories above for that module. Already in place.
- **`/platform` page** — do not add an FAQ section. The page should stay as an index.
- **`/docs/faq`** — render every entry above, grouped by the 7 categories. Single
  source of buyer truth.
- **`/get-started`** — render only the Commercial category (5 entries).
- **`/docs/security`** — render only the Security & deployment category (5 entries).

When we wire this up later, the file structure should be:

```
src/app/data/faq.ts   # typed array of { id, category, q, a }
```

Each rendering surface filters by `category` or by a curated `id[]` allow-list. No
copy duplication across pages.
