import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  Factory,
  Layers,
  LucideAngularModule,
  Microscope,
} from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import {
  ChipGroup,
  ChipState,
  FilterChipsComponent,
} from '../components/filter-chips';
import { GlassCardComponent } from '../components/glass-card';
import { StatusPillComponent } from '../components/status-pill';
import { SeoService } from '../services/seo.service';

interface KpiTile {
  value: string;
  label: string;
  highlight?: boolean;
}

interface UseCase {
  id: string;
  icon: typeof Cpu;
  label: string;
  bentoTitle: string;
  bentoSubtitle: string;
  bentoMetric: string;
  bentoMetricLabel: string;
  detailHeading: string;
  paragraphs: string[];
  productLinks: { route: string; label: string }[];
  kpis: KpiTile[];
  addresses: string[];
  ctaLabel: string;
  /** filter chip tags */
  tags: {
    vertical: string;
    stage: string;
    deployment: string;
  };
}

@Component({
  selector: 'app-use-cases',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    CtaButtonComponent,
    FilterChipsComponent,
    StatusPillComponent,
  ],
  template: `
    <div class="relative">
      <!-- Hero -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-12 md:pt-40 md:pb-16">
        <div aria-hidden="true" class="hero-halo-neon top-12 left-1/2 -translate-x-1/2 opacity-70"></div>
        <div aria-hidden="true" class="hero-halo-indigo right-[-10%] top-12"></div>

        <div class="relative text-center max-w-3xl mx-auto">
          <div class="flex justify-center mb-7">
            <app-status-pill variant="live">Use cases</app-status-pill>
          </div>
          <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
            How teams build on
            <br class="hidden sm:block" />
            <span class="text-white">Deep Variance</span>.
          </h1>
          <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed">
            Patterns we've researched across the industry and validated through direct
            experimentation. Five problems and what we learned building through them.
          </p>
        </div>
      </section>

      <!-- Filter chips -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pb-6 md:pb-8">
        <app-filter-chips
          [groups]="filterGroups"
          (stateChange)="onFilterChange($event)"
        />
      </section>

      <!-- 5-card bento -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        @if (filteredUseCases().length === 0) {
          <div class="glass-panel rounded-xl p-10 text-center text-on-surface-variant">
            <p class="font-display text-lg mb-2">No use cases match these filters.</p>
            <p class="text-sm">Try widening one of the chip groups above.</p>
          </div>
        }
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          @for (uc of filteredUseCases(); track uc.id; let i = $index) {
            <a
              [routerLink]="['/use-cases']"
              [fragment]="uc.id"
              class="group glass-card rounded-xl p-7 flex flex-col relative overflow-hidden"
              [class.lg:col-span-2]="i === 0"
              [class.lg:row-span-1]="i === 0"
            >
              <div
                aria-hidden="true"
                class="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-surface-dim blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div class="flex items-center gap-3 mb-6">
                <div class="dv-feature-icon !mb-0">
                  <lucide-icon [img]="uc.icon" [size]="18" />
                </div>
                <span class="label-caps text-white">{{ uc.label }}</span>
              </div>
              <h3 class="font-display text-xl md:text-2xl font-semibold text-on-surface leading-tight mb-3">
                {{ uc.bentoTitle }}
              </h3>
              <p class="text-sm text-on-surface-variant leading-relaxed mb-6 flex-1">
                {{ uc.bentoSubtitle }}
              </p>
              <div class="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
                <div>
                  <p class="font-display text-3xl font-bold text-on-surface text-white mb-1">{{ uc.bentoMetric }}</p>
                  <p class="label-caps">{{ uc.bentoMetricLabel }}</p>
                </div>
                <span class="dv-arrow">
                  Read more
                  <lucide-icon [img]="ArrowRight" [size]="14" />
                </span>
              </div>
            </a>
          }
        </div>
      </section>

      <!-- Per-vertical detail sections -->
      @for (uc of useCases; track uc.id) {
        <section
          [id]="uc.id"
          class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24 scroll-mt-28"
        >
          <div class="max-w-6xl mx-auto">
            <div class="flex items-center gap-3 mb-8">
              <div class="dv-feature-icon !mb-0"><lucide-icon [img]="uc.icon" [size]="20" /></div>
              <span class="label-caps text-white">{{ uc.label }}</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div class="lg:col-span-7">
                <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-4xl mb-6 leading-tight">
                  {{ uc.detailHeading }}
                </h2>
                @for (p of uc.paragraphs; track $index) {
                  <p class="text-on-surface-variant leading-relaxed mb-5" [innerHTML]="p"></p>
                }

                <div class="flex flex-wrap gap-2 mt-8 mb-8">
                  @for (link of uc.productLinks; track link.route) {
                    <a
                      [routerLink]="link.route"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon/8 border border-border text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
                    >
                      {{ link.label }}
                      <lucide-icon [img]="ArrowRight" [size]="11" />
                    </a>
                  }
                </div>

                <app-cta-button
                  variant="ghost"
                  routerLink="/pricing"
                  fragment="contact-form"
                  [fullWidth]="true"
                >
                  {{ uc.ctaLabel }}
                </app-cta-button>
              </div>

              <div class="lg:col-span-5 space-y-4">
                <div class="grid grid-cols-2 gap-3">
                  @for (k of uc.kpis; track k.label) {
                    <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6">
                      <p class="font-display text-2xl font-bold mb-1"
                        [class.text-neon]="k.highlight"
                        [class.text-white]="k.highlight"
                        [class.text-on-surface]="!k.highlight"
                      >
                        {{ k.value }}
                      </p>
                      <p class="text-[11px] text-on-surface-variant leading-snug">{{ k.label }}</p>
                    </app-glass-card>
                  }
                </div>

                <app-glass-card extraClass="p-6">
                  <p class="label-caps mb-4">What this addresses</p>
                  <ul class="space-y-3">
                    @for (a of uc.addresses; track $index) {
                      <li class="flex items-start gap-3">
                        <lucide-icon
                          [img]="CheckCircle2"
                          [size]="15"
                          class="text-neon flex-shrink-0 mt-0.5"
                        />
                        <span class="text-xs text-on-surface-variant leading-relaxed">{{ a }}</span>
                      </li>
                    }
                  </ul>
                </app-glass-card>
              </div>
            </div>
          </div>
        </section>
      }

      <!-- Bottom CTA -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Recognise your <span class="text-white">infrastructure problem</span>?
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            We scope every deployment to your hardware, data governance constraints, and team size.
            No generic pricing tiers, just what fits.
          </p>
          <app-cta-button variant="primary" routerLink="/pricing" fragment="contact-form">
            Talk to our team
          </app-cta-button>
        </app-glass-card>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .dv-feature-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
        color: #9d6fff;
      }
      .dv-arrow {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: #9d6fff;
        transition: transform 240ms ease;
      }
      .group:hover .dv-arrow {
        transform: translateX(4px);
      }
    `,
  ],
})
export class UseCasesPageComponent {
  private readonly seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly CheckCircle2 = CheckCircle2;

  readonly useCases: UseCase[] = [
    {
      id: 'hpc-infrastructure',
      icon: Layers,
      label: 'HPC Infrastructure',
      bentoTitle: 'Long-running training and inference at scale.',
      bentoSubtitle:
        'Multi-week jobs amplify every kernel inefficiency. DeepTuner tunes kernel shape and power cap for minimum energy per token across the run.',
      bentoMetric: '−50%',
      bentoMetricLabel: 'Energy per token on MHA',
      detailHeading: 'Energy-efficient kernels for multi-week training and serving fleets.',
      paragraphs: [
        'HPC clusters running continuous AI training pay every kernel inefficiency in joules and dollars. The standard answer, exhaustive runtime profiling, is itself an energy tax that scales O(2ⁿ) with config parameters.',
        '<strong class="text-on-surface">DeepTuner</strong> uses intermediate code analysis to predict optimal kernel configurations and GPU power caps before a single benchmark runs. <strong class="text-on-surface">Optimemory</strong> caps allocator drift so long jobs don\'t stall on fragmentation.',
      ],
      productLinks: [
        { route: '/deeptuner', label: 'DeepTuner' },
        { route: '/optimemory', label: 'Optimemory' },
      ],
      kpis: [
        { value: '−50%', label: 'Energy per token on MHA', highlight: true },
        { value: '2x', label: 'Throughput on attention kernels', highlight: true },
        { value: '0', label: 'Live profiling required' },
        { value: '1x', label: 'Calibration per GPU generation' },
      ],
      addresses: [
        'Kernel configuration tax compounding over multi-week training runs',
        'Power-cap settings tuned by hand and re-tuned on every hardware migration',
        'Allocator fragmentation degrading throughput in long-lived processes',
        'Throughput regressions from naive shape choices on new GPU generations',
      ],
      ctaLabel: 'Talk to us about HPC pilots',
      tags: { vertical: 'HPC', stage: 'Training', deployment: 'On-prem' },
    },
    {
      id: 'gpu-providers',
      icon: Cpu,
      label: 'GPU Providers',
      bentoTitle: 'Turning stranded VRAM into a competitive advantage.',
      bentoSubtitle:
        'Tenants over-provision to avoid OOM. Optimemory closes the gap at the driver level, no model changes, no per-tenant integration.',
      bentoMetric: '+38%',
      bentoMetricLabel: 'Fleet utilisation',
      detailHeading: 'Turning stranded VRAM into a competitive advantage.',
      paragraphs: [
        'GPU-as-a-service operators running H100 or A100 fleets face a structural utilisation problem: tenants routinely over-provision instance size to hedge against peak VRAM demand, then idle at 40–50% the rest of the time. OOM crashes are the leading source of support tickets and the primary cause of early churn.',
        'Deploying <strong class="text-on-surface">Optimemory</strong> as a default driver layer changes the unit economics. The VMM stitching layer lets a 40 GB physical card address 80–100 GB of model memory. <strong class="text-on-surface">HyperRAG</strong> raises per-tenant throughput for RAG workloads, and <strong class="text-on-surface">DeepTuner</strong> cuts idle energy costs during low-QPS windows.',
      ],
      productLinks: [
        { route: '/optimemory', label: 'Optimemory' },
        { route: '/hyperrag', label: 'HyperRAG' },
      ],
      kpis: [
        { value: '2.5x', label: 'Effective model scale per physical GPU', highlight: true },
        { value: '−62%', label: 'OOM errors in benchmarks', highlight: true },
        { value: '+38%', label: 'Fleet utilisation gain' },
        { value: '1 import', label: 'To enable VMM on a node' },
      ],
      addresses: [
        'Tenants allocating 2x the GPU they need to avoid OOM failures mid-run',
        'Low fleet density from uneven workload packing across nodes',
        'High barrier to first training run for new tenants without AutoML tooling',
        'CUDA allocator fragmentation causing silent performance regressions at scale',
      ],
      ctaLabel: 'Talk to us about GPU provider pricing',
      tags: { vertical: 'Cloud', stage: 'Inference', deployment: 'Cloud' },
    },
    {
      id: 'enterprise-training',
      icon: Building2,
      label: 'Enterprise Training',
      bentoTitle: 'Long pipelines in regulated environments.',
      bentoSubtitle:
        'Memory drift, energy spikes, and governance requirements compound across long runs. We surface them all in one integration.',
      bentoMetric: '11w → 3d',
      bentoMetricLabel: 'Pipeline build cycle',
      detailHeading: 'High-compliance ML teams stuck rebuilding the same pipeline.',
      paragraphs: [
        'Large ML platform teams at financial services, insurance, and healthcare firms consistently report the same bottleneck: 60–70% of model development time goes to data plumbing, not modelling. Every new use case triggers a fresh pipeline build despite solving structurally identical problems.',
        'Long training runs in regulated environments are where inefficiency compounds most. <strong class="text-on-surface">Optimemory</strong> eliminates VRAM fragmentation across steps. <strong class="text-on-surface">DeepTuner</strong> identifies energy-optimal kernel configurations before the run starts, not after the power bill arrives.',
        'DeepTuner runs on-premise with no data leaving your environment. One integration surfaces memory, latency, and energy metrics together.',
      ],
      productLinks: [
        { route: '/optimemory', label: 'Optimemory' },
        { route: '/deeptuner', label: 'DeepTuner' },
      ],
      kpis: [
        { value: '11w → 3d', label: 'Pipeline build cycle in benchmarks', highlight: true },
        { value: '0', label: 'Raw rows transmitted to LLM APIs' },
        { value: '−0.4%', label: 'Accuracy delta, FP8 classification' },
        { value: '8+', label: 'Architectures ranked per pipeline' },
      ],
      addresses: [
        'Bespoke preprocessing pipelines rebuilt from scratch for each new ML project',
        'Data governance constraints blocking every managed AutoML or cloud training service',
        'Large FP32 models too heavy to deploy on on-device or edge inference hardware',
        'No reproducible audit trail over automated data cleaning and model selection decisions',
      ],
      ctaLabel: 'Talk to us about enterprise deployments',
      tags: { vertical: 'Enterprise', stage: 'Training', deployment: 'On-prem' },
    },
    {
      id: 'research-institutions',
      icon: Microscope,
      label: 'Research Institutions',
      bentoTitle: 'VRAM ceilings before science can scale.',
      bentoSubtitle:
        'Labs hit allocator limits before model design matters. Optimemory recovers addressable memory at the driver level, no training-code changes.',
      bentoMetric: '3B → 6B',
      bentoMetricLabel: 'Model scale on same hardware',
      detailHeading: 'Computational biology labs hitting VRAM ceilings before their science could scale.',
      paragraphs: [
        'Research groups training transformer models on genomic and proteomic sequences share a recurring constraint: the architectures required for meaningful discovery are too large to load on the hardware a lab can budget. A 6B-parameter sequence classifier that looks fine on paper will OOM in practice due to CUDA allocator fragmentation.',
        '<strong class="text-on-surface">Optimemory</strong>\'s VMM stitching layer recovers addressable memory at the driver level without altering training code. In our experiments, a single import moved the effective ceiling from 3B to 6B parameters on a four-card A100 node. <strong class="text-on-surface">HyperRAG</strong>\'s KV cache eliminates redundant prefill costs across genomic literature queries.',
        'For clinical edge deployment, <strong class="text-on-surface">DeepTuner</strong> identifies thread block configurations that minimize energy per token without retraining.',
      ],
      productLinks: [
        { route: '/optimemory', label: 'Optimemory' },
        { route: '/hyperrag', label: 'HyperRAG' },
        { route: '/deeptuner', label: 'DeepTuner' },
      ],
      kpis: [
        { value: '3B → 6B', label: 'Model scale on identical hardware', highlight: true },
        { value: '4x', label: 'More experiments per GPU-week', highlight: true },
        { value: '< 1 hr', label: 'Phenotype model leaderboard run' },
        { value: '−40%', label: 'Wall-clock vs grad-checkpointing' },
      ],
      addresses: [
        'VRAM ceilings forcing architecture compromises before experiments begin',
        'Grad-checkpointing adding 40%+ wall-clock overhead to long training runs',
        'Multi-week iteration cycles on tabular phenotype datasets slowing hypothesis testing',
        'FP32 clinical models too large for on-device deployment without retraining',
      ],
      ctaLabel: 'Talk to us about academic licensing',
      tags: { vertical: 'Research', stage: 'Training', deployment: 'On-prem' },
    },
    {
      id: 'manufacturing',
      icon: Factory,
      label: 'Manufacturing',
      bentoTitle: 'Quality inspection at the edge.',
      bentoSubtitle:
        'Vision and predictive-maintenance models that must run on the factory floor, air-gapped, real-time, and on constrained GPU nodes.',
      bentoMetric: '< 2 ms',
      bentoMetricLabel: 'FP8 inference latency',
      detailHeading: 'Models that need to run on the factory floor, not the cloud.',
      paragraphs: [
        'Industrial ML teams face a constraint that\'s different from cloud-native orgs: inference must happen at the edge, on constrained hardware inside the facility, with no tolerance for network latency or data leaving the site.',
        '<strong class="text-on-surface">Optimemory</strong> extends the effective VRAM ceiling on constrained edge nodes, allowing larger vision architectures to run where only smaller ones fit before. <strong class="text-on-surface">DeepTuner</strong> identifies energy-optimal kernel configurations for the specific edge GPU hardware.',
        'The full stack runs on-premise, air-gapped if required, with no production data transmitted externally at any stage.',
      ],
      productLinks: [
        { route: '/optimemory', label: 'Optimemory' },
        { route: '/deeptuner', label: 'DeepTuner' },
      ],
      kpis: [
        { value: '50%', label: 'Less VRAM for edge vision models', highlight: true },
        { value: '< 2 ms', label: 'FP8 inference latency, embedded GPU', highlight: true },
        { value: '0', label: 'Production records transmitted externally' },
        { value: '1 call', label: 'Sensor data to model leaderboard' },
      ],
      addresses: [
        'Vision models too large to deploy on factory-floor edge hardware without accuracy compromise',
        'Manual feature engineering on sensor time-series consuming weeks before any model can be trained',
        'Data sovereignty requirements blocking cloud AutoML and managed training services entirely',
        'Inference latency spikes from FP32 models missing real-time quality control deadlines on the line',
      ],
      ctaLabel: 'Talk to us about manufacturing deployments',
      tags: { vertical: 'Industrial', stage: 'Inference', deployment: 'Edge' },
    },
  ];

  readonly filterGroups: ChipGroup[] = [
    {
      id: 'vertical',
      label: 'Vertical',
      options: ['HPC', 'Cloud', 'Enterprise', 'Research', 'Industrial'],
    },
    {
      id: 'stage',
      label: 'Stage',
      options: ['Training', 'Inference'],
    },
    {
      id: 'deployment',
      label: 'Deployment',
      options: ['On-prem', 'Cloud', 'Edge'],
    },
  ];

  readonly filterState = signal<ChipState>({
    vertical: '__all',
    stage: '__all',
    deployment: '__all',
  });

  readonly filteredUseCases = computed(() => {
    const s = this.filterState();
    return this.useCases.filter((uc) => {
      if (s['vertical'] !== '__all' && uc.tags.vertical !== s['vertical'])
        return false;
      if (s['stage'] !== '__all' && uc.tags.stage !== s['stage']) return false;
      if (
        s['deployment'] !== '__all' &&
        uc.tags.deployment !== s['deployment']
      )
        return false;
      return true;
    });
  });

  onFilterChange(state: ChipState): void {
    this.filterState.set(state);
  }

  constructor() {
    this.seo.set({
      title: 'Use Cases | Deep Variance',
      description:
        'How HPC operators, GPU providers, enterprise ML teams, research institutions, and manufacturers use Optimemory, HyperRAG, and DeepTuner to solve real infrastructure problems.',
      path: '/use-cases',
    });
  }
}
