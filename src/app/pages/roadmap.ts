import { Component, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden min-h-screen">
      <!-- Grid and Blur Background -->
      <div class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"></div>

      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-24">
        <div class="max-w-4xl mx-auto text-center mb-20">
          <h1 class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8">
            Product Roadmap
          </h1>
          <p class="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            Our research-first approach to infrastructure optimization. From LLM-driven AutoML to cross-GPU virtual memory.
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-12">
          <!-- Released -->
          <div class="relative pl-8 border-l-2 border-primary/20">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
            <div class="mb-2">
              <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Released • Available Now</span>
              <h3 class="text-xl font-header font-bold text-dark mt-1">Autopilot & Optimemory</h3>
            </div>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4">
              Launch of our LLM-driven AutoML pipeline and CUDA VMM layer for single-node GPU hardware. Both packages are available on PyPI today.
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-600">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> deepvariance-sdk on PyPI</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> deep-variance on PyPI</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> 7-stage automated ML pipeline</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Physical memory pooling via CUDA VMM</li>
            </ul>
          </div>

          <!-- Early Access -->
          <div class="relative pl-8 border-l-2 border-blue-600/20">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600/40 border-4 border-white shadow-sm"></div>
            <div class="mb-2">
              <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Early Access • Beta</span>
              <h3 class="text-xl font-header font-bold text-dark mt-1">LLM Tuner (DeepTuner) & FP8 Kernels</h3>
            </div>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4">
              Weight quantization and fine-tuning tooling for large language models. FP8 precision support is available in early access with near-zero accuracy loss on transformer architectures.
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-600">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-blue-600/60"></div> Native FP8 quantization kernels</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-blue-600/60"></div> Transformer-specific tuning</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-blue-600/60"></div> Optimemory v2.4 integration (planned)</li>
            </ul>
          </div>

          <!-- Research -->
          <div class="relative pl-8 border-l-2 border-slate-200">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-4 border-white shadow-sm"></div>
            <div class="mb-2">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Research • Ongoing</span>
              <h3 class="text-xl font-header font-bold text-dark mt-1">Multi-GPU & NVLink Virtualization</h3>
            </div>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4">
              Extending virtual address stitching across multiple GPUs via high-speed NVLink interconnects, presenting a unified global address space to the model runtime.
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-600">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-slate-300"></div> Cross-GPU VMM stitching</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-slate-300"></div> NVLink paging layer</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-slate-300"></div> Multi-node orchestration</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `
})
export class RoadmapPageComponent {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  constructor() {
    this.title.setTitle('Roadmap | Deep Variance');
    this.meta.updateTag({ name: 'description', content: 'See what Deep Variance is building next — from Multi-GPU NVLink virtual memory to the full distributed AI inference stack.' });
    this.meta.updateTag({ property: 'og:title', content: 'Roadmap | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: 'See what Deep Variance is building next — from Multi-GPU NVLink virtual memory to the full distributed AI inference stack.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/roadmap' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Roadmap | Deep Variance' });
    this.meta.updateTag({ name: 'twitter:description', content: 'See what Deep Variance is building next — from Multi-GPU NVLink virtual memory to the full distributed AI inference stack.' });
    this.setCanonical('https://deepvariance.com/roadmap');
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
}
