import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Activity,
  Brain,
  Eye,
  Layers,
  LucideAngularModule,
  Network,
  Package,
  Server,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-angular';

import { CodeWindowComponent } from '../components/code-window';
import { CommandRowComponent } from '../components/command-row';
import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { SectionHeaderComponent } from '../components/section-header';
import {
  RailSection,
  SectionRailComponent,
} from '../components/section-rail';
import { StatusPillComponent } from '../components/status-pill';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-optimemory',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    SectionHeaderComponent,
    CtaButtonComponent,
    CodeWindowComponent,
    CommandRowComponent,
    SectionRailComponent,
    StatusPillComponent,
  ],
  template: `
    <div class="relative overflow-x-hidden">
      <app-section-rail [sections]="railSections" ariaLabel="Optimemory section navigation" />

      <!-- ── Hero ─────────────────────────────────────────────────────── -->
      <section id="hero" class="relative border-b border-border overflow-hidden">
        <div class="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          <!-- Desktop: abstract memory convergence image, absolute right, mix-blend-mode:screen -->
          <div class="hidden desk:block absolute inset-y-0 right-0 w-[54%] pointer-events-none select-none">
            <img
              src="/optimemory-hero-v2.webp"
              alt=""
              width="1536" height="1024"
              fetchpriority="high"
              class="w-full h-full object-contain object-right"
              style="mix-blend-mode:screen;mask-image:linear-gradient(to right,transparent 0%,black 14%,black 78%,transparent 100%),linear-gradient(to bottom,black 0%,black 82%,transparent 100%);mask-composite:intersect;-webkit-mask-image:linear-gradient(to right,transparent 0%,black 14%,black 78%,transparent 100%),linear-gradient(to bottom,black 0%,black 82%,transparent 100%);-webkit-mask-composite:source-in"
            />
          </div>

          <!-- Mobile: full-width image above text -->
          <div class="desk:hidden pt-16 -mx-6">
            <img
              src="/optimemory-hero-v2.webp"
              alt=""
              width="1536" height="1024"
              class="w-full"
              style="mix-blend-mode:screen;opacity:0.85"
            />
          </div>

          <!-- Hero text -->
          <div class="w-full desk:max-w-[560px] pt-6 desk:pt-32 pb-8 desk:pb-16">
            <div class="mb-7">
              <app-status-pill variant="live">Optimemory · v1 available</app-status-pill>
            </div>

            <h1 class="font-display font-bold tracking-tight text-white text-[2.4rem] sm:text-5xl desk:text-[3.2rem] leading-[1.06] mb-5">
              You're running <span class="whitespace-nowrap">out of VRAM.</span><br/>
              <span class="text-on-surface">The hardware isn't.</span>
            </h1>

            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-6 desk:max-w-lg">
              Every AI team hits the same wall: the dashboard shows 95% memory utilization, but the next allocation fails anyway. That memory is fragmented into gaps the allocator can't reassemble. Optimemory closes that gap automatically, on every job, without touching your code.
            </p>

            <div class="flex items-baseline gap-3 mt-2">
              <span class="font-mono text-xs uppercase tracking-[0.18em]" style="color:#8a8a8a">up to</span>
              <span class="font-display text-5xl font-bold text-white leading-none">65%</span>
              <span class="font-mono text-xs uppercase tracking-[0.14em]" style="color:#a3a3a3">VRAM recovered</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Framework strip ──────────────────────────────────────────── -->
      <section class="border-b border-border">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-10 py-4 flex flex-col desk:flex-row desk:items-center gap-3 desk:gap-8">
          <p class="font-mono text-[10px] uppercase tracking-[0.22em]" style="color:#8a8a8a">Built for</p>
          <div class="flex flex-wrap items-center gap-4 sm:gap-6">
            @for (tool of tools; track tool.name) {
              <img [src]="tool.imgSrc" [alt]="tool.name" [width]="tool.imgWidth" [height]="tool.imgHeight"
                   style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
            }
          </div>
        </div>
      </section>

      <!-- ── The hidden cost ───────────────────────────────────────────── -->
      <section id="problem" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          <!-- Left: explanatory text -->
          <div class="order-1 lg:order-1">
            <p class="label-caps mb-4">The hidden cost</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Buying more GPUs is the obvious answer. It's rarely the right one.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-4">
              Up to 40% of the memory on your current hardware is available but unreachable, fragmented across allocations your framework discarded but never fully recovered. Your utilization dashboard shows 95% efficiency. It's measuring the wrong thing.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              That memory is still on your invoice. Every OOM crash, every model downsize, every "we need more hardware" conversation is this problem in disguise. Optimemory makes that memory reachable again with no new hardware required.
            </p>
          </div>

          <!-- Right: outcome bullets -->
          <div class="space-y-4 order-2 lg:order-2">
            <div class="rounded-xl border border-border p-6 flex gap-5 items-start">
              <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="TrendingUp" [size]="18" /></div>
              <p class="font-mono text-sm text-on-surface-variant leading-relaxed">Teams blocked on model scaling ship on the cluster they already operate. No hardware procurement.</p>
            </div>
            <div class="rounded-xl border border-border p-6 flex gap-5 items-start">
              <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="Sparkles" [size]="18" /></div>
              <p class="font-mono text-sm text-on-surface-variant leading-relaxed">40–60% fewer GPUs to serve the same inference load. Clusters that over-provision for memory right-size immediately.</p>
            </div>
            <div class="rounded-xl border border-border p-6 flex gap-5 items-start">
              <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="Zap" [size]="18" /></div>
              <p class="font-mono text-sm text-on-surface-variant leading-relaxed">8–16x larger batch sizes on the same card. Jobs that crashed at batch_size=1 run at practical scale today.</p>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Under the hood ────────────────────────────────────────────── -->
      <section id="architecture" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <!-- Left: combined architecture diagram -->
          <div>
            <app-glass-card variant="strong" rounded="2xl" extraClass="p-6 md:p-7" [glow]="true">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <p class="label-caps mb-1">Memory Efficiency</p>
                  <p class="font-display text-lg font-semibold text-on-surface">VMM Stitching · Active</p>
                </div>
                <p class="font-display text-3xl font-bold text-white">up to 65%</p>
              </div>
              <div class="rounded-xl overflow-hidden mb-5">
                <img
                  src="/optimemory-arch.webp"
                  alt="Top: fragmented VRAM pages with OOM risk. Bottom: Optimemory stitches them into one contiguous virtual pool."
                  width="1536" height="1024"
                  class="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-md bg-black/20 border border-white/5 px-4 py-3">
                  <p class="label-caps mb-1">Recovered</p>
                  <p class="font-display text-xl font-bold text-white">up to 65%</p>
                </div>
                <div class="rounded-md bg-black/20 border border-white/5 px-4 py-3">
                  <p class="label-caps mb-1">Utilization</p>
                  <p class="font-display text-xl font-bold text-on-surface">up to 99%</p>
                </div>
              </div>
            </app-glass-card>
          </div>

          <!-- Right: narrative -->
          <div>
            <p class="label-caps mb-4">Under the hood</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              How memory gets reclaimed.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              When a framework frees a tensor, the physical memory pages don't fully return. They fragment into gaps the allocator can't reassemble. Over thousands of training steps, these gaps compound silently. Your dashboard reports healthy utilization. Your jobs still crash.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              Optimemory intercepts at the driver layer, pools the freed pages, and stitches them into a single contiguous block your model treats as fresh VRAM. No change to your model, optimizer, or training loop. The reclaimed memory appears from the first job.
            </p>
          </div>

        </div>
      </section>

      <!-- ── What you can now run ──────────────────────────────────────── -->
      <section id="workloads" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <app-section-header
          eyebrow="What you can now run"
          subhead="These workloads hit a wall before Optimemory. The wall was software, not hardware."
        >
          Models that didn't fit. <span class="text-white">Now they do.</span>
        </app-section-header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Brain" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-1">LLM Pre-training</h4>
            <p class="label-mono mb-4">LLaMA, Mistral, Megatron</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              Run LLaMA-70B on a single H100 with no tensor parallelism and no NVLink required.
            </p>
            <div class="mt-4 pt-3 border-t border-border">
              <span class="font-mono text-[10px] font-semibold" style="color:#9d6fff">2x GPU reduction</span>
            </div>
          </app-glass-card>

          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Eye" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-1">Image Generation</h4>
            <p class="label-mono mb-4">FLUX, DiT, Stable Diffusion</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              Full-resolution FLUX at full batch size with no gradient checkpointing, same 24 GB card.
            </p>
            <div class="mt-4 pt-3 border-t border-border">
              <span class="font-mono text-[10px] font-semibold" style="color:#9d6fff">larger batch, same card</span>
            </div>
          </app-glass-card>

          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Activity" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-1">Inference Serving</h4>
            <p class="label-mono mb-4">vLLM, TensorRT, ResNet</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              Every batch served from pre-allocated VMM slots. Cold-start latency spikes eliminated.
            </p>
            <div class="mt-4 pt-3 border-t border-border">
              <span class="font-mono text-[10px] font-semibold" style="color:#9d6fff">near-zero allocation overhead</span>
            </div>
          </app-glass-card>

          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Layers" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-1">Fine-tuning</h4>
            <p class="label-mono mb-4">LoRA, QLoRA, full fine-tune</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">
              13B models at batch_size=8 on the same RTX 4090 that previously crashed at batch_size=1.
            </p>
            <div class="mt-4 pt-3 border-t border-border">
              <span class="font-mono text-[10px] font-semibold" style="color:#9d6fff">8x batch size increase</span>
            </div>
          </app-glass-card>

        </div>
      </section>

      <!-- ── Code example ──────────────────────────────────────────────── -->
      <section id="code" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          <!-- Left: code window -->
          <div class="lg:col-span-7">
            <app-code-window
              filename="train.py"
              language="Python"
              outputLabel="dev0"
              output="free_chunks: 12 · bytes_in_pool: 24.0 MB"
            >
<pre class="text-on-surface-variant"><span class="text-white">from</span> deep_variance <span class="text-white">import</span> vmm_empty_nd, cache_stats
<span class="text-white">import</span> torch

<span class="text-outline"># Pre-allocate a reusable GPU buffer once</span>
img_buf = vmm_empty_nd(
    (batch_size, <span class="text-amber-300">3</span>, <span class="text-amber-300">224</span>, <span class="text-amber-300">224</span>),
    dtype=torch.float32
)

<span class="text-outline"># Reuse across every training step, zero overhead</span>
<span class="text-white">for</span> imgs, labels <span class="text-white">in</span> dataloader:
    img_buf.copy_(imgs.cuda(non_blocking=<span class="text-amber-300">True</span>))

<span class="text-white">print</span>(cache_stats())</pre>
            </app-code-window>
          </div>

          <!-- Right: header + command + 2x2 step cards -->
          <div class="lg:col-span-5">
            <span class="label-caps mb-4 inline-block">Drop-in integration</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-4xl leading-tight mb-6">
              Replace one allocator. <span class="text-white">Keep your training loop.</span>
            </h2>
            <div class="mb-8">
              <app-command-row
                command="pip install deep-variance"
                linkLabel="View on PyPI"
                href="https://pypi.org/project/deep-variance/"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl border border-border p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">1</span>
                <p class="font-mono text-xs text-on-surface-variant leading-relaxed">One pip install. No compiler, no build tools.</p>
              </div>
              <div class="rounded-xl border border-border p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">2</span>
                <p class="font-mono text-xs text-on-surface-variant leading-relaxed">Call vmm_empty_nd once. Pages from the driver pool.</p>
              </div>
              <div class="rounded-xl border border-border p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">3</span>
                <p class="font-mono text-xs text-on-surface-variant leading-relaxed">Copy into the buffer every step. Zero overhead.</p>
              </div>
              <div class="rounded-xl border border-border p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">4</span>
                <p class="font-mono text-xs text-on-surface-variant leading-relaxed">cache_stats() shows pool health live.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Compatibility ─────────────────────────────────────────────── -->
      <section id="compatibility" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <app-section-header
          eyebrow="Compatibility"
          subhead="Validated on major HPC infrastructure. Available for Windows and Linux as a standalone package or as part of Deep Variance's optimization stack."
        >
          One package. <span class="text-white">Any cluster.</span>
        </app-section-header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Server" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">HPC Clusters</h4>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Validated on Perlmutter, Summit, and AWS P4d. Drops into any cluster job with no reconfiguration.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Package" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Windows and Linux</h4>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Pre-compiled wheels for both platforms. One pip install, no compiler, no build toolchain, no version pinning.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Network" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Distributed Training</h4>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Works across DDP, FSDP, and tensor parallel setups. Each process manages its own pool with no cross-rank coordination.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Shield" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">CUDA + AMD</h4>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Primary support for CUDA 12 on NVIDIA hardware. AMD ROCm support is currently in alpha.</p>
          </app-glass-card>
        </div>
      </section>

      <!-- ── Bottom CTA ────────────────────────────────────────────────── -->
      <section id="cta" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Run massive models on the <span class="text-white">hardware you already have</span>.
          </h2>
          <p class="font-mono text-sm text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed">
            Drop Optimemory into your training loop and reclaim VRAM you're already paying for.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <app-cta-button variant="primary" routerLink="/pricing" fragment="contact-form">Talk to our team</app-cta-button>
            <app-cta-button variant="glass" href="https://pypi.org/project/deep-variance/" [external]="true">View on PyPI</app-cta-button>
          </div>
        </app-glass-card>
      </section>

    </div>
  `,
  styles: [
    `
      :host { display: block; }

      .dv-feature-icon {
        display: inline-flex; align-items: center; justify-content: center;
        width: 44px; height: 44px; border-radius: 0.5rem; margin-bottom: 1.1rem;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
        color: #9d6fff;
      }

      .dv-outcome-icon {
        display: inline-flex; align-items: center; justify-content: center;
        width: 36px; height: 36px; border-radius: 0.5rem; flex-shrink: 0;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
        color: #9d6fff;
      }

      .dv-step {
        display: inline-flex; align-items: center; justify-content: center;
        width: 28px; height: 28px; flex-shrink: 0; border-radius: 9999px;
        font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600;
        background: rgba(157, 111, 255, 0.08); color: #c4b5fd;
        border: 1px solid rgba(157, 111, 255, 0.3);
      }
    `,
  ],
})
export class OptimemoryPageComponent {
  private readonly seo = inject(SeoService);

  readonly Brain = Brain;
  readonly Eye = Eye;
  readonly Activity = Activity;
  readonly Layers = Layers;
  readonly Network = Network;
  readonly Shield = Shield;
  readonly Package = Package;
  readonly Server = Server;
  readonly TrendingUp = TrendingUp;
  readonly Sparkles = Sparkles;
  readonly Zap = Zap;
  readonly heroStats = [
    { value: '65%', qualifier: 'up to', label: 'VRAM recovered', highlight: true },
  ];

  readonly railSections: RailSection[] = [
    { id: 'hero',          label: 'Overview' },
    { id: 'problem',       label: 'The cost' },
    { id: 'architecture',  label: 'How it works' },
    { id: 'workloads',     label: 'Workloads' },
    { id: 'code',          label: 'Integration' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'cta',           label: 'Get in touch' },
  ];

  readonly tools = [
    { name: 'PyTorch',    imgSrc: '/pytorch-logo.webp',    imgWidth: 324, imgHeight: 80 },
    { name: 'TensorFlow', imgSrc: '/tensorflow-logo.webp', imgWidth: 410, imgHeight: 80 },
    { name: 'vLLM',       imgSrc: '/vllm-logo.webp',       imgWidth: 280, imgHeight: 80 },
    { name: 'SGLang',     imgSrc: '/sglang-logo.webp',     imgWidth: 262, imgHeight: 80 },
  ];


  constructor() {
    this.seo.set({
      title: 'Optimemory | Deep Variance',
      description:
        'Optimemory reclaims fragmented VRAM your framework can\'t reach, letting you run larger models and bigger batches on the hardware you already own.',
      path: '/optimemory',
    });
  }
}
