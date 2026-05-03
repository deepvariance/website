import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BatteryCharging,
  Cpu,
  Gauge,
  Layers,
  LucideAngularModule,
  Sparkles,
  Zap,
} from 'lucide-angular';

import { CommandRowComponent } from '../components/command-row';
import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import {
  RailSection,
  SectionRailComponent,
} from '../components/section-rail';
import { SectionHeaderComponent } from '../components/section-header';
import { StatStripComponent } from '../components/stat-strip';
import { StatusPillComponent } from '../components/status-pill';
import { ToolItem, ToolStripComponent } from '../components/tool-strip';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-deeptuner',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    StatStripComponent,
    SectionHeaderComponent,
    CtaButtonComponent,
    CommandRowComponent,
    SectionRailComponent,
    StatusPillComponent,
    ToolStripComponent,
  ],
  template: `
    <div class="relative">
      <app-section-rail [sections]="railSections" ariaLabel="DeepTuner section navigation" />

      <!-- Hero (centered) -->
      <section id="hero" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden="true" class="hero-halo-neon top-12 left-1/2 -translate-x-1/2 opacity-70"></div>
        <div aria-hidden="true" class="hero-halo-indigo right-[-15%] top-12"></div>

        <div class="relative text-center max-w-4xl mx-auto">
          <div class="flex justify-center mb-7">
            <app-status-pill variant="preview">DeepTuner · Early access · HPC</app-status-pill>
          </div>

          <h1
            class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-6xl md:text-[5rem] leading-[1.04] mb-7"
          >
            Stop guessing
            <br class="hidden sm:block" />
            <span class="text-white">run configurations</span>.
          </h1>

          <p class="max-w-2xl mx-auto text-base sm:text-lg text-dim font-medium leading-relaxed mb-12">
            DeepTuner uses intermediate code analysis to predict energy-efficient run configurations
            <em class="not-italic text-on-surface">before</em> any code runs. Up to 50% less energy
            and 2x throughput on MHA kernels, no runtime profiling.
          </p>

          <div class="flex justify-center mb-8">
            <app-cta-button variant="primary" routerLink="/pricing" fragment="contact-form">
              Request early access
            </app-cta-button>
          </div>

          <div class="flex justify-center mb-12">
            <app-command-row
              command="dv tune --target=H100 --kernel=mha"
              linkLabel="Read the paper"
              href="#kernel-shape"
            />
          </div>

          <app-stat-strip [centered]="true" [stats]="heroStats" />
        </div>
      </section>

      <!-- Tool strip -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pb-10 md:pb-12">
        <app-tool-strip label="Tunes kernels for" [tools]="tools" />
      </section>

      <!-- Bento dashboard: optimization curves + double KPI -->
      <section id="dashboard" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <!-- Curves card 8/12 -->
          <app-glass-card variant="strong" rounded="2xl" extraClass="lg:col-span-8 p-7 md:p-9" [glow]="true">
            <div class="flex items-start justify-between mb-6">
              <div>
                <p class="label-caps mb-2">Live optimization</p>
                <h3 class="font-display text-2xl font-semibold text-on-surface">
                  Energy / throughput curves
                </h3>
              </div>
              <span class="dv-feature-icon !mb-0"><lucide-icon [img]="Gauge" [size]="20" /></span>
            </div>

            <!-- SVG -->
            <div class="rounded-xl bg-black/30 border border-white/5 p-6 overflow-hidden">
              <svg viewBox="0 0 600 240" class="w-full h-auto">
                <defs>
                  <linearGradient id="dtFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#9d6fff" stop-opacity="0.45" />
                    <stop offset="1" stop-color="#9d6fff" stop-opacity="0" />
                  </linearGradient>
                  <linearGradient id="dtFillRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#c0c1ff" stop-opacity="0.4" />
                    <stop offset="1" stop-color="#c0c1ff" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <!-- grid -->
                <g stroke="rgba(218,230,213,0.08)" stroke-width="0.6">
                  <line x1="40" y1="40" x2="580" y2="40" />
                  <line x1="40" y1="100" x2="580" y2="100" />
                  <line x1="40" y1="160" x2="580" y2="160" />
                  <line x1="40" y1="200" x2="580" y2="200" />
                </g>
                <!-- baseline curve (dim) -->
                <path
                  d="M 40 80 C 130 70, 200 90, 270 110 S 420 170, 580 195"
                  stroke="#c0c1ff"
                  stroke-width="1.6"
                  fill="none"
                  stroke-dasharray="4 4"
                  opacity="0.7"
                />
                <path
                  d="M 40 80 C 130 70, 200 90, 270 110 S 420 170, 580 195 L 580 220 L 40 220 Z"
                  fill="url(#dtFillRed)"
                />
                <!-- optimized curve (neon) -->
                <path
                  d="M 40 200 C 120 180, 180 130, 270 80 S 420 30, 580 36"
                  stroke="#9d6fff"
                  stroke-width="2.2"
                  fill="none"
                  filter="drop-shadow(0 0 10px rgba(157,111,255,0.55))"
                />
                <path
                  d="M 40 200 C 120 180, 180 130, 270 80 S 420 30, 580 36 L 580 220 L 40 220 Z"
                  fill="url(#dtFill)"
                />
                <!-- node markers -->
                <g fill="#9d6fff">
                  <circle cx="200" cy="120" r="3" />
                  <circle cx="320" cy="65" r="3" />
                  <circle cx="450" cy="40" r="3" />
                </g>
                <!-- axes labels -->
                <g font-family="IBM Plex Mono" font-size="9" fill="#849581">
                  <text x="40" y="232">0</text>
                  <text x="280" y="232">SEQ LEN</text>
                  <text x="540" y="232">8K</text>
                  <text x="20" y="44" text-anchor="end">HI</text>
                  <text x="20" y="204" text-anchor="end">LO</text>
                </g>
              </svg>
            </div>

            <div class="mt-6 grid grid-cols-3 gap-4">
              <div>
                <p class="label-caps mb-1">Baseline</p>
                <p class="font-display text-lg font-semibold text-indigo-soft">+250 W avg</p>
              </div>
              <div>
                <p class="label-caps mb-1">Optimized</p>
                <p class="font-display text-lg font-semibold text-white">+100 W avg</p>
              </div>
              <div>
                <p class="label-caps mb-1">Run length</p>
                <p class="font-display text-lg font-semibold text-on-surface">256, 8192 tok</p>
              </div>
            </div>
          </app-glass-card>

          <!-- Double KPI 4/12 -->
          <div class="lg:col-span-4 flex flex-col gap-5">
            <app-glass-card variant="kpi-rail" extraClass="p-7 pl-9 flex-1" [glow]="true">
              <p class="label-caps mb-3">Energy per token</p>
              <p class="font-display text-6xl font-bold text-white mb-2 leading-none">
                −50%
              </p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Average energy reduction across training and inference workloads on H100, A100, and RTX 5000 Ada.
              </p>
            </app-glass-card>
            <app-glass-card variant="kpi-rail" extraClass="p-7 pl-9 flex-1">
              <p class="label-caps mb-3">Throughput uplift</p>
              <p class="font-display text-6xl font-bold text-on-surface mb-2 leading-none">2x</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Same hardware, same model, twice the tokens per joule on MHA.
              </p>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- How DeepTuner works -->
      <section id="how-it-works" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div class="lg:col-span-5">
            <span class="label-caps mb-4 inline-block">How DeepTuner works</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-5xl mb-6 leading-[1.06]">
              <span class="text-white">Static analysis.</span><br />
              Zero runtime overhead.
            </h2>
            <div class="space-y-5 text-on-surface-variant leading-relaxed">
              <p>
                Existing kernel tuners require exhaustive runtime profiling: O(2ⁿ) benchmark runs for
                <em class="not-italic text-on-surface">n</em> configuration parameters. For a production
                cluster running continuous training, that profiling tax is paid on every hardware
                migration and workload change.
              </p>
              <p>
                DeepTuner analyzes intermediate GPU code <em class="not-italic text-on-surface">before</em>
                any execution, extracting memory access patterns, control flow, and instruction mix to
                predict the energy-efficient run configuration and GPU power cap. A one-time
                microbenchmark per GPU generation is all it needs.
              </p>
              <p>
                Validated on NVIDIA RTX 5000 Ada (Ada Lovelace) and RTX 3070 (Ampere) across
                multi-head attention, convolution, and matrix multiplication kernels.
              </p>
            </div>
          </div>

          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <app-glass-card extraClass="p-6">
              <div class="dv-feature-icon"><lucide-icon [img]="Layers" [size]="18" /></div>
              <h4 class="font-display font-semibold text-on-surface mb-2">Intermediate code analysis</h4>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Extracts memory locality scores, register pressure, warp divergence, and instruction
                mix ratios, without launching a single kernel.
              </p>
            </app-glass-card>

            <app-glass-card extraClass="p-6">
              <div class="dv-feature-icon"><lucide-icon [img]="Cpu" [size]="18" /></div>
              <h4 class="font-display font-semibold text-on-surface mb-2">Architecture-agnostic calibration</h4>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Calibrated once per GPU generation. Optimal kernel configs are predicted without
                re-profiling when migrating between Ampere, Hopper, or Blackwell.
              </p>
            </app-glass-card>

            <app-glass-card extraClass="p-6">
              <div class="dv-feature-icon"><lucide-icon [img]="BatteryCharging" [size]="18" /></div>
              <h4 class="font-display font-semibold text-on-surface mb-2">Joint shape and power-cap tuning</h4>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Jointly tunes run configuration and GPU power cap for minimum energy per token,
                without sacrificing throughput above 95% of peak.
              </p>
            </app-glass-card>

            <app-glass-card extraClass="p-6" [glow]="true">
              <div class="dv-feature-icon"><lucide-icon [img]="Zap" [size]="18" /></div>
              <h4 class="font-display font-semibold text-on-surface mb-2">No live profiling</h4>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Predictions are generated entirely from static analysis. Production clusters skip
                hours of warm-up profiling on every migration.
              </p>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- Kernel shape tuning section (2-col) -->
      <section id="kernel-shape" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="p-8 md:p-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span class="label-caps mb-4 inline-block">Kernel shape tuning</span>
              <h3 class="font-display font-bold text-on-surface text-2xl md:text-3xl leading-tight mb-4">
                Block shapes that match the <span class="text-white">memory hierarchy</span>.
              </h3>
              <p class="text-on-surface-variant leading-relaxed">
                DeepTuner pairs kernel block shapes with the GPU's L1/L2/SM register budget to
                eliminate stalls and warp divergence. Optimal shapes are emitted as a one-time
                config per (kernel, GPU generation), no compile-time JIT cost.
              </p>
            </div>
            <div class="rounded-xl bg-black/30 border border-white/5 p-6">
              <div class="grid grid-cols-4 gap-3">
                <div class="aspect-square rounded-md border border-white/8 bg-white/2"></div>
                <div class="aspect-square rounded-md border border-neon/40 bg-neon/8 shadow-[0_0_18px_rgba(157,111,255,0.25)]"></div>
                <div class="aspect-square rounded-md border border-neon/40 bg-neon/8 shadow-[0_0_18px_rgba(157,111,255,0.25)]"></div>
                <div class="aspect-square rounded-md border border-white/8 bg-white/2"></div>
                <div class="aspect-square rounded-md border border-neon/40 bg-neon/8 shadow-[0_0_18px_rgba(157,111,255,0.25)]"></div>
                <div class="aspect-square rounded-md border border-neon/40 bg-neon/8 shadow-[0_0_18px_rgba(157,111,255,0.25)]"></div>
                <div class="aspect-square rounded-md border border-neon/40 bg-neon/8 shadow-[0_0_18px_rgba(157,111,255,0.25)]"></div>
                <div class="aspect-square rounded-md border border-white/8 bg-white/2"></div>
                <div class="aspect-square rounded-md border border-white/8 bg-white/2"></div>
                <div class="aspect-square rounded-md border border-neon/40 bg-neon/8 shadow-[0_0_18px_rgba(157,111,255,0.25)]"></div>
                <div class="aspect-square rounded-md border border-white/8 bg-white/2"></div>
                <div class="aspect-square rounded-md border border-white/8 bg-white/2"></div>
              </div>
              <div class="mt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-outline">
                <span>Selected shape</span>
                <span class="text-white">2 x 32 · 100 W</span>
              </div>
            </div>
          </div>
        </app-glass-card>
      </section>

      <!-- Future Research -->
      <section id="future" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header eyebrow="On the horizon" subhead="DeepTuner currently runs on NVIDIA GPUs. Work is actively in progress to bring the same intermediate code analysis approach to other hardware targets.">
          Expanding beyond <span class="text-white">NVIDIA</span>.
        </app-section-header>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <app-glass-card extraClass="p-7 flex items-start gap-5">
            <div class="dv-feature-icon flex-shrink-0 !mb-0"><lucide-icon [img]="Cpu" [size]="20" /></div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h4 class="font-display font-semibold text-on-surface">AMD ROCm</h4>
                <span class="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-indigo-soft/10 text-indigo-soft border border-indigo-soft/25">In progress</span>
              </div>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Porting the intermediate code analysis pipeline to AMD's ROCm stack and CDNA
                architecture.
              </p>
            </div>
          </app-glass-card>
          <app-glass-card extraClass="p-7 flex items-start gap-5">
            <div class="dv-feature-icon flex-shrink-0 !mb-0"><lucide-icon [img]="Layers" [size]="20" /></div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h4 class="font-display font-semibold text-on-surface">Google TPUs</h4>
                <span class="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-indigo-soft/10 text-indigo-soft border border-indigo-soft/25">In progress</span>
              </div>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Adapting energy-aware run configuration search to XLA's compilation model for TPU v4
                and v5 workloads.
              </p>
            </div>
          </app-glass-card>
        </div>

        <p class="text-center text-xs font-mono uppercase tracking-[0.16em] text-outline mt-8">
          DeepTuner is architecture-agnostic in principle. Production support is currently NVIDIA-only.
        </p>
      </section>

      <!-- Bottom CTA -->
      <section id="cta" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <div class="dv-feature-icon mx-auto"><lucide-icon [img]="Sparkles" [size]="22" /></div>
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Join the <span class="text-white">DeepTuner beta</span>.
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            We're onboarding HPC teams with active training or inference infrastructure. Tell us
            your hardware setup and we'll scope a pilot.
          </p>
          <app-cta-button variant="primary" routerLink="/pricing" fragment="contact-form">
            Get early access
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
        width: 44px;
        height: 44px;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
        color: #9d6fff;
      }
    `,
  ],
})
export class DeepTunerPageComponent {
  private readonly seo = inject(SeoService);

  readonly BatteryCharging = BatteryCharging;
  readonly Layers = Layers;
  readonly Cpu = Cpu;
  readonly Zap = Zap;
  readonly Gauge = Gauge;
  readonly Sparkles = Sparkles;

  readonly heroStats = [
    { value: 'Up to 50%', label: 'Less energy', highlight: true },
    { value: 'Up to 2x', label: 'Throughput on MHA', highlight: true },
    { value: 'Up to 70%', label: 'Search space saved', highlight: true },
  ];

  readonly railSections: RailSection[] = [
    { id: 'hero', label: 'Overview' },
    { id: 'dashboard', label: 'Optimization' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'kernel-shape', label: 'Kernel shape' },
    { id: 'future', label: 'Roadmap' },
    { id: 'cta', label: 'Get access' },
  ];

  readonly tools: ToolItem[] = [
    { name: 'NVIDIA H100' },
    { name: 'NVIDIA A100' },
    { name: 'RTX 5000 Ada' },
    { name: 'RTX 3070' },
    { name: 'CUDA 12' },
    { name: 'Triton' },
    { name: 'PyTorch' },
  ];

  constructor() {
    this.seo.set({
      title: 'DeepTuner | Deep Variance',
      description:
        'DeepTuner uses intermediate code analysis to predict energy-efficient GPU kernel configurations without runtime profiling. Up to 50% less energy and 2x throughput on MHA kernels.',
      path: '/deeptuner',
    });
  }
}
