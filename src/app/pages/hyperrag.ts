import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  ChevronRight,
  ChartBar,
  CircleCheck,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileCode,
  Gauge,
  GitBranch,
  LucideAngularModule,
  Microchip,
  PackageSearch,
  Route,
  Search,
  Server,
  Shuffle,
  Timer,
  Workflow,
  Zap,
} from 'lucide-angular';

@Component({
  selector: 'app-hyperrag',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="relative overflow-hidden">
      <!-- Grid Background -->
      <div class="hero-grid-overlay"></div>
      <div class="hero-glow hero-glow--amber"></div>

      <!-- Hero -->
      <section class="container mx-auto px-6 pt-28 sm:pt-32 md:pt-36 pb-10 text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/5 border border-amber-500/10 text-amber-600 text-[11px] font-bold uppercase tracking-wider mb-8"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"
            ></span>
          </span>
          HyperRAG - Now in beta.
        </div>

        <h1
          class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8 max-w-5xl mx-auto"
        >
          HyperRAG:<br />
          <span class="sm:whitespace-nowrap">KV cache optimization</span>
          <span class="text-amber-500"> for RAG serving</span>.
        </h1>

        <p
          class="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Reduce time-to-first-token by up to 6x. HyperRAG improves caching,
          scheduling, and execution across your existing RAG stack with no
          model changes.
        </p>

        <!-- pip install -->
        <div
          class="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm mb-12 shadow-sm"
        >
          <span class="text-slate-400 select-none">$&nbsp;</span>
          <span class="select-all"
            ><span class="text-amber-600">pip install </span
            ><span class="text-slate-700">dv-hyperrag</span></span
          >
          <button
            (click)="copyPip()"
            class="ml-2 transition-colors"
            [class.text-amber-500]="pipCopied()"
            [class.text-slate-400]="!pipCopied()"
            title="Copy"
          >
            @if (pipCopied()) {
              <lucide-icon [img]="CircleCheck" [size]="16" />
            } @else {
              <lucide-icon [img]="Copy" [size]="16" />
            }
          </button>
          <a
            href="https://pypi.org/project/dv-hyperrag/"
            target="_blank"
            rel="noopener"
            class="text-slate-400 hover:text-slate-700 transition-colors"
            title="View on PyPI"
          >
            <lucide-icon [img]="ExternalLink" [size]="16" />
          </a>
        </div>

        <!-- Stats -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200/60 rounded-2xl overflow-hidden max-w-3xl mx-auto border border-slate-200/60"
        >
          <div class="bg-white px-8 py-6 text-center">
            <p class="text-4xl font-header font-bold text-dark tracking-tight mb-1">Up to 6x</p>
            <p class="text-xs text-slate-500 font-medium uppercase tracking-widest">Faster TTFT</p>
          </div>
          <div class="bg-white px-8 py-6 text-center">
            <p class="text-4xl font-header font-bold text-dark tracking-tight mb-1">~180</p>
            <p class="text-xs text-slate-500 font-medium uppercase tracking-widest">Schedules on Pareto frontier</p>
          </div>
          <div class="bg-white px-8 py-6 text-center">
            <p class="text-4xl font-header font-bold text-dark tracking-tight mb-1">±5%</p>
            <p class="text-xs text-slate-500 font-medium uppercase tracking-widest">Latency prediction accuracy</p>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
          >
            Three steps from workload to production
          </h2>
          <p class="text-slate-500 max-w-xl mx-auto font-medium">
            HyperRAG sits between your retriever and your LLM. Plug in your
            existing pipeline, get optimized serving out.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <!-- Step 1 -->
          <div
            class="relative bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
          >
            <div
              class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6"
            >
              <lucide-icon [img]="Search" [size]="20" />
            </div>
            <div class="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest mb-2">
              Step 1
            </div>
            <h3 class="font-header font-bold text-dark text-lg mb-3">
              Describe your workload
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              Tell HyperRAG your traffic pattern, model size, and latency
              goals. It maps your current serving constraints automatically.
            </p>
          </div>

          <!-- Step 2 -->
          <div
            class="relative bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
          >
            <div
              class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6"
            >
              <lucide-icon [img]="Gauge" [size]="20" />
            </div>
            <div class="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest mb-2">
              Step 2
            </div>
            <h3 class="font-header font-bold text-dark text-lg mb-3">
              Run Pareto schedule search
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              HyperRAG evaluates cache and scheduling plans, then selects the
              best latency-throughput tradeoff for your workload.
            </p>
          </div>

          <!-- Step 3 -->
          <div
            class="relative bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
          >
            <div
              class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6"
            >
              <lucide-icon [img]="Zap" [size]="20" />
            </div>
            <div class="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest mb-2">
              Step 3
            </div>
            <h3 class="font-header font-bold text-dark text-lg mb-3">
              Serve with KV caching
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              Deploy the selected plan and start serving immediately. HyperRAG
              keeps tracking TTFT and cache efficiency in real time.
            </p>
          </div>
        </div>
      </section>

      <!-- Core System -->
      <section class="bg-slate-50/60 border-y border-slate-100 py-10 md:py-14">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
            >
              Built for production RAG
            </h2>
            <p class="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              HyperRAG combines cache reuse, adaptive eviction, speculative
              execution, and schedule selection into one serving layer.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <!-- KnowledgeTree -->
            <div
              class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
            >
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0"
                >
                  <lucide-icon [img]="GitBranch" [size]="20" />
                </div>
                <div>
                  <h3 class="font-header font-bold text-dark text-base mb-0.5">
                    KnowledgeTree
                  </h3>
                  <span
                    class="text-[9px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded"
                    >prefix trie</span
                  >
                </div>
              </div>
              <p class="text-slate-500 text-sm leading-relaxed">
                Reuses document context across similar queries so the system
                avoids repeated prefill work.
              </p>
            </div>

            <!-- PGDSF Eviction -->
            <div
              class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
            >
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0"
                >
                  <lucide-icon [img]="Database" [size]="20" />
                </div>
                <div>
                  <h3 class="font-header font-bold text-dark text-base mb-0.5">
                    PGDSF Eviction
                  </h3>
                  <span
                    class="text-[9px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded"
                    >cost-aware eviction</span
                  >
                </div>
              </div>
              <p class="text-slate-500 text-sm leading-relaxed">
                Keeps high-value context in fast memory and evicts low-impact
                entries first when memory pressure rises.
              </p>
            </div>

            <!-- Speculative Pipelining -->
            <div
              class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
            >
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0"
                >
                  <lucide-icon [img]="Shuffle" [size]="20" />
                </div>
                <div>
                  <h3 class="font-header font-bold text-dark text-base mb-0.5">
                    Speculative Pipelining
                  </h3>
                  <span
                    class="text-[9px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded"
                    >retrieve + prefill overlap</span
                  >
                </div>
              </div>
              <p class="text-slate-500 text-sm leading-relaxed">
                Starts useful work from cached context while slower retrieval
                completes in parallel to reduce wait time.
              </p>
            </div>

            <!-- Pareto Search -->
            <div
              class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
            >
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 flex-shrink-0"
                >
                  <lucide-icon [img]="ChartBar" [size]="20" />
                </div>
                <div>
                  <h3 class="font-header font-bold text-dark text-base mb-0.5">
                    Pareto Schedule Search
                  </h3>
                  <span
                    class="text-[9px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded"
                    >auto plan search</span
                  >
                </div>
              </div>
              <p class="text-slate-500 text-sm leading-relaxed">
                Selects a serving plan that matches your traffic profile and
                balances low TTFT with stable throughput.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- RAG Paradigms -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
          >
            Four serving paradigms
          </h2>
          <p class="text-slate-500 max-w-xl mx-auto font-medium">
            Each paradigm captures a different system bottleneck. HyperRAG
            selects the right cost model and default tuning for each.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <!-- Hyperscale -->
          <div
            class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600"
                >
                  <lucide-icon [img]="Server" [size]="18" />
                </div>
                <h3 class="font-header font-bold text-dark">Hyperscale</h3>
              </div>
              <span
                class="text-[9px] font-mono px-2 py-1 bg-slate-100 text-slate-500 rounded-full"
                >paradigm="hyperscale"</span
              >
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-4">
              Standard single-hop RAG at high query volume where retrieval
              overhead dominates.
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded-full border border-amber-100"
                >FAISS-bottlenecked</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >8B default</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >243.6 ms TTFT</span
              >
            </div>
          </div>

          <!-- Long Context -->
          <div
            class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600"
                >
                  <lucide-icon [img]="Cpu" [size]="18" />
                </div>
                <h3 class="font-header font-bold text-dark">Long Context</h3>
              </div>
              <span
                class="text-[9px] font-mono px-2 py-1 bg-slate-100 text-slate-500 rounded-full"
                >paradigm="long_context"</span
              >
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-4">
              Long-context generation where prefill dominates. HyperRAG
              improves prompt reuse and batching efficiency.
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded-full border border-amber-100"
                >Up to 6x speedup</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >70B default</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >3.4 ms TTFT</span
              >
            </div>
          </div>

          <!-- Iterative -->
          <div
            class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600"
                >
                  <lucide-icon [img]="Route" [size]="18" />
                </div>
                <h3 class="font-header font-bold text-dark">Iterative</h3>
              </div>
              <span
                class="text-[9px] font-mono px-2 py-1 bg-slate-100 text-slate-500 rounded-full"
                >paradigm="iterative"</span
              >
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-4">
              Multi-hop and agentic retrieval where repeated document access
              creates cumulative latency.
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded-full border border-amber-100"
                >Multi-hop</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >70B default</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >FAISS x4</span
              >
            </div>
          </div>

          <!-- Rewriter-Reranker -->
          <div
            class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600"
                >
                  <lucide-icon [img]="Workflow" [size]="18" />
                </div>
                <h3 class="font-header font-bold text-dark">Rewriter-Reranker</h3>
              </div>
              <span
                class="text-[9px] font-mono px-2 py-1 bg-slate-100 text-slate-500 rounded-full"
                >paradigm="rewriter_reranker"</span
              >
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-4">
              Query rewriting and reranking pipelines where latency compounds
              across multiple model stages.
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded-full border border-amber-100"
                >multi-stage</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >70B default</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >latency-sensitive</span
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="bg-slate-50/60 border-y border-slate-100 py-10 md:py-14">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <!-- Left: Steps -->
            <div>
              <h2
                class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
              >
                Fits into any RAG pipeline
              </h2>
              <p class="text-slate-500 font-medium leading-relaxed mb-10">
                HyperRAG wraps your current retriever and serving stack. Keep
                your model and retrieval flow, then add optimization and
                metrics in one integration step.
              </p>

              <div class="space-y-6">
                <div class="flex gap-4">
                  <div
                    class="w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                  >
                    1
                  </div>
                  <div>
                    <h4 class="font-semibold text-dark text-sm mb-1">
                      Configure and optimize
                    </h4>
                    <p class="text-slate-500 text-sm leading-relaxed">
                      Set workload goals and hardware budget, then let
                      HyperRAG generate the best serving plan.
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div
                    class="w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                  >
                    2
                  </div>
                  <div>
                    <h4 class="font-semibold text-dark text-sm mb-1">
                      Build the serving controller
                    </h4>
                    <p class="text-slate-500 text-sm leading-relaxed">
                      Deploy the selected plan as a single controller in front
                      of your existing RAG calls.
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div
                    class="w-8 h-8 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                  >
                    3
                  </div>
                  <div>
                    <h4 class="font-semibold text-dark text-sm mb-1">
                      Process queries and read metrics
                    </h4>
                    <p class="text-slate-500 text-sm leading-relaxed">
                      Run traffic normally and monitor TTFT, cache hit rate,
                      and serving latency from the built-in metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Code Block -->
            <div
              class="rounded-2xl bg-[#0B0B0D] border border-slate-800 overflow-hidden shadow-2xl"
            >
              <div
                class="flex items-center gap-2 px-5 py-3.5 border-b border-slate-800"
              >
                <div class="w-3 h-3 rounded-full bg-slate-700"></div>
                <div class="w-3 h-3 rounded-full bg-slate-700"></div>
                <div class="w-3 h-3 rounded-full bg-slate-700"></div>
                <span class="ml-2 text-xs text-slate-500 font-mono"
                  >quickstart.py</span
                >
              </div>
              <pre
                class="p-6 text-xs leading-relaxed overflow-x-auto font-mono text-slate-300"
              ><code><span class="text-slate-500">from</span> <span class="text-amber-400">hyperrag</span> <span class="text-slate-500">import</span> HyperRAG

hr <span class="text-slate-400">=</span> HyperRAG()
plan <span class="text-slate-400">=</span> hr<span class="text-slate-400">.</span>optimize(workload<span class="text-slate-400">=</span><span class="text-green-400">"hyperscale"</span>)
ctrl <span class="text-slate-400">=</span> hr<span class="text-slate-400">.</span>deploy(plan)

r <span class="text-slate-400">=</span> ctrl<span class="text-slate-400">.</span>query(
    text<span class="text-slate-400">=</span><span class="text-green-400">"What is transformer attention?"</span>,
    doc_ids<span class="text-slate-400">=</span>[<span class="text-green-400">"d1"</span>, <span class="text-green-400">"d2"</span>],
)

<span class="text-amber-400">print</span>(r<span class="text-slate-400">.</span>ttft_ms, r<span class="text-slate-400">.</span>latency_ms)
<span class="text-amber-400">print</span>(ctrl<span class="text-slate-400">.</span>metrics())</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Supported Models -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-12">
          <h2
            class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
          >
            Built-in model presets
          </h2>
          <p class="text-slate-500 max-w-xl mx-auto font-medium">
            Common open-weight model families are supported out of the box,
            and custom models can be configured when needed.
          </p>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
        >
          @for (model of modelFamilies; track model.family) {
            <div
              class="bg-white rounded-xl border border-slate-100 p-5 text-center shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all"
            >
              <div
                class="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 mx-auto mb-3"
              >
                <lucide-icon [img]="Microchip" [size]="18" />
              </div>
              <div class="font-header font-bold text-dark text-sm mb-1">
                {{ model.family }}
              </div>
              <div class="text-[11px] text-slate-400 font-medium">
                {{ model.sizes }}
              </div>
            </div>
          }
        </div>

        <p class="text-center text-xs text-slate-400 mt-6 font-medium">
          Presets are tuned for practical deployment defaults across model
          sizes and serving profiles.
        </p>
      </section>

      <!-- Performance Benchmarks -->
      <section class="bg-slate-50/60 border-y border-slate-100 py-10 md:py-14">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2
                class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
              >
                Benchmark Results
              </h2>
              <p class="text-slate-500 max-w-xl mx-auto font-medium">
                1,000 queries across four RAG serving paradigms. Benchmarks are expanding across more models and configurations.
              </p>
              <div class="flex items-center justify-center gap-1 mt-6">
                @for (m of benchmarkModels; track m.id) {
                  <button
                    (click)="selectedModel.set(m.id)"
                    class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                    [class.bg-amber-500]="selectedModel() === m.id"
                    [class.text-white]="selectedModel() === m.id"
                    [class.bg-slate-100]="selectedModel() !== m.id"
                    [class.text-slate-500]="selectedModel() !== m.id"
                  >{{ m.label }}</button>
                }
              </div>
            </div>

            <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-100">
                    <th class="text-left px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      Paradigm
                    </th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      Baseline TTFT
                    </th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      With HyperRAG
                    </th>
                    <th class="text-right px-6 py-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      Speedup
                    </th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of benchmarkRows(); track row.paradigm; let last = $last) {
                    <tr [class.border-b]="!last" class="border-slate-50">
                      <td class="px-6 py-4">
                        <div class="font-semibold text-dark">{{ row.paradigm }}</div>
                      </td>
                      <td class="px-6 py-4 text-right text-slate-500 font-mono text-xs">
                        {{ row.baseline }}
                      </td>
                      <td class="px-6 py-4 text-right font-mono text-xs font-bold text-amber-600">
                        {{ row.optimized }}
                      </td>
                      <td class="px-6 py-4 text-right">
                        <span
                          class="inline-block px-2.5 py-1 rounded-full text-xs font-extrabold"
                          [class.bg-amber-500]="row.highlight"
                          [class.text-white]="row.highlight"
                          [class.bg-slate-100]="!row.highlight"
                          [class.text-slate-600]="!row.highlight"
                        >
                          {{ row.speedup }}
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <p class="text-center text-xs text-slate-400 mt-4 font-medium">
              Results are for text-only models. Multimodal and vision-language
              models are not included in this benchmark set.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div
          class="max-w-3xl mx-auto rounded-3xl bg-amber-500/5 border border-amber-500/15 p-12 text-center"
        >
          <div
            class="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mx-auto mb-6"
          >
            <lucide-icon [img]="PackageSearch" [size]="28" />
          </div>
          <h2
            class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
          >
            Start optimizing your RAG stack
          </h2>
          <p class="text-slate-500 font-medium leading-relaxed mb-8 max-w-lg mx-auto">
            HyperRAG is available now on PyPI. The GPU extras require vLLM
            0.4.0 and Python 3.10 or higher. Run the optimizer in simulation
            mode on any machine.
          </p>

          <a
            routerLink="/pricing"
            fragment="contact-form"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
          >
            Talk to us
            <lucide-icon [img]="ChevronRight" [size]="16" />
          </a>
        </div>
      </section>

    </div>
  `,
})
export class HyperRagPageComponent {
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
  readonly ChevronRight = ChevronRight;
  readonly PackageSearch = PackageSearch;
  readonly FileCode = FileCode;
  readonly Timer = Timer;

  private platformId = inject(PLATFORM_ID);
  private doc = inject(DOCUMENT);
  private title = inject(Title);
  private meta = inject(Meta);

  pipCopied = signal(false);
  modelFamilies = [
    { family: 'LLaMA 3.x', sizes: '1B, 3B, 8B, 70B, 405B' },
    { family: 'Mistral', sizes: '7B, Nemo 12B' },
    { family: 'Gemma 2', sizes: '2B, 9B, 27B' },
    { family: 'Qwen 2.5', sizes: '7B, 14B, 72B' },
    { family: 'DeepSeek R1', sizes: '7B, 70B' },
    { family: 'Phi-3', sizes: 'Mini 3.8B, Medium 14B' },
  ];

  readonly benchmarkModels = [
    { id: 'qwen7b',   label: 'Qwen2.5 7B'  },
    { id: 'llama8b',  label: 'Llama 3 8B'  },
    { id: 'qwen14b',  label: 'Qwen2.5 14B' },
    { id: 'llama70b', label: 'Llama 3 70B' },
  ];

  selectedModel = signal('qwen7b');

  private readonly allBenchmarkData: Record<string, { paradigm: string; baseline: string; optimized: string; speedup: string; highlight: boolean }[]> = {
    // Baseline vs optimized (No optimization vs best optimized config)
    qwen7b: [
      { paradigm: 'Hyperscale',        baseline: '56.4 ms',  optimized: '9.8 ms',   speedup: '5.73x', highlight: true  },
      { paradigm: 'Long Context',      baseline: '56.8 ms',  optimized: '10.4 ms',  speedup: '5.47x', highlight: false },
      { paradigm: 'Iterative',         baseline: '57.1 ms',  optimized: '10.4 ms',  speedup: '5.50x', highlight: false },
      { paradigm: 'Rewriter-Reranker', baseline: '57.1 ms',  optimized: '9.1 ms',   speedup: '6.28x', highlight: true  },
    ],
    // Meta-Llama-3-8B-Instruct (baseline vs optimized)
    llama8b: [
      { paradigm: 'Hyperscale',        baseline: '61.7 ms',  optimized: '21.9 ms',  speedup: '2.82x', highlight: false },
      { paradigm: 'Long Context',      baseline: '61.9 ms',  optimized: '21.7 ms',  speedup: '2.85x', highlight: false },
      { paradigm: 'Iterative',         baseline: '62.1 ms',  optimized: '21.6 ms',  speedup: '2.88x', highlight: true  },
      { paradigm: 'Rewriter-Reranker', baseline: '62.0 ms',  optimized: '21.5 ms',  speedup: '2.88x', highlight: true  },
    ],
    // Qwen2.5-14B-Instruct (baseline vs optimized)
    qwen14b: [
      { paradigm: 'Hyperscale',        baseline: '108.8 ms', optimized: '40.8 ms',  speedup: '2.67x', highlight: true  },
      { paradigm: 'Long Context',      baseline: '108.8 ms', optimized: '40.8 ms',  speedup: '2.67x', highlight: false },
      { paradigm: 'Iterative',         baseline: '108.9 ms', optimized: '40.8 ms',  speedup: '2.67x', highlight: false },
      { paradigm: 'Rewriter-Reranker', baseline: '108.8 ms', optimized: '40.8 ms',  speedup: '2.67x', highlight: false },
    ],
    // Meta-Llama-3-70B-Instruct (4-GPU TP, baseline vs optimized)
    llama70b: [
      { paradigm: 'Hyperscale',        baseline: '220.1 ms', optimized: '112.0 ms', speedup: '1.97x', highlight: false },
      { paradigm: 'Long Context',      baseline: '222.5 ms', optimized: '111.9 ms', speedup: '1.99x', highlight: true  },
      { paradigm: 'Iterative',         baseline: '224.5 ms', optimized: '113.0 ms', speedup: '1.99x', highlight: false },
      { paradigm: 'Rewriter-Reranker', baseline: '223.3 ms', optimized: '112.5 ms', speedup: '1.98x', highlight: false },
    ],
  };

  benchmarkRows = computed(() => this.allBenchmarkData[this.selectedModel()]);

  constructor() {
    this.title.setTitle('HyperRAG | Deep Variance');
    this.meta.updateTag({
      name: 'description',
      content:
        'KV cache optimization for RAG serving. Prefix-trie caching, PGDSF eviction, speculative pipelining, and Pareto schedule search. Up to 6x faster TTFT.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'HyperRAG | Deep Variance' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'KV cache optimization for RAG serving. Up to 6x faster time-to-first-token.',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'HyperRAG | Deep Variance' });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'KV cache optimization for RAG serving. Up to 6x faster time-to-first-token.',
    });
    this.setCanonical('https://deepvariance.com/hyperrag');
  }

  private setCanonical(url: string) {
    const head = this.doc.head;
    let link: HTMLLinkElement | null = head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  copyPip() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText('pip install dv-hyperrag');
    this.pipCopied.set(true);
    setTimeout(() => this.pipCopied.set(false), 2000);
  }

}
