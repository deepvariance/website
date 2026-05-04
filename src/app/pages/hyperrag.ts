import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ChartBar,
  CircleCheck,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  LucideAngularModule,
  Microchip,
  PackageSearch,
  Route,
  Search,
  Server,
  Shuffle,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-angular';

import {
  BenchBarsComponent,
  BenchOption,
  BenchSeries,
} from '../components/bench-bars';
import { ChallengeCallout } from '../components/challenge-callouts';
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
  selector: 'app-hyperrag',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    GlassCardComponent,
    SectionHeaderComponent,
    CtaButtonComponent,
    CodeWindowComponent,
    BenchBarsComponent,
    CommandRowComponent,
    SectionRailComponent,
    StatusPillComponent,
  ],
  template: `
    <div class="relative">
      <app-section-rail [sections]="railSections" ariaLabel="HyperRAG section navigation" />

      <!-- Hero -->
      <section id="hero" class="relative border-b border-border overflow-hidden">
        <div class="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">

          <!-- Desktop: abstract cache tree image, absolute right, mix-blend-mode:screen -->
          <div class="hidden desk:block absolute inset-y-0 right-0 w-[54%] pointer-events-none select-none">
            <img
              src="/hyperrag-hero.webp"
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
              src="/hyperrag-hero.webp"
              alt=""
              width="1536" height="1024"
              class="w-full"
              style="mix-blend-mode:screen;opacity:0.85"
            />
          </div>

          <!-- Hero text -->
          <div class="w-full desk:max-w-[560px] pt-6 desk:pt-32 pb-8 desk:pb-16">
            <div class="mb-7">
              <app-status-pill variant="beta">HyperRAG · Public beta</app-status-pill>
            </div>

            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.25rem] sm:text-5xl md:text-[3.7rem] leading-[1.04] mb-6">
              Your KV cache exists.<br/>
              <span class="text-white">We make it better.</span>
            </h1>

            <p class="max-w-xl text-base text-on-surface-variant font-medium leading-relaxed mb-8">
              vLLM, SGLang, and TensorRT-LLM all ship with KV cache. But default caching leaves most of that performance untouched. HyperRAG is a drop-in layer that makes the cache you already have work dramatically harder — no model changes, no migration.
            </p>

            <div class="mb-8">
              <app-command-row
                command="pip install dv-hyperrag"
                linkLabel="View on PyPI"
                href="https://pypi.org/project/dv-hyperrag/"
              />
            </div>

            <div class="flex items-center gap-8 flex-wrap">
              <div>
                <p class="font-mono text-xs uppercase tracking-[0.18em] mb-1" style="color:#8a8a8a">Cache hit rate</p>
                <p class="font-display text-4xl font-bold text-white leading-none">94.2%</p>
              </div>
              <div>
                <p class="font-mono text-xs uppercase tracking-[0.18em] mb-1" style="color:#8a8a8a">up to</p>
                <p class="font-display text-4xl font-bold text-white leading-none">6x faster</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tool strip -->
      <section class="border-b border-border">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-10 py-4 flex flex-col desk:flex-row desk:items-center gap-3 desk:gap-8">
          <p class="font-mono text-[10px] uppercase tracking-[0.22em]" style="color:#8a8a8a">Slots into</p>
          <div class="flex flex-wrap items-center gap-4 sm:gap-6">
            <img src="/vllm-logo.webp" alt="vLLM" width="280" height="80" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
            <img src="/sglang-logo.webp" alt="SGLang" width="262" height="80" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
            <span class="font-mono text-xs uppercase tracking-[0.14em]" style="color:#5a5a5a">TensorRT-LLM</span>
            <span class="font-mono text-xs uppercase tracking-[0.14em]" style="color:#5a5a5a">Triton</span>
            <span class="font-mono text-xs uppercase tracking-[0.14em]" style="color:#5a5a5a">FAISS</span>
            <span class="font-mono text-xs uppercase tracking-[0.14em]" style="color:#5a5a5a">pgvector</span>
          </div>
        </div>
      </section>

      <!-- Challenge -->
      <section id="challenge" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Left: visualization -->
          <div class="rounded-2xl overflow-hidden border border-border">
            <img
              src="/hyperrag-challenge.webp"
              alt="Left: multiple identical parallel compute streams (wasteful). Right: one compute path branching to many outputs (HyperRAG cache reuse)."
              width="1024" height="576"
              class="w-full h-auto"
              loading="lazy"
            />
          </div>

          <!-- Right: text -->
          <div>
            <p class="label-caps mb-4">The problem</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Default KV cache is not enough.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-6">
              Your inference framework already caches — but it caches naively. It doesn't know which document prefixes are shared across requests, which entries are worth keeping, or how to overlap retrieval with generation.
            </p>
            <div class="space-y-5">
              @for (item of ragChallenges; track item.highlight) {
                <div class="flex gap-4 items-start">
                  <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                    <lucide-icon [img]="item.icon" [size]="14" />
                  </span>
                  <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                    <span class="font-display font-semibold text-on-surface">{{ item.highlight }} — </span>{{ item.body }}
                  </p>
                </div>
              }
            </div>
          </div>

        </div>
      </section>

      <!-- How it works -->
      <section id="how-it-works" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Left: architecture diagram -->
          <div>
            <svg viewBox="0 0 480 340" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto" aria-hidden="true">
              <!-- Incoming requests -->
              <text x="240" y="22" font-family="IBM Plex Mono,monospace" font-size="8" fill="#4a4a4a" text-anchor="middle" letter-spacing="0.14em">INCOMING RAG REQUESTS</text>
              <line x1="120" y1="28" x2="120" y2="56" stroke="#2a2a2a" stroke-width="1" stroke-dasharray="3,3"/>
              <line x1="240" y1="28" x2="240" y2="56" stroke="#2a2a2a" stroke-width="1" stroke-dasharray="3,3"/>
              <line x1="360" y1="28" x2="360" y2="56" stroke="#2a2a2a" stroke-width="1" stroke-dasharray="3,3"/>
              <!-- Arrow heads -->
              <polygon points="120,56 116,48 124,48" fill="#3a3a3a"/>
              <polygon points="240,56 236,48 244,48" fill="#3a3a3a"/>
              <polygon points="360,56 356,48 364,48" fill="#3a3a3a"/>

              <!-- HyperRAG layer -->
              <rect x="40" y="60" width="400" height="72" rx="8" fill="rgba(157,111,255,0.06)" stroke="rgba(157,111,255,0.35)" stroke-width="1.2"/>
              <text x="240" y="84" font-family="IBM Plex Mono,monospace" font-size="10" fill="#c4b5fd" text-anchor="middle" font-weight="600" letter-spacing="0.12em">HYPERRAG</text>
              <text x="240" y="100" font-family="IBM Plex Mono,monospace" font-size="8" fill="#7a6a9a" text-anchor="middle" letter-spacing="0.1em">Prefix detection · Cache routing · Eviction policy</text>
              <!-- Cache hit path -->
              <rect x="56" y="112" width="100" height="12" rx="3" fill="rgba(157,111,255,0.12)" stroke="rgba(157,111,255,0.2)" stroke-width="0.8"/>
              <text x="106" y="121" font-family="IBM Plex Mono,monospace" font-size="7" fill="#9d6fff" text-anchor="middle" letter-spacing="0.1em">cache hit →</text>
              <!-- Cache miss path -->
              <rect x="324" y="112" width="100" height="12" rx="3" fill="rgba(80,80,80,0.15)" stroke="rgba(80,80,80,0.25)" stroke-width="0.8"/>
              <text x="374" y="121" font-family="IBM Plex Mono,monospace" font-size="7" fill="#6a6a6a" text-anchor="middle" letter-spacing="0.1em">cache miss →</text>

              <!-- Down arrows from HyperRAG -->
              <line x1="240" y1="132" x2="240" y2="158" stroke="#3a3a3a" stroke-width="1"/>
              <polygon points="240,158 236,150 244,150" fill="#3a3a3a"/>

              <!-- Inference layer -->
              <rect x="40" y="162" width="400" height="56" rx="8" fill="rgba(255,255,255,0.02)" stroke="#2e2e2e" stroke-width="1"/>
              <text x="130" y="186" font-family="IBM Plex Mono,monospace" font-size="9" fill="#5a5a5a" text-anchor="middle" letter-spacing="0.1em">vLLM</text>
              <line x1="180" y1="172" x2="180" y2="208" stroke="#222" stroke-width="0.8"/>
              <text x="240" y="186" font-family="IBM Plex Mono,monospace" font-size="9" fill="#5a5a5a" text-anchor="middle" letter-spacing="0.1em">SGLang</text>
              <line x1="300" y1="172" x2="300" y2="208" stroke="#222" stroke-width="0.8"/>
              <text x="370" y="186" font-family="IBM Plex Mono,monospace" font-size="9" fill="#5a5a5a" text-anchor="middle" letter-spacing="0.1em">TensorRT-LLM</text>
              <text x="240" y="205" font-family="IBM Plex Mono,monospace" font-size="7" fill="#3a3a3a" text-anchor="middle" letter-spacing="0.14em">INFERENCE ENGINE</text>

              <!-- KV Cache beside inference -->
              <rect x="40" y="238" width="400" height="44" rx="8" fill="rgba(255,255,255,0.015)" stroke="#252525" stroke-width="1"/>
              <text x="240" y="257" font-family="IBM Plex Mono,monospace" font-size="9" fill="#4a4a4a" text-anchor="middle" letter-spacing="0.14em">KV CACHE</text>
              <!-- Cache fill bars -->
              <rect x="60" y="264" width="70" height="6" rx="2" fill="rgba(157,111,255,0.4)"/>
              <rect x="138" y="264" width="50" height="6" rx="2" fill="rgba(157,111,255,0.25)"/>
              <rect x="196" y="264" width="90" height="6" rx="2" fill="rgba(157,111,255,0.5)"/>
              <rect x="294" y="264" width="40" height="6" rx="2" fill="rgba(157,111,255,0.2)"/>
              <rect x="342" y="264" width="78" height="6" rx="2" fill="rgba(157,111,255,0.35)"/>

              <!-- Arrow from cache hit back up -->
              <path d="M 56 132 Q 20 200 20 260 Q 20 290 56 290 L 40 282" fill="none" stroke="rgba(157,111,255,0.3)" stroke-width="1" stroke-dasharray="4,3"/>
              <text x="12" y="208" font-family="IBM Plex Mono,monospace" font-size="7" fill="rgba(157,111,255,0.5)" text-anchor="middle" letter-spacing="0.1em" transform="rotate(-90,12,208)">reuse</text>

              <!-- Response arrow -->
              <line x1="240" y1="296" x2="240" y2="322" stroke="#3a3a3a" stroke-width="1"/>
              <polygon points="240,322 236,314 244,314" fill="#3a3a3a"/>
              <text x="240" y="336" font-family="IBM Plex Mono,monospace" font-size="8" fill="#4a4a4a" text-anchor="middle" letter-spacing="0.14em">RESPONSE</text>
            </svg>
          </div>

          <!-- Right: narrative -->
          <div>
            <p class="label-caps mb-4">How it works</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Better cache. Same stack.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              HyperRAG sits in front of your inference API. It identifies shared document context across incoming requests and routes them to cached computation your framework already has — rather than reprocessing from scratch.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              You keep vLLM, SGLang, or whatever you're running today. HyperRAG makes the KV cache those systems already maintain work significantly harder — with no changes to your model or stack.
            </p>
          </div>

        </div>
      </section>

      <!-- What you get -->
      <section id="system" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Left: visualization -->
          <div class="rounded-2xl overflow-hidden border border-border">
            <img
              src="/hyperrag-whatyouget.webp"
              alt="Abstract visualization of accelerated inference — data streams converging and accelerating through optimized cache pathways."
              width="1024" height="576"
              class="w-full h-auto"
              loading="lazy"
            />
          </div>

          <!-- Right: narrative -->
          <div>
            <p class="label-caps mb-4">What you get</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              More from the cache you already have.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-5">
              HyperRAG makes that cache significantly smarter. Higher hit rates, less redundant compute, faster responses — without changing your infrastructure or your model.
            </p>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              When the cache works harder, each GPU handles more requests per second. Teams scaling under load get headroom without adding hardware or changing anything about how they deploy.
            </p>
          </div>

        </div>
      </section>

      <!-- Use cases -->
      <section id="use-cases" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <p class="label-caps mb-4">Use cases</p>
        <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-10 max-w-2xl">
          Works across every RAG workload.
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex flex-col gap-3">
            <div class="dv-feature-icon"><lucide-icon [img]="Server" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">High-volume APIs</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">Shared document context across thousands of requests per minute. HyperRAG turns overlap into speedup.</p>
          </div>
          <div class="flex flex-col gap-3">
            <div class="dv-feature-icon"><lucide-icon [img]="Search" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">Enterprise search</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">Internal queries return to the same pages repeatedly. Popular content stays fast as traffic scales.</p>
          </div>
          <div class="flex flex-col gap-3">
            <div class="dv-feature-icon"><lucide-icon [img]="Route" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">Agentic workflows</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">Multi-step agents revisit documents across reasoning steps. Each revisit hits the cache, cutting cumulative latency.</p>
          </div>
          <div class="flex flex-col gap-3">
            <div class="dv-feature-icon"><lucide-icon [img]="Cpu" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">Long-context inference</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">Similar long prompts share substantial context. HyperRAG reuses cached computation and cuts prefill cost.</p>
          </div>
        </div>
      </section>

      <!-- Code -->
      <section id="code" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-5">
            <span class="label-caps mb-4 inline-block">Integration</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-4xl mb-5 leading-tight">
              On top of your stack. <span class="text-white">Not instead of it.</span>
            </h2>
            <p class="text-base text-on-surface-variant mb-8 leading-relaxed">
              HyperRAG adds a thin optimization layer in front of your existing inference API. vLLM, SGLang, TensorRT-LLM — keep running exactly what you have. HyperRAG makes the cache those systems already maintain work dramatically harder.
            </p>
            <div class="space-y-4">
              <div class="rounded-xl border border-border p-5 flex gap-4 items-start">
                <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="CircleCheck" [size]="16" /></div>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">No model changes. No migration. No cluster reconfiguration.</p>
              </div>
              <div class="rounded-xl border border-border p-5 flex gap-4 items-start">
                <div class="dv-outcome-icon flex-shrink-0"><lucide-icon [img]="Zap" [size]="16" /></div>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">Smarter caching starts on the first query. Gains visible immediately.</p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <app-code-window filename="quickstart.py" language="Python">
<pre class="text-on-surface-variant"><span class="text-white">from</span> hyperrag <span class="text-white">import</span> HyperRAG

hr = HyperRAG()
ctrl = hr.deploy()

<span class="text-gray-500"># Query as usual - HyperRAG optimizes automatically</span>
r = ctrl.query(
    text=<span class="text-amber-300">"What is transformer attention?"</span>,
    doc_ids=[<span class="text-amber-300">"d1"</span>, <span class="text-amber-300">"d2"</span>],
)

<span class="text-gray-500"># Metrics available from first request</span>
<span class="text-white">print</span>(r.latency_ms, <span class="text-amber-300">"ms"</span>)
<span class="text-white">print</span>(ctrl.metrics())</pre>
            </app-code-window>
          </div>
        </div>
      </section>

      <!-- Model support -->
      <section id="models" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          <!-- Left: text -->
          <div>
            <p class="label-caps mb-4">Model support</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Built for production models.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              Works with popular open-weight model families out of the box — from 1B to 405B. Custom models and private deployments supported. HyperRAG's cache optimization is model-agnostic; it works at the serving layer, not inside the model.
            </p>
          </div>

          <!-- Right: model family pill list -->
          <div class="flex flex-wrap gap-3">
            @for (model of modelFamilies; track model.family) {
              <div class="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                <lucide-icon [img]="Microchip" [size]="14" class="text-outline" />
                <span class="font-display font-semibold text-on-surface text-sm">{{ model.family }}</span>
                <span class="font-mono text-[10px] uppercase tracking-[0.12em] text-outline">{{ model.sizes }}</span>
              </div>
            }
          </div>

        </div>
      </section>

      <!-- Benchmarks -->
      <section id="benchmarks" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Benchmarks"
          subhead="1,000 queries across four production workload patterns. Measured on open-weight models from 7B to 70B."
        >
          <span class="text-white">Up to 6x</span> faster, measured.
        </app-section-header>

        <div class="max-w-5xl mx-auto">
          <app-bench-bars
            eyebrow="Response time (ms) · Lower is better"
            title="HyperRAG vs baseline"
            subtitle="Select a model and workload type to compare baseline response time against HyperRAG."
            [modelOptions]="benchModelOptions"
            [hardwareOptions]="benchParadigmOptions"
            [series]="benchmarkSeries"
            [defaultModel]="'qwen7b'"
            [defaultHardware]="'hyperscale'"
          />

          <p class="text-center text-xs font-mono uppercase tracking-[0.16em] text-outline mt-4">
            Benchmarks measured on text-only models. Results will vary based on traffic pattern and hardware.
          </p>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section id="cta" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <div class="dv-feature-icon mx-auto"><lucide-icon [img]="PackageSearch" [size]="22" /></div>
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Better cache. <span class="text-white">Same stack.</span>
          </h2>
          <p class="text-base text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            HyperRAG is available now on PyPI. Works with vLLM 0.4.0+ and Python 3.10+. Drop it in front of your inference API and see the difference immediately.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <app-cta-button variant="primary" routerLink="/pricing" fragment="contact-form">Talk to us</app-cta-button>
            <app-cta-button variant="glass" href="https://pypi.org/project/dv-hyperrag/" [external]="true">View on PyPI</app-cta-button>
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
        width: 40px;
        height: 40px;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
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
      .dv-outcome-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 0.5rem;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.18);
        color: #9d6fff;
      }
    `,
  ],
})
export class HyperRagPageComponent {
  private readonly seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly CircleCheck = CircleCheck;
  readonly Copy = Copy;
  readonly ExternalLink = ExternalLink;
  readonly Search = Search;
  readonly Gauge = Gauge;
  readonly Zap = Zap;
  readonly TrendingUp = TrendingUp;
  readonly GitBranch = GitBranch;
  readonly Database = Database;
  readonly Shuffle = Shuffle;
  readonly ChartBar = ChartBar;
  readonly Server = Server;
  readonly Cpu = Cpu;
  readonly Route = Route;
  readonly Workflow = Workflow;
  readonly Microchip = Microchip;
  readonly PackageSearch = PackageSearch;


  readonly railSections: RailSection[] = [
    { id: 'hero',         label: 'Overview' },
    { id: 'challenge',    label: 'The problem' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'system',       label: 'What you get' },
    { id: 'use-cases',    label: 'Use cases' },
    { id: 'code',         label: 'Integration' },
    { id: 'models',       label: 'Models' },
    { id: 'benchmarks',   label: 'Benchmarks' },
    { id: 'cta',          label: 'Get in touch' },
  ];



  readonly ragChallenges: ChallengeCallout[] = [
    {
      icon: PackageSearch,
      highlight: 'Shared prefixes go undetected',
      body: 'when multiple requests reference the same documents, the default cache has no way to identify and reuse that overlapping context.',
    },
    {
      icon: Database,
      highlight: 'Eviction ignores value',
      body: 'cached context is dropped by recency, not by how often it is reused — so the most valuable entries are evicted just when they are needed most.',
    },
    {
      icon: Workflow,
      highlight: 'Retrieval and generation are uncoordinated',
      body: 'the LLM waits for retrieval to finish before doing anything useful, even when shared context is already cached and ready.',
    },
  ];

  readonly benchModelOptions: BenchOption[] = [
    { id: 'qwen7b', label: 'Qwen2.5 7B' },
    { id: 'llama8b', label: 'Llama 3 8B' },
    { id: 'qwen14b', label: 'Qwen2.5 14B' },
    { id: 'llama70b', label: 'Llama 3 70B' },
  ];

  readonly benchParadigmOptions: BenchOption[] = [
    { id: 'hyperscale', label: 'High-volume queries' },
    { id: 'long_context', label: 'Long documents' },
    { id: 'iterative', label: 'Multi-step agents' },
    { id: 'rewriter_reranker', label: 'Complex pipelines' },
  ];

  /**
   * Lower-is-better metric: TTFT (ms). We invert by feeding the data as
   * "speedup" units (baseline / optimized) so higher is better visually.
   */
  readonly benchmarkSeries: Record<string, BenchSeries[]> = (() => {
    const data: Record<
      string,
      Record<string, { baseline: number; optimized: number }>
    > = {
      qwen7b: {
        hyperscale: { baseline: 56.4, optimized: 9.8 },
        long_context: { baseline: 56.8, optimized: 10.4 },
        iterative: { baseline: 57.1, optimized: 10.4 },
        rewriter_reranker: { baseline: 57.1, optimized: 9.1 },
      },
      llama8b: {
        hyperscale: { baseline: 61.7, optimized: 21.9 },
        long_context: { baseline: 61.9, optimized: 21.7 },
        iterative: { baseline: 62.1, optimized: 21.6 },
        rewriter_reranker: { baseline: 62.0, optimized: 21.5 },
      },
      qwen14b: {
        hyperscale: { baseline: 108.8, optimized: 40.8 },
        long_context: { baseline: 108.8, optimized: 40.8 },
        iterative: { baseline: 108.9, optimized: 40.8 },
        rewriter_reranker: { baseline: 108.8, optimized: 40.8 },
      },
      llama70b: {
        hyperscale: { baseline: 220.1, optimized: 112.0 },
        long_context: { baseline: 222.5, optimized: 111.9 },
        iterative: { baseline: 224.5, optimized: 113.0 },
        rewriter_reranker: { baseline: 223.3, optimized: 112.5 },
      },
    };

    const out: Record<string, BenchSeries[]> = {};
    Object.entries(data).forEach(([model, paradigms]) => {
      Object.entries(paradigms).forEach(([paradigm, vals]) => {
        const speedup = vals.baseline / vals.optimized;
        out[`${model}:${paradigm}`] = [
          {
            title: 'TTFT speedup vs baseline',
            annotation: 'Higher is better',
            ceiling: Math.max(speedup, 6),
            rows: [
              {
                label: 'HyperRAG',
                value: Number(speedup.toFixed(2)),
                stddev: 0.05,
                accent: 'neon',
              },
              {
                label: 'Baseline',
                value: 1,
                stddev: 0.02,
                accent: 'muted',
              },
            ],
          },
          {
            title: 'TTFT (ms), lower is better',
            annotation: 'Lower is better',
            ceiling: vals.baseline,
            rows: [
              {
                label: 'HyperRAG',
                value: vals.optimized,
                accent: 'neon',
              },
              {
                label: 'Baseline',
                value: vals.baseline,
                accent: 'muted',
              },
            ],
          },
        ];
      });
    });
    return out;
  })();

  readonly modelFamilies = [
    { family: 'LLaMA 3.x', sizes: '1B–405B' },
    { family: 'Mistral', sizes: '7B, Nemo 12B' },
    { family: 'Gemma 2', sizes: '2B, 9B, 27B' },
    { family: 'Qwen 2.5', sizes: '7B, 14B, 72B' },
    { family: 'DeepSeek R1', sizes: '7B, 70B' },
    { family: 'Phi-3', sizes: 'Mini · Medium' },
  ];


  readonly benchmarkModels = [
    { id: 'qwen7b', label: 'Qwen2.5 7B' },
    { id: 'llama8b', label: 'Llama 3 8B' },
    { id: 'qwen14b', label: 'Qwen2.5 14B' },
    { id: 'llama70b', label: 'Llama 3 70B' },
  ];

  selectedModel = signal('qwen7b');
  pipCopied = signal(false);

  private readonly allBenchmarkData: Record<
    string,
    { paradigm: string; baseline: string; optimized: string; speedup: string; highlight: boolean }[]
  > = {
    qwen7b: [
      { paradigm: 'Hyperscale', baseline: '56.4 ms', optimized: '9.8 ms', speedup: '5.73x', highlight: true },
      { paradigm: 'Long Context', baseline: '56.8 ms', optimized: '10.4 ms', speedup: '5.47x', highlight: false },
      { paradigm: 'Iterative', baseline: '57.1 ms', optimized: '10.4 ms', speedup: '5.50x', highlight: false },
      { paradigm: 'Rewriter-Reranker', baseline: '57.1 ms', optimized: '9.1 ms', speedup: '6.28x', highlight: true },
    ],
    llama8b: [
      { paradigm: 'Hyperscale', baseline: '61.7 ms', optimized: '21.9 ms', speedup: '2.82x', highlight: false },
      { paradigm: 'Long Context', baseline: '61.9 ms', optimized: '21.7 ms', speedup: '2.85x', highlight: false },
      { paradigm: 'Iterative', baseline: '62.1 ms', optimized: '21.6 ms', speedup: '2.88x', highlight: true },
      { paradigm: 'Rewriter-Reranker', baseline: '62.0 ms', optimized: '21.5 ms', speedup: '2.88x', highlight: true },
    ],
    qwen14b: [
      { paradigm: 'Hyperscale', baseline: '108.8 ms', optimized: '40.8 ms', speedup: '2.67x', highlight: true },
      { paradigm: 'Long Context', baseline: '108.8 ms', optimized: '40.8 ms', speedup: '2.67x', highlight: false },
      { paradigm: 'Iterative', baseline: '108.9 ms', optimized: '40.8 ms', speedup: '2.67x', highlight: false },
      { paradigm: 'Rewriter-Reranker', baseline: '108.8 ms', optimized: '40.8 ms', speedup: '2.67x', highlight: false },
    ],
    llama70b: [
      { paradigm: 'Hyperscale', baseline: '220.1 ms', optimized: '112.0 ms', speedup: '1.97x', highlight: false },
      { paradigm: 'Long Context', baseline: '222.5 ms', optimized: '111.9 ms', speedup: '1.99x', highlight: true },
      { paradigm: 'Iterative', baseline: '224.5 ms', optimized: '113.0 ms', speedup: '1.99x', highlight: false },
      { paradigm: 'Rewriter-Reranker', baseline: '223.3 ms', optimized: '112.5 ms', speedup: '1.98x', highlight: false },
    ],
  };

  benchmarkRows = computed(() => this.allBenchmarkData[this.selectedModel()]);

  constructor() {
    this.seo.set({
      title: 'HyperRAG | Deep Variance',
      description:
        'Your inference framework already has KV cache. HyperRAG makes it up to 6x more effective — smarter eviction, prefix reuse, and coordinated scheduling on top of vLLM, SGLang, and TensorRT-LLM.',
      path: '/hyperrag',
    });
  }

  copyPip(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText('pip install dv-hyperrag');
    this.pipCopied.set(true);
    setTimeout(() => this.pipCopied.set(false), 2000);
  }
}
