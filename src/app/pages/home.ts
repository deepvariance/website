import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperSnippetComponent } from '../components/developer-snippet';
import {
  LucideAngularModule,
  Copy, ExternalLink,
  FileText, Image, Table2, Database,
  Cloud, Server, Lock, Building2,
  Zap, ShieldCheck, Cpu, Lightbulb, Sparkles,
  Ban, Key, ChartBar, Globe, CircleCheck,
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DeveloperSnippetComponent, LucideAngularModule],
  template: `
    <div class="relative overflow-hidden">
      <!-- Grid and Blur Background -->
      <div class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"></div>

      <!-- Hero Section -->
      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-16 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-8 animate-fade-in">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Autopilot - Now Available for usage. Try out python package.
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
          DeepVariance <span class="text-primary">Autopilot</span>.
        </h1>

        <p class="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          The end-to-end AutoML pipeline. Automatically infer types, clean data, engineer features, and train the best-fit model. Powered by LLM-driven code generation and intelligent multi-model comparison.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button class="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0">
            Start Training
          </button>
          <button class="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-dark font-semibold text-base border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50">
            View Benchmarks
          </button>
        </div>

        <div class="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm mb-12 shadow-sm">
          <span class="text-slate-400 select-none">$&nbsp;</span>
          <span class="select-all"><span class="text-emerald-600">pip install </span><span class="text-slate-700">deepvariance-sdk</span></span>
          <button onclick="navigator.clipboard.writeText('pip install deepvariance-sdk')" class="ml-2 text-slate-400 hover:text-slate-700 transition-colors" title="Copy">
            <lucide-icon [img]="Copy" [size]="16" />
          </button>
          <a href="https://pypi.org/project/deepvariance-sdk/" target="_blank" rel="noopener" class="text-slate-400 hover:text-slate-700 transition-colors" title="View on PyPI">
            <lucide-icon [img]="ExternalLink" [size]="16" />
          </a>
        </div>

        <!-- Metrics Bar -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-12 border-t border-slate-100">
          <div class="space-y-1">
            <p class="text-4xl font-header font-bold text-dark">7</p>
            <p class="text-sm text-slate-500 font-medium">Fully automated pipeline stages</p>
          </div>
          <div class="space-y-1 border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0">
            <p class="text-4xl font-header font-bold text-dark">1 Call</p>
            <p class="text-sm text-slate-500 font-medium">From raw data to trained model</p>
          </div>
          <div class="space-y-1">
            <p class="text-4xl font-header font-bold text-dark">8+</p>
            <p class="text-sm text-slate-500 font-medium">Model architectures evaluated & ranked</p>
          </div>
        </div>
      </section>

      <!-- Customer Proof (Logos) -->
      <section class="bg-slate-50/50 py-16 border-y border-slate-100">
        <div class="container mx-auto px-6">
          <p class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">Trusted by the next generation of AI Labs</p>
          <div class="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span class="text-xl font-header font-bold text-slate-600">Apex AI</span>
            <span class="text-xl font-header font-bold text-slate-600">Helio Labs</span>
            <span class="text-xl font-header font-bold text-slate-600">Northstar ML</span>
            <span class="text-xl font-header font-bold text-slate-600">VertexWorks</span>
            <span class="text-xl font-header font-bold text-slate-600">ScaleForge</span>
          </div>
        </div>
      </section>

      <!-- Compatibility -->
      <section class="container mx-auto px-6 py-16 md:py-24">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-header font-bold text-dark mb-4 tracking-tight">Works with your stack</h2>
          <p class="text-slate-500 font-medium max-w-xl mx-auto">Autopilot connects to any data source and runs on any infrastructure — cloud or on-premise.</p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-10 space-y-8">

            <!-- Tabular Files -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <lucide-icon [img]="FileText" [size]="13" class="text-slate-400" />
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tabular Files</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="FileText" [size]="14" class="text-emerald-500 flex-shrink-0" />
                  CSV / TSV
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="FileText" [size]="14" class="text-emerald-500 flex-shrink-0" />
                  Parquet
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="FileText" [size]="14" class="text-emerald-500 flex-shrink-0" />
                  Excel / XLSX
                </span>
              </div>
            </div>

            <!-- Image & Vision -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <lucide-icon [img]="Image" [size]="13" class="text-slate-400" />
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image &amp; Vision</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-violet-50 border border-violet-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="Image" [size]="14" class="text-violet-500 flex-shrink-0" />
                  PNG / JPEG
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-violet-50 border border-violet-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="Image" [size]="14" class="text-violet-500 flex-shrink-0" />
                  NumPy Arrays
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-violet-50 border border-violet-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="Image" [size]="14" class="text-violet-500 flex-shrink-0" />
                  HDF5 / LMDB
                </span>
              </div>
            </div>

            <!-- Cloud Storage -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <lucide-icon [img]="Cloud" [size]="13" class="text-slate-400" />
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cloud Storage</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="flex-shrink-0"><path fill="#FF9900" d="M6.763 10.036q.002.446.088.71c.064.176.144.368.256.576c.04.063.056.127.056.183q.002.12-.152.24l-.503.335a.4.4 0 0 1-.208.072q-.12-.002-.239-.112a2.5 2.5 0 0 1-.287-.375a6 6 0 0 1-.248-.471q-.934 1.101-2.347 1.101c-.67 0-1.205-.191-1.596-.574q-.588-.575-.59-1.533c0-.678.239-1.23.726-1.644c.487-.415 1.133-.623 1.955-.623c.272 0 .551.024.846.064c.296.04.6.104.918.176v-.583q-.001-.909-.375-1.277c-.255-.248-.686-.367-1.3-.367c-.28 0-.568.031-.863.103q-.443.106-.862.272a2 2 0 0 1-.28.104a.5.5 0 0 1-.127.023q-.168.002-.168-.247v-.391c0-.128.016-.224.056-.28a.6.6 0 0 1 .224-.167a4.6 4.6 0 0 1 1.005-.36a4.8 4.8 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647q.66.645.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144a1.8 1.8 0 0 0 .758-.51a1.3 1.3 0 0 0 .272-.512c.047-.191.08-.423.08-.694v-.335a7 7 0 0 0-.735-.136a6 6 0 0 0-.75-.048c-.535 0-.926.104-1.19.32c-.263.215-.39.518-.39.917c0 .375.095.655.295.846c.191.2.47.296.838.296m6.41.862c-.144 0-.24-.024-.304-.08c-.064-.048-.12-.16-.168-.311L7.586 5.55a1.4 1.4 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783q.227-.001.31.08c.065.048.113.16.16.312l1.342 5.284l1.245-5.284q.058-.24.151-.312a.55.55 0 0 1 .32-.08h.638c.152 0 .256.025.32.08c.063.048.12.16.151.312l1.261 5.348l1.381-5.348q.074-.24.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2c0 .04-.009.08-.017.128a1 1 0 0 1-.056.2l-1.923 6.17q-.072.24-.168.311a.5.5 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08c-.063-.056-.119-.16-.15-.32l-1.238-5.148l-1.23 5.14c-.04.16-.087.264-.15.32c-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143c-.399-.096-.71-.2-.918-.32c-.128-.071-.215-.151-.247-.223a.6.6 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247q.072 0 .144.024c.048.016.12.048.2.08q.408.181.878.279c.319.064.63.096.95.096c.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758a.78.78 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.9 1.9 0 0 1-.4-1.158q0-.502.216-.886c.144-.255.335-.479.575-.654c.24-.184.51-.32.83-.415c.32-.096.655-.136 1.006-.136c.175 0 .359.008.535.032c.183.024.35.056.518.088q.24.058.455.127q.216.072.336.144a.7.7 0 0 1 .24.2a.43.43 0 0 1 .071.263v.375q-.002.254-.184.256a.8.8 0 0 1-.303-.096a3.65 3.65 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223s-.375.383-.375.71c0 .224.08.416.24.567c.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767s.367.702.367 1.117c0 .343-.072.655-.207.926a2.2 2.2 0 0 1-.583.703c-.248.2-.543.343-.886.447c-.36.111-.734.167-1.142.167m1.509 3.88c-2.626 1.94-6.442 2.969-9.722 2.969c-4.598 0-8.74-1.7-11.87-4.526c-.247-.223-.024-.527.272-.351c3.384 1.963 7.559 3.153 11.877 3.153c2.914 0 6.114-.607 9.06-1.852c.439-.2.814.287.383.607m1.094-1.246c-.336-.43-2.22-.207-3.074-.103c-.255.032-.295-.192-.063-.36c1.5-1.053 3.967-.75 4.254-.399c.287.36-.08 2.826-1.485 4.007c-.215.184-.423.088-.327-.151c.32-.79 1.03-2.57.695-2.994"/></svg>
                  Amazon S3
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="flex-shrink-0"><path fill="#4285F4" d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0c-3.875 2.551-3.922 8.11-.247 10.941l.006-.007l-.007.03a6.7 6.7 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.37 9.37 0 0 0-2.821-4.552l-.043.043l.006-.05A9.34 9.34 0 0 0 12.19 2.38m-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.19 5.19 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.6 2.6 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.75 6.75 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.2 5.2 0 0 1 3.67-1.69z"/></svg>
                  GCS
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="flex-shrink-0"><path fill="#0089D6" d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892l4.947 3.675c.28.208.618.32.966.32m-3.084-12.531l3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76l-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684"/></svg>
                  Azure Blob
                </span>
              </div>
            </div>

            <!-- Databases -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <lucide-icon [img]="Database" [size]="13" class="text-slate-400" />
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Databases</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="Database" [size]="14" class="text-blue-500 flex-shrink-0" />
                  MySQL / PostgreSQL
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="Database" [size]="14" class="text-blue-500 flex-shrink-0" />
                  MongoDB
                </span>
                <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-sm font-semibold text-slate-700">
                  <lucide-icon [img]="Database" [size]="14" class="text-blue-500 flex-shrink-0" />
                  Snowflake
                </span>
              </div>
            </div>

          </div>

          <!-- Run Anywhere -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 mt-6">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Run Anywhere</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="flex-shrink-0"><path fill="#FF9900" d="M6.763 10.036q.002.446.088.71c.064.176.144.368.256.576c.04.063.056.127.056.183q.002.12-.152.24l-.503.335a.4.4 0 0 1-.208.072q-.12-.002-.239-.112a2.5 2.5 0 0 1-.287-.375a6 6 0 0 1-.248-.471q-.934 1.101-2.347 1.101c-.67 0-1.205-.191-1.596-.574q-.588-.575-.59-1.533c0-.678.239-1.23.726-1.644c.487-.415 1.133-.623 1.955-.623c.272 0 .551.024.846.064c.296.04.6.104.918.176v-.583q-.001-.909-.375-1.277c-.255-.248-.686-.367-1.3-.367c-.28 0-.568.031-.863.103q-.443.106-.862.272a2 2 0 0 1-.28.104a.5.5 0 0 1-.127.023q-.168.002-.168-.247v-.391c0-.128.016-.224.056-.28a.6.6 0 0 1 .224-.167a4.6 4.6 0 0 1 1.005-.36a4.8 4.8 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647q.66.645.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144a1.8 1.8 0 0 0 .758-.51a1.3 1.3 0 0 0 .272-.512c.047-.191.08-.423.08-.694v-.335a7 7 0 0 0-.735-.136a6 6 0 0 0-.75-.048c-.535 0-.926.104-1.19.32c-.263.215-.39.518-.39.917c0 .375.095.655.295.846c.191.2.47.296.838.296m6.41.862c-.144 0-.24-.024-.304-.08c-.064-.048-.12-.16-.168-.311L7.586 5.55a1.4 1.4 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783q.227-.001.31.08c.065.048.113.16.16.312l1.342 5.284l1.245-5.284q.058-.24.151-.312a.55.55 0 0 1 .32-.08h.638c.152 0 .256.025.32.08c.063.048.12.16.151.312l1.261 5.348l1.381-5.348q.074-.24.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2c0 .04-.009.08-.017.128a1 1 0 0 1-.056.2l-1.923 6.17q-.072.24-.168.311a.5.5 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08c-.063-.056-.119-.16-.15-.32l-1.238-5.148l-1.23 5.14c-.04.16-.087.264-.15.32c-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143c-.399-.096-.71-.2-.918-.32c-.128-.071-.215-.151-.247-.223a.6.6 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247q.072 0 .144.024c.048.016.12.048.2.08q.408.181.878.279c.319.064.63.096.95.096c.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758a.78.78 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.9 1.9 0 0 1-.4-1.158q0-.502.216-.886c.144-.255.335-.479.575-.654c.24-.184.51-.32.83-.415c.32-.096.655-.136 1.006-.136c.175 0 .359.008.535.032c.183.024.35.056.518.088q.24.058.455.127q.216.072.336.144a.7.7 0 0 1 .24.2a.43.43 0 0 1 .071.263v.375q-.002.254-.184.256a.8.8 0 0 1-.303-.096a3.65 3.65 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223s-.375.383-.375.71c0 .224.08.416.24.567c.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767s.367.702.367 1.117c0 .343-.072.655-.207.926a2.2 2.2 0 0 1-.583.703c-.248.2-.543.343-.886.447c-.36.111-.734.167-1.142.167m1.509 3.88c-2.626 1.94-6.442 2.969-9.722 2.969c-4.598 0-8.74-1.7-11.87-4.526c-.247-.223-.024-.527.272-.351c3.384 1.963 7.559 3.153 11.877 3.153c2.914 0 6.114-.607 9.06-1.852c.439-.2.814.287.383.607m1.094-1.246c-.336-.43-2.22-.207-3.074-.103c-.255.032-.295-.192-.063-.36c1.5-1.053 3.967-.75 4.254-.399c.287.36-.08 2.826-1.485 4.007c-.215.184-.423.088-.327-.151c.32-.79 1.03-2.57.695-2.994"/></svg>
                AWS
              </span>
              <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="flex-shrink-0"><path fill="#4285F4" d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0c-3.875 2.551-3.922 8.11-.247 10.941l.006-.007l-.007.03a6.7 6.7 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.37 9.37 0 0 0-2.821-4.552l-.043.043l.006-.05A9.34 9.34 0 0 0 12.19 2.38m-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.19 5.19 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.6 2.6 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.75 6.75 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.2 5.2 0 0 1 3.67-1.69z"/></svg>
                Google Cloud
              </span>
              <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="flex-shrink-0"><path fill="#0089D6" d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892l4.947 3.675c.28.208.618.32.966.32m-3.084-12.531l3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76l-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684"/></svg>
                Azure
              </span>
              <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                <lucide-icon [img]="Server" [size]="14" class="text-slate-500 flex-shrink-0" />
                On-Premise
              </span>
              <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                <lucide-icon [img]="Lock" [size]="14" class="text-slate-500 flex-shrink-0" />
                Air-gapped
              </span>
              <span class="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-700">
                <lucide-icon [img]="Building2" [size]="14" class="text-slate-500 flex-shrink-0" />
                Private Cloud
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features / Capabilities -->
      <section class="container mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div class="mb-16 md:mb-24 text-center">
          <h2 class="text-3xl md:text-5xl font-header font-bold text-dark mb-6 tracking-tight">Use Cases</h2>
          <p class="text-slate-500 text-lg mb-10 font-medium max-w-2xl mx-auto">DeepVariance is architected for researchers and hardware providers alike. We cater to industries renting out compute and companies training on proprietary clusters.</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
              <h4 class="text-sm font-bold text-dark mb-2">GPU Providers</h4>
              <p class="text-xs text-slate-500 font-medium leading-relaxed">Increase value-add for your compute rentals with native optimization layers.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
              <h4 class="text-sm font-bold text-dark mb-2">Research Labs</h4>
              <p class="text-xs text-slate-500 font-medium leading-relaxed">Expedite discovery cycles with mathematical pruning of hyperparameter spaces.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
              <h4 class="text-sm font-bold text-dark mb-2">Enterprise ML Teams</h4>
              <p class="text-xs text-slate-500 font-medium leading-relaxed">Standardize training pipelines across hundreds of experiments without custom tooling overhead.</p>
            </div>
            <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
              <h4 class="text-sm font-bold text-dark mb-2">Healthcare & Biotech</h4>
              <p class="text-xs text-slate-500 font-medium leading-relaxed">Accelerate model iteration on sensitive datasets with full on-premise execution and zero data egress.</p>
            </div>
          </div>
        </div>

        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-6 tracking-tight">Core Optimization</h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">Integrated directly into your runtime to automate efficiency without changing your training code.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Autopilot -->
          <div class="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <lucide-icon [img]="Zap" [size]="24" />
            </div>
            <h3 class="text-xl font-header font-bold text-dark mb-4">Intelligent Data Processing</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Automatically infer column types, encode categoricals, and extract structural patterns to guide intelligent preprocessing decisions.</p>
            <ul class="space-y-3 text-[13px] text-slate-600 font-semibold">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> LLM-driven type inference</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Categorical encoding</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Correlation & MI analysis</li>
            </ul>
          </div>

          <!-- Policy Engine -->
          <div class="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <lucide-icon [img]="ShieldCheck" [size]="24" />
            </div>
            <h3 class="text-xl font-header font-bold text-dark mb-4">LLM-Driven Preprocessing</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Self-correcting LLM code generation handles data cleaning, imputation, and feature engineering, automatically retrying on failure.</p>
            <ul class="space-y-3 text-[13px] text-slate-600 font-semibold">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Missing value imputation</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Outlier handling</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Automatic retry on error</li>
            </ul>
          </div>

          <!-- Hardware Engine -->
          <div class="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <lucide-icon [img]="Cpu" [size]="24" />
            </div>
            <h3 class="text-xl font-header font-bold text-dark mb-4">Automated Model Selection</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium">Evaluates and ranks multiple model architectures per run, returning a full leaderboard and per-feature importance scores.</p>
            <ul class="space-y-3 text-[13px] text-slate-600 font-semibold">
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Ranked model leaderboard</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Feature importance scores</li>
              <li class="flex items-center gap-2"><div class="w-1 h-1 rounded-full bg-primary"></div> Classification & regression</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Developer Experience -->
      <app-developer-snippet />

      <!-- Secondary Features Row -->
      <section class="container mx-auto px-8 md:px-16 py-12 md:py-16 mb-16 bg-slate-900 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden relative">
        <div class="absolute inset-0 bg-grid-white/[0.04] -z-10"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl md:text-5xl font-header font-bold mb-8 leading-tight tracking-tight">Pipeline Intelligence</h2>
            <div class="space-y-12">
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                  <lucide-icon [img]="Lightbulb" [size]="24" />
                </div>
                <div>
                  <h4 class="text-lg font-header font-bold mb-2">Self-Correcting Generation</h4>
                  <p class="text-slate-400 text-sm font-medium">If LLM-generated code fails, the error is automatically fed back as context and retried up to 3 times, without any manual intervention.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                  <lucide-icon [img]="Sparkles" [size]="24" />
                </div>
                <div>
                  <h4 class="text-lg font-header font-bold mb-2">Full Run Observability</h4>
                  <p class="text-slate-400 text-sm font-medium">Every pipeline run returns per-stage wall-clock timing, peak memory usage, and CPU metrics for complete visibility into the automated process.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl border border-white/10 p-1">
              <div class="w-full bg-[#0d0d14] rounded-[1.4rem] overflow-hidden">
                <div class="flex items-center gap-1.5 px-5 py-3 border-b border-white/5">
                  <div class="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-amber-500/30 border border-amber-500/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500/40"></div>
                  <span class="ml-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">pipeline.run(data, target="churn")</span>
                </div>
                <div class="p-6 font-mono text-xs space-y-1.5 leading-relaxed">
                  <p class="text-slate-500">[1/7] AutoCastLayer <span class="text-emerald-400">✓</span> <span class="text-slate-600">0.8s</span></p>
                  <p class="text-slate-500">[2/7] DataProfilingLayer <span class="text-emerald-400">✓</span> <span class="text-slate-600">0.4s</span></p>
                  <p class="text-slate-500">[3/7] CorrelationLayer <span class="text-emerald-400">✓</span> <span class="text-slate-600">1.2s</span></p>
                  <p class="text-slate-500">[4/7] SamplingLayer <span class="text-emerald-400">✓</span> <span class="text-slate-600">0.3s</span></p>
                  <p class="text-amber-400">[5/7] PreprocessingLayer ↻ retrying (1/3)...</p>
                  <p class="text-slate-500">[5/7] PreprocessingLayer <span class="text-emerald-400">✓</span> <span class="text-slate-600">1.1s</span></p>
                  <p class="text-slate-500">[6/7] ModelRecommendationLayer <span class="text-emerald-400">✓</span> <span class="text-slate-600">0.6s</span></p>
                  <p class="text-slate-500">[7/7] ModelTrainingLayer <span class="text-emerald-400">✓</span> <span class="text-slate-600">42.3s</span></p>
                  <div class="pt-3 mt-2 border-t border-white/5 space-y-1">
                    <p class="text-emerald-400">accuracy: 92.3%  |  f1_macro: 91.1%</p>
                    <p class="text-slate-600">peak_mem: 512 MB  |  total_time: 47.0s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Who it's for -->
      <section class="container mx-auto px-6 py-12 md:py-20 border-t border-slate-100">
        <h2 class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">Who We Build For</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/50">
            <h4 class="font-header font-bold text-dark mb-4 text-xl">ML Platform Teams</h4>
            <p class="text-slate-500 text-sm font-medium">Standardize optimization policies across the organization and reduce infrastructure overhead.</p>
          </div>
          <div class="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/50">
            <h4 class="font-header font-bold text-dark mb-4 text-xl">Applied AI Orgs</h4>
            <p class="text-slate-500 text-sm font-medium">Accelerate time-to-market for models by automating hardware-aware placement and scaling.</p>
          </div>
          <div class="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/50">
            <h4 class="font-header font-bold text-dark mb-4 text-xl">Research Labs</h4>
            <p class="text-slate-500 text-sm font-medium">Maximized GPU availability for experimental workloads with intelligent resource scheduling.</p>
          </div>
        </div>
      </section>

      <!-- Enterprise Features -->
      <section class="container mx-auto px-6 py-12 md:py-16 bg-slate-50/30 rounded-[2rem] md:rounded-[3rem] border border-slate-100/50">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-6 tracking-tight">Deploy Anywhere, Own Everything</h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">Runs entirely on your hardware. Your data, your models, your infrastructure. No cloud dependency, no data egress, no vendor lock-in.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <lucide-icon [img]="Server" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">On-Premise Execution</h4>
            <p class="text-xs text-slate-500 font-medium leading-relaxed">The entire pipeline, from data profiling to model training, runs on your own servers. No data ever leaves your environment.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <lucide-icon [img]="Ban" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Zero Data Egress</h4>
            <p class="text-xs text-slate-500 font-medium leading-relaxed">Training data is never transmitted to external services. LLM calls carry only schema metadata and error traces, never raw records.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <lucide-icon [img]="ShieldCheck" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Sandboxed Code Execution</h4>
            <p class="text-xs text-slate-500 font-medium leading-relaxed">LLM-generated preprocessing code runs in a restricted sandbox. Only approved libraries are permitted with no arbitrary system access.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <lucide-icon [img]="Key" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Bring Your Own LLM Key</h4>
            <p class="text-xs text-slate-500 font-medium leading-relaxed">Supply your own OpenAI or Groq API key via <code class="bg-slate-100 px-1 rounded text-dark">PipelineConfig</code>. You choose the provider, you own the usage.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <lucide-icon [img]="ChartBar" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Full Audit Trail</h4>
            <p class="text-xs text-slate-500 font-medium leading-relaxed">Every pipeline run emits per-stage timing, memory usage, and CPU metrics: a complete, inspectable record of every automated decision.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <lucide-icon [img]="Globe" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Industry Agnostic</h4>
            <p class="text-xs text-slate-500 font-medium leading-relaxed">Works on any tabular dataset regardless of domain: healthcare, finance, retail, or manufacturing. No industry-specific configuration needed.</p>
          </div>
        </div>
      </section>

      <!-- Enterprise CTA -->
      <section class="container mx-auto px-6 pt-12 md:pt-16 pb-6 md:pb-10 text-center">
        <div class="max-w-xl mx-auto p-8 sm:p-12 rounded-[2rem] md:rounded-[3rem] bg-slate-50 border border-slate-100 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h2 class="text-2xl sm:text-3xl font-header font-bold text-dark mb-3 tracking-tight">Request a Demo</h2>
          <p class="text-slate-500 text-sm mb-8 max-w-sm mx-auto font-medium">See Autopilot in action on your data. Our team will walk you through a live session.</p>
          <div class="space-y-3 text-left">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input #demoNameInput type="text" placeholder="Your name" required
                class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-white transition-colors"
                [class.border-red-300]="demoShowErrors() && !demoNameInput.value.trim()"
                [class.border-slate-200]="!(demoShowErrors() && !demoNameInput.value.trim())">
              <input #demoOrgInput type="text" placeholder="Company"
                class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border border-slate-200 bg-white">
            </div>
            <input #demoEmailInput type="email" placeholder="Work email" required
              class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-white transition-colors"
              [class.border-red-300]="demoShowErrors() && (!demoEmailInput.value.trim() || !isValidEmail(demoEmailInput.value))"
              [class.border-slate-200]="!(demoShowErrors() && (!demoEmailInput.value.trim() || !isValidEmail(demoEmailInput.value)))">
            @if (demoShowErrors()) {
              @if (!demoNameInput.value.trim()) {
                <p class="text-xs text-red-500 font-semibold">Please enter your name.</p>
              } @else if (!demoEmailInput.value.trim()) {
                <p class="text-xs text-red-500 font-semibold">Please enter your work email.</p>
              } @else {
                <p class="text-xs text-red-500 font-semibold">Please use a valid business email address.</p>
              }
            }
            <button
              (click)="submitDemo(demoNameInput.value, demoOrgInput.value, demoEmailInput.value)"
              [disabled]="demoSubmitting()"
              class="w-full bg-dark text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-black transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
            >
              {{ demoSubmitting() ? 'Sending…' : 'Request Demo' }}
            </button>
          </div>
        </div>
      </section>

      @if (demoToastVisible()) {
        <div class="fixed bottom-6 inset-x-0 z-50 pointer-events-none animate-fade-in flex justify-center px-4">
          <div class="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-white/10 max-w-sm w-full sm:w-auto">
            <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <lucide-icon [img]="CircleCheck" [size]="14" class="text-primary" />
            </div>
            <span class="text-sm font-semibold">Demo request sent — we'll be in touch soon.</span>
          </div>
        </div>
      }
    </div>
  `
})
export class HomeComponent {
  readonly Copy = Copy;
  readonly ExternalLink = ExternalLink;
  readonly FileText = FileText;
  readonly Image = Image;
  readonly Table2 = Table2;
  readonly Database = Database;
  readonly Cloud = Cloud;
  readonly Server = Server;
  readonly Lock = Lock;
  readonly Building2 = Building2;
  readonly Zap = Zap;
  readonly ShieldCheck = ShieldCheck;
  readonly Cpu = Cpu;
  readonly Lightbulb = Lightbulb;
  readonly Sparkles = Sparkles;
  readonly Ban = Ban;
  readonly Key = Key;
  readonly ChartBar = ChartBar;
  readonly Globe = Globe;
  readonly CircleCheck = CircleCheck;

  demoSubmitting = signal(false);
  demoToastVisible = signal(false);
  demoShowErrors = signal(false);

  isValidEmail(email: string) {
    const v = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return false;
    const blocked = ['mailinator','yopmail','guerrillamail','trashmail','temp-mail','throwaway','maildrop','sharklasers','spamgourmet','mailnull','getairmail','tempmail','dispostable','airmail.cc','spam4.me','yomail','throwam','fakeinbox','getnada','33mail','mailexpire','spamex','spamfree','spaml','spamoff','tempr.email','tempr','inboxbear','crazymailing','emailondeck','filzmail','tmail','tmpmail','moakt'];
    const domain = v.split('@')[1];
    return !blocked.some(b => domain.includes(b));
  }

  async submitDemo(name: string, org: string, email: string) {
    if (!name.trim() || !email.trim() || !this.isValidEmail(email)) {
      this.demoShowErrors.set(true);
      return;
    }
    this.demoShowErrors.set(false);
    if (this.demoSubmitting()) return;
    this.demoSubmitting.set(true);
    try {
      await fetch('https://formsubmit.co/ajax/founders@deepvariance.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          organization: org,
          _subject: 'DeepVariance — Demo Request',
          _captcha: 'false',
        }),
      });
      this.demoToastVisible.set(true);
      setTimeout(() => this.demoToastVisible.set(false), 4000);
    } finally {
      this.demoSubmitting.set(false);
    }
  }
}
