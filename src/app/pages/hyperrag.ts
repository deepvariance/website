import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CircleCheck,
  Cpu,
  Database,
  LucideAngularModule,
  Microchip,
  PackageSearch,
  Route,
  Search,
  Server,
  Workflow,
  Zap,
} from 'lucide-angular';

import {
  AllModelEntry,
  BenchAllModelsComponent,
} from '../components/bench-all-models';
import {
  BenchBarsComponent,
  BenchModelData,
  BenchOption,
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
    BenchAllModelsComponent,
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

          <!-- Desktop: funnel diagram of requests served by HyperRAG, absolute right, mix-blend-mode:screen -->
          <div class="hidden desk:block absolute inset-y-0 right-0 w-[44%] pointer-events-none select-none">
            <img
              src="/hyperrag-hero.webp"
              alt="Infographic: ten violet document queries on the left feed into a glowing hexagonal HyperRAG capsule. Eight emerald lines exit right to checkmark nodes (cache hits). Two amber lines curve down to a small GPU chip (the rare compute path)."
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
              alt="Infographic: ten violet document queries on the left feed into a glowing hexagonal HyperRAG capsule. Eight emerald lines exit right to checkmark nodes (cache hits). Two amber lines curve down to a small GPU chip (the rare compute path)."
              width="1536" height="1024"
              class="w-full"
              style="mix-blend-mode:screen;opacity:0.85"
            />
          </div>

          <!-- Hero text -->
          <div class="w-full desk:max-w-[700px] pt-6 desk:pt-32 pb-8 desk:pb-16">
            <div class="mb-7">
              <app-status-pill variant="beta">HyperRAG · Public beta</app-status-pill>
            </div>

            <h1 class="font-display font-bold tracking-tight text-on-surface text-2xl sm:text-5xl md:text-[3.7rem] leading-[1.04] mb-6">
              Your KV cache exists.<br/>
              <span class="text-white">We make it better.</span>
            </h1>

            <p class="max-w-xl text-base text-on-surface-variant font-medium leading-relaxed mb-8">
              Every major inference server ships with KV cache. But default caching leaves most of that capacity on the table. HyperRAG is a drop-in optimization layer that makes your existing cache capture far more hits, automatically, from the first request.
            </p>

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

      <!-- Slots into -->
      <section class="border-b border-border">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div class="py-4 flex flex-col desk:flex-row desk:items-center gap-3 desk:gap-8">
            <p class="font-mono text-[10px] uppercase tracking-[0.22em] text-center desk:text-left" style="color:#8a8a8a">Slots into</p>
            <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <img src="/vllm-logo.webp" alt="vLLM" width="280" height="80" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
              <img src="/sglang-logo.webp" alt="SGLang" width="262" height="80" style="height:22px;width:auto;filter:grayscale(1) brightness(4);opacity:0.5" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- Challenge -->
      <section id="challenge" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Left: visualization -->
          <div class="overflow-hidden">
            <img
              src="/hyperrag-challenge.webp"
              alt="Four amber server towers each independently reprocessing the same document, showing redundant GPU compute across identical requests."
              width="1536" height="1024"
              class="w-full h-auto"
              style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)"
              loading="lazy"
            />
          </div>

          <!-- Right: text -->
          <div>
            <p class="label-caps mb-4">The problem</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Your cache is working. Just not hard enough.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed mb-6">
              Every major inference server ships with built-in KV cache. But the default implementation doesn't recognize when queries share the same documents, doesn't know which cached entries are worth keeping, and doesn't prevent the model from sitting idle while retrieval runs. Your GPU ends up reprocessing context it has already seen.
            </p>
            <div class="space-y-5">
              @for (item of ragChallenges; track item.highlight) {
                <div class="flex gap-4 items-start">
                  <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                    <lucide-icon [img]="item.icon" [size]="14" />
                  </span>
                  <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                    <span class="font-display font-semibold text-on-surface">{{ item.highlight }}: </span>{{ item.body }}
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

          <!-- Left: flow diagram visualization -->
          <div class="overflow-hidden">
            <img
              src="/hyperrag-howitworks.webp"
              alt="A flow diagram showing three incoming requests merging into a central HyperRAG decision node, then splitting into a fast emerald cache-hit path and a heavier teal compute path that both reconverge at a final output."
              width="1536" height="1024"
              class="w-full h-auto"
              style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)"
              loading="lazy"
            />
          </div>

          <!-- Right: narrative -->
          <div>
            <p class="label-caps mb-4">How it works</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              Smarter decisions on every request.
            </h2>
            <p class="font-mono text-base text-on-surface-variant leading-relaxed">
              HyperRAG sits in front of your inference API. It identifies shared document context across incoming requests and routes them to cached computation your framework already has, rather than reprocessing the same context from scratch each time.
            </p>
          </div>

        </div>
      </section>

      <!-- What you get -->
      <section id="system" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Left: visualization -->
          <div class="overflow-hidden">
            <img
              src="/hyperrag-whatyouget.webp"
              alt="A single luminous violet cache tower at the center, with twelve curved fiber lines radiating outward to small green and violet endpoint nodes, representing one source serving many concurrent requests."
              width="1536" height="1024"
              class="w-full h-auto"
              style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)"
              loading="lazy"
            />
          </div>

          <!-- Right: narrative -->
          <div>
            <p class="label-caps mb-4">What you get</p>
            <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
              More from the cache you already have.
            </h2>
            <div class="space-y-5">
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                  <lucide-icon [img]="CircleCheck" [size]="14" />
                </span>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">Cache hits compound: </span>repeated document context is recognized and reused across concurrent requests, not just sequential ones.
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                  <lucide-icon [img]="CircleCheck" [size]="14" />
                </span>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">Popular entries stay resident: </span>smarter eviction keeps the context your users hit most in memory when traffic spikes.
                </p>
              </div>
              <div class="flex gap-4 items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-md text-on-surface-variant bg-surface-dim border border-border mt-0.5">
                  <lucide-icon [img]="CircleCheck" [size]="14" />
                </span>
                <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
                  <span class="font-display font-semibold text-on-surface">Generation starts sooner: </span>prefill overlap cuts time-to-first-token. Your GPU stops idling while retrieval finishes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Use cases -->
      <section id="use-cases" class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
        <app-section-header eyebrow="Use cases" class="mb-10">
          Works across every <span class="text-white">RAG workload.</span>
        </app-section-header>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <app-glass-card extraClass="p-6 h-full flex flex-col gap-4">
            <div class="dv-feature-icon"><lucide-icon [img]="Server" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">High-volume APIs</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Shared document context across thousands of requests per minute. HyperRAG turns overlap into speedup.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col gap-4">
            <div class="dv-feature-icon"><lucide-icon [img]="Search" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">Enterprise search</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Internal queries return to the same pages repeatedly. Popular content stays fast as traffic scales.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col gap-4">
            <div class="dv-feature-icon"><lucide-icon [img]="Route" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">Agentic workflows</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Multi-step agents revisit documents across reasoning steps. Each revisit hits the cache, cutting cumulative latency.</p>
          </app-glass-card>
          <app-glass-card extraClass="p-6 h-full flex flex-col gap-4">
            <div class="dv-feature-icon"><lucide-icon [img]="Cpu" [size]="18" /></div>
            <p class="font-display font-semibold text-on-surface">Long-context inference</p>
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed flex-1">Similar long prompts share substantial context. HyperRAG reuses cached computation and cuts prefill cost.</p>
          </app-glass-card>
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
              Works with popular open-weight model families out of the box, from 1B to 405B. Custom models and private deployments are supported. HyperRAG's cache optimization is model-agnostic: it works at the serving layer, not inside the model.
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

      <!-- Code -->
      <section id="code" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24 border-b border-border">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-5">
            <span class="label-caps mb-4 inline-block">Integration</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-4xl mb-5 leading-tight">
              On top of your stack. <span class="text-white">Not instead of it.</span>
            </h2>
            <p class="text-base text-on-surface-variant mb-6 leading-relaxed">
              HyperRAG mounts in front of your existing inference API. No configuration, no cluster changes. Start getting cache hits on the first query.
            </p>
            <div class="mb-6">
              <app-command-row
                command="pip install dv-hyperrag"
                linkLabel="View on PyPI"
                href="https://pypi.org/project/dv-hyperrag/"
              />
            </div>
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

      <!-- Benchmarks -->
      <section id="benchmarks" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Benchmarks"
          subhead="1,000 queries per model across four RAG workload patterns. Tested on 14 production models from 2B to 120B parameters."
        >
          <span class="text-white">Up to 6x</span> faster, measured.
        </app-section-header>

        <!-- Aggregate stats across all 14 tested models -->
        <div class="max-w-3xl mx-auto mb-8">
          <div class="grid grid-cols-3 divide-x divide-border rounded-xl border border-border overflow-hidden">
            <div class="px-3 sm:px-6 py-4 sm:py-5 text-center bg-surface-dim">
              <p class="font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-1.5 sm:mb-2 leading-tight" style="font-size:9px;color:#8a8a8a">
                <span class="hidden sm:inline">Models tested</span>
                <span class="sm:hidden">Tested</span>
              </p>
              <p class="font-display font-bold text-white leading-none text-xl sm:text-[2.25rem]">14</p>
              <p class="font-mono mt-1 hidden sm:block" style="font-size:10px;color:#6b7280">2B to 120B params</p>
            </div>
            <div class="px-3 sm:px-6 py-4 sm:py-5 text-center bg-surface-dim">
              <p class="font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-1.5 sm:mb-2 leading-tight" style="font-size:9px;color:#8a8a8a">
                <span class="hidden sm:inline">Avg TTFT reduction</span>
                <span class="sm:hidden">Avg TTFT</span>
              </p>
              <p class="font-display font-bold leading-none text-xl sm:text-[2.25rem]" style="color:#a78bfa">54%</p>
              <p class="font-mono mt-1 hidden sm:block" style="font-size:10px;color:#6b7280">across all 14 models</p>
            </div>
            <div class="px-3 sm:px-6 py-4 sm:py-5 text-center bg-surface-dim">
              <p class="font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-1.5 sm:mb-2 leading-tight" style="font-size:9px;color:#8a8a8a">
                <span class="hidden sm:inline">Avg throughput gain</span>
                <span class="sm:hidden">Throughput</span>
              </p>
              <p class="font-display font-bold leading-none text-xl sm:text-[2.25rem]" style="color:#a78bfa">2.4×</p>
              <p class="font-mono mt-1 hidden sm:block" style="font-size:10px;color:#6b7280">tokens per second</p>
            </div>
          </div>
        </div>

        <!-- View toggle -->
        <div class="flex items-center gap-2 justify-center mb-6">
          <button
            class="bench-view-pill"
            [class.is-active]="benchView() === 'workload'"
            (click)="benchView.set('workload')"
          >By workload</button>
          <button
            class="bench-view-pill"
            [class.is-active]="benchView() === 'all'"
            (click)="benchView.set('all')"
          >All 14 models</button>
        </div>

        <div class="max-w-3xl mx-auto">
          @if (benchView() === 'workload') {
            <app-bench-bars
              [modelOptions]="benchModelOptions"
              [data]="benchData"
              defaultModel="qwen7b"
            />
          } @else {
            <app-bench-all-models [models]="allModelsData" />
          }

          <p class="text-center font-mono text-outline mt-5" style="font-size:11px;letter-spacing:0.05em">
            @if (benchView() === 'workload') {
              4 representative models shown. Averages computed across all 14 tested models. Results will vary by workload and hardware.
            } @else {
              All 14 tested models. Results will vary by workload and hardware.
            }
          </p>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section id="cta" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <div class="dv-feature-icon mx-auto"><lucide-icon [img]="PackageSearch" [size]="22" /></div>
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Your stack stays. <span class="text-white">Your latency drops.</span>
          </h2>
          <p class="text-base text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            HyperRAG is available now on PyPI. Drop it in front of your inference API and start seeing the difference immediately.
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
      .bench-view-pill {
        background: #1a1a2e;
        border: 1px solid #2d2d4e;
        border-radius: 6px;
        padding: 5px 16px;
        font-size: 13px;
        font-family: 'Space Grotesk', system-ui, sans-serif;
        font-weight: 500;
        color: #9ca3af;
        cursor: pointer;
        transition: border-color 150ms, color 150ms, background 150ms;
        line-height: 1.5;
      }
      .bench-view-pill:hover { border-color: rgba(124,58,237,0.45); color: #c4b5fd; }
      .bench-view-pill.is-active { background: #2d1b6b; border-color: #7c3aed; color: #ffffff; }

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

  readonly CircleCheck = CircleCheck;
  readonly Search = Search;
  readonly Zap = Zap;
  readonly Database = Database;
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
    { id: 'models',       label: 'Models' },
    { id: 'code',         label: 'Integration' },
    { id: 'benchmarks',   label: 'Benchmarks' },
    { id: 'cta',          label: 'Get in touch' },
  ];



  readonly ragChallenges: ChallengeCallout[] = [
    {
      icon: PackageSearch,
      highlight: 'Duplicate work on every request',
      body: 'when different users reference the same documents, each request rebuilds that context from scratch. The overlap goes unrecognized and you pay for the same compute repeatedly.',
    },
    {
      icon: Database,
      highlight: 'The cache drops what matters most',
      body: 'entries are evicted by recency, not by how often they are reused. At peak load, your most-requested context is the first to go, forcing expensive recomputes exactly when you can least afford them.',
    },
    {
      icon: Workflow,
      highlight: 'Generation stalls waiting on retrieval',
      body: 'the model sits idle until documents are fetched, even when shared context is already in the cache and ready to use. Latency compounds at scale.',
    },
  ];

  readonly benchView = signal<'workload' | 'all'>('workload');

  readonly benchModelOptions: BenchOption[] = [
    { id: 'qwen7b',   label: 'Qwen2.5 7B' },
    { id: 'llama8b',  label: 'Llama 3 8B' },
    { id: 'qwen14b',  label: 'Qwen2.5 14B' },
    { id: 'llama70b', label: 'Llama 3 70B' },
  ];

  readonly benchData: BenchModelData = {
    qwen7b: [
      { id: 'hyperscale',        label: 'High-volume',   hyperMs:  9.8,  baseMs:  56.4 },
      { id: 'long_context',      label: 'Long docs',     hyperMs: 10.4,  baseMs:  56.8 },
      { id: 'iterative',         label: 'Multi-step',    hyperMs: 10.4,  baseMs:  57.1 },
      { id: 'rewriter_reranker', label: 'Complex pipes', hyperMs:  9.1,  baseMs:  57.1 },
    ],
    llama8b: [
      { id: 'hyperscale',        label: 'High-volume',   hyperMs: 21.9,  baseMs:  61.7 },
      { id: 'long_context',      label: 'Long docs',     hyperMs: 21.7,  baseMs:  61.9 },
      { id: 'iterative',         label: 'Multi-step',    hyperMs: 21.6,  baseMs:  62.1 },
      { id: 'rewriter_reranker', label: 'Complex pipes', hyperMs: 21.5,  baseMs:  62.0 },
    ],
    qwen14b: [
      { id: 'hyperscale',        label: 'High-volume',   hyperMs: 40.8,  baseMs: 108.8 },
      { id: 'long_context',      label: 'Long docs',     hyperMs: 40.8,  baseMs: 108.8 },
      { id: 'iterative',         label: 'Multi-step',    hyperMs: 40.8,  baseMs: 108.9 },
      { id: 'rewriter_reranker', label: 'Complex pipes', hyperMs: 40.8,  baseMs: 108.8 },
    ],
    llama70b: [
      { id: 'hyperscale',        label: 'High-volume',   hyperMs: 112.0, baseMs: 220.1 },
      { id: 'long_context',      label: 'Long docs',     hyperMs: 111.9, baseMs: 222.5 },
      { id: 'iterative',         label: 'Multi-step',    hyperMs: 113.0, baseMs: 224.5 },
      { id: 'rewriter_reranker', label: 'Complex pipes', hyperMs: 112.5, baseMs: 223.3 },
    ],
  };

  readonly allModelsData: AllModelEntry[] = [
    { label: 'Qwen2.5-7B',       ttftPct: 82.6, throughputX: 5.74, hyperMs:  9.9, baseMs:  56.8, hyperTps:  79011, baseTps: 13771 },
    { label: 'Llama-3-8B',       ttftPct: 64.9, throughputX: 2.85, hyperMs: 21.7, baseMs:  61.9, hyperTps:  35367, baseTps: 12398 },
    { label: 'Qwen2.5-3B',       ttftPct: 64.3, throughputX: 2.80, hyperMs: 11.0, baseMs:  30.8, hyperTps:  71110, baseTps: 25397 },
    { label: 'Qwen2.5-14B',      ttftPct: 62.7, throughputX: 2.68, hyperMs: 40.8, baseMs: 109.3, hyperTps:  19172, baseTps:  7157 },
    { label: 'Qwen3-8B',         ttftPct: 60.9, throughputX: 2.56, hyperMs: 24.8, baseMs:  63.4, hyperTps:  31306, baseTps: 12247 },
    { label: 'Phi-4',            ttftPct: 57.2, throughputX: 2.34, hyperMs: 45.8, baseMs: 107.0, hyperTps:  16640, baseTps:  7123 },
    { label: 'Mistral-Small-24B',ttftPct: 54.9, throughputX: 2.22, hyperMs: 52.1, baseMs: 115.6, hyperTps:  15076, baseTps:  6795 },
    { label: 'Llama-3-70B',      ttftPct: 50.0, throughputX: 2.00, hyperMs: 112.0,baseMs: 223.9, hyperTps:   6852, baseTps:  3428 },
    { label: 'DeepSeek-R1-32B',  ttftPct: 48.7, throughputX: 1.95, hyperMs: 80.5, baseMs: 156.8, hyperTps:   9507, baseTps:  4881 },
    { label: 'Gemma-3-12B',      ttftPct: 45.6, throughputX: 1.84, hyperMs: 65.8, baseMs: 120.9, hyperTps:  11566, baseTps:  6295 },
    { label: 'DeepSeek-R1-70B',  ttftPct: 45.0, throughputX: 1.82, hyperMs: 128.7,baseMs: 234.0, hyperTps:   5919, baseTps:  3255 },
    { label: 'GPT-OSS-120B',     ttftPct: 43.4, throughputX: 1.77, hyperMs: 112.8,baseMs: 199.2, hyperTps:   6641, baseTps:  3761 },
    { label: 'Nemotron-30B',     ttftPct: 39.1, throughputX: 1.64, hyperMs: 95.5, baseMs: 156.7, hyperTps:   8225, baseTps:  5013 },
    { label: 'Qwen3.5-2B',       ttftPct: 32.1, throughputX: 1.47, hyperMs: 33.6, baseMs:  49.5, hyperTps:  23070, baseTps: 15660 },
  ];

  readonly modelFamilies = [
    { family: 'LLaMA 3.x', sizes: '1B–405B' },
    { family: 'Mistral', sizes: '7B, Nemo 12B' },
    { family: 'Gemma 2', sizes: '2B, 9B, 27B' },
    { family: 'Qwen 2.5', sizes: '7B, 14B, 72B' },
    { family: 'DeepSeek R1', sizes: '7B, 70B' },
    { family: 'Phi-3', sizes: 'Mini · Medium' },
  ];



  constructor() {
    this.seo.set({
      title: 'HyperRAG | Deep Variance',
      description:
        'Your inference framework already has KV cache. HyperRAG makes it up to 6x more effective with smarter eviction, prefix reuse, and coordinated scheduling on top of vLLM, SGLang, and TensorRT-LLM.',
      path: '/hyperrag',
    });
  }

}
