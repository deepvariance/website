import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  Factory,
  Lightbulb,
  LucideAngularModule,
  Microscope,
  Server,
  Zap,
} from 'lucide-angular';

@Component({
  selector: 'app-use-cases',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      ></div>
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-primary/5 blur-[120px] rounded-full -z-20"
      ></div>

      <!-- Hero -->
      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-16 text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-8"
        >
          Use Cases
        </div>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto"
        >
          How teams build on<br /><span class="text-primary">DeepVariance</span
          >.
        </h1>
        <p
          class="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-medium leading-relaxed"
        >
          Patterns we've researched across the industry and validated through
          direct experimentation. Four problems and what we learned building
          through them.
        </p>
      </section>

      <!-- Nav Pills -->
      <div class="container mx-auto px-6 pb-16">
        <div class="flex flex-wrap justify-center gap-3">
          <a
            routerLink="/use-cases"
            fragment="gpu-providers"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition-colors bg-white"
          >
            <lucide-icon [img]="Cpu" [size]="14" /> GPU Providers
          </a>
          <a
            routerLink="/use-cases"
            fragment="enterprise-training"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition-colors bg-white"
          >
            <lucide-icon [img]="Building2" [size]="14" /> Enterprise Training
          </a>
          <a
            routerLink="/use-cases"
            fragment="research-institutions"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition-colors bg-white"
          >
            <lucide-icon [img]="Microscope" [size]="14" /> Research Institutions
          </a>
          <a
            routerLink="/use-cases"
            fragment="manufacturing"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition-colors bg-white"
          >
            <lucide-icon [img]="Factory" [size]="14" /> Manufacturing
          </a>
        </div>
      </div>

      <!-- ─── USE CASE 1: GPU Providers ─── -->
      <section
        id="gpu-providers"
        class="container mx-auto px-6 pb-24 scroll-mt-24"
      >
        <div class="max-w-5xl mx-auto">
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"
            >
              <lucide-icon [img]="Cpu" [size]="20" />
            </div>
            <span
              class="text-[11px] font-extrabold text-primary uppercase tracking-widest"
              >GPU Providers</span
            >
          </div>

          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            <div>
              <h2
                class="text-3xl sm:text-4xl font-header font-bold text-dark mb-6 tracking-tight leading-tight"
              >
                Turning stranded VRAM into a competitive advantage.
              </h2>
              <p class="text-slate-500 font-medium leading-relaxed mb-6">
                GPU-as-a-service operators running H100 or A100 fleets face a
                structural utilisation problem: tenants routinely over-provision
                instance size to hedge against peak VRAM demand, then idle at
                40-50% the rest of the time. OOM crashes are the leading source
                of support tickets and the primary cause of early churn. Not
                because the hardware is insufficient, but because the allocator
                is fragmented.
              </p>
              <p class="text-slate-500 font-medium leading-relaxed mb-8">
                Deploying <strong class="text-dark">Optimemory</strong> as a
                default driver layer changes the unit economics. The VMM
                stitching layer lets a 40 GB physical card address 80–100 GB of
                model memory, eliminating over-provisioning at booking time.
                Adding <strong class="text-dark">Autopilot</strong> as a
                tenant-facing training environment reduces time-to-first-run to
                a single API call, raising the perceived value of the rental
                without additional hardware spend.
              </p>

              <div class="flex flex-wrap gap-2 mb-8">
                <a
                  routerLink="/optimemory"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <lucide-icon [img]="Server" [size]="11" /> Optimemory
                </a>
                <a
                  routerLink="/"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                >
                  <lucide-icon [img]="Zap" [size]="11" /> Autopilot
                </a>
              </div>

              <a
                routerLink="/pricing"
                fragment="contact-form"
                class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Talk to us about GPU provider pricing
                <lucide-icon [img]="ArrowRight" [size]="14" />
              </a>
            </div>

            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    2.5×
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    effective model scale per physical GPU
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    −62%
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    OOM errors in controlled benchmarks
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    +38%
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    fleet utilisation gain in experiments
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    1 import
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    to enable VMM on an existing node
                  </p>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-white border border-slate-100">
                <p
                  class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4"
                >
                  What this addresses
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-emerald-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Tenants allocating 2× the GPU they need to avoid OOM
                      failures mid-run</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-emerald-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Low fleet density from uneven workload packing across
                      nodes</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-emerald-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >High barrier to first training run for new tenants
                      without AutoML tooling</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-emerald-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >CUDA allocator fragmentation causing silent performance
                      regressions at scale</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto border-t border-slate-100"></div>
      </div>

      <!-- ─── USE CASE 2: Enterprise Training ─── -->
      <section
        id="enterprise-training"
        class="container mx-auto px-6 py-24 scroll-mt-24"
      >
        <div class="max-w-5xl mx-auto">
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0"
            >
              <lucide-icon [img]="Building2" [size]="20" />
            </div>
            <span
              class="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest"
              >Enterprise Training</span
            >
          </div>

          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            <div>
              <h2
                class="text-3xl sm:text-4xl font-header font-bold text-dark mb-6 tracking-tight leading-tight"
              >
                High-compliance ML teams stuck rebuilding the same pipeline
                project after project.
              </h2>
              <p class="text-slate-500 font-medium leading-relaxed mb-6">
                Large ML platform teams at financial services, insurance, and
                healthcare firms consistently report the same bottleneck: 60–70%
                of model development time goes to data plumbing, not modelling.
                Every new use case (fraud detection, churn prediction, credit
                scoring) triggers a fresh pipeline build despite solving
                structurally identical problems. The variance is in column names
                and business context, not engineering challenge.
              </p>
              <p class="text-slate-500 font-medium leading-relaxed mb-6">
                Regulated environments can't send raw data to external services,
                which rules out every managed cloud AutoML product.
                <strong class="text-dark">Autopilot</strong> is built for this
                constraint. LLM calls carry only schema metadata and error
                traces, never raw records, making it auditable and compliant by
                design. For edge deployment,
                <strong class="text-dark">DeepTuner</strong>'s FP8 path
                compresses production models to fit on-device hardware with less
                than 0.4% accuracy loss on classification benchmarks we've run.
              </p>
              <p class="text-slate-500 font-medium leading-relaxed mb-8">
                Platform teams that adopt Autopilot move from maintaining
                pipelines to curating problem definitions. The engineering
                effort shifts upstream.
              </p>

              <div class="flex flex-wrap gap-2 mb-8">
                <a
                  routerLink="/"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                >
                  <lucide-icon [img]="Zap" [size]="11" /> Autopilot
                </a>
                <a
                  routerLink="/llm-tuner"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <lucide-icon [img]="Lightbulb" [size]="11" /> LLM Tuner
                </a>
              </div>

              <a
                routerLink="/pricing"
                fragment="contact-form"
                class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Talk to us about enterprise deployments
                <lucide-icon [img]="ArrowRight" [size]="14" />
              </a>
            </div>

            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    11w→3d
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    pipeline build cycle in our benchmarks
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">0</p>
                  <p class="text-xs text-slate-500 font-medium">
                    raw rows transmitted to LLM APIs
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    −0.4%
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    accuracy delta, FP8 classification
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    8+
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    architectures ranked per pipeline run
                  </p>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-white border border-slate-100">
                <p
                  class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4"
                >
                  What this addresses
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-amber-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Bespoke preprocessing pipelines rebuilt from scratch for
                      each new ML project</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-amber-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Data governance constraints blocking every managed AutoML
                      or cloud training service</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-amber-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Large FP32 models too heavy to deploy on on-device or
                      edge inference hardware</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-amber-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >No reproducible audit trail over automated data cleaning
                      and model selection decisions</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto border-t border-slate-100"></div>
      </div>

      <!-- ─── USE CASE 3: Research Institutions ─── -->
      <section
        id="research-institutions"
        class="container mx-auto px-6 py-24 scroll-mt-24"
      >
        <div class="max-w-5xl mx-auto">
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 flex-shrink-0"
            >
              <lucide-icon [img]="Microscope" [size]="20" />
            </div>
            <span
              class="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest"
              >Research Institutions</span
            >
          </div>

          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            <div>
              <h2
                class="text-3xl sm:text-4xl font-header font-bold text-dark mb-6 tracking-tight leading-tight"
              >
                Computational biology labs hitting VRAM ceilings before their
                science could scale.
              </h2>
              <p class="text-slate-500 font-medium leading-relaxed mb-6">
                Research groups training transformer models on genomic and
                proteomic sequences share a recurring constraint: the
                architectures required for meaningful discovery are too large to
                load on the hardware a lab can budget. A 6B-parameter sequence
                classifier that looks fine on paper will OOM in practice due to
                CUDA allocator fragmentation. Grad-checkpointing buys headroom
                but adds 40% wall-clock overhead, a steep cost on already-long
                runs.
              </p>
              <p class="text-slate-500 font-medium leading-relaxed mb-6">
                <strong class="text-dark">Optimemory</strong>'s VMM stitching
                layer recovers addressable memory at the driver level without
                altering training code. In our own experiments on genomic
                benchmark datasets, a single import moved the effective ceiling
                from 3B to 6B parameters on a four-card A100 node. For
                hypothesis testing on tabular phenotype data,
                <strong class="text-dark">Autopilot</strong> accepts HDF5 and
                NumPy inputs directly and returns a ranked model leaderboard in
                under an hour.
              </p>
              <p class="text-slate-500 font-medium leading-relaxed mb-8">
                When size-constrained deployment is required (clinical edge
                devices, hospital-side inference),
                <strong class="text-dark">DeepTuner</strong>'s FP8 path
                compresses without retraining.
              </p>

              <div class="flex flex-wrap gap-2 mb-8">
                <a
                  routerLink="/optimemory"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <lucide-icon [img]="Server" [size]="11" /> Optimemory
                </a>
                <a
                  routerLink="/"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                >
                  <lucide-icon [img]="Zap" [size]="11" /> Autopilot
                </a>
                <a
                  routerLink="/llm-tuner"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <lucide-icon [img]="Lightbulb" [size]="11" /> LLM Tuner
                </a>
              </div>

              <a
                routerLink="/pricing"
                fragment="contact-form"
                class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Talk to us about academic licensing
                <lucide-icon [img]="ArrowRight" [size]="14" />
              </a>
            </div>

            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    3B→6B
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    model scale on identical hardware
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    4×
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    more experiments per GPU-week
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    &lt;1 hr
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    phenotype model leaderboard run
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    −40%
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    wall-clock vs grad-checkpointing
                  </p>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-white border border-slate-100">
                <p
                  class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4"
                >
                  What this addresses
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-blue-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >VRAM ceilings forcing architecture compromises before
                      science experiments can begin</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-blue-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Grad-checkpointing adding 40%+ wall-clock overhead to
                      already-long training runs</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-blue-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Multi-week iteration cycles on tabular phenotype datasets
                      slowing hypothesis testing</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-blue-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >FP32 clinical models too large for on-device deployment
                      without re-training from scratch</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container mx-auto px-6">
        <div class="max-w-5xl mx-auto border-t border-slate-100"></div>
      </div>

      <!-- USE CASE 4: Manufacturing -->
      <section
        id="manufacturing"
        class="container mx-auto px-6 py-24 scroll-mt-24"
      >
        <div class="max-w-5xl mx-auto">
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 flex-shrink-0"
            >
              <lucide-icon [img]="Factory" [size]="20" />
            </div>
            <span
              class="text-[11px] font-extrabold text-orange-600 uppercase tracking-widest"
              >Manufacturing</span
            >
          </div>

          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            <div>
              <h2
                class="text-3xl sm:text-4xl font-header font-bold text-dark mb-6 tracking-tight leading-tight"
              >
                Quality inspection and predictive maintenance models that need
                to run on the factory floor, not the cloud.
              </h2>
              <p class="text-slate-500 font-medium leading-relaxed mb-6">
                Industrial ML teams face a constraint that's different from
                cloud-native orgs: inference must happen at the edge, on
                constrained hardware inside the facility, with no tolerance for
                network latency or data leaving the site. A vision model trained
                for surface defect detection that runs fine on a cloud A100 will
                OOM or miss real-time deadlines when deployed to a factory-floor
                GPU node.
              </p>
              <p class="text-slate-500 font-medium leading-relaxed mb-6">
                <strong class="text-dark">Autopilot</strong> ingests sensor
                time-series and image data natively, handling the full pipeline
                from raw readings to a ranked model leaderboard without manual
                feature engineering.
                <strong class="text-dark">Optimemory</strong> extends the
                effective VRAM ceiling on constrained edge nodes, allowing
                larger vision architectures to run where only smaller ones fit
                before. <strong class="text-dark">DeepTuner</strong>'s FP8 path
                then compresses the trained model for deployment, cutting memory
                footprint and inference latency without retraining.
              </p>
              <p class="text-slate-500 font-medium leading-relaxed mb-8">
                The full stack runs on-premise, air-gapped if required, with no
                production data transmitted externally at any stage.
              </p>

              <div class="flex flex-wrap gap-2 mb-8">
                <a
                  routerLink="/"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                >
                  <lucide-icon [img]="Zap" [size]="11" /> Autopilot
                </a>
                <a
                  routerLink="/optimemory"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <lucide-icon [img]="Server" [size]="11" /> Optimemory
                </a>
                <a
                  routerLink="/llm-tuner"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <lucide-icon [img]="Lightbulb" [size]="11" /> LLM Tuner
                </a>
              </div>

              <a
                routerLink="/pricing"
                fragment="contact-form"
                class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Talk to us about manufacturing deployments
                <lucide-icon [img]="ArrowRight" [size]="14" />
              </a>
            </div>

            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    50%
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    less VRAM required for edge vision models
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    &lt;2 ms
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    FP8 inference latency on embedded GPU nodes
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">0</p>
                  <p class="text-xs text-slate-500 font-medium">
                    production records transmitted externally
                  </p>
                </div>
                <div
                  class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <p class="text-3xl font-header font-bold text-dark mb-1">
                    1 call
                  </p>
                  <p class="text-xs text-slate-500 font-medium">
                    from raw sensor data to ranked model leaderboard
                  </p>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-white border border-slate-100">
                <p
                  class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4"
                >
                  What this addresses
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Vision models too large to deploy on factory-floor edge
                      hardware without accuracy compromise</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Manual feature engineering on sensor time-series
                      consuming weeks before any model can be trained</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Data sovereignty requirements blocking cloud AutoML and
                      managed training services entirely</span
                    >
                  </li>
                  <li class="flex items-start gap-3">
                    <lucide-icon
                      [img]="CheckCircle2"
                      [size]="15"
                      class="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span
                      class="text-xs text-slate-600 font-medium leading-relaxed"
                      >Inference latency spikes from FP32 models missing
                      real-time quality control deadlines on the line</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="container mx-auto px-6 pb-24">
        <div
          class="max-w-3xl mx-auto p-10 sm:p-14 rounded-[2rem] bg-slate-900 text-white text-center relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-grid-white/[0.04] -z-10"></div>
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"
          ></div>
          <h2
            class="text-2xl sm:text-3xl font-header font-bold mb-4 tracking-tight"
          >
            Recognise your infrastructure problem?
          </h2>
          <p class="text-slate-400 text-sm font-medium max-w-md mx-auto mb-8">
            We scope every deployment to your hardware, data governance
            constraints, and team size. No generic pricing tiers. Just what
            fits.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              routerLink="/pricing"
              fragment="contact-form"
              class="px-6 py-3 rounded-xl bg-white text-dark font-bold text-sm hover:bg-slate-100 transition-colors"
            >
              Talk to our team
            </a>
            <a
              routerLink="/roadmap"
              class="px-6 py-3 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              View roadmap
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class UseCasesPageComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    this.title.setTitle('Use Cases | Deep Variance');
    this.meta.updateTag({ name: 'description', content: 'How GPU providers, enterprise ML teams, research institutions, and manufacturers use Optimemory, Autopilot, and DeepTuner to solve real infrastructure problems.' });
    this.meta.updateTag({ property: 'og:title', content: 'Use Cases | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: 'How GPU providers, enterprise ML teams, research institutions, and manufacturers use Optimemory, Autopilot, and DeepTuner to solve real infrastructure problems.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/use-cases' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Use Cases | Deep Variance' });
    this.meta.updateTag({ name: 'twitter:description', content: 'How GPU providers, enterprise ML teams, research institutions, and manufacturers use Optimemory, Autopilot, and DeepTuner to solve real infrastructure problems.' });
  }

  readonly Cpu = Cpu;
  readonly Building2 = Building2;
  readonly Microscope = Microscope;
  readonly ArrowRight = ArrowRight;
  readonly Zap = Zap;
  readonly Server = Server;
  readonly Lightbulb = Lightbulb;
  readonly CheckCircle2 = CheckCircle2;
  readonly Factory = Factory;
}
