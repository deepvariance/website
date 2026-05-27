import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  CheckCircle2,
  LucideAngularModule,
  Microscope,
} from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { DotGridGlowDirective } from '../directives/dot-grid-glow.directive';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-use-case-research',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    CtaButtonComponent,
    DotGridGlowDirective,
  ],
  template: `
    <div class="relative overflow-x-hidden">
      <!-- Hero -->
      <section class="page-hero-grid border-b border-border overflow-hidden" appDotGridGlow>
        <div class="page-hero-grid__soft-glow" aria-hidden="true"></div>
        <div class="relative z-[2] max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div class="relative grid grid-cols-1 desk:grid-cols-2 gap-12 items-center">
          <!-- Text column -->
          <div>
            <div class="flex items-center gap-3 mb-7">
              <div class="dv-feature-icon !mb-0">
                <lucide-icon [img]="MicroscopeIcon" [size]="20" />
              </div>
              <span class="label-caps text-white">Research Institutions</span>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              Break through memory limits without buying more GPUs
            </h1>
            <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              Academic research groups face a fundamental constraint: the models needed for breakthrough discoveries are too large for the GPUs they can afford. Memory fragmentation makes this worse, causing out-of-memory errors on models that should technically fit.
            </p>
            <div class="grid grid-cols-2 gap-3 mb-8">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">3B → 6B</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Model scale on identical hardware</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">4x</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">More experiments per GPU-week</p>
              </app-glass-card>
            </div>
          </div>

          <!-- Image column -->
          <div class="relative desk:block hidden">
            <img
              src="/use-cases-research.webp"
              alt="Research Institutions"
              class="w-full h-auto"
              style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 80% 70% at center, black 40%, transparent 90%)"
            />
          </div>
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
              <strong class="text-on-surface">Optimemory</strong> extends the effective memory of your GPUs, letting you train 2x larger models on the same hardware. In genomics research, this enabled moving from 3B to 6B parameter models on a four-GPU setup. <strong class="text-on-surface">HyperRAG</strong> accelerates literature search and RAG queries across research databases.
            </p>
            <p class="text-on-surface-variant leading-relaxed mb-5">
              <strong class="text-on-surface">DeepTuner</strong> optimizes GPU configurations for edge deployment of clinical models, reducing energy usage for battery-powered medical devices.
            </p>

            <div class="flex flex-wrap gap-2 mb-8">
              <a
                routerLink="/platform" fragment="optimemory"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full panel-pill text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                Optimemory
                <lucide-icon [img]="ArrowRightIcon" [size]="11" />
              </a>
              <a
                routerLink="/platform" fragment="hyperrag"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full panel-pill text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                HyperRAG
                <lucide-icon [img]="ArrowRightIcon" [size]="11" />
              </a>
              <a
                routerLink="/platform" fragment="deeptuner"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full panel-pill text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                DeepTuner
                <lucide-icon [img]="ArrowRightIcon" [size]="11" />
              </a>
            </div>

            <app-glass-card extraClass="p-6 mb-8">
              <p class="label-caps mb-4">What this addresses</p>
              <ul class="list-check space-y-3">
                <li>
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="18"
                    class="text-neon"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Budget constraints limiting model size and research scope</span>
                </li>
                <li>
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="18"
                    class="text-neon"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Out-of-memory errors forcing architecture compromises</span>
                </li>
                <li>
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="18"
                    class="text-neon"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Slow iteration cycles delaying scientific discovery</span>
                </li>
                <li>
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="18"
                    class="text-neon"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Clinical models too large for edge or mobile deployment</span>
                </li>
              </ul>
            </app-glass-card>

            <app-cta-button
              variant="ghost"
              routerLink="/get-started"
              fragment="contact-form"
              [fullWidth]="true"
            >
              Talk to us about academic licensing
            </app-cta-button>
          </div>

          <!-- Right column: Technical details -->
          <div class="flex flex-col gap-6">
            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">The research compute ceiling</p>
              <div class="space-y-4 text-sm text-on-surface-variant leading-relaxed">
                <p>
                  Academic labs operate under budget constraints that commercial teams don't face. A 4-GPU A100 node is a significant capital expense, and hardware upgrades happen on 3-5 year cycles.
                </p>
                <p>
                  Meanwhile, model complexity grows faster than Moore's Law. A genomics researcher designing a 6B-parameter sequence classifier will hit OOM errors on a configuration that should technically fit, not because the math is wrong, but because CUDA's allocator fragments memory across training steps.
                </p>
                <p class="text-on-surface font-medium">
                  Optimemory recovers the stranded capacity. In computational biology experiments, we've seen effective ceilings move from 3B to 6B parameters on identical hardware, unlocking model architectures that were previously inaccessible.
                </p>
              </div>
            </app-glass-card>

            <div class="grid grid-cols-2 gap-3">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">< 1 hr</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Phenotype model leaderboard run</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">−40%</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Wall-clock vs grad-checkpointing</p>
              </app-glass-card>
            </div>

            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">Academic licensing</p>
              <ul class="space-y-3 text-sm text-on-surface-variant">
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Discounted rates for .edu institutions</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Publication rights retained for research results</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Co-authorship opportunities for novel applications</span>
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
            Ready to <span class="text-white">accelerate your research</span>?
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            We scope every deployment to your hardware, data governance constraints, and team size.
          </p>
          <app-cta-button variant="primary" routerLink="/get-started" fragment="contact-form">
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
        background: rgba(255, 255, 255, 0.064);
        border: none;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.092);
        color: #ffffff;
      }
    `,
  ],
})
export class UseCaseResearchPageComponent {
  private readonly seo = inject(SeoService);

  readonly MicroscopeIcon = Microscope;
  readonly ArrowRightIcon = ArrowRight;
  readonly CheckCircle2Icon = CheckCircle2;

  constructor() {
    this.seo.set({
      title: 'Research Institutions Use Case | Deep Variance',
      description:
        'Train 2x larger models on research budgets. Move from 3B to 6B parameters without buying more GPUs with Optimemory.',
      path: '/use-cases/research-institutions',
    });
  }
}
