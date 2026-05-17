import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Clock,
  Cpu,
  Layers,
  LucideAngularModule,
  Server,
  Sparkles,
  TrendingDown,
  Zap,
} from 'lucide-angular';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import {
  RailSection,
  SectionRailComponent,
} from '../components/section-rail';
import { StatusPillComponent } from '../components/status-pill';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-deeptuner',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    CtaButtonComponent,
    SectionRailComponent,
    StatusPillComponent,
  ],
  template: `
    <div class="relative">
      <app-section-rail [sections]="railSections" ariaLabel="DeepTuner section navigation" />

      <!-- Hero -->
      <section id="hero" class="relative border-b border-border overflow-hidden">
        <div class="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          <!-- Desktop: problem image absolute right -->
          <div class="hidden desk:block absolute top-32 bottom-0 right-0 w-[44%] pointer-events-none select-none">
            <img
              src="/deeptuner-problem.webp"
              alt="GPU cluster showing wasted energy from unoptimized kernel configurations"
              width="1536" height="1024"
              fetchpriority="high"
              class="w-full h-full object-contain object-right"
              style="mix-blend-mode:screen;mask-image:linear-gradient(to right,transparent 0%,black 14%,black 78%,transparent 100%),linear-gradient(to bottom,black 0%,black 82%,transparent 100%);mask-composite:intersect;-webkit-mask-image:linear-gradient(to right,transparent 0%,black 14%,black 78%,transparent 100%),linear-gradient(to bottom,black 0%,black 82%,transparent 100%);-webkit-mask-composite:source-in"
            />
          </div>

          <!-- Mobile: full-width image above text -->
          <div class="desk:hidden pt-16 -mx-6">
            <img
              src="/deeptuner-problem.webp"
              alt="GPU cluster showing wasted energy from unoptimized kernel configurations"
              width="1536" height="1024"
              class="w-full"
              style="mix-blend-mode:screen;opacity:0.85"
            />
          </div>

          <!-- Hero text -->
          <div class="w-full desk:max-w-[700px] pt-6 desk:pt-32 pb-8 desk:pb-16">
            <div class="mb-7">
              <app-status-pill variant="preview">DeepTuner · Early access · HPC</app-status-pill>
            </div>

            <h1 class="font-display font-bold tracking-tight text-on-surface text-2xl sm:text-5xl md:text-[3.7rem] leading-[1.04] mb-6">
              Stop wasting energy<br/>
              <span class="text-white">on unoptimized kernels</span>.
            </h1>

            <p class="max-w-xl text-base text-on-surface-variant font-medium leading-relaxed mb-8">
              DeepTuner predicts the most energy-efficient GPU kernel configuration before any code runs. Get up to 50% energy savings and 2x throughput without runtime profiling overhead.
            </p>

            <div class="flex items-center gap-8 flex-wrap">
              <div>
                <p class="font-mono text-xs uppercase tracking-[0.18em] mb-1" style="color:#8a8a8a">Energy saved</p>
                <p class="font-display text-4xl font-bold text-white leading-none">Up to 50%</p>
              </div>
              <div>
                <p class="font-mono text-xs uppercase tracking-[0.18em] mb-1" style="color:#8a8a8a">Throughput</p>
                <p class="font-display text-4xl font-bold text-white leading-none">Up to 2x</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Works alongside -->
      <section class="border-b border-border">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div class="py-4 flex flex-col desk:flex-row desk:items-center gap-3 desk:gap-8">
            <p class="font-mono text-[10px] uppercase tracking-[0.22em] text-center desk:text-left" style="color:#8a8a8a">Works alongside</p>
            <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <img src="/pytorch-logo.webp" alt="PyTorch" width="120" height="30" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
              <img src="/vllm-logo.webp" alt="vLLM" width="280" height="80" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
              <img src="/sglang-logo.webp" alt="SGLang" width="262" height="80" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- The problem -->
      <section id="problem" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">The problem</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Runtime profiling is expensive.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-6">
              Traditional kernel tuners require exhaustive runtime profiling across all possible configurations. For production clusters running continuous training, this profiling overhead is paid on every hardware migration and workload change.
            </p>
            <div class="space-y-5">
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                  <lucide-icon [img]="Zap" [size]="14" />
                </span>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">50% energy waste: </span>Unoptimized kernel configs burn energy on unnecessary compute
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                  <lucide-icon [img]="Clock" [size]="14" />
                </span>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">O(2ⁿ) search space: </span>Hours of profiling for n tuning parameters on every hardware change
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                  <lucide-icon [img]="TrendingDown" [size]="14" />
                </span>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">Compounding cost: </span>Scales poorly with cluster size and model updates
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-5 auto-rows-fr">
            <app-glass-card extraClass="p-6 flex flex-col h-full">
              <div class="dv-feature-icon"><lucide-icon [img]="Zap" [size]="18" /></div>
              <p class="font-display text-2xl font-bold text-white mb-2">50%</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Energy waste from configs
              </p>
            </app-glass-card>
            <app-glass-card extraClass="p-6 flex flex-col h-full">
              <div class="dv-feature-icon"><lucide-icon [img]="Clock" [size]="18" /></div>
              <p class="font-display text-2xl font-bold text-white mb-2">O(2ⁿ)</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Search space complexity
              </p>
            </app-glass-card>
            <app-glass-card extraClass="p-6 flex flex-col h-full">
              <div class="dv-feature-icon"><lucide-icon [img]="Server" [size]="18" /></div>
              <p class="font-display text-2xl font-bold text-white mb-2">Every</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Migration needs re-profiling
              </p>
            </app-glass-card>
            <app-glass-card extraClass="p-6 flex flex-col h-full" [glow]="true">
              <div class="dv-feature-icon"><lucide-icon [img]="TrendingDown" [size]="18" /></div>
              <p class="font-display text-2xl font-bold text-white mb-2">Scales</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Poorly with cluster size
              </p>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section id="how-it-works" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div class="overflow-hidden">
            <img
              src="/deeptuner-howitworks.webp"
              alt="Static code analysis workflow producing optimal GPU configurations"
              width="1536" height="1024"
              class="w-full h-auto"
              style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)"
              loading="lazy"
            />
          </div>
          <div>
            <p class="label-caps mb-4">How it works</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Static analysis predicts optimal configs.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              DeepTuner analyzes your GPU kernel code before any execution, extracting memory access patterns, control flow, and instruction mix to predict the most energy-efficient configuration and power cap settings.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              No exhaustive runtime profiling. No O(2ⁿ) benchmark sweep. A one-time microbenchmark per GPU generation is all it needs to accurately predict optimal settings for any kernel.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              Validated across H100, A100, RTX 5000 Ada, and RTX 3070 on multi-head attention, convolution, and matrix multiplication kernels.
            </p>
          </div>
        </div>
      </section>

      <!-- What you get -->
      <section id="outcomes" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">What you get</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Energy savings without sacrificing speed.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              <span class="font-display font-semibold text-on-surface">Up to 50% lower energy consumption</span> per token across training and inference workloads. Your clusters run longer on the same power budget, reducing operational costs.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              <span class="font-display font-semibold text-on-surface">2x throughput gains</span> on multi-head attention kernels. Same hardware, same model, twice the tokens per joule with optimized block shapes and power caps.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              <span class="font-display font-semibold text-on-surface">Zero profiling overhead</span>. Migrate hardware generations or scale clusters without re-running expensive benchmark sweeps. Deploy with confidence on day one.
            </p>
          </div>
          <div class="overflow-hidden">
            <img
              src="/deeptuner-outcomes.webp"
              alt="Optimized GPU showing reduced energy, increased throughput, and efficient memory access"
              width="1536" height="1024"
              class="w-full h-auto"
              style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <!-- Integration -->
      <section id="integration" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">Integration</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Drop-in for CUDA and Triton.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              DeepTuner integrates with your existing kernel development workflow. Analyze kernels, get optimized configs, and deploy with minimal code changes.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              Works seamlessly with both CUDA and Triton kernels through static analysis of intermediate representations, requiring no modifications to your existing codebase.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 auto-rows-fr">
            <app-glass-card extraClass="p-7 h-full">
              <div class="dv-feature-icon"><lucide-icon [img]="Layers" [size]="18" /></div>
              <h4 class="font-display font-semibold text-on-surface mb-2">CUDA kernels</h4>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Analyzes NVPTX intermediate representation. Works with hand-written CUDA or generated code.
              </p>
            </app-glass-card>

            <app-glass-card extraClass="p-7 h-full" [glow]="true">
              <div class="dv-feature-icon"><lucide-icon [img]="Cpu" [size]="18" /></div>
              <h4 class="font-display font-semibold text-on-surface mb-2">Triton kernels</h4>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Extracts from LLVM IR before JIT. Predicts optimal configs per (kernel, GPU) pair.
              </p>
            </app-glass-card>
          </div>
        </div>
      </section>


      <!-- Future Research -->
      <section id="future" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">On the horizon</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Expanding beyond NVIDIA.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              DeepTuner currently runs on NVIDIA GPUs. Work is actively in progress to bring the same intermediate code analysis approach to other hardware targets.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              The core architecture is hardware-agnostic by design, making it possible to extend support to AMD ROCm, Google TPUs, and other accelerators with similar static analysis techniques.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-3 items-center text-center">
              <div class="w-16 h-16 rounded-xl bg-surface-dim border border-border flex items-center justify-center">
                <img src="/model-logos/amd.svg" alt="AMD" class="w-10 h-10 object-contain" style="filter: brightness(0) invert(1)" />
              </div>
              <div>
                <p class="font-display font-semibold text-on-surface mb-1">AMD ROCm</p>
                <span class="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-indigo-soft/10 text-indigo-soft border border-indigo-soft/25">In progress</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 items-center text-center">
              <div class="w-16 h-16 rounded-xl bg-surface-dim border border-border flex items-center justify-center">
                <img src="/model-logos/google.svg" alt="Google" class="w-8 h-8 object-contain" />
              </div>
              <div>
                <p class="font-display font-semibold text-on-surface mb-1">Google TPUs</p>
                <span class="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-indigo-soft/10 text-indigo-soft border border-indigo-soft/25">In progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section id="cta" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <div class="dv-feature-icon mx-auto"><lucide-icon [img]="Sparkles" [size]="22" /></div>
          <h2 class="font-display font-bold text-white text-3xl sm:text-4xl mb-5 max-w-3xl mx-auto leading-tight tracking-tight">
            Join the DeepTuner beta.
          </h2>
          <p class="font-mono text-base text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
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

  readonly Clock = Clock;
  readonly Cpu = Cpu;
  readonly Layers = Layers;
  readonly Server = Server;
  readonly Sparkles = Sparkles;
  readonly TrendingDown = TrendingDown;
  readonly Zap = Zap;

  readonly railSections: RailSection[] = [
    { id: 'hero', label: 'Overview' },
    { id: 'problem', label: 'Problem' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'outcomes', label: 'Benefits' },
    { id: 'integration', label: 'Integration' },
    { id: 'future', label: 'Roadmap' },
    { id: 'cta', label: 'Get access' },
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
