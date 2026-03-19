import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
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
      <div
        class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      ></div>
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-amber-500/10 blur-[120px] rounded-full -z-20"
      ></div>

      <!-- Hero -->
      <section class="container mx-auto px-6 pt-16 md:pt-24 pb-10 text-center">
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
          <span class="whitespace-nowrap">KV cache optimization</span>
          <span class="text-amber-500"> for RAG serving</span>.
        </h1>

        <p
          class="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Reduce time-to-first-token by up to 9x. HyperRAG combines a
          prefix-trie KV cache, PGDSF eviction, speculative pipelining, and
          Pareto schedule search into one serving optimization layer.
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
            <p class="text-4xl font-header font-bold text-dark tracking-tight mb-1">9x</p>
            <p class="text-xs text-slate-500 font-medium uppercase tracking-widest">Faster TTFT (long-context 70B)</p>
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
              Pick a paradigm (hyperscale, long-context, iterative, or
              rewriter-reranker), specify your model and GPU budget.
              <code
                class="text-[11px] bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 text-slate-700 font-mono"
                >RAGOptimizeConfig</code
              >
              validates and structures your constraints.
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
              <code
                class="text-[11px] bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 text-slate-700 font-mono"
                >rago.optimize()</code
              >
              sweeps ~180 candidate configurations across GPU count, batch
              size, and cache hit rate targets. Returns the non-dominated
              schedule that minimizes TTFT for your QPS target.
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
              <code
                class="text-[11px] bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 text-slate-700 font-mono"
                >rago.build_controller()</code
              >
              returns a
              <code
                class="text-[11px] bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 text-slate-700 font-mono"
                >RAGServeController</code
              >
              ready to process queries with prefix reuse, PGDSF eviction, and
              speculative pipelining active.
            </p>
          </div>
        </div>
      </section>

      <!-- Core Algorithms -->
      <section class="bg-slate-50/60 border-y border-slate-100 py-10 md:py-14">
        <div class="container mx-auto px-6">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl font-header font-bold text-dark tracking-tight mb-4"
            >
              Research-backed algorithms
            </h2>
            <p class="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Every core decision in HyperRAG is grounded in peer-reviewed systems research.
              The scheduling layer jointly optimizes latency and throughput across hardware
              configurations<sup class="text-amber-500 font-bold">1</sup>, while the caching
              layer predicts which knowledge fragments will be reused and holds them in memory
              before the next query arrives<sup class="text-amber-500 font-bold">2</sup>.
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
                Multi-level prefix trie that stores transformer KV attention
                tensors per document. When two queries share retrieved
                documents, the cached KV state for that prefix is reused
                exactly once. Nodes span GPU HBM (L1) and host DRAM (L2)
                tiers.
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
                    >Priority = Clock + (Freq x Cost) / Size</span
                  >
                </div>
              </div>
              <p class="text-slate-500 text-sm leading-relaxed">
                Priority-based Greedy Dual Size Frequency policy. Each cached
                node is scored by recency (clock), access frequency, prefill
                recomputation cost, and KV tensor size. Lowest-priority leaf
                nodes are demoted to host DRAM or evicted first.
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
                Starts prefill on cached documents immediately, while retrieval
                of remaining documents runs in parallel. New documents are
                merged into the prefill pass on arrival. Estimated savings:
                <code
                  class="text-[11px] bg-slate-50 border border-slate-100 rounded px-1 py-0.5 font-mono text-slate-700"
                  >min(t_retrieve, t_prefill x 0.8)</code
                >.
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
                    >~180 candidates</span
                  >
                </div>
              </div>
              <p class="text-slate-500 text-sm leading-relaxed">
                Enumerates GPU counts (1, 2, 4), batch sizes (1, 2, 4, 8, 16),
                cache hit rates (0 to 0.9), and placements (collocated,
                disaggregated, hybrid). Returns a Pareto frontier of 14 to 18
                non-dominated configurations. No schedule in the frontier
                dominates another on both TTFT and QPS.
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
              Standard single-hop RAG at scale. Bottleneck is FAISS index
              scan, not the LLM. Default model: LLaMA 3.1 8B. Measured 1.09x
              speedup on 4x A100 at 1000 queries (Zipfian workload, alpha 1.1).
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
              1M+ token context where retrieval is skipped. Bottleneck is LLM
              prefill. Default model: LLaMA 3.1 70B. High cache hit rate (94%)
              with 4-GPU tensor parallelism delivers 9.02x speedup, reducing
              TTFT from 30.9 ms to 3.4 ms.
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded-full border border-amber-100"
                >9.02x speedup</span
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
              Multi-hop and agentic retrieval. FAISS is called up to 4 times
              per query. Bottleneck is cumulative retrieval latency. Default
              model: LLaMA 3.1 70B. Speculative pipelining provides the
              largest relative improvement here.
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
              Query rewriting plus cross-encoder reranking. Bottleneck is
              both encoder and rewriter LLM. Default model: LLaMA 3.1 70B.
              Combined scheduler and cache optimization reduces TTFT from
              649.2 ms to 339.7 ms, a 1.91x speedup.
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                class="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded-full border border-amber-100"
                >1.91x speedup</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >70B default</span
              >
              <span
                class="text-[10px] bg-slate-50 text-slate-500 font-semibold px-2 py-1 rounded-full border border-slate-100"
                >339.7 ms TTFT</span
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
                HyperRAG wraps your existing retriever. Pass
                <code
                  class="text-[12px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-mono"
                  >doc_ids</code
                >
                and
                <code
                  class="text-[12px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-mono"
                  >doc_tokens</code
                >
                from your retriever output. Integrates with LangChain and
                LlamaIndex in three lines.
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
                      Set your paradigm, model preset, and GPU/host budget.
                      Call
                      <code
                        class="text-[11px] bg-white border border-slate-100 rounded px-1 py-0.5 font-mono text-slate-700"
                        >optimize()</code
                      >
                      to get the best schedule and cache allocation for your
                      workload.
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
                      <code
                        class="text-[11px] bg-white border border-slate-100 rounded px-1 py-0.5 font-mono text-slate-700"
                        >build_controller()</code
                      >
                      wires up the KnowledgeTree, multi-tier cache, request
                      reordering, and speculative pipelining into one
                      ready-to-call object.
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
                      Each
                      <code
                        class="text-[11px] bg-white border border-slate-100 rounded px-1 py-0.5 font-mono text-slate-700"
                        >QueryResult</code
                      >
                      reports TTFT, total latency, cached token count, and
                      whether speculative pipelining fired.
                      <code
                        class="text-[11px] bg-white border border-slate-100 rounded px-1 py-0.5 font-mono text-slate-700"
                        >ctrl.metrics()</code
                      >
                      gives aggregate hit rate and GPU cache usage.
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
              ><code><span class="text-slate-500">from</span> <span class="text-amber-400">hyperrag</span> <span class="text-slate-500">import</span> RAGOptimize, RAGOptimizeConfig, LLMModel, Query

<span class="text-slate-500"># Step 1: Configure</span>
rago <span class="text-slate-400">=</span> RAGOptimize(RAGOptimizeConfig(
    paradigm<span class="text-slate-400">=</span><span class="text-green-400">"hyperscale"</span>,
    model<span class="text-slate-400">=</span>LLMModel<span class="text-slate-400">.</span>LLAMA_3_1_8B,
    gpu_budget_gb<span class="text-slate-400">=</span><span class="text-blue-400">4.0</span>,
    host_budget_gb<span class="text-slate-400">=</span><span class="text-blue-400">16.0</span>,
))

<span class="text-slate-500"># Step 2: Find optimal schedule</span>
result <span class="text-slate-400">=</span> rago<span class="text-slate-400">.</span>optimize()
<span class="text-amber-400">print</span>(result<span class="text-slate-400">.</span>summary())
<span class="text-slate-500"># TTFT=243.6ms  QPS/chip=47.0  hit_rate=82.0%</span>
<span class="text-slate-500">#   gpus=4  batch=1  pareto_size=18</span>

<span class="text-slate-500"># Step 3: Build controller</span>
ctrl <span class="text-slate-400">=</span> rago<span class="text-slate-400">.</span>build_controller()

<span class="text-slate-500"># Step 4: Process a query</span>
r <span class="text-slate-400">=</span> ctrl<span class="text-slate-400">.</span>process(Query(
    query_id<span class="text-slate-400">=</span><span class="text-green-400">"q1"</span>,
    text<span class="text-slate-400">=</span><span class="text-green-400">"What is transformer attention?"</span>,
    doc_ids<span class="text-slate-400">=</span>[<span class="text-green-400">"d1"</span>, <span class="text-green-400">"d2"</span>],
    doc_tokens<span class="text-slate-400">=</span>[<span class="text-blue-400">512</span>, <span class="text-blue-400">256</span>],
))
<span class="text-amber-400">print</span>(<span class="text-green-400">f"TTFT=<span class="text-amber-300">&#123;r.ttft_s*1000:.1f&#125;</span>ms  hit=<span class="text-amber-300">&#123;r.cache_hit&#125;</span>"</span>)

<span class="text-slate-500"># Step 5: Aggregate metrics</span>
m <span class="text-slate-400">=</span> ctrl<span class="text-slate-400">.</span>metrics()
<span class="text-amber-400">print</span>(<span class="text-green-400">f"hit_rate=<span class="text-amber-300">&#123;m.hit_rate:.1%&#125;</span>  gpu_mib=<span class="text-amber-300">&#123;m.gpu_used_mib:.0f&#125;</span>"</span>)</code></pre>
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
            17 built-in model presets
          </h2>
          <p class="text-slate-500 max-w-xl mx-auto font-medium">
            Roofline cost model parameters are pre-calibrated for all major
            open-weight LLMs. Custom model specs are accepted via
            <code
              class="text-[12px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-mono"
              >LLMModel.custom()</code
            >.
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
          All presets include layer count, GQA head configuration, and head
          dimension for accurate KV cache size estimation.
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
                1,000 queries across four RAG serving paradigms.
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
            <lucide-icon [img]="ArrowRight" [size]="16" />
          </a>
        </div>
      </section>

      <!-- Footnotes -->
      <section class="container mx-auto px-6 pb-16">
        <div class="max-w-3xl mx-auto border-t border-slate-100 pt-6 space-y-2">
          <p class="text-xs text-slate-400 font-medium leading-relaxed">
            <sup class="font-bold">1</sup>&nbsp;
            Alnaasan et al., "RAGO: Retrieval-Augmented Generation Optimization," ISCA 2025.
            <a href="https://arxiv.org/abs/2503.14649" target="_blank" rel="noopener noreferrer" class="hover:text-amber-600 transition-colors underline underline-offset-2">arXiv:2503.14649</a>.
          </p>
          <p class="text-xs text-slate-400 font-medium leading-relaxed">
            <sup class="font-bold">2</sup>&nbsp;
            Jin et al., "RAGCache: Efficient Knowledge Caching for Retrieval-Augmented Generation," ACM TOCS 2025.
            <a href="https://arxiv.org/abs/2404.12457" target="_blank" rel="noopener noreferrer" class="hover:text-amber-600 transition-colors underline underline-offset-2">arXiv:2404.12457</a>.
          </p>
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
  readonly ArrowRight = ArrowRight;
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
    { id: 'llama', label: 'Llama 3 8B' },
    { id: 'ministral', label: 'Mistral 8B' },
    { id: 'qwen', label: 'Qwen2.5 14B' },
  ];

  selectedModel = signal('llama');

  private readonly allBenchmarkData: Record<string, { paradigm: string; baseline: string; optimized: string; speedup: string; highlight: boolean }[]> = {
    llama: [
      { paradigm: 'Hyperscale',        baseline: '68.3 ms', optimized: '53.9 ms', speedup: '1.27×', highlight: false },
      { paradigm: 'Long Context',      baseline: '68.1 ms', optimized: '54.9 ms', speedup: '1.24×', highlight: false },
      { paradigm: 'Iterative',         baseline: '68.8 ms', optimized: '53.6 ms', speedup: '1.28×', highlight: true  },
      { paradigm: 'Rewriter-Reranker', baseline: '68.3 ms', optimized: '53.6 ms', speedup: '1.27×', highlight: false },
    ],
    ministral: [
      { paradigm: 'Hyperscale',        baseline: '69.6 ms', optimized: '54.9 ms', speedup: '1.27×', highlight: false },
      { paradigm: 'Long Context',      baseline: '69.6 ms', optimized: '56.0 ms', speedup: '1.24×', highlight: false },
      { paradigm: 'Iterative',         baseline: '70.4 ms', optimized: '54.4 ms', speedup: '1.29×', highlight: true  },
      { paradigm: 'Rewriter-Reranker', baseline: '69.7 ms', optimized: '54.5 ms', speedup: '1.28×', highlight: false },
    ],
    qwen: [
      { paradigm: 'Hyperscale',        baseline: '120.9 ms', optimized: '94.6 ms', speedup: '1.28×', highlight: false },
      { paradigm: 'Long Context',      baseline: '120.9 ms', optimized: '96.7 ms', speedup: '1.25×', highlight: false },
      { paradigm: 'Iterative',         baseline: '120.8 ms', optimized: '93.2 ms', speedup: '1.30×', highlight: true  },
      { paradigm: 'Rewriter-Reranker', baseline: '120.9 ms', optimized: '92.9 ms', speedup: '1.30×', highlight: true  },
    ],
  };

  benchmarkRows = computed(() => this.allBenchmarkData[this.selectedModel()]);

  constructor() {
    this.title.setTitle('HyperRAG | Deep Variance');
    this.meta.updateTag({
      name: 'description',
      content:
        'KV cache optimization for RAG serving. Prefix-trie caching, PGDSF eviction, speculative pipelining, and Pareto schedule search. Up to 9x faster TTFT.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'HyperRAG | Deep Variance' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'KV cache optimization for RAG serving. Up to 9x faster time-to-first-token.',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'HyperRAG | Deep Variance' });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'KV cache optimization for RAG serving. Up to 9x faster time-to-first-token.',
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
