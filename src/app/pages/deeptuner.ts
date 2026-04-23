import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  ChevronRight,
  BatteryCharging,
  Cpu,
  Layers,
  LucideAngularModule,
  Zap,
} from 'lucide-angular';

@Component({
  selector: 'app-deeptuner',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="relative overflow-hidden">

      <!-- Hero -->
      <div class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"></div>

      <section class="container mx-auto px-6 pt-16 md:pt-24 pb-10 text-center">

        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-8">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Early Access: HPC Inference &amp; Training
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8 max-w-5xl mx-auto">
          Stop guessing<br />
          <span class="text-primary">run configurations.</span>
        </h1>

        <p class="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium leading-relaxed mb-14">
          DeepTuner uses intermediate code analysis to predict energy-efficient run
          configurations before any code runs. Up to 50% less energy
          and 2x throughput gains on multi-head attention kernels, no runtime profiling required.
        </p>

        <!-- Three-stat bar -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden max-w-3xl mx-auto border border-slate-200 mb-12">
          <div class="bg-white px-6 py-6 text-center">
            <p class="text-3xl font-header font-bold text-dark tracking-tight mb-1">Up to 50%</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest">Less energy</p>
          </div>
          <div class="bg-white px-6 py-6 text-center">
            <p class="text-3xl font-header font-bold text-dark tracking-tight mb-1">Up to 2x</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest">Throughput on MHA</p>
          </div>
          <div class="bg-white px-6 py-6 text-center">
            <p class="text-3xl font-header font-bold text-dark tracking-tight mb-1">Up to 70%</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest">Search space saved</p>
          </div>
        </div>

        <a
          routerLink="/pricing"
          fragment="contact-form"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:-translate-y-0.5"
        >
          Request early access
          <lucide-icon [img]="ChevronRight" [size]="16" />
        </a>
      </section>

      <!-- How it works -->
      <section class="bg-slate-50/60 border-y border-slate-100 py-14 md:py-20">
        <div class="container mx-auto px-6">
          <div class="max-w-5xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span class="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block">How DeepTuner works</span>
                <h2 class="text-3xl sm:text-4xl font-header font-bold text-dark tracking-tight mb-6 leading-tight">
                  Static analysis. No runtime overhead.
                </h2>
                <p class="text-slate-500 font-medium leading-relaxed mb-6">
                  Existing kernel tuners require exhaustive runtime profiling: O(2ⁿ)
                  benchmark runs for n configuration parameters. For a production cluster
                  running continuous training, that profiling tax is paid on every hardware
                  migration and workload change.
                </p>
                <p class="text-slate-500 font-medium leading-relaxed mb-6">
                DeepTuner analyzes intermediate GPU code before any execution,
                extracting memory access patterns, control flow, and instruction mix to
                predict the energy-efficient run configuration and GPU power cap. A one-time
                microbenchmark per GPU generation is all it needs.
                </p>
                <p class="text-slate-500 font-medium leading-relaxed">
                  Validated on NVIDIA RTX 5000 Ada (Hopper) and RTX 3070 (Ampere) across
                  multi-head attention, convolution, and matrix multiplication kernels.
                </p>
              </div>

              <div class="space-y-4">
                <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <lucide-icon [img]="Layers" [size]="18" />
                    </div>
                    <h4 class="font-header font-bold text-dark">Intermediate code analysis</h4>
                  </div>
                  <p class="text-slate-500 text-sm font-medium leading-relaxed">
                    Analyzes intermediate GPU code to extract memory locality scores, register pressure, warp
                    divergence, and instruction mix ratios, without launching a single kernel.
                  </p>
                </div>

                <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0">
                      <lucide-icon [img]="Cpu" [size]="18" />
                    </div>
                    <h4 class="font-header font-bold text-dark">Architecture-agnostic calibration</h4>
                  </div>
                  <p class="text-slate-500 text-sm font-medium leading-relaxed">
                    Calibrated once per GPU generation. Optimal kernel configs are predicted
                    without re-profiling when you migrate from Ampere to Hopper or Blackwell.
                  </p>
                </div>

                <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <lucide-icon [img]="BatteryCharging" [size]="18" />
                    </div>
                    <h4 class="font-header font-bold text-dark">Joint shape and power-cap tuning</h4>
                  </div>
                  <p class="text-slate-500 text-sm font-medium leading-relaxed">
                    Jointly tunes run configuration and GPU power cap for minimum energy per
                    token, without sacrificing throughput above 95% of peak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Validation note -->
      <section class="container mx-auto px-6 py-8 md:py-10">
        <div class="max-w-5xl mx-auto">
          <p class="text-center text-sm text-slate-400 font-medium">
            Validated on HPC NVIDIA systems and consumer-grade GPUs.
          </p>
        </div>
      </section>

      <!-- Energy benchmark table -->
      <section class="bg-slate-50/60 border-y border-slate-100 py-14 md:py-20 hidden">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4">
                Energy savings across sequence lengths
              </h2>
              <p class="text-slate-500 max-w-xl mx-auto font-medium">
                DeepTuner results on multi-head attention kernels.
                MHA dominates transformer compute, so gains here propagate through
                every training step and inference call.
              </p>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-100">
                    <th class="text-left px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Seq. Length</th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Power (W)</th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Block Shape</th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Baseline J/tok</th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Optimized J/tok</th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Energy Saved</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of energyRows; track row.seq; let last = $last) {
                    <tr [class.border-b]="!last" class="border-slate-50">
                      <td class="px-6 py-4 font-semibold text-dark">{{ row.seq }}</td>
                      <td class="px-6 py-4 text-right text-slate-500 font-mono text-xs">{{ row.power }}W</td>
                      <td class="px-6 py-4 text-right font-mono text-xs text-slate-500">{{ row.shape }}</td>
                      <td class="px-6 py-4 text-right font-mono text-xs text-slate-500">{{ row.baseline }}</td>
                      <td class="px-6 py-4 text-right font-mono text-xs font-bold text-primary">{{ row.optimized }}</td>
                      <td class="px-6 py-4 text-right">
                        <span
                          class="inline-block px-2.5 py-1 rounded-full text-xs font-extrabold"
                          [class.bg-primary]="row.highlight"
                          [class.text-white]="row.highlight"
                          [class.bg-slate-100]="!row.highlight"
                          [class.text-slate-600]="!row.highlight"
                        >{{ row.saved }}</span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <p class="text-center text-xs text-slate-400 mt-4 font-medium">
              Measured on NVIDIA RTX 5000 Ada (24 GB) with CUDA 12.4. Rounded mean of 10 runs (σ &lt; 5%).
              Baseline is NVIDIA Occupancy Calculator heuristic at 250 W default power.
            </p>
          </div>
        </div>
      </section>

      <!-- Future Research -->
      <section class="container mx-auto px-6 py-14 md:py-20">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-10">
            <span class="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 block">On the horizon</span>
            <h2 class="text-2xl sm:text-3xl font-header font-bold text-dark tracking-tight mb-3">
              Expanding beyond NVIDIA
            </h2>
            <p class="text-slate-500 font-medium max-w-xl mx-auto">
              DeepTuner currently runs on NVIDIA GPUs. Work is underway to bring the same
              intermediate code analysis approach to other hardware targets.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                <lucide-icon [img]="Cpu" [size]="20" />
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-header font-bold text-dark">AMD ROCm</h4>
                  <span class="text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded-full">In research</span>
                </div>
                <p class="text-slate-500 text-sm font-medium leading-relaxed">
                  Porting the intermediate code analysis pipeline to AMD's ROCm stack and CDNA architecture.
                  Coming soon.
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                <lucide-icon [img]="Layers" [size]="20" />
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-header font-bold text-dark">Google TPUs</h4>
                  <span class="text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded-full">In research</span>
                </div>
                <p class="text-slate-500 text-sm font-medium leading-relaxed">
                  Adapting energy-aware run configuration search to XLA's compilation model
                  for TPU v4 and v5 workloads. Coming soon.
                </p>
              </div>
            </div>
          </div>

          <p class="text-center text-xs text-slate-400 mt-6 font-medium">
            * DeepTuner is architecture-agnostic in principle. Production support is currently NVIDIA-only.
          </p>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section class="container mx-auto px-6 py-14 md:py-20 text-center">
        <div class="max-w-xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-header font-bold text-dark mb-4 tracking-tight">
            Join the DeepTuner beta
          </h2>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            We're onboarding HPC teams with active training or inference infrastructure.
            Tell us your hardware setup and we'll scope a pilot.
          </p>
          <a
            routerLink="/pricing"
            fragment="contact-form"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get early access
            <lucide-icon [img]="ChevronRight" [size]="16" />
          </a>
        </div>
      </section>

    </div>
  `,
})
export class DeepTunerPageComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  readonly ChevronRight = ChevronRight;
  readonly BatteryCharging = BatteryCharging;
  readonly Layers = Layers;
  readonly Cpu = Cpu;
  readonly Zap = Zap;

  readonly energyRows = [
    { seq: '256',  power: 100, shape: '2x32',  baseline: '5.03x10⁻⁶', optimized: '1.63x10⁻⁶', saved: '-67.5%', highlight: false },
    { seq: '512',  power: 100, shape: '2x32',  baseline: '3.87x10⁻⁶', optimized: '0.88x10⁻⁶', saved: '-78.9%', highlight: true  },
    { seq: '1024', power: 100, shape: '2x32',  baseline: '1.25x10⁻⁶', optimized: '0.41x10⁻⁶', saved: '-67.4%', highlight: false },
    { seq: '2048', power: 165, shape: '4x16',  baseline: '0.25x10⁻⁶', optimized: '0.12x10⁻⁶', saved: '-22.3%', highlight: false },
    { seq: '4096', power: 100, shape: '2x32',  baseline: '0.40x10⁻⁶', optimized: '0.12x10⁻⁶', saved: '-74.7%', highlight: true  },
    { seq: '8192', power: 100, shape: '2x32',  baseline: '0.08x10⁻⁶', optimized: '0.06x10⁻⁶', saved: '-38.5%', highlight: false },
  ];

  constructor() {
    this.title.setTitle('DeepTuner | Deep Variance');
    const desc = 'DeepTuner uses intermediate code analysis to predict energy-efficient GPU kernel configurations without runtime profiling. Up to 50% less energy and 2x throughput gains on MHA kernels.';
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: 'DeepTuner | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/deeptuner' });
    this.meta.updateTag({ name: 'twitter:title', content: 'DeepTuner | Deep Variance' });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.setCanonical('https://deepvariance.com/deeptuner');
  }

  private setCanonical(url: string) {
    let el = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }
}
