import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

import { CodeWindowComponent } from '../../../components/code-window';
import { CommandRowComponent } from '../../../components/command-row';
import { CtaButtonComponent } from '../../../components/cta-button';
import { GlassCardComponent } from '../../../components/glass-card';
import { SectionHeaderComponent } from '../../../components/section-header';

@Component({
  selector: 'app-module-optimemory-body',
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
  ],
  template: `
      <!-- ── The hidden cost ───────────────────────────────────────────── -->
      <section id="problem" class="page-section py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          <!-- Left: explanatory text -->
          <div class="order-1 lg:order-1">
            <p class="label-caps mb-4">The hidden cost</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Buying more GPUs is the obvious answer. It's rarely the right one.
            </h2>
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-4">
              Up to 40% of the memory on your current hardware is available but unreachable, fragmented across allocations your framework discarded but never fully recovered. Your utilization dashboard shows 95% efficiency. It's measuring the wrong thing.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed">
              That memory is still on your invoice. Every OOM crash, every model downsize, every "we need more hardware" conversation is this problem in disguise. Optimemory makes that memory reachable again with no new hardware required.
            </p>
          </div>

          <!-- Right: outcome bullets -->
          <div class="space-y-4 order-2 lg:order-2">
            <div class="panel-box rounded-xl p-6 flex gap-5 items-start">
              <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="TrendingUp" [size]="18" /></div>
              <p class="font-body text-sm text-on-surface-variant leading-relaxed">Teams blocked on model scaling ship on the cluster they already operate. No hardware procurement.</p>
            </div>
            <div class="panel-box rounded-xl p-6 flex gap-5 items-start">
              <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="Sparkles" [size]="18" /></div>
              <p class="font-body text-sm text-on-surface-variant leading-relaxed">40–60% fewer GPUs to serve the same inference load. Clusters that over-provision for memory right-size immediately.</p>
            </div>
            <div class="panel-box rounded-xl p-6 flex gap-5 items-start">
              <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="Zap" [size]="18" /></div>
              <p class="font-body text-sm text-on-surface-variant leading-relaxed">8–16x larger batch sizes on the same card. Jobs that crashed at batch_size=1 run at practical scale today.</p>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Under the hood ────────────────────────────────────────────── -->
      <section id="architecture" class="page-section py-14 md:py-20 border-b border-border">
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
                <div class="rounded-md panel-box px-4 py-3">
                  <p class="label-caps mb-1">Recovered</p>
                  <p class="font-display text-xl font-bold text-white">up to 65%</p>
                </div>
                <div class="rounded-md panel-box px-4 py-3">
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
            <p class="font-body text-base text-on-surface-variant leading-relaxed mb-5">
              When a framework frees a tensor, the physical memory pages don't fully return. They fragment into gaps the allocator can't reassemble. Over thousands of training steps, these gaps compound silently. Your dashboard reports healthy utilization. Your jobs still crash.
            </p>
            <p class="font-body text-base text-on-surface-variant leading-relaxed">
              Optimemory intercepts at the driver layer, pools the freed pages, and stitches them into a single contiguous block your model treats as fresh VRAM. No change to your model, optimizer, or training loop. The reclaimed memory appears from the first job.
            </p>
          </div>

        </div>
      </section>

      <!-- ── What you can now run ──────────────────────────────────────── -->
      <section id="workloads" class="page-section py-14 md:py-20 border-b border-border">
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
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">
              Run LLaMA-70B on a single H100 with no tensor parallelism and no NVLink required.
            </p>
            <div class="mt-4 pt-3 panel-divider-t">
              <span class="ui-caption font-semibold text-on-surface-variant">2x GPU reduction</span>
            </div>
          </app-glass-card>

          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Eye" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-1">Image Generation</h4>
            <p class="label-mono mb-4">FLUX, DiT, Stable Diffusion</p>
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">
              Full-resolution FLUX at full batch size with no gradient checkpointing, same 24 GB card.
            </p>
            <div class="mt-4 pt-3 panel-divider-t">
              <span class="ui-caption font-semibold text-on-surface-variant">larger batch, same card</span>
            </div>
          </app-glass-card>

          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Activity" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-1">Inference Serving</h4>
            <p class="label-mono mb-4">vLLM, TensorRT, ResNet</p>
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">
              Every batch served from pre-allocated VMM slots. Cold-start latency spikes eliminated.
            </p>
            <div class="mt-4 pt-3 panel-divider-t">
              <span class="ui-caption font-semibold text-on-surface-variant">near-zero allocation overhead</span>
            </div>
          </app-glass-card>

          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Layers" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-1">Fine-tuning</h4>
            <p class="label-mono mb-4">LoRA, QLoRA, full fine-tune</p>
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">
              13B models at batch_size=8 on the same RTX 4090 that previously crashed at batch_size=1.
            </p>
            <div class="mt-4 pt-3 panel-divider-t">
              <span class="ui-caption font-semibold text-on-surface-variant">8x batch size increase</span>
            </div>
          </app-glass-card>

        </div>
      </section>

      <!-- ── Code example ──────────────────────────────────────────────── -->
      <section id="code" class="page-section py-14 md:py-20 border-b border-border">
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
    (batch_size, <span class="text-on-surface-variant">3</span>, <span class="text-on-surface-variant">224</span>, <span class="text-on-surface-variant">224</span>),
    dtype=torch.float32
)

<span class="text-outline"># Reuse across every training step, zero overhead</span>
<span class="text-white">for</span> imgs, labels <span class="text-white">in</span> dataloader:
    img_buf.copy_(imgs.cuda(non_blocking=<span class="text-on-surface-variant">True</span>))

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
              <div class="panel-box rounded-xl p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">1</span>
                <p class="ui-body-sm text-on-surface-variant leading-relaxed">One pip install. No compiler, no build tools.</p>
              </div>
              <div class="panel-box rounded-xl p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">2</span>
                <p class="ui-body-sm text-on-surface-variant leading-relaxed">Call vmm_empty_nd once. Pages from the driver pool.</p>
              </div>
              <div class="panel-box rounded-xl p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">3</span>
                <p class="ui-body-sm text-on-surface-variant leading-relaxed">Copy into the buffer every step. Zero overhead.</p>
              </div>
              <div class="panel-box rounded-xl p-4 flex items-start gap-3">
                <span class="dv-step flex-shrink-0">4</span>
                <p class="ui-body-sm text-on-surface-variant leading-relaxed">cache_stats() shows pool health live.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Compatibility ─────────────────────────────────────────────── -->
      <section id="compatibility" class="page-section py-14 md:py-20 border-b border-border">
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
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">Validated on Perlmutter, Summit, and AWS P4d. Drops into any cluster job with no reconfiguration.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Package" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Windows and Linux</h4>
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">Pre-compiled wheels for both platforms. One pip install, no compiler, no build toolchain, no version pinning.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Network" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Distributed Training</h4>
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">Works across DDP, FSDP, and tensor parallel setups. Each process manages its own pool with no cross-rank coordination.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col">
            <div class="dv-feature-icon"><lucide-icon [img]="Shield" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">CUDA + AMD</h4>
            <p class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">Primary support for CUDA 12 on NVIDIA hardware. AMD ROCm support is currently in alpha.</p>
          </app-glass-card>
        </div>
      </section>

      <!-- ── Bottom CTA ────────────────────────────────────────────────── -->
      <section id="cta" class="page-section py-14 md:py-20">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Run massive models on the <span class="text-white">hardware you already have</span>.
          </h2>
          <p class="font-body text-sm text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed">
            Drop Optimemory into your training loop and reclaim VRAM you're already paying for.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <app-cta-button variant="primary" routerLink="/get-started" fragment="contact-form">Talk to our team</app-cta-button>
            <app-cta-button variant="glass" href="https://pypi.org/project/deep-variance/" [external]="true">View on PyPI</app-cta-button>
          </div>
        </app-glass-card>
      </section>
  `,
  styles: [`:host { display: block; }`],
})
export class OptimemoryBodyComponent {
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
}
