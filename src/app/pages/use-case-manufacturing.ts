import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  LucideAngularModule,
} from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-use-case-manufacturing',
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
                <lucide-icon [img]="FactoryIcon" [size]="20" />
              </div>
              <span class="label-caps text-white">Manufacturing</span>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              Deploy larger vision models on edge hardware without cloud dependency
            </h1>
            <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              Manufacturing operations need AI inference to happen in real-time on the factory floor, not in the cloud. Edge hardware has limited GPU capacity, and data sovereignty requirements prevent sending production data externally.
            </p>
            <div class="grid grid-cols-2 gap-3 mb-8">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">50%</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Less VRAM for edge vision models</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">< 2 ms</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">FP8 inference latency, embedded GPU</p>
              </app-glass-card>
            </div>
          </div>

          <!-- Image column -->
          <div class="relative desk:block hidden">
            <img
              src="/use-cases-manufacturing.webp"
              alt="Manufacturing"
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
              <strong class="text-on-surface">Optimemory</strong> lets you run larger, more accurate vision models on constrained edge GPUs. <strong class="text-on-surface">DeepTuner</strong> optimizes GPU settings for the specific hardware on your factory floor, minimizing latency and energy usage.
            </p>
            <p class="text-on-surface-variant leading-relaxed mb-5">
              Everything runs on-premise and air-gapped if needed. No production data leaves your facility at any point.
            </p>

            <div class="flex flex-wrap gap-2 mb-8">
              <a
                routerLink="/optimemory"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon/8 border border-border text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                Optimemory
                <lucide-icon [img]="ArrowRightIcon" [size]="11" />
              </a>
              <a
                routerLink="/deeptuner"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon/8 border border-border text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                DeepTuner
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
                  <span class="text-xs text-on-surface-variant leading-relaxed">Edge hardware constraints limiting model accuracy and capability</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Cloud latency making real-time quality control impractical</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Data sovereignty requirements preventing cloud-based inference</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Energy and cost concerns from running high-power GPUs continuously</span>
                </li>
              </ul>
            </app-glass-card>

            <app-cta-button
              variant="ghost"
              routerLink="/pricing"
              fragment="contact-form"
              [fullWidth]="true"
            >
              Talk to us about manufacturing deployments
            </app-cta-button>
          </div>

          <!-- Right column: Technical details -->
          <div class="flex flex-col gap-6">
            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">The edge AI constraint</p>
              <div class="space-y-4 text-sm text-on-surface-variant leading-relaxed">
                <p>
                  Vision models for quality inspection face requirements that cloud-based inference cannot meet: sub-2ms latency for real-time production lines, zero network dependency for facility uptime, and complete data sovereignty for IP protection.
                </p>
                <p>
                  Edge GPUs like the NVIDIA Jetson or AMD Ryzen AI have memory and power budgets that force accuracy tradeoffs. A ResNet-101 that achieves 98% classification accuracy in the lab will OOM on the factory floor GPU, so teams deploy smaller models that hit 94% and accept the defect rate.
                </p>
                <p class="text-on-surface font-medium">
                  Optimemory extends the effective memory ceiling on constrained edge nodes. Deploy larger, more accurate vision architectures without upgrading hardware. DeepTuner minimizes energy per inference for battery-powered or passively-cooled installations.
                </p>
              </div>
            </app-glass-card>

            <div class="grid grid-cols-2 gap-3">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">0</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Production records transmitted externally</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">1 call</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Sensor data to model leaderboard</p>
              </app-glass-card>
            </div>

            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">Edge deployment</p>
              <ul class="space-y-3 text-sm text-on-surface-variant">
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Runs on NVIDIA Jetson, AMD Ryzen AI, Intel Arc</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Air-gapped, no internet required for inference</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Compatible with TensorRT, ONNX Runtime</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Model training remains on your servers</span>
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
            Ready to <span class="text-white">deploy AI at the edge</span>?
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
export class UseCaseManufacturingPageComponent {
  private readonly seo = inject(SeoService);

  readonly FactoryIcon = Factory;
  readonly ArrowRightIcon = ArrowRight;
  readonly CheckCircle2Icon = CheckCircle2;

  constructor() {
    this.seo.set({
      title: 'Manufacturing Use Case | Deep Variance',
      description:
        'Deploy real-time AI quality control at the edge. Run larger vision models on factory-floor hardware with sub-2ms latency.',
      path: '/use-cases/manufacturing',
    });
  }
}
