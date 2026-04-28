import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../components/blog-card';
import { SanityPost, SanityService } from '../services/sanity.service';
import {
  ChevronRight,
  BatteryCharging,
  Building2,
  Cpu,
  Factory,
  FlaskConical,
  Gauge,
  Layers,
  LucideAngularModule,
  Microscope,
  Server,
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, BlogCardComponent],
  template: `
    <div class="relative overflow-hidden">

      <!-- Hero Section -->
      <section class="relative container mx-auto px-6 pt-28 sm:pt-32 md:pt-36 pb-10 text-center">
        <!-- Grid background -->
        <div class="hero-grid-overlay"></div>
        <div class="hero-glow hero-glow--primary"></div>

<h1
          class="text-[2.25rem] sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.08] mb-8 max-w-[18ch] sm:max-w-4xl mx-auto"
        >
          Hardware-aware <br class="hidden sm:block" /><span class="text-primary whitespace-nowrap">infra optimization</span>.
        </h1>

        <p
          class="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-12"
        >
          Production AI runs on GPUs. We make those GPUs leaner — less VRAM waste, lower latency, and less energy per token, without touching your model or framework.
        </p>

        <!-- CTAs -->
        <div class="w-full max-w-sm sm:max-w-none mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            routerLink="/pricing"
            fragment="contact-form"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Talk to us
            <lucide-icon [img]="ChevronRight" [size]="16" />
          </a>
          <a
            href="#products"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-dark font-semibold text-base border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50"
          >
            View products
          </a>
        </div>
      </section>

      <!-- Products Section -->
      <section id="products" class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-4 tracking-tight">
            Three products. One stack.
          </h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">
            Each product targets a distinct bottleneck in the AI infrastructure pipeline.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <!-- Optimemory -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all p-6 flex flex-col"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <lucide-icon [img]="Server" [size]="22" />
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Available
              </span>
            </div>
            <h3 class="text-lg font-header font-bold text-dark mb-2">Optimemory</h3>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4 flex-1">
              Hardware-aware GPU VMM layer. Physical memory pooling and virtual address stitching
              for zero-overhead buffer reuse across training steps.
            </p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <code class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">deep-variance</code>
              <a
                routerLink="/optimemory"
                class="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Learn more
                <lucide-icon [img]="ChevronRight" [size]="14" />
              </a>
            </div>
          </div>

          <!-- HyperRAG -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all p-6 flex flex-col"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <lucide-icon [img]="Gauge" [size]="22" />
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                Beta
              </span>
            </div>
            <h3 class="text-lg font-header font-bold text-dark mb-2">HyperRAG</h3>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4 flex-1">
              KV cache optimization for RAG serving. Prefix-trie caching, PGDSF eviction, and
              Pareto schedule search for up to 6x faster TTFT.
            </p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <code class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">dv-hyperrag</code>
              <a
                routerLink="/hyperrag"
                class="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
              >
                Learn more
                <lucide-icon [img]="ChevronRight" [size]="14" />
              </a>
            </div>
          </div>

          <!-- DeepTuner -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all p-6 flex flex-col"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <lucide-icon [img]="Layers" [size]="22" />
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                Early Access
              </span>
            </div>
            <h3 class="text-lg font-header font-bold text-dark mb-2">DeepTuner</h3>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4 flex-1">
              Intermediate code analysis for energy-efficient GPU kernels. Up to 50% less
              energy and 2x throughput gains on MHA, without runtime profiling.
            </p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">deeptuner</span>
              <a
                routerLink="/deeptuner"
                class="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Learn more
                <lucide-icon [img]="ChevronRight" [size]="14" />
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- TODO: "Why Deep Variance" / production gap section — content TBD, remove placeholder and fill in with final messaging -->

      <!-- Use Cases Section -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-4 tracking-tight">
            Who we build for
          </h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">
            Four infrastructure problems we have studied in depth, with teams actively working through them.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- HPC Infrastructure -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all p-6 flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <lucide-icon [img]="Layers" [size]="18" />
              </div>
              <span class="text-[11px] font-extrabold text-primary uppercase tracking-widest">HPC Infrastructure</span>
            </div>
            <p class="text-2xl font-header font-bold text-dark mb-1">−50%</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest mb-3">energy per token on MHA kernels</p>
            <p class="text-slate-500 text-sm font-medium leading-relaxed flex-1">
              Long-running training and inference jobs amplify every kernel inefficiency.
              DeepTuner tunes kernel shape and power cap for minimum energy per token.
            </p>
            <div class="pt-4 mt-4 border-t border-slate-100">
              <a routerLink="/deeptuner" class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                Learn more <lucide-icon [img]="ChevronRight" [size]="12" />
              </a>
            </div>
          </div>

          <!-- GPU Providers -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all p-6 flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <lucide-icon [img]="Cpu" [size]="18" />
              </div>
              <span class="text-[11px] font-extrabold text-primary uppercase tracking-widest">GPU Providers</span>
            </div>
            <p class="text-2xl font-header font-bold text-dark mb-1">+38%</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest mb-3">fleet utilisation gain</p>
            <p class="text-slate-500 text-sm font-medium leading-relaxed flex-1">
              Tenants over-provision to avoid OOM failures. Optimemory closes the gap at the driver level,
              turning stranded VRAM into a competitive advantage.
            </p>
            <div class="pt-4 mt-4 border-t border-slate-100">
              <a routerLink="/use-cases" fragment="gpu-providers" class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                Read more <lucide-icon [img]="ChevronRight" [size]="12" />
              </a>
            </div>
          </div>

          <!-- Enterprise Training -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all p-6 flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <lucide-icon [img]="Building2" [size]="18" />
              </div>
              <span class="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest">Enterprise Training</span>
            </div>
            <p class="text-2xl font-header font-bold text-dark mb-1">11w → 3d</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest mb-3">pipeline build cycle</p>
            <p class="text-slate-500 text-sm font-medium leading-relaxed flex-1">
              Regulated teams run long jobs where memory overhead and energy drift compound over time.
              DeepTuner predicts efficient run settings before execution and helps keep cost per run stable.
            </p>
            <div class="pt-4 mt-4 border-t border-slate-100">
              <a routerLink="/use-cases" fragment="enterprise-training" class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-500 transition-colors">
                Read more <lucide-icon [img]="ChevronRight" [size]="12" />
              </a>
            </div>
          </div>

          <!-- Research Institutions -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all p-6 flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <lucide-icon [img]="Microscope" [size]="18" />
              </div>
              <span class="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest">Research Institutions</span>
            </div>
            <p class="text-2xl font-header font-bold text-dark mb-1">3B → 6B</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest mb-3">model scale on same hardware</p>
            <p class="text-slate-500 text-sm font-medium leading-relaxed flex-1">
              Labs hit VRAM ceilings before their science can scale. Optimemory recovers addressable
              memory at the driver level without touching training code.
            </p>
            <div class="pt-4 mt-4 border-t border-slate-100">
              <a routerLink="/use-cases" fragment="research-institutions" class="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Read more <lucide-icon [img]="ChevronRight" [size]="12" />
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- Latest Articles Section -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-4 tracking-tight">
            From the lab.
          </h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">
            Research notes and engineering deep-dives from the Deep Variance team.
          </p>
        </div>

        @if (latestPosts() === null) {
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            @for (i of [1, 2, 3]; track i) {
              <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
                <div class="aspect-[16/9] bg-slate-100"></div>
                <div class="p-6 space-y-3">
                  <div class="h-3 bg-slate-100 rounded-full w-1/4"></div>
                  <div class="h-4 bg-slate-100 rounded-full w-3/4"></div>
                  <div class="h-3 bg-slate-100 rounded-full w-full"></div>
                </div>
              </div>
            }
          </div>
        }

        @if (latestPosts() !== null && latestPosts()!.length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            @for (post of latestPosts()!; track post.slug) {
              <app-blog-card [post]="post" />
            }
          </div>
          <div class="text-center mt-10">
            <a
              routerLink="/blog"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-dark font-semibold text-base border border-slate-200 hover:border-primary/30 hover:text-primary transition-all"
            >
              View all articles
              <lucide-icon [img]="ChevronRight" [size]="16" />
            </a>
          </div>
        }
      </section>

      <!-- CTA Section -->
      <section class="container mx-auto px-6 py-10 md:py-14 text-center">
        <div class="max-w-xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-header font-bold text-dark mb-4 tracking-tight">
            Talk to the founders
          </h2>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            We respond to every message personally. Tell us what you're building.
          </p>
          <a
            routerLink="/pricing"
            fragment="contact-form"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get in touch
            <lucide-icon [img]="ChevronRight" [size]="16" />
          </a>
        </div>
      </section>

    </div>
  `,
})
export class HomeComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);
  private readonly sanity = inject(SanityService);
  readonly _platformId = inject(PLATFORM_ID);

  latestPosts = signal<SanityPost[] | null>(null);

  constructor() {
    this.title.setTitle('Deep Variance | Hardware-Aware AI Infra Optimization');
    const desc = 'Deep Variance builds hardware-aware optimization layers for the next generation of AI training stacks. Optimemory, HyperRAG, and DeepTuner.';
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: 'Deep Variance | Hardware-Aware AI Infra Optimization' });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Deep Variance | Hardware-Aware AI Infra Optimization' });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.setCanonical('https://deepvariance.com/');
  }

  ngOnInit(): void {
    this.sanity.getPosts(3).subscribe({
      next: (posts) => this.latestPosts.set(posts),
      error: () => this.latestPosts.set([]),
    });
  }

  private setCanonical(url: string) {
    let el = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  readonly ChevronRight = ChevronRight;
  readonly BatteryCharging = BatteryCharging;
  readonly Building2 = Building2;
  readonly Cpu = Cpu;
  readonly Factory = Factory;
  readonly FlaskConical = FlaskConical;
  readonly Microscope = Microscope;
  readonly Gauge = Gauge;
  readonly Layers = Layers;
  readonly Server = Server;
}
