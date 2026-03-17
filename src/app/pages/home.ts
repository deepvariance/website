import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Building2,
  Cpu,
  Factory,
  FlaskConical,
  Gauge,
  Layers,
  Lightbulb,
  LucideAngularModule,
  Microscope,
  Server,
  Zap,
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="relative overflow-hidden">

      <!-- Hero Section -->
      <section class="relative container mx-auto px-6 pt-16 md:pt-24 pb-10 text-center">
        <!-- Grid background -->
        <div
          class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
        ></div>
        <!-- Purple blur -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"
        ></div>

<h1
          class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto"
        >
          Hardware-aware infrastructure<br /><span class="text-primary">for the AI stack</span>.
        </h1>

        <p
          class="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-12"
        >
          Building hardware-aware optimization layers for the next generation of AI training stacks.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            routerLink="/pricing"
            fragment="contact-form"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Talk to us
            <lucide-icon [img]="ArrowRight" [size]="16" />
          </a>
          <a
            href="#products"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-dark font-semibold text-base border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50"
          >
            View products
          </a>
        </div>
      </section>

      <!-- Products Section -->
      <section id="products" class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-4 tracking-tight">
            Four SDKs. One stack.
          </h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">
            Each product targets a distinct bottleneck in the AI infrastructure pipeline.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">

          <!-- Autopilot -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all p-6 flex flex-col"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <lucide-icon [img]="Zap" [size]="22" />
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Available
              </span>
            </div>
            <h3 class="text-lg font-header font-bold text-dark mb-2">Autopilot</h3>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4 flex-1">
              End-to-end AutoML pipeline. Raw data to trained model in one call, powered by
              LLM-driven code generation and intelligent model comparison.
            </p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <code class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">deepvariance-sdk</code>
              <a
                routerLink="/autopilot"
                class="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Learn more
                <lucide-icon [img]="ArrowRight" [size]="14" />
              </a>
            </div>
          </div>

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
                <lucide-icon [img]="ArrowRight" [size]="14" />
              </a>
            </div>
          </div>

          <!-- LLM Tuner -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-600/30 transition-all p-6 flex flex-col"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <lucide-icon [img]="Lightbulb" [size]="22" />
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                Beta
              </span>
            </div>
            <h3 class="text-lg font-header font-bold text-dark mb-2">LLM Tuner</h3>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4 flex-1">
              FP8 weight quantization and fine-tuning tooling for large language models. Near-zero
              perplexity loss with significant memory savings.
            </p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <code class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">dv-deeptuner</code>
              <a
                routerLink="/llm-tuner"
                class="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                Learn more
                <lucide-icon [img]="ArrowRight" [size]="14" />
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
              Pareto schedule search for up to 9x faster TTFT.
            </p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <code class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">dv-hyperrag</code>
              <a
                routerLink="/hyperrag"
                class="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
              >
                Learn more
                <lucide-icon [img]="ArrowRight" [size]="14" />
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- Research Section -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div
          class="bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem] overflow-hidden relative px-8 md:px-16 py-12 md:py-16"
        >
          <!-- Inner grid background -->
          <div class="absolute inset-0 bg-grid-white/[0.04] -z-10"></div>
          <!-- Blur accent -->
          <div class="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10"></div>

          <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold mb-4 tracking-tight">
              Closing the decade-long research gap
            </h2>
            <p class="text-slate-400 max-w-3xl mx-auto font-medium">
              The best AI infrastructure algorithms are published years, sometimes decades, before
              industry ships them. Not from lack of effort, but because academic and production
              engineering require fundamentally different expertise that rarely coexists.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">

            <!-- Why the gap persists -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
              <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 mb-4">
                <lucide-icon [img]="FlaskConical" [size]="22" />
              </div>
              <h4 class="font-header font-bold text-white mb-2">Why the gap persists</h4>
              <p class="text-slate-400 text-sm font-medium leading-relaxed">
                Academic research optimizes for correctness and novelty. Industry demands reliability,
                operational simplicity, and performance under real-world constraints. Bridging the
                two requires a team that speaks both languages fluently.
              </p>
            </div>

            <!-- How we close it -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
              <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 mb-4">
                <lucide-icon [img]="Layers" [size]="22" />
              </div>
              <h4 class="font-header font-bold text-white mb-2">How we close it</h4>
              <p class="text-slate-400 text-sm font-medium leading-relaxed">
                We sit permanently at the intersection, tracking research as it is published
                and validating it against production workloads. Every SDK we ship is one less
                decade between a breakthrough and the teams who need it.
              </p>
            </div>

          </div>
        </div>
      </section>

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
                Read more <lucide-icon [img]="ArrowRight" [size]="12" />
              </a>
            </div>
          </div>

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
              Regulated teams rebuild the same pipeline project after project. Autopilot automates it
              without transmitting a single raw record to an external service.
            </p>
            <div class="pt-4 mt-4 border-t border-slate-100">
              <a routerLink="/use-cases" fragment="enterprise-training" class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-500 transition-colors">
                Read more <lucide-icon [img]="ArrowRight" [size]="12" />
              </a>
            </div>
          </div>

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
                Read more <lucide-icon [img]="ArrowRight" [size]="12" />
              </a>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-500/30 transition-all p-6 flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <lucide-icon [img]="Factory" [size]="18" />
              </div>
              <span class="text-[11px] font-extrabold text-orange-600 uppercase tracking-widest">Manufacturing</span>
            </div>
            <p class="text-2xl font-header font-bold text-dark mb-1">50%</p>
            <p class="text-xs text-slate-400 font-medium uppercase tracking-widest mb-3">less VRAM for edge vision models</p>
            <p class="text-slate-500 text-sm font-medium leading-relaxed flex-1">
              Inference must run on the factory floor, not the cloud. The full Deep Variance stack
              runs on-premise, air-gapped if required, with no data leaving the facility.
            </p>
            <div class="pt-4 mt-4 border-t border-slate-100">
              <a routerLink="/use-cases" fragment="manufacturing" class="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                Read more <lucide-icon [img]="ArrowRight" [size]="12" />
              </a>
            </div>
          </div>

        </div>
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
            <lucide-icon [img]="ArrowRight" [size]="16" />
          </a>
        </div>
      </section>

    </div>
  `,
})
export class HomeComponent {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);
  readonly _platformId = inject(PLATFORM_ID);

  constructor() {
    this.title.setTitle('Deep Variance — Hardware-Aware AI Infrastructure');
    const desc = 'Deep Variance builds hardware-aware optimization layers for the next generation of AI training stacks. Autopilot, Optimemory, LLM Tuner, and HyperRAG.';
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: 'Deep Variance — Hardware-Aware AI Infrastructure' });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Deep Variance — Hardware-Aware AI Infrastructure' });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.setCanonical('https://deepvariance.com/');
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

  readonly ArrowRight = ArrowRight;
  readonly Building2 = Building2;
  readonly Cpu = Cpu;
  readonly Factory = Factory;
  readonly FlaskConical = FlaskConical;
  readonly Microscope = Microscope;
  readonly Gauge = Gauge;
  readonly Lightbulb = Lightbulb;
  readonly Server = Server;
  readonly Zap = Zap;
  readonly Layers = Layers;
}
