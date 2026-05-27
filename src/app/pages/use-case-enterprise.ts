import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  LucideAngularModule,
} from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { DotGridGlowDirective } from '../directives/dot-grid-glow.directive';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-use-case-enterprise',
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
                <lucide-icon [img]="Building2Icon" [size]="20" />
              </div>
              <span class="label-caps text-white">Enterprise Training</span>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              Enterprise ML infrastructure that stays compliant and efficient
            </h1>
            <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              Enterprise ML teams in regulated industries face a dual challenge: data must stay on-premise for compliance, and long training runs amplify every inefficiency in memory and energy usage.
            </p>
            <div class="grid grid-cols-2 gap-3 mb-8">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">11w → 3d</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Development cycle</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">0</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Raw rows transmitted to LLM APIs</p>
              </app-glass-card>
            </div>
          </div>

          <!-- Image column -->
          <div class="relative desk:block hidden">
            <img
              src="/use-cases-enterprise.webp"
              alt="Enterprise Training"
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
              <strong class="text-on-surface">Optimemory</strong> prevents memory fragmentation that slows down multi-step training pipelines. <strong class="text-on-surface">DeepTuner</strong> optimizes GPU energy usage automatically, reducing power costs before they show up on the bill.
            </p>
            <p class="text-on-surface-variant leading-relaxed mb-5">
              Both products run entirely on your infrastructure with zero data transmission. One integration gives you visibility into memory, latency, and energy across your training workloads.
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
                  <span class="text-xs text-on-surface-variant leading-relaxed">Data compliance requirements preventing use of cloud ML services</span>
                </li>
                <li>
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="18"
                    class="text-neon"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Long training runs with compounding memory and energy inefficiencies</span>
                </li>
                <li>
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="18"
                    class="text-neon"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Need for full audit trail and reproducibility in model training</span>
                </li>
                <li>
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="18"
                    class="text-neon"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">High infrastructure costs from suboptimal GPU utilization</span>
                </li>
              </ul>
            </app-glass-card>

            <app-cta-button
              variant="ghost"
              routerLink="/get-started"
              fragment="contact-form"
              [fullWidth]="true"
            >
              Talk to us about enterprise deployments
            </app-cta-button>
          </div>

          <!-- Right column: Technical details -->
          <div class="flex flex-col gap-6">
            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">Why regulated industries stay on-premise</p>
              <div class="space-y-4 text-sm text-on-surface-variant leading-relaxed">
                <p>
                  Financial services, healthcare, and insurance firms operate under strict data governance: PII cannot leave the corporate network, and every model decision must be auditable for compliance.
                </p>
                <p>
                  Cloud ML platforms solve the wrong problem for these teams. The bottleneck isn't access to compute. It's that long training runs accumulate inefficiencies that compound into weeks of wasted time and energy.
                </p>
                <p class="text-on-surface font-medium">
                  Our stack runs entirely on your infrastructure. No raw data, model weights, or training logs ever leave your environment. You get the efficiency of cloud-native ML with the compliance posture you require.
                </p>
              </div>
            </app-glass-card>

            <div class="grid grid-cols-2 gap-3">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">−0.4%</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Accuracy delta, FP8 classification</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">8+</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Architectures ranked per pipeline</p>
              </app-glass-card>
            </div>

            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">Compliance & security</p>
              <ul class="space-y-3 text-sm text-on-surface-variant">
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>SOC 2 Type II certified deployment</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Air-gapped installation available</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Full audit trail of tuning decisions</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>HIPAA and GDPR compliant by design</span>
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
            Ready to <span class="text-white">optimize your enterprise ML infrastructure</span>?
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
export class UseCaseEnterprisePageComponent {
  private readonly seo = inject(SeoService);

  readonly Building2Icon = Building2;
  readonly ArrowRightIcon = ArrowRight;
  readonly CheckCircle2Icon = CheckCircle2;

  constructor() {
    this.seo.set({
      title: 'Enterprise Training Use Case | Deep Variance',
      description:
        'On-premise ML infrastructure for regulated industries. Reduce development cycles from 11 weeks to 3 days with compliant, efficient training.',
      path: '/use-cases/enterprise-training',
    });
  }
}
