import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  LucideAngularModule,
} from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-use-case-hpc',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    CtaButtonComponent,
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
            <div class="flex items-center gap-3 mb-7">
              <div class="dv-feature-icon !mb-0">
                <lucide-icon [img]="LayersIcon" [size]="20" />
              </div>
              <span class="label-caps text-white">HPC Infrastructure</span>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              Cut energy costs and boost throughput for long-running training
            </h1>
            <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              HPC clusters running continuous AI training face a compounding problem: small inefficiencies in how GPUs run multiply across weeks into significant energy waste and slower results. Traditional profiling tools add their own overhead and require extensive manual tuning.
            </p>
            <div class="grid grid-cols-2 gap-3 mb-8">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">−50%</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Energy per token</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">2x</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Throughput on attention kernels</p>
              </app-glass-card>
            </div>
          </div>

          <!-- Image column -->
          <div class="relative desk:block hidden">
            <img
              src="/use-cases-hpc.webp"
              alt="HPC Infrastructure"
              class="w-full h-auto"
              style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 80% 70% at center, black 40%, transparent 90%)"
            />
          </div>
        </div>
      </section>

      <!-- Content section -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24 border-t border-white/5">
        <div class="grid grid-cols-1 desk:grid-cols-2 gap-12">
          <!-- Left column: Content -->
          <div>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-2xl md:text-3xl mb-6 leading-tight">
              How Deep Variance helps
            </h2>
            <p class="text-on-surface-variant leading-relaxed mb-5">
              <strong class="text-on-surface">DeepTuner</strong> automatically identifies the optimal GPU configuration and power settings for your workload before it runs. <strong class="text-on-surface">Optimemory</strong> prevents memory fragmentation that causes multi-week jobs to slow down or fail.
            </p>

            <div class="flex flex-wrap gap-2 mb-8">
              <a
                routerLink="/deeptuner"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon/8 border border-border text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                DeepTuner
                <lucide-icon [img]="ArrowRightIcon" [size]="11" />
              </a>
              <a
                routerLink="/optimemory"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon/8 border border-border text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                Optimemory
                <lucide-icon [img]="ArrowRightIcon" [size]="11" />
              </a>
            </div>

            <app-glass-card extraClass="p-6 mb-8">
              <p class="label-caps mb-4">What this addresses</p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Energy costs compounding over multi-week training runs</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Manual GPU tuning that breaks on every hardware update</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Memory issues that slow down or crash long-running jobs</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Performance drops when moving to new GPU generations</span>
                </li>
              </ul>
            </app-glass-card>

            <app-cta-button
              variant="ghost"
              routerLink="/pricing"
              fragment="contact-form"
              [fullWidth]="true"
            >
              Talk to us about HPC pilots
            </app-cta-button>
          </div>

          <!-- Right column: Technical details -->
          <div class="flex flex-col gap-6">
            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">Why manual profiling fails at scale</p>
              <div class="space-y-4 text-sm text-on-surface-variant leading-relaxed">
                <p>
                  Traditional GPU profiling requires running every kernel configuration across every workload pattern. For a typical transformer training loop with 8 tunable parameters, that's 256 benchmark runs per GPU model.
                </p>
                <p>
                  Each benchmark consumes energy and cluster time. At scale, the profiling overhead itself becomes a cost center — and the results expire when you upgrade hardware or change batch sizes.
                </p>
                <p class="text-on-surface font-medium">
                  DeepTuner bypasses runtime profiling entirely. It analyzes kernel intermediate representations to predict optimal configurations, delivering tuning recommendations in seconds instead of hours.
                </p>
              </div>
            </app-glass-card>

            <div class="grid grid-cols-2 gap-3">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">0</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Live profiling required</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">1x</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Calibration per GPU generation</p>
              </app-glass-card>
            </div>

            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">Integration requirements</p>
              <ul class="space-y-3 text-sm text-on-surface-variant">
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>PyTorch 2.0+ or vLLM 0.5+</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>CUDA 12.0+ (NVIDIA) or ROCm 6.0+ (AMD)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Single import in training script</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>No model architecture changes required</span>
                </li>
              </ul>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Ready to <span class="text-white">optimize your HPC infrastructure</span>?
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            We scope every deployment to your hardware, data governance constraints, and team size.
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
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
        color: #9d6fff;
      }
    `,
  ],
})
export class UseCaseHpcPageComponent {
  private readonly seo = inject(SeoService);

  readonly LayersIcon = Layers;
  readonly ArrowRightIcon = ArrowRight;
  readonly CheckCircle2Icon = CheckCircle2;

  constructor() {
    this.seo.set({
      title: 'HPC Infrastructure Use Case | Deep Variance',
      description:
        'Cut energy costs by 50% and double throughput for multi-week GPU training runs with DeepTuner and Optimemory.',
      path: '/use-cases/hpc-infrastructure',
    });
  }
}
