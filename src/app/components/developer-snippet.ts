import { Component } from '@angular/core';

@Component({
  selector: 'app-developer-snippet',
  standalone: true,
  template: `
    <section class="container mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-8 tracking-tight">Python-first integration</h2>
          <p class="text-slate-500 text-base sm:text-lg mb-8 font-medium">Integrate Deep Variance into your existing training scripts with just a few lines of code.</p>

          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">1</div>
              <p class="text-slate-600 text-sm font-medium">Install via pip: <code class="bg-slate-100 px-2 py-0.5 rounded text-dark">deep-variance</code></p>
            </div>
            <div class="flex gap-4">
              <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">2</div>
              <p class="text-slate-600 text-sm font-medium">Point it at your dataset and target column</p>
            </div>
            <div class="flex gap-4">
              <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">3</div>
              <p class="text-slate-600 text-sm font-medium">Get a trained model, full metrics, and ranked leaderboard</p>
            </div>
          </div>
        </div>
        
        <div class="bg-dark rounded-[2rem] p-1 shadow-2xl shadow-primary/20">
          <div class="bg-slate-900 rounded-[1.8rem] overflow-hidden">
            <div class="flex items-center gap-1.5 px-6 py-4 border-b border-white/5">
              <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
              <span class="ml-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">train.py</span>
            </div>
            <div class="p-8 font-mono text-sm leading-relaxed">
              <pre class="text-slate-400"><span class="text-primary">from</span> deepvariance.pipelines.ml <span class="text-primary">import</span> MLPipeline
<span class="text-primary">from</span> deepvariance.typings <span class="text-primary">import</span> PipelineConfig
<span class="text-primary">import</span> pandas <span class="text-primary">as</span> pd

data = pd.read_csv(<span class="text-emerald-400">"customers.csv"</span>)
config = PipelineConfig(dv_api_key=<span class="text-emerald-400">"dv_..."</span>)

<span class="text-slate-500"># Run the full automated pipeline</span>
pipeline = MLPipeline(config=config)
result = pipeline.run(data, target=<span class="text-emerald-400">"churn"</span>)

<span class="text-primary">print</span>(result[<span class="text-emerald-400">"metrics"</span>])</pre>
            </div>
            <div class="px-8 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
               <span class="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Console Output</span>
               <span class="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">accuracy: 92.3%  |  f1_macro: 91.1%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DeveloperSnippetComponent {}
