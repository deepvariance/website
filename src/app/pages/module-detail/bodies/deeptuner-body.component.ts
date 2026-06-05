import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

import { CtaButtonComponent } from '../../../components/cta-button';
import { GlassCardComponent } from '../../../components/glass-card';

@Component({
  selector: 'app-module-deeptuner-body',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    CtaButtonComponent,
  ],
  template: `
      <!-- Works alongside -->
      <section class="border-b border-border logo-strip">
        <div class="logo-strip__inner">
          <p class="logo-strip__label">Works alongside</p>
          <div class="logo-strip__logos">
            <img class="logo-strip__logo" src="/pytorch-logo.webp" alt="PyTorch" width="120" height="30" loading="lazy" />
            <img class="logo-strip__logo" src="/vllm-logo.webp" alt="vLLM" width="280" height="80" loading="lazy" />
            <img class="logo-strip__logo" src="/sglang-logo.webp" alt="SGLang" width="262" height="80" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- The problem -->
      <section id="problem" class="page-section py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">The problem</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Runtime profiling is expensive.
            </h2>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-6">
              Traditional kernel tuners require exhaustive runtime profiling across all possible configurations. For production clusters running continuous training, this profiling overhead is paid on every hardware migration and workload change.
            </p>
            <div class="space-y-5">
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant panel-chip mt-0.5">
                  <lucide-icon [img]="Zap" [size]="14" />
                </span>
                <p class="font-body text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">50% energy waste: </span>Unoptimized kernel configs burn energy on unnecessary compute
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant panel-chip mt-0.5">
                  <lucide-icon [img]="Clock" [size]="14" />
                </span>
                <p class="font-body text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">O(2ⁿ) search space: </span>Hours of profiling for n tuning parameters on every hardware change
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant panel-chip mt-0.5">
                  <lucide-icon [img]="TrendingDown" [size]="14" />
                </span>
                <p class="font-body text-sm text-on-surface-variant leading-relaxed">
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
      <section id="how-it-works" class="page-section py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div class="overflow-hidden">
            <img
              src="/deeptuner-howitworks.webp"
              alt="Static code analysis workflow producing optimal GPU configurations"
              width="1536" height="1024"
              class="w-full h-auto dv-img-mask-radial"
              loading="lazy"
            />
          </div>
          <div>
            <p class="label-caps mb-4">How it works</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Static analysis predicts optimal configs.
            </h2>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-5">
              DeepTuner analyzes your GPU kernel code before any execution, extracting memory access patterns, control flow, and instruction mix to predict the most energy-efficient configuration and power cap settings.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-5">
              No exhaustive runtime profiling. No O(2ⁿ) benchmark sweep. A one-time microbenchmark per GPU generation is all it needs to accurately predict optimal settings for any kernel.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed">
              Validated across H100, A100, RTX 5000 Ada, and RTX 3070 on multi-head attention, convolution, and matrix multiplication kernels.
            </p>
          </div>
        </div>
      </section>

      <!-- What you get -->
      <section id="outcomes" class="page-section py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">What you get</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Energy savings without sacrificing speed.
            </h2>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-5">
              <span class="font-display font-semibold text-on-surface">Up to 50% lower energy consumption</span> per token across training and inference workloads. Your clusters run longer on the same power budget, reducing operational costs.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-5">
              <span class="font-display font-semibold text-on-surface">2x throughput gains</span> on multi-head attention kernels. Same hardware, same model, twice the tokens per joule with optimized block shapes and power caps.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed">
              <span class="font-display font-semibold text-on-surface">Zero profiling overhead</span>. Migrate hardware generations or scale clusters without re-running expensive benchmark sweeps. Deploy with confidence on day one.
            </p>
          </div>
          <div class="overflow-hidden">
            <img
              src="/deeptuner-outcomes.webp"
              alt="Optimized GPU showing reduced energy, increased throughput, and efficient memory access"
              width="1536" height="1024"
              class="w-full h-auto dv-img-mask-radial"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <!-- Integration -->
      <section id="integration" class="page-section py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">Integration</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Drop-in for CUDA and Triton.
            </h2>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-5">
              DeepTuner integrates with your existing kernel development workflow. Analyze kernels, get optimized configs, and deploy with minimal code changes.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed">
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
      <section id="future" class="page-section py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="label-caps mb-4">On the horizon</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Expanding beyond NVIDIA.
            </h2>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-5">
              DeepTuner currently runs on NVIDIA GPUs. Work is actively in progress to bring the same intermediate code analysis approach to other hardware targets.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed">
              The core architecture is hardware-agnostic by design, making it possible to extend support to AMD ROCm, Google TPUs, and other accelerators with similar static analysis techniques.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-3 items-center text-center">
              <div class="w-16 h-16 rounded-xl panel-chip flex items-center justify-center">
                <img src="/model-logos/amd.svg" alt="AMD" class="w-10 h-10 object-contain dv-logo-invert" />
              </div>
              <div>
                <p class="font-display font-semibold text-on-surface mb-1">AMD ROCm</p>
                <span class="ui-caption uppercase tracking-[0.16em] text-[9px] px-2 py-0.5 rounded-full panel-pill text-on-surface-variant">In progress</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 items-center text-center">
              <div class="w-16 h-16 rounded-xl panel-chip flex items-center justify-center">
                <img src="/model-logos/google.svg" alt="Google" class="w-8 h-8 object-contain" />
              </div>
              <div>
                <p class="font-display font-semibold text-on-surface mb-1">Google TPUs</p>
                <span class="ui-caption uppercase tracking-[0.16em] text-[9px] px-2 py-0.5 rounded-full panel-pill text-on-surface-variant">In progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section id="cta" class="page-section py-14 md:py-20">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <div class="dv-feature-icon mx-auto"><lucide-icon [img]="Sparkles" [size]="22" /></div>
          <h2 class="font-display font-bold text-white text-3xl sm:text-4xl mb-5 max-w-3xl mx-auto leading-tight tracking-tight">
            Join the DeepTuner beta.
          </h2>
          <p class="font-body text-base text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            We're onboarding HPC teams with active training or inference infrastructure. Tell us
            your hardware setup and we'll scope a pilot.
          </p>
          <app-cta-button variant="primary" routerLink="/get-started" fragment="contact-form">
            Get early access
          </app-cta-button>
        </app-glass-card>
      </section>
  `,
  styles: [`:host { display: block; }`],
})
export class DeeptunerBodyComponent {
  readonly Clock = Clock;
  readonly Cpu = Cpu;
  readonly Layers = Layers;
  readonly Server = Server;
  readonly Sparkles = Sparkles;
  readonly TrendingDown = TrendingDown;
  readonly Zap = Zap;
}
