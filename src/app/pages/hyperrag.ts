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
  Workflow,
  Zap,
} from 'lucide-angular';

import {
  AccordionComponent,
  AccordionItem,
} from '../components/accordion';
import {
  BenchBarsComponent,
  BenchOption,
  BenchSeries,
} from '../components/bench-bars';
import {
  ChallengeCalloutsComponent,
  ChallengeCallout,
} from '../components/challenge-callouts';
import { CodeWindowComponent } from '../components/code-window';
import { CommandRowComponent } from '../components/command-row';
import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
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
  selector: 'app-hyperrag',
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
    AccordionComponent,
    BenchBarsComponent,
    ChallengeCalloutsComponent,
    CommandRowComponent,
    SectionRailComponent,
    StatusPillComponent,
    ToolStripComponent,
  ],
  template: `
    <div class="relative">
      <app-section-rail [sections]="railSections" ariaLabel="HyperRAG section navigation" />

      <!-- Hero -->
      <section id="hero" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div aria-hidden="true" class="hero-halo-neon top-12 left-1/2 -translate-x-1/2 opacity-70"></div>
        <div aria-hidden="true" class="hero-halo-indigo left-[-10%] top-0"></div>

        <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left -->
          <div class="lg:col-span-7 flex flex-col justify-center">
            <div class="self-start mb-7">
              <app-status-pill variant="beta">HyperRAG · Public beta</app-status-pill>
            </div>
            <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.25rem] sm:text-5xl md:text-[3.7rem] leading-[1.04] mb-6">
              KV cache optimization
              <br class="hidden sm:block" />
              <span class="text-white">for RAG serving</span>.
            </h1>
            <p class="max-w-xl text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed mb-8">
              Up to 6x faster TTFT. HyperRAG improves caching, scheduling, and execution across your
              existing RAG stack, no model changes.
            </p>

            <div class="mb-10">
              <app-command-row
                command="pip install dv-hyperrag"
                linkLabel="View on PyPI"
                href="https://pypi.org/project/dv-hyperrag/"
              />
            </div>

            <app-stat-strip [stats]="heroStats" />
          </div>

          <!-- Right: Prefix-trie SVG -->
          <div class="lg:col-span-5">
            <app-glass-card variant="strong" rounded="2xl" extraClass="p-6 md:p-7 h-full" [glow]="true">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <p class="label-caps mb-1">KnowledgeTree</p>
                  <p class="font-display text-lg font-semibold text-on-surface">Prefix Trie · Hot</p>
                </div>
                <p class="font-display text-3xl font-bold text-white">94%</p>
              </div>

              <div class="rounded-xl bg-black/30 border border-white/5 p-5 mb-5">
                <svg viewBox="0 0 320 200" class="w-full h-auto">
                  <defs>
                    <linearGradient id="hrEdge" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stop-color="#9d6fff" stop-opacity="0.65" />
                      <stop offset="1" stop-color="#9d6fff" stop-opacity="0.15" />
                    </linearGradient>
                  </defs>
                  <!-- edges -->
                  <g stroke="url(#hrEdge)" stroke-width="1.2" fill="none">
                    <path d="M160 32 L 70 90" />
                    <path d="M160 32 L 160 90" />
                    <path d="M160 32 L 250 90" />
                    <path d="M70 100 L 30 160" />
                    <path d="M70 100 L 110 160" />
                    <path d="M160 100 L 130 160" />
                    <path d="M160 100 L 200 160" />
                    <path d="M250 100 L 230 160" />
                    <path d="M250 100 L 290 160" />
                  </g>
                  <!-- root -->
                  <g>
                    <circle cx="160" cy="22" r="11" fill="#030208" stroke="#9d6fff" stroke-width="1.5" />
                    <text x="160" y="25" font-family="IBM Plex Mono" font-size="9" fill="#c4b5fd" text-anchor="middle">root</text>
                  </g>
                  <!-- depth 1 -->
                  <g font-family="IBM Plex Mono" font-size="8" fill="#dae6d5" text-anchor="middle">
                    <circle cx="70" cy="98" r="11" fill="rgba(157,111,255,0.18)" stroke="#9d6fff" stroke-width="0.8" />
                    <text x="70" y="100">doc1</text>
                    <circle cx="160" cy="98" r="11" fill="rgba(157,111,255,0.18)" stroke="#9d6fff" stroke-width="0.8" />
                    <text x="160" y="100">doc2</text>
                    <circle cx="250" cy="98" r="11" fill="rgba(157,111,255,0.10)" stroke="rgba(157,111,255,0.45)" stroke-width="0.8" />
                    <text x="250" y="100" fill="#b9ccb5">doc3</text>
                  </g>
                  <!-- depth 2 -->
                  <g font-family="IBM Plex Mono" font-size="7" fill="#849581" text-anchor="middle">
                    <circle cx="30" cy="168" r="9" fill="rgba(255,255,255,0.04)" stroke="rgba(218,230,213,0.18)" stroke-width="0.8" />
                    <text x="30" y="170">q1</text>
                    <circle cx="110" cy="168" r="9" fill="rgba(157,111,255,0.22)" stroke="#9d6fff" stroke-width="0.8" />
                    <text x="110" y="170" fill="#c4b5fd">q2</text>
                    <circle cx="130" cy="168" r="9" fill="rgba(255,255,255,0.04)" stroke="rgba(218,230,213,0.18)" stroke-width="0.8" />
                    <text x="130" y="170">q3</text>
                    <circle cx="200" cy="168" r="9" fill="rgba(157,111,255,0.22)" stroke="#9d6fff" stroke-width="0.8" />
                    <text x="200" y="170" fill="#c4b5fd">q4</text>
                    <circle cx="230" cy="168" r="9" fill="rgba(255,255,255,0.04)" stroke="rgba(218,230,213,0.18)" stroke-width="0.8" />
                    <text x="230" y="170">q5</text>
                    <circle cx="290" cy="168" r="9" fill="rgba(255,255,255,0.04)" stroke="rgba(218,230,213,0.18)" stroke-width="0.8" />
                    <text x="290" y="170">q6</text>
                  </g>
                </svg>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="kpi-rail rounded-md bg-black/20 border border-white/5 px-4 py-3">
                  <p class="label-caps mb-1">Cache Hit</p>
                  <p class="font-display text-xl font-bold text-white">94.2%</p>
                </div>
                <div class="kpi-rail rounded-md bg-black/20 border border-white/5 px-4 py-3">
                  <p class="label-caps mb-1">Avg TTFT</p>
                  <p class="font-display text-xl font-bold text-on-surface">9.8 ms</p>
                </div>
              </div>
            </app-glass-card>
          </div>
        </div>
      </section>

      <!-- Tool strip -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pb-10 md:pb-12">
        <app-tool-strip label="Slots into" [tools]="tools" />
      </section>

      <!-- How it works (accordion) -->
      <section id="how-it-works" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="How it works"
          subhead="HyperRAG sits between your retriever and your LLM. Plug in your existing pipeline, get optimized serving out."
        >
          Three steps from <span class="text-white">workload to production</span>.
        </app-section-header>

        <app-accordion [items]="howItWorks" />
      </section>

      <!-- Challenge -->
      <section id="challenge" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <app-challenge-callouts
          headline="Most retrieval stacks treat KV cache as a leftover."
          subhead="They allocate cache fresh on every request, evict by time-of-arrival, and never reason about prefix reuse. HyperRAG promotes KV cache to a first-class scheduling object."
          [items]="ragChallenges"
        />
      </section>

      <!-- Core system -->
      <section id="system" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Core system"
          subhead="HyperRAG combines cache reuse, adaptive eviction, speculative execution, and schedule selection into one serving layer."
        >
          Built for <span class="text-white">production RAG</span>.
        </app-section-header>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <app-glass-card extraClass="p-7">
            <div class="flex items-start gap-4 mb-4">
              <div class="dv-feature-icon !mb-0"><lucide-icon [img]="GitBranch" [size]="18" /></div>
              <div>
                <h3 class="font-display font-semibold text-on-surface mb-1">KnowledgeTree</h3>
                <span class="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded bg-surface-dim text-white border border-border">prefix trie</span>
              </div>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Reuses document context across similar queries so the system avoids repeated prefill
              work.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-7">
            <div class="flex items-start gap-4 mb-4">
              <div class="dv-feature-icon !mb-0"><lucide-icon [img]="Database" [size]="18" /></div>
              <div>
                <h3 class="font-display font-semibold text-on-surface mb-1">PGDSF Eviction</h3>
                <span class="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded bg-surface-dim text-white border border-border">cost-aware eviction</span>
              </div>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Keeps high-value context in fast memory and evicts low-impact entries first when
              memory pressure rises.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-7">
            <div class="flex items-start gap-4 mb-4">
              <div class="dv-feature-icon !mb-0"><lucide-icon [img]="Shuffle" [size]="18" /></div>
              <div>
                <h3 class="font-display font-semibold text-on-surface mb-1">Speculative Pipelining</h3>
                <span class="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded bg-surface-dim text-white border border-border">retrieve + prefill overlap</span>
              </div>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Starts useful work from cached context while slower retrieval completes in parallel to
              reduce wait time.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-7">
            <div class="flex items-start gap-4 mb-4">
              <div class="dv-feature-icon !mb-0"><lucide-icon [img]="ChartBar" [size]="18" /></div>
              <div>
                <h3 class="font-display font-semibold text-on-surface mb-1">Pareto Schedule Search</h3>
                <span class="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded bg-surface-dim text-white border border-border">auto plan search</span>
              </div>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Selects a serving plan that matches your traffic profile and balances low TTFT with
              stable throughput.
            </p>
          </app-glass-card>
        </div>
      </section>

      <!-- Paradigms -->
      <section id="paradigms" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Paradigms"
          subhead="Each paradigm captures a different system bottleneck. HyperRAG selects the right cost model and default tuning for each."
        >
          Four serving <span class="text-white">paradigms</span>.
        </app-section-header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          @for (p of paradigms; track p.title) {
            <app-glass-card extraClass="p-7">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="dv-feature-icon !mb-0">
                    <lucide-icon [img]="p.icon" [size]="18" />
                  </div>
                  <h3 class="font-display font-semibold text-on-surface">{{ p.title }}</h3>
                </div>
                <span class="text-[10px] font-mono px-2 py-1 rounded-md bg-black/30 text-outline border border-white/5">
                  {{ p.code }}
                </span>
              </div>
              <p class="text-sm text-on-surface-variant leading-relaxed mb-4">{{ p.desc }}</p>
              <div class="flex flex-wrap gap-2">
                @for (tag of p.tags; track tag.label) {
                  <span
                    class="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 rounded-md border"
                    [ngClass]="tag.highlight ? 'bg-surface-dim text-white border-border-hi' : 'bg-black/25 text-on-surface-variant border-white/10'"
                  >
                    {{ tag.label }}
                  </span>
                }
              </div>
            </app-glass-card>
          }
        </div>
      </section>

      <!-- Code -->
      <section id="code" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-5">
            <span class="label-caps mb-4 inline-block">Drop-in integration</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-4xl mb-5 leading-tight">
              Fits into <span class="text-white">any RAG pipeline</span>.
            </h2>
            <p class="text-on-surface-variant mb-8 leading-relaxed">
              HyperRAG wraps your current retriever and serving stack. Keep your model and retrieval
              flow, then add optimization and metrics in one integration step.
            </p>
            <ol class="space-y-5">
              <li class="flex gap-4">
                <span class="dv-step">1</span>
                <div>
                  <h4 class="font-display font-semibold text-on-surface mb-1">Configure and optimize</h4>
                  <p class="text-sm text-on-surface-variant leading-relaxed">
                    Set workload goals and hardware budget, then let HyperRAG generate the best
                    serving plan.
                  </p>
                </div>
              </li>
              <li class="flex gap-4">
                <span class="dv-step">2</span>
                <div>
                  <h4 class="font-display font-semibold text-on-surface mb-1">Build the serving controller</h4>
                  <p class="text-sm text-on-surface-variant leading-relaxed">
                    Deploy the selected plan as a single controller in front of your existing RAG
                    calls.
                  </p>
                </div>
              </li>
              <li class="flex gap-4">
                <span class="dv-step">3</span>
                <div>
                  <h4 class="font-display font-semibold text-on-surface mb-1">Process queries and read metrics</h4>
                  <p class="text-sm text-on-surface-variant leading-relaxed">
                    Run traffic normally and monitor TTFT, cache hit rate, and serving latency from
                    the built-in metrics.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div class="lg:col-span-7">
            <app-code-window filename="quickstart.py" language="Python">
<pre class="text-on-surface-variant"><span class="text-white">from</span> hyperrag <span class="text-white">import</span> HyperRAG

hr = HyperRAG()
plan = hr.optimize(workload=<span class="text-amber-300">"hyperscale"</span>)
ctrl = hr.deploy(plan)

r = ctrl.query(
    text=<span class="text-amber-300">"What is transformer attention?"</span>,
    doc_ids=[<span class="text-amber-300">"d1"</span>, <span class="text-amber-300">"d2"</span>],
)

<span class="text-white">print</span>(r.ttft_ms, r.latency_ms)
<span class="text-white">print</span>(ctrl.metrics())</pre>
            </app-code-window>
          </div>
        </div>
      </section>

      <!-- Model presets -->
      <section id="models" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Model presets"
          subhead="Common open-weight model families are supported out of the box, and custom models can be configured when needed."
        >
          Built-in <span class="text-white">model presets</span>.
        </app-section-header>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          @for (model of modelFamilies; track model.family) {
            <app-glass-card extraClass="p-5 text-center">
              <div class="w-9 h-9 mx-auto mb-3 rounded-md bg-neon/8 border border-neon/22 flex items-center justify-center text-white">
                <lucide-icon [img]="Microchip" [size]="16" />
              </div>
              <div class="font-display font-semibold text-on-surface text-sm mb-1">{{ model.family }}</div>
              <div class="text-[10px] font-mono uppercase tracking-[0.14em] text-outline">{{ model.sizes }}</div>
            </app-glass-card>
          }
        </div>

        <p class="text-center text-xs text-outline mt-8 font-mono uppercase tracking-[0.18em]">
          Tuned for practical deployment defaults across model sizes and serving profiles.
        </p>
      </section>

      <!-- Benchmarks -->
      <section id="benchmarks" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-section-header
          eyebrow="Benchmarks"
          subhead="1,000 queries across four RAG serving paradigms. Benchmarks are expanding across more models and configurations."
        >
          <span class="text-white">5x</span> faster TTFT, measured.
        </app-section-header>

        <div class="max-w-5xl mx-auto">
          <app-bench-bars
            eyebrow="TTFT (ms), Lower is better"
            title="HyperRAG vs baseline"
            subtitle="Pick a model and a paradigm to compare baseline TTFT against HyperRAG-optimized."
            [modelOptions]="benchModelOptions"
            [hardwareOptions]="benchParadigmOptions"
            [series]="benchmarkSeries"
            [defaultModel]="'qwen7b'"
            [defaultHardware]="'hyperscale'"
          />

          <p class="text-center text-xs font-mono uppercase tracking-[0.16em] text-outline mt-4">
            Results are for text-only models. Multimodal and vision-language models excluded.
          </p>
        </div>
      </section>

      <!-- Bottom CTA -->
      <section id="cta" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <app-glass-card variant="strong" rounded="2xl" extraClass="px-8 py-14 md:px-16 md:py-20 text-center" [glow]="true">
          <div class="dv-feature-icon mx-auto"><lucide-icon [img]="PackageSearch" [size]="22" /></div>
          <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-5xl mb-5 max-w-3xl mx-auto leading-tight">
            Start optimizing your <span class="text-white">RAG stack</span>.
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-9 leading-relaxed">
            HyperRAG is available now on PyPI. The GPU extras require vLLM 0.4.0 and Python 3.10+.
            Run the optimizer in simulation mode on any machine.
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

  readonly heroStats = [
    { value: 'Up to 6x', label: 'Faster TTFT', highlight: true },
    { value: '~180', label: 'Pareto frontier schedules' },
    { value: '±5%', label: 'Latency prediction' },
  ];

  readonly railSections: RailSection[] = [
    { id: 'hero', label: 'Overview' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'challenge', label: 'Why HyperRAG' },
    { id: 'system', label: 'Core system' },
    { id: 'paradigms', label: 'Paradigms' },
    { id: 'code', label: 'Code' },
    { id: 'models', label: 'Models' },
    { id: 'benchmarks', label: 'Benchmarks' },
    { id: 'cta', label: 'Get in touch' },
  ];

  readonly tools: ToolItem[] = [
    { name: 'vLLM' },
    { name: 'SGLang' },
    { name: 'TensorRT-LLM' },
    { name: 'Triton' },
    { name: 'FAISS' },
    { name: 'PostgreSQL' },
    { name: 'pgvector' },
  ];

  readonly howItWorks: AccordionItem[] = [
    {
      id: 'describe',
      title: 'Describe your workload',
      body: 'Tell HyperRAG your traffic pattern, model size, and latency goals. It maps your current serving constraints automatically.',
      bullets: [
        'Single-line `HyperRAG.optimize(workload="hyperscale")` API.',
        'Supports custom traffic mixes via JSON.',
        'Mirrors your existing retriever and LLM endpoints.',
      ],
      mockHtml:
        `<span style="color:#849581">$</span> python -c "<span style="color:#c4b5fd">from</span> hyperrag <span style="color:#c4b5fd">import</span> HyperRAG"<br/>
<span style="color:#849581">$</span> hr.<span style="color:#c4b5fd">describe_workload</span>(qps=850, mix=<span style="color:#fbbf24">"long_tail"</span>)<br/>
<span style="color:#849581">  → </span>traffic profile inferred · 1.3M tokens / day<br/>
<span style="color:#849581">  → </span>baseline plan: vLLM continuous batching<br/>
<span style="color:#849581">  → </span>headroom estimate: 4.2x TTFT`,
    },
    {
      id: 'pareto',
      title: 'Run Pareto schedule search',
      body: 'HyperRAG evaluates cache and scheduling plans, then selects the best latency-throughput tradeoff for your workload.',
      bullets: [
        'Evaluates ~180 schedules per workload.',
        'Cache reuse, eviction, and prefill batching co-tuned.',
        'Outputs a single deployable plan + simulator estimate.',
      ],
      mockHtml:
        `<span style="color:#849581">$</span> hr.<span style="color:#c4b5fd">search</span>()<br/>
  <span style="color:#849581">[12/180]</span> schedule="prefix-trie/PGDSF" → <span style="color:#c4b5fd">5.4x</span><br/>
  <span style="color:#849581">[78/180]</span> schedule="speculative+prefix" → <span style="color:#c4b5fd">5.7x</span><br/>
  <span style="color:#849581">[164/180]</span> schedule="hyperscale-rwd" → <span style="color:#fbbf24">6.1x</span><br/>
  <span style="color:#c4b5fd">selected</span> → 6.1x TTFT, 1.04x throughput`,
    },
    {
      id: 'serve',
      title: 'Serve with KV caching',
      body: 'Deploy the selected plan and start serving immediately. HyperRAG keeps tracking TTFT and cache efficiency in real time.',
      bullets: [
        'Drop-in controller in front of your existing RAG stack.',
        'Built-in metrics: TTFT, cache hit, prefix reuse.',
        'No model code changes.',
      ],
      mockHtml:
        `<span style="color:#849581">$</span> ctrl = hr.<span style="color:#c4b5fd">deploy</span>(plan)<br/>
<span style="color:#849581">$</span> ctrl.<span style="color:#c4b5fd">query</span>(<span style="color:#fbbf24">"What is transformer attention?"</span>)<br/>
  <span style="color:#849581">→ </span>ttft: <span style="color:#c4b5fd">9.8 ms</span> · cache: <span style="color:#c4b5fd">94.2%</span><br/>
  <span style="color:#849581">→ </span>p50 latency: 41 ms · p99: 128 ms`,
    },
  ];

  readonly ragChallenges: ChallengeCallout[] = [
    {
      icon: PackageSearch,
      highlight: 'One-size embeddings',
      body: 'force the same chunk strategy across short queries and long contexts, leaving recall on the floor for half the traffic.',
    },
    {
      icon: Database,
      highlight: 'Static eviction policies',
      body: 'evict by recency or LRU, never by reuse value, so prefill work for popular prefixes is repeated thousands of times per minute.',
    },
    {
      icon: Workflow,
      highlight: 'Detached schedulers',
      body: 'optimize the LLM in isolation from retrieval, so prefix-shared queries miss the chance to overlap prefill with the next retrieval.',
    },
  ];

  readonly benchModelOptions: BenchOption[] = [
    { id: 'qwen7b', label: 'Qwen2.5 7B' },
    { id: 'llama8b', label: 'Llama 3 8B' },
    { id: 'qwen14b', label: 'Qwen2.5 14B' },
    { id: 'llama70b', label: 'Llama 3 70B' },
  ];

  readonly benchParadigmOptions: BenchOption[] = [
    { id: 'hyperscale', label: 'Hyperscale' },
    { id: 'long_context', label: 'Long Context' },
    { id: 'iterative', label: 'Iterative' },
    { id: 'rewriter_reranker', label: 'Rewriter-Reranker' },
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

  readonly paradigms = [
    {
      title: 'Hyperscale',
      icon: Server,
      code: 'paradigm="hyperscale"',
      desc: 'Standard single-hop RAG at high query volume where retrieval overhead dominates.',
      tags: [
        { label: 'FAISS-bottlenecked', highlight: true },
        { label: '8B default', highlight: false },
        { label: '243.6 ms TTFT', highlight: false },
      ],
    },
    {
      title: 'Long Context',
      icon: Cpu,
      code: 'paradigm="long_context"',
      desc: 'Long-context generation where prefill dominates. HyperRAG improves prompt reuse and batching efficiency.',
      tags: [
        { label: 'Up to 6x speedup', highlight: true },
        { label: '70B default', highlight: false },
        { label: '3.4 ms TTFT', highlight: false },
      ],
    },
    {
      title: 'Iterative',
      icon: Route,
      code: 'paradigm="iterative"',
      desc: 'Multi-hop and agentic retrieval where repeated document access creates cumulative latency.',
      tags: [
        { label: 'Multi-hop', highlight: true },
        { label: '70B default', highlight: false },
        { label: 'FAISS x4', highlight: false },
      ],
    },
    {
      title: 'Rewriter-Reranker',
      icon: Workflow,
      code: 'paradigm="rewriter_reranker"',
      desc: 'Query rewriting and reranking pipelines where latency compounds across multiple model stages.',
      tags: [
        { label: 'Multi-stage', highlight: true },
        { label: '70B default', highlight: false },
        { label: 'Latency-sensitive', highlight: false },
      ],
    },
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
        'KV cache optimization for RAG serving. Prefix-trie caching, PGDSF eviction, speculative pipelining, and Pareto schedule search. Up to 6x faster TTFT.',
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
