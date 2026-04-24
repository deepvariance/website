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
      <div class="hero-grid-overlay"></div>
      <div class="hero-glow hero-glow--primary"></div>

      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-14">
        <div class="max-w-4xl mx-auto text-center mb-20">
          <h1 class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8">
            Product Roadmap
          </h1>
          <p class="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            Our research-first approach to infrastructure optimization. From hardware-aware memory pooling to energy-efficient kernel tuning.
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-12">
          <!-- Released -->
          <div class="relative pl-8 border-l-2 border-primary/20">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
            <div class="mb-2">
              <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Released • Available Now</span>
              <h3 class="text-xl font-header font-bold text-dark mt-1">Optimemory & HyperRAG</h3>
            </div>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4">
              CUDA VMM layer for single-node GPU hardware and KV cache optimization for RAG serving. Both packages are available on PyPI today.
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-600">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> deep-variance on PyPI</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> dv-hyperrag on PyPI</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Physical memory pooling via CUDA VMM</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Up to 5x faster TTFT on long-context RAG</li>
            </ul>
          </div>

          <!-- Early Access -->
          <div class="relative pl-8 border-l-2 border-primary/30">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/40 border-4 border-white shadow-sm"></div>
            <div class="mb-2">
              <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Early Access • Beta</span>
              <h3 class="text-xl font-header font-bold text-dark mt-1">DeepTuner</h3>
            </div>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4">
              Static PTX analysis for energy-efficient kernel configurations on HPC infrastructure.
              Jointly tunes thread block shape and GPU power cap for minimum energy per token,
              without runtime profiling.
            </p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-600">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary/60"></div> Static PTX analysis (no runtime profiling)</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary/60"></div> Up to 79% energy savings per token</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary/60"></div> 93.4% reduction in kernel search space</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary/60"></div> DeepTuner dashboard (planned)</li>
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
