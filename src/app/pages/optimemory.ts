import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CircleCheck,
  Copy,
  Database,
  ExternalLink,
  FileText,
  LucideAngularModule,
  RefreshCw,
} from 'lucide-angular';

@Component({
  selector: 'app-optimemory',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="relative overflow-hidden">
      <!-- Grid and Blur Background -->
      <div
        class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      ></div>
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-20"
      ></div>

      <!-- Hero Section -->
      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-16 text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 text-[11px] font-bold uppercase tracking-wider mb-8 animate-fade-in"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            ></span>
          </span>
          Optimemory - Now available for usage. Try out python package.
        </div>

        <h1
          class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto"
        >
          Optimemory: Hardware-aware
          <span class="text-emerald-500">memory virtualization</span>.
        </h1>

        <p
          class="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Unlock 2.5x more efficient model weights with research-backed virtual
          memory stitching. A specialized VMM layer that optimizes memory
          allocation across fragmented hardware.
        </p>

        <!-- CTA buttons temporarily hidden
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button class="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 text-white font-semibold text-base hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200/50 hover:-translate-y-0.5 active:translate-y-0">
            Start Optimizing
          </button>
          <button class="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-dark font-semibold text-base border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50">
            View Paper
          </button>
        </div>
        -->

        <div
          class="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm mb-12 shadow-sm"
        >
          <span class="text-slate-400 select-none">$&nbsp;</span>
          <span class="select-all"
            ><span class="text-emerald-600">pip install </span
            ><span class="text-slate-700">deep-variance</span></span
          >
          <button
            (click)="copyPip()"
            class="ml-2 transition-colors"
            [class.text-emerald-500]="pipCopied()"
            [class.text-slate-400]="!pipCopied()"
            title="Copy"
          >
            @if (pipCopied()) {
              <lucide-icon [img]="CircleCheck" [size]="16" />
            } @else {
              <lucide-icon [img]="Copy" [size]="16" />
            }
          </button>
          <a
            href="https://pypi.org/project/deep-variance/"
            target="_blank"
            rel="noopener"
            class="text-slate-400 hover:text-slate-700 transition-colors"
            title="View on PyPI"
          >
            <lucide-icon [img]="ExternalLink" [size]="16" />
          </a>
        </div>

        <!-- Memory Stats -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-12 border-t border-slate-100"
        >
          <div class="space-y-1">
            <p class="text-4xl font-header font-bold text-dark">2.5x</p>
            <p class="text-sm text-slate-500 font-medium">
              Model scale increase
            </p>
          </div>
          <div
            class="space-y-1 border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0"
          >
            <p class="text-4xl font-header font-bold text-dark">-65%</p>
            <p class="text-sm text-slate-500 font-medium">
              Memory allocation overhead reduced
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-4xl font-header font-bold text-dark">+42%</p>
            <p class="text-sm text-slate-500 font-medium">
              Training stability uplift
            </p>
          </div>
        </div>
      </section>

      <!-- How it Works -->
      <section
        class="container mx-auto px-6 py-12 md:py-20 bg-slate-50/50 rounded-[2rem] md:rounded-[3rem] border border-slate-100"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          <div>
            <h2
              class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-8 tracking-tight"
            >
              Virtualizing Memory for the Transformer Era
            </h2>
            <p class="text-slate-500 text-lg mb-12 font-medium">
              Transformers are memory-bound. Optimemory decouples physical
              hardware limitations from model capacity using intelligent paging
              and tiered storage.
            </p>

            <div class="space-y-8">
              <div class="flex gap-6">
                <div
                  class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0"
                >
                  <lucide-icon [img]="FileText" [size]="24" />
                </div>
                <div>
                  <h4 class="text-xl font-header font-bold mb-2">
                    VMM Stitching Layer
                  </h4>
                  <p class="text-slate-500 text-sm font-medium">
                    Research-backed virtual memory stitching that presents
                    fragmented physical VRAM as a contiguous address space.
                  </p>
                </div>
              </div>
              <div class="flex gap-6">
                <div
                  class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0"
                >
                  <lucide-icon [img]="RefreshCw" [size]="24" />
                </div>
                <div>
                  <h4 class="text-xl font-header font-bold mb-2">
                    Physical Memory Pooling
                  </h4>
                  <p class="text-slate-500 text-sm font-medium">
                    Pool and reuse freed physical VRAM chunks across training
                    steps, eliminating repeated allocation overhead without
                    stalling compute kernels.
                  </p>
                </div>
              </div>
              <div class="flex gap-6">
                <div
                  class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0"
                >
                  <lucide-icon [img]="Database" [size]="24" />
                </div>
                <div>
                  <h4 class="text-xl font-header font-bold mb-2">
                    Hardware-Aware Fragmenting
                  </h4>
                  <p class="text-slate-500 text-sm font-medium">
                    Queries the CUDA driver for hardware-specific allocation
                    granularity and aligns chunk sizes accordingly, validated on
                    NVIDIA H100 and A100.
                  </p>
                </div>
              </div>
            </div>

            <!-- Upcoming & Research -->
            <div class="mt-16 space-y-4">
              <div
                class="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between gap-6"
              >
                <div>
                  <h5 class="text-sm font-bold text-dark mb-1">
                    Upcoming in v2.4
                  </h5>
                  <p class="text-xs text-slate-500 font-medium">
                    Native FP8 quantization and weight optimization kernels.
                  </p>
                </div>
                <a
                  routerLink="/llm-tuner"
                  class="text-xs font-bold text-emerald-600 hover:text-emerald-700 whitespace-nowrap"
                  >Learn More &rarr;</a
                >
              </div>

              <div
                class="p-6 rounded-2xl bg-slate-100/50 border border-slate-200/50"
              >
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="px-2 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-extrabold rounded-full uppercase tracking-tighter"
                    >Research</span
                  >
                  <h5 class="text-sm font-bold text-dark">
                    Multi-GPU & NVlink Support
                  </h5>
                </div>
                <p class="text-xs text-slate-500 font-medium">
                  We are currently researching cross-GPU virtual address space
                  stitching via high-speed NVlink interconnects.
                </p>
              </div>
            </div>
          </div>

          <div class="relative group">
            <div
              class="absolute -inset-1 bg-emerald-500/20 blur opacity-25 group-hover:opacity-50 transition duration-1000"
            ></div>
            <div
              class="relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl"
            >
              <div class="space-y-6">
                <div class="flex justify-between items-end">
                  <div class="space-y-2">
                    <span
                      class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                      >Memory Efficiency</span
                    >
                    <p class="text-2xl font-header font-bold text-dark">
                      Malloc Master: Active
                    </p>
                  </div>
                  <span class="text-emerald-500 font-bold font-header text-3xl"
                    >98.4%</span
                  >
                </div>
                <div
                  class="h-24 bg-slate-50 rounded-xl overflow-hidden relative border border-slate-100"
                >
                  <div class="absolute inset-0 flex items-end">
                    <div class="h-full bg-emerald-500/20 w-[15%]"></div>
                    <div class="h-full bg-emerald-500/40 w-[20%]"></div>
                    <div class="h-full bg-emerald-500 w-[10%]"></div>
                    <div class="h-full bg-emerald-600 w-[15%]"></div>
                    <div class="h-full bg-emerald-400 w-[40%]"></div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="p-4 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span
                      class="block text-[10px] font-bold text-slate-400 uppercase mb-1"
                      >Reclaimed</span
                    >
                    <p class="text-lg font-bold font-header text-emerald-600">
                      42.2 GB
                    </p>
                  </div>
                  <div
                    class="p-4 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span
                      class="block text-[10px] font-bold text-slate-400 uppercase mb-1"
                      >Utilization</span
                    >
                    <p class="text-lg font-bold font-header text-dark">99.1%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="container mx-auto px-6 py-20">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2
              class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-8 tracking-tight"
            >
              Drop-in integration
            </h2>
            <p class="text-slate-500 text-base sm:text-lg mb-8 font-medium">
              Replace standard tensor allocation with a single call. No changes
              to your training loop required.
            </p>

            <div class="space-y-6">
              <div class="flex gap-4">
                <div
                  class="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-bold flex-shrink-0"
                >
                  1
                </div>
                <p class="text-slate-600 text-sm font-medium">
                  Install via pip:
                  <code class="bg-slate-100 px-2 py-0.5 rounded text-dark"
                    >deep-variance</code
                  >
                </p>
              </div>
              <div class="flex gap-4">
                <div
                  class="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-bold flex-shrink-0"
                >
                  2
                </div>
                <p class="text-slate-600 text-sm font-medium">
                  Pre-allocate a reusable GPU buffer once with
                  <code class="bg-slate-100 px-2 py-0.5 rounded text-dark"
                    >vmm_empty_nd</code
                  >, backed by physical CUDA memory pooling
                </p>
              </div>
              <div class="flex gap-4">
                <div
                  class="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-bold flex-shrink-0"
                >
                  3
                </div>
                <p class="text-slate-600 text-sm font-medium">
                  Copy into the buffer each step with zero allocation overhead.
                  Inspect pool health anytime via
                  <code class="bg-slate-100 px-2 py-0.5 rounded text-dark"
                    >cache_stats()</code
                  >
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-dark rounded-[2rem] p-1 shadow-2xl shadow-emerald-500/10"
          >
            <div class="bg-slate-900 rounded-[1.8rem] overflow-hidden">
              <div
                class="flex items-center gap-1.5 px-6 py-4 border-b border-white/5"
              >
                <div
                  class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"
                ></div>
                <div
                  class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"
                ></div>
                <div
                  class="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"
                ></div>
                <span
                  class="ml-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest"
                  >train.py</span
                >
              </div>
              <div class="p-8 font-mono text-sm leading-relaxed">
                <pre
                  class="text-slate-400"
                ><span class="text-emerald-400">from</span> deep_variance <span class="text-emerald-400">import</span> vmm_empty_nd, cache_stats
<span class="text-emerald-400">import</span> torch

<span class="text-slate-500"># Pre-allocate a reusable GPU buffer once</span>
img_buf = vmm_empty_nd(
    (batch_size, <span class="text-amber-400">3</span>, <span class="text-amber-400">224</span>, <span class="text-amber-400">224</span>),
    dtype=torch.float32
)

<span class="text-slate-500"># Reuse across every training step, zero overhead</span>
<span class="text-emerald-400">for</span> imgs, labels <span class="text-emerald-400">in</span> dataloader:
    img_buf.copy_(imgs.cuda(non_blocking=<span class="text-amber-400">True</span>))

<span class="text-emerald-400">print</span>(cache_stats())</pre>
              </div>
              <div
                class="px-8 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between"
              >
                <span
                  class="text-[10px] font-bold text-slate-500 tracking-widest uppercase"
                  >Console Output</span
                >
                <span
                  class="text-[10px] font-bold text-emerald-400 tracking-widest uppercase"
                  >dev0: free_chunks: 12 | bytes_in_pool: 24.0 MB</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section
        class="container mx-auto px-6 pt-12 md:pt-16 pb-6 md:pb-10 text-center"
      >
        <div
          class="max-w-4xl mx-auto p-8 sm:p-12 md:p-24 rounded-[2rem] md:rounded-[3rem] bg-slate-50 border border-slate-100 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"
          ></div>
          <h2
            class="text-3xl sm:text-4xl md:text-6xl font-header font-bold text-dark mb-8 tracking-tight"
          >
            Run massive models on the hardware you already have.
          </h2>
          <p class="text-slate-500 text-lg mb-12 max-w-xl mx-auto font-medium">
            Drop Optimemory into your training loop and reclaim VRAM you're
            already paying for.
          </p>
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              routerLink="/pricing"
              fragment="contact-form"
              class="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 text-white font-semibold text-base hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200/50 text-center"
            >
              Talk to our team
            </a>
            <a
              href="https://pypi.org/project/deep-variance/"
              target="_blank"
              rel="noopener"
              class="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-dark font-semibold text-base border border-slate-200 hover:border-slate-300 transition-all text-center"
            >
              View on PyPI
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class OptimemoryPageComponent {
  readonly Copy = Copy;
  readonly CircleCheck = CircleCheck;
  readonly ExternalLink = ExternalLink;

  pipCopied = signal(false);

  copyPip() {
    navigator.clipboard.writeText('pip install deep-variance');
    this.pipCopied.set(true);
    setTimeout(() => this.pipCopied.set(false), 1500);
  }
  readonly FileText = FileText;
  readonly RefreshCw = RefreshCw;
  readonly Database = Database;
}
