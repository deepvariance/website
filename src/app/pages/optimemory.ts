import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Activity,
  Brain,
  CircleCheck,
  Copy,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Layers,
  LucideAngularModule,
  Microscope,
  Network,
  Package,
  RefreshCw,
  Scissors,
  Server,
  Shield,
  Zap,
} from 'lucide-angular';

import { CodeWindowComponent } from '../components/code-window';
import { CommandRowComponent } from '../components/command-row';
import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { PipelineRowComponent, PipelineStep } from '../components/pipeline-row';
import { SectionHeaderComponent } from '../components/section-header';
import {
  RailSection,
  SectionRailComponent,
} from '../components/section-rail';
import { StatStripComponent } from '../components/stat-strip';
import { StatusPillComponent } from '../components/status-pill';
import { ToolItem, ToolStripComponent } from '../components/tool-strip';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-optimemory',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    StatStripComponent,
    SectionHeaderComponent,
    CtaButtonComponent,
    CodeWindowComponent,
    CommandRowComponent,
    PipelineRowComponent,
    SectionRailComponent,
    StatusPillComponent,
    ToolStripComponent,
  ],
  template: `
    <div class="relative">
      <app-section-rail [sections]="railSections" ariaLabel="Optimemory section navigation" />

      <!-- Hero -->
      <section id="hero" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div aria-hidden="true" class="hero-halo-neon top-10 left-1/2 -translate-x-1/2 opacity-70"></div>
        <div aria-hidden="true" class="hero-halo-indigo right-[-10%] top-0"></div>

        <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Left: copy -->
          <div class="lg:col-span-7 flex flex-col justify-center">
            <div class="self-start mb-7">
              <app-status-pill variant="live">Optimemory · v1 available</app-status-pill>
            </div>

            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.25rem] sm:text-5xl md:text-[3.7rem] leading-[1.04] mb-6">
              Hardware-aware
              <br class="hidden sm:block" />
              <span class="text-white">memory virtualization</span>.
            </h1>

            <p class="max-w-xl text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              A CUDA VMM driver-level memory layer that doubles effective VRAM with research-backed
              virtual memory stitching, invisible to your model and optimizer.
            </p>

            <div class="mb-10">
              <app-command-row
                command="pip install deep-variance"
                linkLabel="View on PyPI"
                href="https://pypi.org/project/deep-variance/"
              />
            </div>

            <app-stat-strip [stats]="heroStats" />
          </div>

          <!-- Right: animated VMM stitching visual -->
          <div class="lg:col-span-5">
            <app-glass-card variant="strong" rounded="2xl" extraClass="p-6 md:p-7 h-full" [glow]="true">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <p class="label-caps mb-1">Memory Efficiency</p>
                  <p class="font-display text-lg font-semibold text-on-surface">VMM Stitching · Active</p>
                </div>
                <p class="font-display text-3xl font-bold text-white">98.4%</p>
              </div>

              <!-- VMM stitching SVG -->
              <div class="rounded-xl bg-black/30 border border-white/5 p-4 mb-5 overflow-hidden">
                <svg viewBox="0 0 360 140" class="w-full h-auto">
                  <defs>
                    <linearGradient id="optiBlock" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stop-color="#9d6fff" stop-opacity="0.6" />
                      <stop offset="1" stop-color="#9d6fff" stop-opacity="0.18" />
                    </linearGradient>
                    <linearGradient id="optiDim" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stop-color="#3b4b3a" stop-opacity="0.65" />
                      <stop offset="1" stop-color="#3b4b3a" stop-opacity="0.2" />
                    </linearGradient>
                  </defs>
                  <!-- physical row -->
                  <text x="0" y="14" font-family="IBM Plex Mono" font-size="9" fill="#849581" letter-spacing="2">PHYSICAL VRAM</text>
                  <g transform="translate(0,22)">
                    <rect x="0" y="0" width="36" height="22" rx="3" fill="url(#optiDim)" />
                    <rect x="42" y="0" width="36" height="22" rx="3" fill="url(#optiBlock)" />
                    <rect x="84" y="0" width="36" height="22" rx="3" fill="url(#optiDim)" />
                    <rect x="126" y="0" width="36" height="22" rx="3" fill="url(#optiBlock)" />
                    <rect x="168" y="0" width="36" height="22" rx="3" fill="url(#optiBlock)" />
                    <rect x="210" y="0" width="36" height="22" rx="3" fill="url(#optiDim)" />
                    <rect x="252" y="0" width="36" height="22" rx="3" fill="url(#optiBlock)" />
                    <rect x="294" y="0" width="36" height="22" rx="3" fill="url(#optiDim)" />
                  </g>
                  <!-- stitching lines -->
                  <g stroke="#9d6fff" stroke-width="0.9" stroke-dasharray="2 3" opacity="0.65">
                    <path d="M60 60 C 90 70, 110 70, 144 60" />
                    <path d="M144 60 C 175 78, 195 78, 186 60" />
                    <path d="M186 60 C 215 70, 245 70, 270 60" />
                  </g>
                  <!-- virtual row -->
                  <text x="0" y="98" font-family="IBM Plex Mono" font-size="9" fill="#9d6fff" letter-spacing="2">VIRTUAL ADDRESS SPACE</text>
                  <g transform="translate(0,106)">
                    <rect x="0" y="0" width="330" height="22" rx="4" fill="rgba(157,111,255,0.12)" stroke="rgba(157,111,255,0.55)" stroke-width="0.8" />
                    <line x1="55" y1="0" x2="55" y2="22" stroke="rgba(157,111,255,0.35)" stroke-dasharray="2 2" />
                    <line x1="125" y1="0" x2="125" y2="22" stroke="rgba(157,111,255,0.35)" stroke-dasharray="2 2" />
                    <line x1="205" y1="0" x2="205" y2="22" stroke="rgba(157,111,255,0.35)" stroke-dasharray="2 2" />
                    <line x1="270" y1="0" x2="270" y2="22" stroke="rgba(157,111,255,0.35)" stroke-dasharray="2 2" />
                  </g>
                </svg>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="kpi-rail rounded-md bg-black/20 border border-white/5 px-4 py-3">
                  <p class="label-caps mb-1">Reclaimed</p>
                  <p class="font-display text-xl font-bold text-white">42.2 GB</p>
                </div>
                <div class="kpi-rail rounded-md bg-black/20 border border-white/5 px-4 py-3">
                  <p class="label-caps mb-1">Utilization</p>
                  <p class="font-display text-xl font-bold text-on-surface">99.1%</p>
                </div>
              </div>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- Tool strip -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pb-10 md:pb-12">
        <app-tool-strip label="Built for" [tools]="tools" />
      </section>

      <!-- Pipeline -->
      <section id="pipeline" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <app-section-header
          eyebrow="The Optimemory pipeline"
          subhead="Profile the workload, partition memory, stitch VMM regions, then serve with zero hot-path allocation."
        >
          Four steps, <span class="text-white">below the framework</span>.
        </app-section-header>
        <app-pipeline-row [steps]="pipelineSteps" />
      </section>

      <!-- Architectures -->
      <section id="architectures" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Built for every workload"
          subhead="Optimemory is not tied to any model architecture. If it runs on PyTorch and CUDA, it benefits from VMM-backed memory pooling."
        >
          One layer for <span class="text-white">every architecture</span>.
        </app-section-header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Brain" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Large Language Models</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              GPT, LLaMA, Mistral, Megatron. Pre-allocate batch buffers once and reuse them across
              tens of thousands of training steps.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Eye" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Vision Transformers</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              ViT, CLIP, DINO, SigLIP. Image patch buffers stay resident in a fixed VMM pool through
              the full training run.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Layers" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Diffusion Models</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Stable Diffusion, FLUX, DiT. Noisy latent buffers across denoising timesteps share the
              same physical VRAM pool.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Activity" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Inference Servers</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              ResNet, BERT, EfficientNet. Pre-allocate I/O buffers at startup and serve every
              request from reusable VMM slots with zero allocation on the hot path.
            </p>
          </app-glass-card>
        </div>
      </section>

      <!-- How it works -->
      <section id="how-it-works" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div class="lg:col-span-7">
            <span class="label-caps mb-4 inline-block">How it works</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-4xl md:text-5xl mb-6 leading-[1.08]">
              Memory plumbing <span class="text-white">below the framework</span>.
            </h2>
            <p class="text-on-surface-variant text-base md:text-lg mb-10 leading-relaxed">
              Every deep learning workload is memory-bound. Optimemory decouples physical hardware
              limitations from model capacity by operating below the framework level, invisible to
              the model and the optimizer.
            </p>

            <div class="space-y-5">
              <app-glass-card extraClass="p-6 flex gap-5">
                <div class="dv-feature-icon flex-shrink-0"><lucide-icon [img]="FileText" [size]="20" /></div>
                <div>
                  <h4 class="font-display font-semibold text-on-surface mb-1.5">VMM Stitching Layer</h4>
                  <p class="text-sm text-on-surface-variant leading-relaxed">
                    Research-backed virtual memory stitching that presents fragmented physical VRAM
                    as a contiguous address space.
                  </p>
                </div>
              </app-glass-card>
              <app-glass-card extraClass="p-6 flex gap-5">
                <div class="dv-feature-icon flex-shrink-0"><lucide-icon [img]="RefreshCw" [size]="20" /></div>
                <div>
                  <h4 class="font-display font-semibold text-on-surface mb-1.5">Physical Memory Pooling</h4>
                  <p class="text-sm text-on-surface-variant leading-relaxed">
                    Pool and reuse freed physical VRAM chunks across training steps, eliminating
                    repeated allocation overhead without stalling compute kernels.
                  </p>
                </div>
              </app-glass-card>
              <app-glass-card extraClass="p-6 flex gap-5">
                <div class="dv-feature-icon flex-shrink-0"><lucide-icon [img]="Database" [size]="20" /></div>
                <div>
                  <h4 class="font-display font-semibold text-on-surface mb-1.5">Hardware-Agnostic Fragmenting</h4>
                  <p class="text-sm text-on-surface-variant leading-relaxed">
                    Queries the CUDA driver for hardware-specific allocation granularity and aligns
                    chunk sizes accordingly. Works on any NVIDIA GPU with Compute Capability 6.0+
                    (Pascal through Hopper).
                  </p>
                </div>
              </app-glass-card>
            </div>
          </div>

          <!-- Right KPI rail -->
          <div class="lg:col-span-5 space-y-5">
            <app-glass-card variant="kpi-rail" extraClass="p-6 pl-8" [glow]="true">
              <p class="label-caps mb-3">Memory Recovery</p>
              <p class="font-display text-5xl font-bold text-white mb-2">65%</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Average wasted VRAM recovered on long training runs by reusing pooled physical chunks
                across optimizer steps.
              </p>
            </app-glass-card>

            <app-glass-card variant="kpi-rail" extraClass="p-6 pl-8">
              <p class="label-caps mb-3">Allocation Overhead</p>
              <p class="font-display text-5xl font-bold text-on-surface mb-2">0 ns</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Zero hot-path allocation. After warm-up, every step copies into pre-allocated
                buffers, no <code class="text-neon font-mono text-[0.85em]">cudaMalloc</code>.
              </p>
            </app-glass-card>

            <app-glass-card extraClass="p-6">
              <p class="label-caps mb-3 text-white">Upcoming Platform Work</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Deeper integration with DeepTuner workflows and scheduling controls.
              </p>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- Code example -->
      <section id="code" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-5">
            <span class="label-caps mb-4 inline-block">Drop-in integration</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-4xl mb-5 leading-tight">
              Replace one allocator. <span class="text-white">Keep your training loop.</span>
            </h2>
            <p class="text-on-surface-variant mb-8 leading-relaxed">
              Replace standard tensor allocation with a single call. No changes to your training
              loop required.
            </p>

            <ol class="space-y-4">
              <li class="flex gap-4">
                <span class="dv-step">1</span>
                <p class="text-sm text-on-surface-variant pt-1">
                  Install via pip:
                  <code class="bg-black/40 border border-white/5 px-2 py-0.5 rounded font-mono">deep-variance</code>
                </p>
              </li>
              <li class="flex gap-4">
                <span class="dv-step">2</span>
                <p class="text-sm text-on-surface-variant pt-1">
                  Pre-allocate a reusable GPU buffer once with
                  <code class="bg-black/40 border border-white/5 px-2 py-0.5 rounded font-mono">vmm_empty_nd</code>,
                  backed by physical CUDA memory pooling.
                </p>
              </li>
              <li class="flex gap-4">
                <span class="dv-step">3</span>
                <p class="text-sm text-on-surface-variant pt-1">
                  Copy into the buffer each step with zero allocation overhead. Inspect pool health
                  anytime via
                  <code class="bg-black/40 border border-white/5 px-2 py-0.5 rounded font-mono">cache_stats()</code>.
                </p>
              </li>
            </ol>
          </div>

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
        </div>
      </section>

      <!-- Compatibility -->
      <section id="compatibility" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Compatibility"
          subhead="Designed to fit your infrastructure, not the other way around."
        >
          Works <span class="text-white">everywhere PyTorch runs</span>.
        </app-section-header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Server" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">HPC and SLURM</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Built-in module-load support. Validated on Perlmutter and Summit with
              <code class="bg-black/40 border border-white/5 px-1.5 py-0.5 rounded font-mono text-xs">deep-variance-check</code>
              environment diagnostics.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Network" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Multi-GPU Training</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Process-local by design. Each DDP rank manages its own VMM pool independently on its
              assigned device, clean fit for PyTorch's data-parallel patterns.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Shield" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Mixed Precision</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              VMM tensors participate fully in FP16 and BF16 autocast. Autograd and
              <code class="bg-black/40 border border-white/5 px-1.5 py-0.5 rounded font-mono text-xs">nn.Module</code>
              work without modification.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-6">
            <div class="dv-feature-icon"><lucide-icon [img]="Package" [size]="20" /></div>
            <h4 class="font-display font-semibold text-on-surface mb-2">Pre-Compiled Wheel</h4>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Ships as a pre-compiled Python wheel for CUDA 12.x and Linux x86_64. No compiler, no
              build tools, one pip install and you're running.
            </p>
          </app-glass-card>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section id="cta" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Run massive models on the <span class="text-white">hardware you already have</span>.
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed">
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
        margin-bottom: 1.1rem;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
        color: #9d6fff;
      }
      .dv-step {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        border-radius: 9999px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        font-weight: 600;
        background: rgba(157, 111, 255, 0.08);
        color: #c4b5fd;
        border: 1px solid rgba(157, 111, 255, 0.3);
      }
    `,
  ],
})
export class OptimemoryPageComponent {
  private readonly seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly Copy = Copy;
  readonly CircleCheck = CircleCheck;
  readonly ExternalLink = ExternalLink;
  readonly FileText = FileText;
  readonly RefreshCw = RefreshCw;
  readonly Database = Database;
  readonly Brain = Brain;
  readonly Eye = Eye;
  readonly Activity = Activity;
  readonly Layers = Layers;
  readonly Network = Network;
  readonly Shield = Shield;
  readonly Package = Package;
  readonly Server = Server;

  readonly heroStats = [
    { value: '2.5x', label: 'Model scale increase', highlight: true },
    { value: '−65%', label: 'Memory overhead', highlight: true },
    { value: 'Zero', label: 'Runtime overhead', highlight: true },
  ];

  readonly railSections: RailSection[] = [
    { id: 'hero', label: 'Overview' },
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'architectures', label: 'Architectures' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'code', label: 'Code' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'cta', label: 'Get in touch' },
  ];

  readonly tools: ToolItem[] = [
    { name: 'PyTorch' },
    { name: 'CUDA 12' },
    { name: 'Megatron' },
    { name: 'DeepSpeed' },
    { name: 'FSDP' },
    { name: 'NCCL' },
  ];

  readonly pipelineSteps: PipelineStep[] = [
    {
      label: 'Profile',
      caption: 'Trace allocations across optimizer steps.',
      body: 'Static + lightweight runtime probes; zero code changes.',
      color: 1,
      icon: Microscope,
    },
    {
      label: 'Partition',
      caption: 'Discover hardware allocation granularity.',
      body: 'Aligns chunks to driver-reported page sizes.',
      color: 2,
      icon: Scissors,
    },
    {
      label: 'Stitch',
      caption: 'Present fragmented VRAM as contiguous space.',
      body: 'VMM regions wired into a single virtual address pool.',
      color: 3,
      icon: Layers,
    },
    {
      label: 'Serve',
      caption: 'Reuse with zero hot-path overhead.',
      body: 'No cudaMalloc on the training step. Ever.',
      color: 4,
      icon: Zap,
    },
  ];

  pipCopied = signal(false);

  constructor() {
    this.seo.set({
      title: 'Optimemory | Deep Variance',
      description:
        'Optimemory is a CUDA VMM driver-level memory layer that doubles effective VRAM without new hardware. Eliminate OOM errors and serve larger models today.',
      path: '/optimemory',
    });
  }

  copyPip(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText('pip install deep-variance');
    this.pipCopied.set(true);
    setTimeout(() => this.pipCopied.set(false), 1500);
  }
}
