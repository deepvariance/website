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
    StatusPillComponent,
  ],
  template: `
    <div class="relative">
      <!-- Hero -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden="true" class="hero-halo-neon top-12 left-1/2 -translate-x-1/2 opacity-70"></div>
        <div aria-hidden="true" class="hero-halo-indigo right-[-10%] top-12"></div>

        <div class="relative grid grid-cols-1 desk:grid-cols-2 gap-12 items-center">
          <!-- Text column -->
          <div>
            <div class="flex mb-7">
              <app-status-pill variant="live">Use cases</app-status-pill>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              How teams build with
              <span class="text-white">Deep Variance</span>
            </h1>
            <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              Five industry verticals running infrastructure at scale. Real problems, measured outcomes, no generic cloud pitch.
            </p>
          </div>

          <!-- Image column -->
          <div class="relative desk:block hidden">
            <img
              src="/use-cases-hero.webp"
              alt="Deep Variance use cases across industries"
              class="w-full h-auto"
              style="mix-blend-mode: screen"
            />
          </div>
        </div>
      </section>

      <!-- 5-card bento -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-16 border-t border-white/5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          @for (uc of useCases; track uc.id; let i = $index) {
            <a
              [routerLink]="['/use-cases', uc.id]"
              [attr.href]="'/use-cases/' + uc.id"
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
      bentoTitle: 'Multi-week training runs at scale',
      bentoSubtitle:
        'Long-running GPU workloads waste energy and compute. DeepTuner and Optimemory optimize power, memory, and throughput without changing your code.',
      bentoMetric: '−50%',
      bentoMetricLabel: 'Energy per token',
      detailHeading: 'Cut energy costs and boost throughput for long-running training.',
      paragraphs: [
        'HPC clusters running continuous AI training face a compounding problem: small inefficiencies in how GPUs run multiply across weeks into significant energy waste and slower results. Traditional profiling tools add their own overhead and require extensive manual tuning.',
        '<strong class="text-on-surface">DeepTuner</strong> automatically identifies the optimal GPU configuration and power settings for your workload before it runs. <strong class="text-on-surface">Optimemory</strong> prevents memory fragmentation that causes multi-week jobs to slow down or fail.',
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
        'Energy costs compounding over multi-week training runs',
        'Manual GPU tuning that breaks on every hardware update',
        'Memory issues that slow down or crash long-running jobs',
        'Performance drops when moving to new GPU generations',
      ],
      ctaLabel: 'Talk to us about HPC pilots',
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
      detailHeading: 'Boost GPU fleet utilization without changing tenant workloads.',
      paragraphs: [
        'GPU providers face a utilization challenge: customers allocate 2x the memory they actually need to prevent crashes, then run at 40-50% capacity. Out-of-memory errors drive support costs and customer churn.',
        '<strong class="text-on-surface">Optimemory</strong> extends the effective memory of each GPU, letting you fit larger models or more tenants on the same hardware. <strong class="text-on-surface">HyperRAG</strong> accelerates RAG inference workloads by up to 6x. <strong class="text-on-surface">DeepTuner</strong> reduces idle energy costs when utilization is low.',
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
        'Customers over-provisioning to avoid out-of-memory crashes',
        'Uneven workload distribution leaving capacity unused',
        'Support costs from memory-related failures and restarts',
        'Revenue left on the table from idle GPU capacity',
      ],
      ctaLabel: 'Talk to us about GPU provider pricing',
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
      detailHeading: 'Enterprise ML infrastructure that stays compliant and efficient.',
      paragraphs: [
        'Enterprise ML teams in regulated industries face a dual challenge: data must stay on-premise for compliance, and long training runs amplify every inefficiency in memory and energy usage.',
        '<strong class="text-on-surface">Optimemory</strong> prevents memory fragmentation that slows down multi-step training pipelines. <strong class="text-on-surface">DeepTuner</strong> optimizes GPU energy usage automatically, reducing power costs before they show up on the bill.',
        'Both products run entirely on your infrastructure with zero data transmission. One integration gives you visibility into memory, latency, and energy across your training workloads.',
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
        'Data compliance requirements preventing use of cloud ML services',
        'Long training runs with compounding memory and energy inefficiencies',
        'Need for full audit trail and reproducibility in model training',
        'High infrastructure costs from suboptimal GPU utilization',
      ],
      ctaLabel: 'Talk to us about enterprise deployments',
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
      detailHeading: 'Break through memory limits without buying more GPUs.',
      paragraphs: [
        'Academic research groups face a fundamental constraint: the models needed for breakthrough discoveries are too large for the GPUs they can afford. Memory fragmentation makes this worse, causing out-of-memory errors on models that should technically fit.',
        '<strong class="text-on-surface">Optimemory</strong> extends the effective memory of your GPUs, letting you train 2x larger models on the same hardware. In genomics research, this enabled moving from 3B to 6B parameter models on a four-GPU setup. <strong class="text-on-surface">HyperRAG</strong> accelerates literature search and RAG queries across research databases.',
        '<strong class="text-on-surface">DeepTuner</strong> optimizes GPU configurations for edge deployment of clinical models, reducing energy usage for battery-powered medical devices.',
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
        'Budget constraints limiting model size and research scope',
        'Out-of-memory errors forcing architecture compromises',
        'Slow iteration cycles delaying scientific discovery',
        'Clinical models too large for edge or mobile deployment',
      ],
      ctaLabel: 'Talk to us about academic licensing',
    },
    {
      id: 'manufacturing',
      icon: Factory,
      label: 'Manufacturing',
      bentoTitle: 'Real-time AI quality control at the edge',
      bentoSubtitle:
        'Vision models for quality inspection must run on factory-floor hardware with no cloud latency and no data leaving the facility.',
      bentoMetric: '< 2 ms',
      bentoMetricLabel: 'Inference latency',
      detailHeading: 'Deploy larger vision models on edge hardware without cloud dependency.',
      paragraphs: [
        'Manufacturing operations need AI inference to happen in real-time on the factory floor, not in the cloud. Edge hardware has limited GPU capacity, and data sovereignty requirements prevent sending production data externally.',
        '<strong class="text-on-surface">Optimemory</strong> lets you run larger, more accurate vision models on constrained edge GPUs. <strong class="text-on-surface">DeepTuner</strong> optimizes GPU settings for the specific hardware on your factory floor, minimizing latency and energy usage.',
        'Everything runs on-premise and air-gapped if needed. No production data leaves your facility at any point.',
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
        'Edge hardware constraints limiting model accuracy and capability',
        'Cloud latency making real-time quality control impractical',
        'Data sovereignty requirements preventing cloud-based inference',
        'Energy and cost concerns from running high-power GPUs continuously',
      ],
      ctaLabel: 'Talk to us about manufacturing deployments',
    },
  ];

  getUseCaseImage(id: string): string {
    const imageMap: Record<string, string> = {
      'hpc-infrastructure': '/use-cases-hpc.webp',
      'gpu-providers': '/use-cases-cloud.webp',
      'enterprise-training': '/use-cases-enterprise.webp',
      'research-institutions': '/use-cases-research.webp',
      'manufacturing': '/use-cases-manufacturing.webp',
    };
    return imageMap[id] || '';
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
