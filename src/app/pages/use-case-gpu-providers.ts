import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  LucideAngularModule,
} from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-use-case-gpu-providers',
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
                <lucide-icon [img]="CpuIcon" [size]="20" />
              </div>
              <span class="label-caps text-white">GPU Providers</span>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              Boost GPU fleet utilization without changing tenant workloads
            </h1>
            <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              GPU providers face a utilization challenge: customers allocate 2x the memory they actually need to prevent crashes, then run at 40-50% capacity. Out-of-memory errors drive support costs and customer churn.
            </p>
            <div class="grid grid-cols-2 gap-3 mb-8">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">2.5x</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Effective model scale per physical GPU</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-neon text-white">−62%</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">OOM errors in benchmarks</p>
              </app-glass-card>
            </div>
          </div>

          <!-- Image column -->
          <div class="relative desk:block hidden">
            <img
              src="/use-cases-cloud.webp"
              alt="GPU Providers"
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
              <strong class="text-on-surface">Optimemory</strong> extends the effective memory of each GPU, letting you fit larger models or more tenants on the same hardware. <strong class="text-on-surface">HyperRAG</strong> accelerates RAG inference workloads by up to 6x. <strong class="text-on-surface">DeepTuner</strong> reduces idle energy costs when utilization is low.
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
                routerLink="/hyperrag"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon/8 border border-border text-xs font-display font-semibold uppercase tracking-[0.14em] text-white hover:bg-neon/15 transition-colors"
              >
                HyperRAG
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
                  <span class="text-xs text-on-surface-variant leading-relaxed">Customers over-provisioning to avoid out-of-memory crashes</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Uneven workload distribution leaving capacity unused</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Support costs from memory-related failures and restarts</span>
                </li>
                <li class="flex items-start gap-3">
                  <lucide-icon
                    [img]="CheckCircle2Icon"
                    [size]="15"
                    class="text-neon flex-shrink-0 mt-0.5"
                  />
                  <span class="text-xs text-on-surface-variant leading-relaxed">Revenue left on the table from idle GPU capacity</span>
                </li>
              </ul>
            </app-glass-card>

            <app-cta-button
              variant="ghost"
              routerLink="/pricing"
              fragment="contact-form"
              [fullWidth]="true"
            >
              Talk to us about GPU provider pricing
            </app-cta-button>
          </div>

          <!-- Right column: Technical details -->
          <div class="flex flex-col gap-6">
            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">The GPU provider capacity problem</p>
              <div class="space-y-4 text-sm text-on-surface-variant leading-relaxed">
                <p>
                  GPU-as-a-service economics hinge on utilization. When customers provision a 40GB A100 but only use 18GB, the remaining 22GB generates zero revenue and cannot be sold to another tenant.
                </p>
                <p>
                  Memory over-provisioning is rational risk management: an OOM crash mid-training costs hours and triggers support escalation. So customers allocate 2x headroom, and fleet density drops below 50%.
                </p>
                <p class="text-on-surface font-medium">
                  Optimemory breaks this tradeoff. Tenants can request larger instances while you provision smaller physical cards, or you can pack more tenants per node without increasing failure rates.
                </p>
              </div>
            </app-glass-card>

            <div class="grid grid-cols-2 gap-3">
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">+38%</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">Fleet utilization gain</p>
              </app-glass-card>
              <app-glass-card variant="kpi-rail" extraClass="p-5 pl-6 h-full">
                <p class="font-display text-2xl font-bold mb-1 text-on-surface">1 import</p>
                <p class="text-[11px] text-on-surface-variant leading-snug">To enable VMM on a node</p>
              </app-glass-card>
            </div>

            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-4">Deployment model</p>
              <ul class="space-y-3 text-sm text-on-surface-variant">
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Driver-level integration, transparent to tenants</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>No changes to tenant containers or workflows</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Compatible with Kubernetes, Slurm, RunPod</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-neon mt-0.5">•</span>
                  <span>Revenue share or flat licensing available</span>
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
            Ready to <span class="text-white">unlock your fleet capacity</span>?
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
export class UseCaseGpuProvidersPageComponent {
  private readonly seo = inject(SeoService);

  readonly CpuIcon = Cpu;
  readonly ArrowRightIcon = ArrowRight;
  readonly CheckCircle2Icon = CheckCircle2;

  constructor() {
    this.seo.set({
      title: 'GPU Providers Use Case | Deep Variance',
      description:
        'Increase fleet utilization by 38% and reduce OOM errors by 62% with Optimemory, HyperRAG, and DeepTuner.',
      path: '/use-cases/gpu-providers',
    });
  }
}
