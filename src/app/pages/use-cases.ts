import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { StatusPillComponent } from '../components/status-pill';
import { HeroFluidShaderComponent } from '../components/hero-fluid-shader';
import { USE_CASES } from '../data/use-cases';
import { SeoService } from '../services/seo.service';

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
    HeroFluidShaderComponent,
  ],
  template: `
    <div class="relative overflow-x-clip">
      <!-- Hero -->
      <section class="hero-section hero-section--flow hero-section--page border-b border-border overflow-hidden">
        <app-hero-fluid-shader />
        <div class="container relative z-[2]">
        <div class="relative grid grid-cols-1 desk:grid-cols-2 gap-12 items-center">
          <!-- Text column -->
          <div>
            <div class="flex mb-7">
              <app-status-pill variant="live">Use cases</app-status-pill>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              How teams build with
              <span class="text-white">Deep Variance</span>
            </h1>
            <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              Five industry verticals running infrastructure at scale. Real problems, measured outcomes, no generic cloud pitch.
            </p>
          </div>

          <!-- Image column -->
          <div class="relative mt-6 desk:mt-0 max-h-[15rem] desk:max-h-none overflow-hidden">
            <img
              src="/use-cases-hero.webp"
              alt="Deep Variance use cases across industries"
              width="1536"
              height="1024"
              class="w-full h-auto max-h-[15rem] desk:max-h-none object-contain object-center desk:object-right dv-blend-screen"
            />
          </div>
        </div>
        </div>
      </section>

      <!-- 5-card bento -->
      <section class="relative page-section py-12 md:py-16 border-t border-white/5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          @for (uc of useCases; track uc.id) {
            <a
              [routerLink]="['/use-cases', uc.id]"
              [attr.href]="'/use-cases/' + uc.id"
              class="group glass-card rounded-xl p-7 flex flex-col relative overflow-hidden isolate"
            >
              <div
                aria-hidden="true"
                class="pointer-events-none absolute -bottom-24 -right-16 z-0 w-72 h-72 rounded-full bg-surface-dim blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div class="relative z-10 flex flex-col flex-1 min-h-0">
                <div class="flex items-center gap-3 mb-6">
                  <div class="dv-feature-icon dv-feature-icon--sm mb-0">
                    <lucide-icon [img]="uc.icon" [size]="18" />
                  </div>
                  <span class="label-caps text-white">{{ uc.label }}</span>
                </div>
                <h3 class="font-display text-xl md:text-2xl font-semibold text-on-surface leading-tight mb-3">
                  {{ uc.bentoTitle }}
                </h3>
                <p class="text-on-surface-variant leading-relaxed mb-6 flex-1">
                  {{ uc.bentoSubtitle }}
                </p>
                <div class="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
                  <div>
                    <p class="font-display text-3xl font-bold text-white mb-1">{{ uc.bentoMetric }}</p>
                    <p class="label-caps">{{ uc.bentoMetricLabel }}</p>
                  </div>
                  <span class="dv-arrow">
                    Read more
                    <lucide-icon [img]="ArrowRight" [size]="14" />
                  </span>
                </div>
              </div>
            </a>
          }
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="relative page-section py-16 md:py-24 overflow-x-clip">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center relative z-0" [glow]="true">
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Recognize your <span class="text-white">infrastructure problem</span>?
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            We scope every deployment to your hardware, data governance constraints, and team size.
            No generic pricing tiers, just what fits.
          </p>
          <app-cta-button variant="primary" routerLink="/get-started" fragment="contact-form">
            Let's talk
          </app-cta-button>
        </app-glass-card>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class UseCasesPageComponent {
  private readonly seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;

  readonly useCases = USE_CASES;

  constructor() {
    this.seo.set({
      title: 'Use Cases | Deep Variance',
      description:
        'How HPC operators, GPU providers, enterprise ML teams, research institutions, and manufacturers use Optimemory, HyperRAG, and DeepTuner to solve real infrastructure problems.',
      path: '/use-cases',
    });
  }
}
