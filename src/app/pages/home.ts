import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import {
  Ban,
  Braces,
  Building2,
  ChartBar,
  CircleCheck,
  Copy,
  Cpu,
  ExternalLink,
  Factory,
  Globe,
  HardDrive,
  Image,
  Key,
  Layers,
  Lightbulb,
  LucideAngularModule,
  Microscope,
  Server,
  ShieldCheck,
  Sparkles,
  Table2,
  X,
  Zap,
} from 'lucide-angular';
import { DeveloperSnippetComponent } from '../components/developer-snippet';

function businessEmailValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const v = (control.value || '').trim().toLowerCase();
  if (!v) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { invalidEmail: true };
  const blocked = [
    'mailinator',
    'yopmail',
    'guerrillamail',
    'trashmail',
    'temp-mail',
    'throwaway',
    'maildrop',
    'sharklasers',
    'spamgourmet',
    'mailnull',
    'getairmail',
    'tempmail',
    'dispostable',
    'airmail.cc',
    'spam4.me',
    'yomail',
    'throwam',
    'fakeinbox',
    'getnada',
    '33mail',
    'mailexpire',
    'spamex',
    'spamfree',
    'spaml',
    'spamoff',
    'tempr.email',
    'tempr',
    'inboxbear',
    'crazymailing',
    'emailondeck',
    'filzmail',
    'tmail',
    'tmpmail',
    'moakt',
  ];
  const domain = v.split('@')[1];
  return blocked.some((b) => domain.includes(b))
    ? { disposableEmail: true }
    : null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    DeveloperSnippetComponent,
    LucideAngularModule,
  ],
  template: `
    <div class="relative overflow-hidden">
      <!-- Grid and Blur Background -->
      <div
        class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      ></div>
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"
      ></div>

      <!-- Hero Section -->
      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-16 text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-8"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-primary"
            ></span>
          </span>
          Autopilot - Now Available for usage. Try out python package.
        </div>

        <h1
          class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto"
        >
          DeepVariance <span class="text-primary">Autopilot</span>.
        </h1>

        <p
          class="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          The end-to-end AutoML pipeline. Automatically infer types, clean data,
          engineer features, and train the best-fit ML or deep learning model. Powered by LLM-driven
          code generation and intelligent multi-model comparison.
        </p>

        <!-- CTA buttons temporarily hidden
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button class="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0">
            Start Training
          </button>
          <button class="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-dark font-semibold text-base border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50">
            View Benchmarks
          </button>
        </div>
        -->

        <div
          class="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm mb-12 shadow-sm"
        >
          <span class="text-slate-400 select-none">$&nbsp;</span>
          <span class="select-all"
            ><span class="text-emerald-600">pip install </span
            ><span class="text-slate-700">deepvariance-sdk</span></span
          >
          <button
            (click)="copyPip()"
            class="ml-2 transition-colors"
            [class.text-emerald-500]="pipCopied()"
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
            href="https://pypi.org/project/deepvariance-sdk/"
            target="_blank"
            rel="noopener"
            class="text-slate-400 hover:text-slate-700 transition-colors"
            title="View on PyPI"
          >
            <lucide-icon [img]="ExternalLink" [size]="16" />
          </a>
        </div>

        <!-- Metrics Bar -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-12 border-t border-slate-100"
        >
          <div class="space-y-1">
            <p class="text-4xl font-header font-bold text-dark">7</p>
            <p class="text-sm text-slate-500 font-medium">
              Fully automated pipeline stages
            </p>
          </div>
          <div
            class="space-y-1 border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0"
          >
            <p class="text-4xl font-header font-bold text-dark">1 Call</p>
            <p class="text-sm text-slate-500 font-medium">
              From raw data to trained model
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-4xl font-header font-bold text-dark">8+</p>
            <p class="text-sm text-slate-500 font-medium">
              Model architectures evaluated & ranked
            </p>
          </div>
        </div>
      </section>

      <!-- Trusted By section temporarily hidden
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
      -->

<!-- Core Optimization -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-10 md:mb-12">
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-6 tracking-tight"
          >
            Core Optimization
          </h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">
            Integrated directly into your runtime to automate efficiency without
            changing your training code.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform"
            >
              <lucide-icon [img]="Zap" [size]="24" />
            </div>
            <h3 class="text-xl font-header font-bold text-dark mb-4">
              Intelligent Data Processing
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
              Automatically infer column types, encode categoricals, and extract
              structural patterns to guide intelligent preprocessing decisions.
            </p>
            <ul class="space-y-3 text-[13px] text-slate-600 font-semibold">
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                LLM-driven type inference
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Categorical encoding
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Correlation & MI analysis
              </li>
            </ul>
          </div>

          <div
            class="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform"
            >
              <lucide-icon [img]="ShieldCheck" [size]="24" />
            </div>
            <h3 class="text-xl font-header font-bold text-dark mb-4">
              LLM-Driven Preprocessing
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
              Self-correcting LLM code generation handles missing data and
              feature engineering. Intelligent sampling selects representative
              subsets efficiently.
            </p>
            <ul class="space-y-3 text-[13px] text-slate-600 font-semibold">
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Missing data handling
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Intelligent sampling
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Automatic retry on error
              </li>
            </ul>
          </div>

          <div
            class="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform"
            >
              <lucide-icon [img]="Cpu" [size]="24" />
            </div>
            <h3 class="text-xl font-header font-bold text-dark mb-4">
              Automated Model Selection
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
              Evaluates and ranks classical ML and deep learning architectures
              per run, returning a full leaderboard and per-feature importance
              scores.
            </p>
            <ul class="space-y-3 text-[13px] text-slate-600 font-semibold">
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Ranked model leaderboard
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Feature importance scores
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-primary"></div>
                Classical ML &amp; deep learning
              </li>
            </ul>
          </div>
        </div>
      </section>

<!-- Secondary Features Row -->
      <section
        class="container mx-auto px-8 md:px-16 py-10 md:py-12 mb-12 bg-slate-900 rounded-[2rem] md:rounded-[3rem] text-white overflow-hidden relative"
      >
        <div class="absolute inset-0 bg-grid-white/[0.04] -z-10"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              class="text-3xl md:text-5xl font-header font-bold mb-8 leading-tight tracking-tight"
            >
              Pipeline Intelligence
            </h2>
            <div class="space-y-12">
              <div class="flex gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary"
                >
                  <lucide-icon [img]="Lightbulb" [size]="24" />
                </div>
                <div>
                  <h4 class="text-lg font-header font-bold mb-2">
                    Self-Correcting Generation
                  </h4>
                  <p class="text-slate-400 text-sm font-medium">
                    If LLM-generated code fails, the error is automatically fed
                    back as context and retried up to 3 times, without any
                    manual intervention.
                  </p>
                </div>
              </div>
              <div class="flex gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400"
                >
                  <lucide-icon [img]="Sparkles" [size]="24" />
                </div>
                <div>
                  <h4 class="text-lg font-header font-bold mb-2">
                    Full Run Observability
                  </h4>
                  <p class="text-slate-400 text-sm font-medium">
                    Every pipeline run returns per-stage wall-clock timing, peak
                    memory usage, and CPU metrics for complete visibility into
                    the automated process.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div
              class="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl border border-white/10 p-1"
            >
              <div class="w-full bg-[#0d0d14] rounded-[1.4rem] overflow-hidden">
                <div
                  class="flex items-center gap-1.5 px-5 py-3 border-b border-white/5"
                >
                  <div
                    class="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/40"
                  ></div>
                  <div
                    class="w-2.5 h-2.5 rounded-full bg-amber-500/30 border border-amber-500/40"
                  ></div>
                  <div
                    class="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500/40"
                  ></div>
                  <span
                    class="ml-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                    >pipeline.run(data, target="churn")</span
                  >
                </div>
                <div class="p-6 font-mono text-xs space-y-1.5 leading-relaxed">
                  <p class="text-slate-500">
                    [1/7] AutoCastLayer
                    <span class="text-emerald-400">✓</span>&nbsp;<span
                      class="text-slate-600"
                      >1.2s</span
                    >
                  </p>
                  <p class="text-slate-500">
                    [2/7] DataProfilingLayer
                    <span class="text-emerald-400">✓</span>&nbsp;<span
                      class="text-slate-600"
                      >6.8s</span
                    >
                  </p>
                  <p class="text-slate-500">
                    [3/7] CorrelationLayer
                    <span class="text-emerald-400">✓</span>&nbsp;<span
                      class="text-slate-600"
                      >14.2s</span
                    >
                  </p>
                  <p class="text-slate-500">
                    [4/7] SamplingLayer
                    <span class="text-emerald-400">✓</span>&nbsp;<span
                      class="text-slate-600"
                      >3.1s</span
                    >
                  </p>
                  <p class="text-slate-500">
                    [5/7] PreprocessingLayer
                    <span class="text-amber-400">↻ retry 1/3</span>&nbsp;<span class="text-emerald-400">→ ✓</span>&nbsp;<span
                      class="text-slate-600"
                      >22.7s</span
                    >
                  </p>
                  <p class="text-slate-500">
                    [6/7] ModelRecommendationLayer
                    <span class="text-emerald-400">✓</span>&nbsp;<span
                      class="text-slate-600"
                      >8.3s</span
                    >
                  </p>
                  <p class="text-slate-500">
                    [7/7] ModelTrainingLayer
                    <span class="text-emerald-400">✓</span>&nbsp;<span
                      class="text-slate-600"
                      >4m 18s</span
                    >
                  </p>
                  <div class="pt-3 mt-2 border-t border-white/5 space-y-1">
                    <p class="text-emerald-400">
                      accuracy: 92.3% | f1_macro: 91.1%
                    </p>
                    <p class="text-slate-600">
                      peak_mem: 512 MB | total_time: 5m 14.3s
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<!-- Developer Experience -->
      <app-developer-snippet />

<!-- Compatibility -->
      <section class="container mx-auto px-6 py-10 md:py-14">
        <div class="text-center mb-10">
          <h2
            class="text-2xl sm:text-3xl font-header font-bold text-dark mb-4 tracking-tight"
          >
            Works with your stack
          </h2>
          <p class="text-slate-500 font-medium max-w-xl mx-auto">
            Autopilot connects to any data source and runs on any
            infrastructure, cloud or on-premise.
          </p>
        </div>

        <div class="max-w-5xl mx-auto space-y-6">
          <!-- 1. Tabular & Image Data -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
          >
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6"
            >
              Tabular &amp; Image Data
            </p>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-100"
              >
                <lucide-icon
                  [img]="Table2"
                  [size]="28"
                  class="text-emerald-500"
                />
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >CSV / TSV</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-100"
              >
                <lucide-icon
                  [img]="Layers"
                  [size]="28"
                  class="text-emerald-500"
                />
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >Parquet</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  class="text-emerald-600"
                >
                  <path
                    fill="currentColor"
                    d="M23 1.5q.41 0 .7.3q.3.29.3.7v19q0 .41-.3.7q-.29.3-.7.3H7q-.41 0-.7-.3q-.3-.29-.3-.7V18H1q-.41 0-.7-.3q-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7q.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87l2.34-3.8H7.46l-1.3 2.4l-.05.08l-.04.09l-.64-1.28l-.66-1.29H2.59l2.27 3.82l-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >Excel / XLSX</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-violet-50 border border-violet-100"
              >
                <lucide-icon
                  [img]="Image"
                  [size]="28"
                  class="text-violet-500"
                />
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >PNG / JPEG</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-violet-50 border border-violet-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  class="text-violet-600"
                >
                  <path
                    fill="currentColor"
                    d="m10.315 4.876l-4.01-2.024l-4.401 2.196l4.118 2.068zm1.838.928l4.205 2.122l-4.363 2.19l-4.125-2.07zm5.615-2.922l4.32 2.166l-3.863 1.94l-4.213-2.125zM15.91 1.95L12.021 0L8.174 1.92l4.007 2.02zm-3.04 16.744V24l4.711-2.35l-.005-5.31zm4.704-4.206l-.005-5.253l-4.699 2.336v5.254zm5.655-.984v5.327l-4.018 2.005l-.002-5.303zm0-1.863v-5.22l-4.025 2.001l.003 5.264zm-12.022-.07L8.033 9.976v6.895s-3.88-8.257-4.24-8.998c-.046-.096-.237-.201-.285-.227A358 358 0 0 0 .773 6.25v12.18l2.82 1.508V13.57s3.84 7.378 3.878 7.458c.04.08.425.858.837 1.132c.548.363 2.899 1.776 2.899 1.776z"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >NumPy Arrays</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-violet-50 border border-violet-100"
              >
                <lucide-icon
                  [img]="HardDrive"
                  [size]="28"
                  class="text-violet-500"
                />
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >HDF5 / LMDB</span
                >
              </div>
            </div>
          </div>

          <!-- 2. Cloud & Data Providers -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
          >
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6"
            >
              Cloud &amp; Data Providers
            </p>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF9900"
                    d="M6.763 10.036q.002.446.088.71c.064.176.144.368.256.576c.04.063.056.127.056.183q.002.12-.152.24l-.503.335a.4.4 0 0 1-.208.072q-.12-.002-.239-.112a2.5 2.5 0 0 1-.287-.375a6 6 0 0 1-.248-.471q-.934 1.101-2.347 1.101c-.67 0-1.205-.191-1.596-.574q-.588-.575-.59-1.533c0-.678.239-1.23.726-1.644c.487-.415 1.133-.623 1.955-.623c.272 0 .551.024.846.064c.296.04.6.104.918.176v-.583q-.001-.909-.375-1.277c-.255-.248-.686-.367-1.3-.367c-.28 0-.568.031-.863.103q-.443.106-.862.272a2 2 0 0 1-.28.104a.5.5 0 0 1-.127.023q-.168.002-.168-.247v-.391c0-.128.016-.224.056-.28a.6.6 0 0 1 .224-.167a4.6 4.6 0 0 1 1.005-.36a4.8 4.8 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647q.66.645.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144a1.8 1.8 0 0 0 .758-.51a1.3 1.3 0 0 0 .272-.512c.047-.191.08-.423.08-.694v-.335a7 7 0 0 0-.735-.136a6 6 0 0 0-.75-.048c-.535 0-.926.104-1.19.32c-.263.215-.39.518-.39.917c0 .375.095.655.295.846c.191.2.47.296.838.296m6.41.862c-.144 0-.24-.024-.304-.08c-.064-.048-.12-.16-.168-.311L7.586 5.55a1.4 1.4 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783q.227-.001.31.08c.065.048.113.16.16.312l1.342 5.284l1.245-5.284q.058-.24.151-.312a.55.55 0 0 1 .32-.08h.638c.152 0 .256.025.32.08c.063.048.12.16.151.312l1.261 5.348l1.381-5.348q.074-.24.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2c0 .04-.009.08-.017.128a1 1 0 0 1-.056.2l-1.923 6.17q-.072.24-.168.311a.5.5 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08c-.063-.056-.119-.16-.15-.32l-1.238-5.148l-1.23 5.14c-.04.16-.087.264-.15.32c-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143c-.399-.096-.71-.2-.918-.32c-.128-.071-.215-.151-.247-.223a.6.6 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247q.072 0 .144.024c.048.016.12.048.2.08q.408.181.878.279c.319.064.63.096.95.096c.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758a.78.78 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.9 1.9 0 0 1-.4-1.158q0-.502.216-.886c.144-.255.335-.479.575-.654c.24-.184.51-.32.83-.415c.32-.096.655-.136 1.006-.136c.175 0 .359.008.535.032c.183.024.35.056.518.088q.24.058.455.127q.216.072.336.144a.7.7 0 0 1 .24.2a.43.43 0 0 1 .071.263v.375q-.002.254-.184.256a.8.8 0 0 1-.303-.096a3.65 3.65 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223s-.375.383-.375.71c0 .224.08.416.24.567c.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767s.367.702.367 1.117c0 .343-.072.655-.207.926a2.2 2.2 0 0 1-.583.703c-.248.2-.543.343-.886.447c-.36.111-.734.167-1.142.167m1.509 3.88c-2.626 1.94-6.442 2.969-9.722 2.969c-4.598 0-8.74-1.7-11.87-4.526c-.247-.223-.024-.527.272-.351c3.384 1.963 7.559 3.153 11.877 3.153c2.914 0 6.114-.607 9.06-1.852c.439-.2.814.287.383.607m1.094-1.246c-.336-.43-2.22-.207-3.074-.103c-.255.032-.295-.192-.063-.36c1.5-1.053 3.967-.75 4.254-.399c.287.36-.08 2.826-1.485 4.007c-.215.184-.423.088-.327-.151c.32-.79 1.03-2.57.695-2.994"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >Amazon S3</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#4285F4"
                    d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0c-3.875 2.551-3.922 8.11-.247 10.941l.006-.007l-.007.03a6.7 6.7 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.37 9.37 0 0 0-2.821-4.552l-.043.043l.006-.05A9.34 9.34 0 0 0 12.19 2.38m-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.19 5.19 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.6 2.6 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.75 6.75 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.2 5.2 0 0 1 3.67-1.69z"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >Google Cloud</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#0089D6"
                    d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892l4.947 3.675c.28.208.618.32.966.32m-3.084-12.531l3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76l-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >Azure Blob</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  class="text-[#4169E1]"
                >
                  <path
                    fill="currentColor"
                    d="M23.56 14.723a.5.5 0 0 0-.057-.12q-.21-.395-1.007-.231c-1.654.34-2.294.13-2.526-.02c1.342-2.048 2.445-4.522 3.041-6.83c.272-1.05.798-3.523.122-4.73a1.6 1.6 0 0 0-.15-.236C21.693.91 19.8.025 17.51.001c-1.495-.016-2.77.346-3.116.479a10 10 0 0 0-.516-.082a8 8 0 0 0-1.312-.127c-1.182-.019-2.203.264-3.05.84C8.66.79 4.729-.534 2.296 1.19C.935 2.153.309 3.873.43 6.304c.041.818.507 3.334 1.243 5.744q.69 2.26 1.433 3.582q.83 1.493 1.714 1.79c.448.148 1.133.143 1.858-.729a56 56 0 0 1 1.945-2.206c.435.235.906.362 1.39.377v.004a11 11 0 0 0-.247.305c-.339.43-.41.52-1.5.745c-.31.064-1.134.233-1.146.811a.6.6 0 0 0 .091.327c.227.423.922.61 1.015.633c1.335.333 2.505.092 3.372-.679c-.017 2.231.077 4.418.345 5.088c.221.553.762 1.904 2.47 1.904q.375.001.829-.094c1.782-.382 2.556-1.17 2.855-2.906c.15-.87.402-2.875.539-4.101c.017-.07.036-.12.057-.136c0 0 .07-.048.427.03l.044.007l.254.022l.015.001c.847.039 1.911-.142 2.531-.43c.644-.3 1.806-1.033 1.595-1.67M2.37 11.876c-.744-2.435-1.178-4.885-1.212-5.571c-.109-2.172.417-3.683 1.562-4.493c1.837-1.299 4.84-.54 6.108-.13l-.01.01C6.795 3.734 6.843 7.226 6.85 7.44c0 .082.006.199.016.36c.034.586.1 1.68-.074 2.918c-.16 1.15.194 2.276.973 3.089q.12.126.252.237c-.347.371-1.1 1.193-1.903 2.158c-.568.682-.96.551-1.088.508c-.392-.13-.813-.587-1.239-1.322c-.48-.839-.963-2.032-1.415-3.512m6.007 5.088a1.6 1.6 0 0 1-.432-.178c.089-.039.237-.09.483-.14c1.284-.265 1.482-.451 1.915-1a8 8 0 0 1 .367-.443a.4.4 0 0 0 .074-.13c.17-.151.272-.11.436-.042c.156.065.308.26.37.475c.03.102.062.295-.045.445c-.904 1.266-2.222 1.25-3.168 1.013m2.094-3.988l-.052.14c-.133.357-.257.689-.334 1.004c-.667-.002-1.317-.288-1.81-.803c-.628-.655-.913-1.566-.783-2.5c.183-1.308.116-2.447.08-3.059l-.013-.22c.296-.262 1.666-.996 2.643-.772c.446.102.718.406.83.928c.585 2.704.078 3.83-.33 4.736a9 9 0 0 0-.23.546m7.364 4.572q-.024.266-.062.596l-.146.438a.4.4 0 0 0-.018.108c-.006.475-.054.649-.115.87a4.8 4.8 0 0 0-.18 1.057c-.11 1.414-.878 2.227-2.417 2.556c-1.515.325-1.784-.496-2.02-1.221a7 7 0 0 0-.078-.227c-.215-.586-.19-1.412-.157-2.555c.016-.561-.025-1.901-.33-2.646q.006-.44.019-.892a.4.4 0 0 0-.016-.113a2 2 0 0 0-.044-.208c-.122-.428-.42-.786-.78-.935c-.142-.059-.403-.167-.717-.087c.067-.276.183-.587.309-.925l.053-.142c.06-.16.134-.325.213-.5c.426-.948 1.01-2.246.376-5.178c-.237-1.098-1.03-1.634-2.232-1.51c-.72.075-1.38.366-1.709.532a6 6 0 0 0-.196.104c.092-1.106.439-3.174 1.736-4.482a4 4 0 0 1 .303-.276a.35.35 0 0 0 .145-.064c.752-.57 1.695-.85 2.802-.833q.616.01 1.174.081c1.94.355 3.244 1.447 4.036 2.383c.814.962 1.255 1.931 1.431 2.454c-1.323-.134-2.223.127-2.68.78c-.992 1.418.544 4.172 1.282 5.496c.135.242.252.452.289.54c.24.583.551.972.778 1.256c.07.087.138.171.189.245c-.4.116-1.12.383-1.055 1.717a35 35 0 0 1-.084.815c-.046.208-.07.46-.1.766m.89-1.621c-.04-.832.27-.919.597-1.01l.135-.041a1 1 0 0 0 .134.103c.57.376 1.583.421 3.007.134c-.202.177-.519.4-.953.601c-.41.19-1.096.333-1.747.364c-.72.034-1.086-.08-1.173-.151m.57-9.271a7 7 0 0 1-.105 1.001c-.055.358-.112.728-.127 1.177c-.014.436.04.89.093 1.33c.107.887.216 1.8-.207 2.701a4 4 0 0 1-.188-.385a8 8 0 0 0-.325-.617c-.616-1.104-2.057-3.69-1.32-4.744c.38-.543 1.342-.566 2.179-.463m.228 7.013l-.085-.107l-.035-.044c.726-1.2.584-2.387.457-3.439c-.052-.432-.1-.84-.088-1.222c.013-.407.066-.755.118-1.092c.064-.415.13-.844.111-1.35a.6.6 0 0 0 .012-.19c-.046-.486-.6-1.938-1.73-3.253a7.8 7.8 0 0 0-2.688-2.04A9.3 9.3 0 0 1 17.62.746c2.052.046 3.675.814 4.824 2.283a1 1 0 0 1 .067.1c.723 1.356-.276 6.275-2.987 10.54m-8.816-6.116c-.025.18-.31.423-.621.423l-.081-.006a.8.8 0 0 1-.506-.315c-.046-.06-.12-.178-.106-.285a.22.22 0 0 1 .093-.149c.118-.089.352-.122.61-.086c.316.044.642.193.61.418m7.93-.411c.011.08-.049.2-.153.31a.72.72 0 0 1-.408.223l-.075.005c-.293 0-.541-.234-.56-.371c-.024-.177.264-.31.56-.352c.298-.042.612.009.636.185"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >PostgreSQL</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  class="text-[#47A248]"
                >
                  <path
                    fill="currentColor"
                    d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115c-.28-.394-.53-.954-.735-1.44c-.036.495-.055.685-.523 1.184c-.723.566-4.438 3.682-4.74 10.02c-.282 5.912 4.27 9.435 4.888 9.884l.07.05A74 74 0 0 1 11.91 24h.481a29 29 0 0 1 .51-3.07c.417-.296.604-.463.85-.693a11.34 11.34 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218m-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695c-.381-.045-.765-1.76-.765-2.405"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >MongoDB</span
                >
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  class="text-[#29B5E8]"
                >
                  <path
                    fill="currentColor"
                    d="M24 3.459c0 .646-.418 1.18-1.141 1.18s-1.142-.534-1.142-1.18c0-.647.419-1.18 1.142-1.18S24 2.812 24 3.459m-.228 0c0-.533-.38-.951-.913-.951s-.913.38-.913.95c0 .533.38.952.913.952c.57 0 .913-.419.913-.951m-1.37-.533h.495c.266 0 .456.152.456.38c0 .153-.076.229-.19.305l.19.266v.038h-.266l-.19-.266h-.229v.266h-.266zm.495.228h-.229v.267h.229c.114 0 .152-.038.152-.114c.038-.077-.038-.153-.152-.153M7.602 12.4a2 2 0 0 0 .076-.456c0-.114-.038-.228-.038-.342c-.114-.343-.304-.647-.646-.838l-4.87-2.777c-.685-.38-1.56-.152-1.94.533c-.381.685-.153 1.56.532 1.94l2.701 1.56l-2.701 1.56c-.685.38-.913 1.256-.533 1.94c.38.685 1.256.914 1.94.533l4.832-2.777c.343-.267.571-.533.647-.876m1.332 2.626c-.266-.038-.57.038-.837.19l-4.832 2.777c-.685.38-.913 1.256-.532 1.94c.38.686 1.255.914 1.94.533l2.701-1.56v3.12c0 .8.647 1.408 1.446 1.408s1.407-.647 1.407-1.408v-5.592c0-.761-.57-1.37-1.293-1.408m4.946-6.088c.266.038.57-.038.837-.19l4.832-2.777c.685-.38.913-1.256.532-1.94c-.38-.686-1.255-.914-1.94-.533l-2.701 1.56V1.975c0-.799-.647-1.408-1.446-1.408s-1.446.609-1.446 1.408V7.53c0 .76.609 1.37 1.332 1.407zM3.265 5.97l4.832 2.777c.266.152.533.19.837.19c.723-.038 1.331-.684 1.331-1.407V1.975c0-.799-.646-1.408-1.407-1.408c-.799 0-1.446.647-1.446 1.408v3.12l-2.701-1.56c-.685-.38-1.56-.152-1.94.533c-.419.646-.19 1.521.494 1.902m9.093 6.011a.4.4 0 0 0-.114-.266l-.57-.571a.35.35 0 0 0-.267-.114a.4.4 0 0 0-.266.114l-.571.57a.4.4 0 0 0-.114.267c0 .076.038.19.114.267l.57.57a.35.35 0 0 0 .267.114a.4.4 0 0 0 .266-.114l.571-.57a.4.4 0 0 0 .114-.267m1.598.533L11.94 14.53c-.039.038-.153.114-.229.114h-.608a.4.4 0 0 1-.267-.114L8.82 12.514a.4.4 0 0 1-.076-.229v-.608c0-.076.038-.19.114-.267l2.016-2.016a.4.4 0 0 1 .267-.114h.608a.4.4 0 0 1 .267.114l2.016 2.016a.35.35 0 0 1 .114.267v.608c-.076.077-.114.19-.19.229m5.593 5.44l-4.832-2.777c-.266-.152-.57-.19-.837-.152c-.723.038-1.332.684-1.332 1.408v5.554c0 .8.647 1.408 1.408 1.408c.799 0 1.446-.647 1.446-1.408v-3.12l2.7 1.56c.686.38 1.561.152 1.941-.533c.419-.646.19-1.521-.494-1.94m2.549-7.533l-2.701 1.56l2.7 1.56c.686.38.914 1.256.533 1.94c-.38.685-1.255.913-1.94.533l-4.832-2.778a1.64 1.64 0 0 1-.647-.798c-.037-.153-.076-.305-.076-.457c0-.114.039-.228.039-.342c.114-.343.342-.647.646-.837l4.832-2.778c.685-.38 1.56-.152 1.94.533c.457.609.19 1.484-.494 1.864"
                  />
                </svg>
                <span
                  class="text-[11px] font-bold text-slate-600 text-center leading-tight"
                  >Snowflake</span
                >
              </div>
            </div>
          </div>

          <!-- 3. Custom Providers -->
          <div
            class="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div
                  class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5"
                >
                  <lucide-icon [img]="Braces" [size]="24" />
                </div>
                <h3 class="text-xl font-header font-bold text-dark mb-3">
                  Extensible by design
                </h3>
                <p
                  class="text-slate-500 text-sm font-medium leading-relaxed mb-5"
                >
                  Any data source, any format. Implement a simple interface and
                  Autopilot handles the rest: batching, prefetching, and
                  distributed loading included.
                </p>
                <ul class="space-y-2.5">
                  <li
                    class="flex items-center gap-2.5 text-sm font-semibold text-slate-600"
                  >
                    <div
                      class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                    ></div>
                    Custom S3-compatible stores
                  </li>
                  <li
                    class="flex items-center gap-2.5 text-sm font-semibold text-slate-600"
                  >
                    <div
                      class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                    ></div>
                    Proprietary database connectors
                  </li>
                  <li
                    class="flex items-center gap-2.5 text-sm font-semibold text-slate-600"
                  >
                    <div
                      class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                    ></div>
                    Streaming and real-time sources
                  </li>
                </ul>
              </div>
              <div
                class="bg-slate-900 rounded-2xl p-5 font-mono text-xs leading-relaxed overflow-x-auto"
              >
                <div class="text-slate-500 mb-1"># Implement one interface</div>
                <div>
                  <span class="text-violet-400">class </span
                  ><span class="text-emerald-400">MyDataProvider</span
                  ><span class="text-slate-300">(DataProvider):</span>
                </div>
                <div class="pl-4">
                  <span class="text-blue-400">def </span
                  ><span class="text-emerald-300">__len__</span
                  ><span class="text-slate-300">(self) -&gt; int: ...</span>
                </div>
                <div class="pl-4">
                  <span class="text-blue-400">def </span
                  ><span class="text-emerald-300">__getitem__</span
                  ><span class="text-slate-300"
                    >(self, idx) -&gt; Sample: ...</span
                  >
                </div>
                <div class="mt-3 text-slate-500"># Autopilot does the rest</div>
                <div>
                  <span class="text-slate-300">ap.</span
                  ><span class="text-emerald-400">run</span
                  ><span class="text-slate-300">(</span
                  ><span class="text-emerald-300">MyDataProvider</span
                  ><span class="text-slate-300">())</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<!-- Who We Build For -->
      <section
        class="container mx-auto px-6 py-10 md:py-14 border-t border-slate-100"
      >
        <h2
          class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-12"
        >
          Who We Build For
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/50"
          >
            <h4 class="font-header font-bold text-dark mb-4 text-xl">
              ML Platform Teams
            </h4>
            <p class="text-slate-500 text-sm font-medium">
              Standardize optimization policies across the organization and
              reduce infrastructure overhead.
            </p>
          </div>
          <div
            class="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/50"
          >
            <h4 class="font-header font-bold text-dark mb-4 text-xl">
              Applied AI Orgs
            </h4>
            <p class="text-slate-500 text-sm font-medium">
              Accelerate time-to-market for models by automating hardware-aware
              placement and scaling.
            </p>
          </div>
          <div
            class="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/50"
          >
            <h4 class="font-header font-bold text-dark mb-4 text-xl">
              Research Labs
            </h4>
            <p class="text-slate-500 text-sm font-medium">
              Maximized GPU availability for experimental workloads with
              intelligent resource scheduling.
            </p>
          </div>
          <div
            class="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/50"
          >
            <h4 class="font-header font-bold text-dark mb-4 text-xl">
              HPC Centers
            </h4>
            <p class="text-slate-500 text-sm font-medium">
              National labs running large-scale simulations on GPU clusters.
              Virtual memory stitching eliminates VRAM fragmentation across
              parallel workloads.
            </p>
          </div>
        </div>
      </section>

<!-- Features / Capabilities -->
      <section class="container mx-auto px-6 py-10 md:py-12">
        <div class="mb-8 md:mb-10 text-center">
          <h2
            class="text-3xl md:text-5xl font-header font-bold text-dark mb-6 tracking-tight"
          >
            Use Cases
          </h2>
          <p class="text-slate-500 text-lg mb-10 font-medium max-w-2xl mx-auto">
            From GPU fleet operators to compliance-constrained enterprise teams,
            our full stack of memory, training, and quantization tools addresses
            the infrastructure problems that block production AI.
          </p>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            <a
              routerLink="/use-cases"
              fragment="gpu-providers"
              class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div
                class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4"
              >
                <lucide-icon [img]="Cpu" [size]="20" />
              </div>
              <h4
                class="text-base font-header font-bold text-dark mb-2 group-hover:text-primary transition-colors"
              >
                GPU Providers
              </h4>
              <p class="text-sm text-slate-500 font-medium leading-relaxed">
                Optimemory's VMM layer lets tenants address 2x model memory per
                physical card, cutting OOM-driven churn. Autopilot reduces
                time-to-first-run for new tenants to a single API call.
              </p>
            </a>
            <a
              routerLink="/use-cases"
              fragment="enterprise-training"
              class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                <lucide-icon [img]="Building2" [size]="20" />
              </div>
              <h4
                class="text-base font-header font-bold text-dark mb-2 group-hover:text-primary transition-colors"
              >
                Enterprise Training
              </h4>
              <p class="text-sm text-slate-500 font-medium leading-relaxed">
                Autopilot automates pipeline builds with zero raw data egress,
                satisfying compliance requirements. DeepTuner's FP8 path
                compresses trained models for on-device deployment.
              </p>
            </a>
            <a
              routerLink="/use-cases"
              fragment="research-institutions"
              class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                <lucide-icon [img]="Microscope" [size]="20" />
              </div>
              <h4
                class="text-base font-header font-bold text-dark mb-2 group-hover:text-primary transition-colors"
              >
                Research Institutions
              </h4>
              <p class="text-sm text-slate-500 font-medium leading-relaxed">
                Optimemory moves the effective model ceiling from 3B to 6B
                parameters on identical hardware. Autopilot accelerates
                hypothesis testing on tabular phenotype datasets.
              </p>
            </a>
            <a
              routerLink="/use-cases"
              fragment="manufacturing"
              class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                <lucide-icon [img]="Factory" [size]="20" />
              </div>
              <h4
                class="text-base font-header font-bold text-dark mb-2 group-hover:text-primary transition-colors"
              >
                Manufacturing
              </h4>
              <p class="text-sm text-slate-500 font-medium leading-relaxed">
                Autopilot ingests sensor and image data natively. Optimemory
                extends VRAM on constrained edge nodes. DeepTuner compresses
                models for real-time factory-floor inference.
              </p>
            </a>
          </div>
        </div>

      </section>

<!-- Enterprise Features -->
      <section
        class="container mx-auto px-6 py-10 md:py-12 bg-slate-50/30 rounded-[2rem] md:rounded-[3rem] border border-slate-100/50"
      >
        <div class="text-center mb-12 md:mb-16">
          <h2
            class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark mb-6 tracking-tight"
          >
            Deploy Anywhere, Own Everything
          </h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-medium">
            Runs entirely on your hardware. Your data, your models, your
            infrastructure. No cloud dependency, no data egress, no vendor
            lock-in.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
            >
              <lucide-icon [img]="Server" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">
              On-Premise Execution
            </h4>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              The entire pipeline, from data profiling to model training, runs
              on your own servers. No data ever leaves your environment.
            </p>
          </div>
          <div
            class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
            >
              <lucide-icon [img]="Ban" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Zero Data Egress</h4>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Training data is never transmitted to external services. LLM calls
              carry only schema metadata and error traces, never raw records.
            </p>
          </div>
          <div
            class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
            >
              <lucide-icon [img]="ShieldCheck" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">
              Sandboxed Code Execution
            </h4>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              LLM-generated preprocessing code runs in a restricted sandbox.
              Only approved libraries are permitted with no arbitrary system
              access.
            </p>
          </div>
          <div
            class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
            >
              <lucide-icon [img]="Key" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">
              Bring Your Own LLM Key
            </h4>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Supply your own OpenAI or Groq API key via
              <code class="bg-slate-100 px-1 rounded text-dark"
                >PipelineConfig</code
              >. You choose the provider, you own the usage.
            </p>
          </div>
          <div
            class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
            >
              <lucide-icon [img]="ChartBar" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Full Audit Trail</h4>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Every pipeline run emits per-stage timing, memory usage, and CPU
              metrics: a complete, inspectable record of every automated
              decision.
            </p>
          </div>
          <div
            class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
            >
              <lucide-icon [img]="Globe" [size]="20" />
            </div>
            <h4 class="text-sm font-bold text-dark mb-2">Industry Agnostic</h4>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Works on any tabular dataset regardless of domain: healthcare,
              finance, retail, or manufacturing. No industry-specific
              configuration needed.
            </p>
          </div>
        </div>
      </section>

      <!-- Enterprise CTA -->
      <section
        class="container mx-auto px-6 pt-10 md:pt-12 pb-6 md:pb-8 text-center"
      >
        <div
          class="max-w-xl mx-auto p-6 sm:p-8 rounded-[2rem] md:rounded-[3rem] bg-slate-50 border border-slate-100 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"
          ></div>
          @if (!demoSucceeded()) {
            <h2
              class="text-2xl sm:text-3xl font-header font-bold text-dark mb-3 tracking-tight"
            >
              Request a Demo
            </h2>
            <p class="text-slate-500 text-sm mb-8 max-w-sm mx-auto font-medium">
              See Autopilot in action on your data. Our team will walk you through
              a live session.
            </p>
            <form
              [formGroup]="demoForm"
              (ngSubmit)="submitDemo()"
              class="space-y-3 text-left"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  formControlName="name"
                  type="text"
                  placeholder="Your name"
                  class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-white transition-colors"
                  [class.border-red-300]="isDemoInvalid('name')"
                  [class.border-slate-200]="!isDemoInvalid('name')"
                />
                <input
                  formControlName="org"
                  type="text"
                  placeholder="Company"
                  class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border border-slate-200 bg-white"
                />
              </div>
              <input
                formControlName="email"
                type="email"
                placeholder="Work email"
                class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-white transition-colors"
                [class.border-red-300]="isDemoInvalid('email')"
                [class.border-slate-200]="!isDemoInvalid('email')"
              />
              @if (demoSubmitted()) {
                @if (isDemoInvalid('name')) {
                  <p class="text-xs text-red-500 font-semibold">
                    Please enter your name.
                  </p>
                } @else if (
                  isDemoInvalid('email') &&
                  demoForm.get('email')?.hasError('required')
                ) {
                  <p class="text-xs text-red-500 font-semibold">
                    Please enter your work email.
                  </p>
                } @else if (isDemoInvalid('email')) {
                  <p class="text-xs text-red-500 font-semibold">
                    Please use a valid business email address.
                  </p>
                }
              }
              <button
                type="submit"
                [disabled]="demoSubmitting()"
                class="w-full bg-dark text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-black transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
              >
                {{ demoSubmitting() ? 'Sending…' : 'Request Demo' }}
              </button>
            </form>
          } @else {
            <div class="py-3 flex flex-col items-center text-center">
              <!-- Checkmark -->
              <div class="w-[72px] h-[72px] rounded-full bg-emerald-500/10 flex items-center justify-center mb-7">
                <lucide-icon [img]="CircleCheck" [size]="44" class="text-emerald-500" />
              </div>
              <h3 class="text-2xl font-header font-bold text-dark mb-3 tracking-tight">
                You're in ✨
              </h3>
              <p class="text-slate-500 text-sm font-medium leading-relaxed">
                Thank you for reaching out. We just saw this and can't wait to connect. Our founders will reach out personally.
              </p>
            </div>
          }
        </div>
      </section>

    </div>

    <!-- Failure Toast -->
    @if (demoFailed()) {
      <div
        class="fixed bottom-6 inset-x-0 z-50 pointer-events-none animate-fade-in flex justify-center px-4"
      >
        <div
          class="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-red-600 text-white shadow-2xl max-w-sm w-full sm:w-auto"
        >
          <lucide-icon [img]="X" [size]="16" class="flex-shrink-0" />
          <span class="text-sm font-semibold">Failed to send. Please try again.</span>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes float-star {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
      50% { transform: translateY(-8px) scale(1.15); opacity: 1; }
    }
  `],
})
export class HomeComponent {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.title.setTitle('Deep Variance — Hardware-Aware AI Infrastructure');
    this.meta.updateTag({ name: 'description', content: 'Infrastructure tools for AI training. Autopilot automates ML pipelines from raw data. Optimemory doubles effective VRAM. DeepTuner delivers FP8 training with near-zero perplexity loss.' });
    this.meta.updateTag({ property: 'og:title', content: 'Deep Variance — Hardware-Aware AI Infrastructure' });
    this.meta.updateTag({ property: 'og:description', content: 'Infrastructure tools for AI training. Autopilot automates ML pipelines from raw data. Optimemory doubles effective VRAM. DeepTuner delivers FP8 training with near-zero perplexity loss.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Deep Variance — Hardware-Aware AI Infrastructure' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Infrastructure tools for AI training. Autopilot automates ML pipelines from raw data. Optimemory doubles effective VRAM. DeepTuner delivers FP8 training with near-zero perplexity loss.' });
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

  readonly Copy = Copy;
  readonly ExternalLink = ExternalLink;
  readonly Image = Image;
  readonly Table2 = Table2;
  readonly Server = Server;
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
  readonly Layers = Layers;
  readonly HardDrive = HardDrive;
  readonly Braces = Braces;
  readonly Building2 = Building2;
  readonly Factory = Factory;
  readonly Microscope = Microscope;
  readonly X = X;

  private fb = inject(FormBuilder);

  pipCopied = signal(false);

  copyPip() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText('pip install deepvariance-sdk');
    this.pipCopied.set(true);
    setTimeout(() => this.pipCopied.set(false), 1500);
  }

  demoForm = this.fb.group({
    name: ['', Validators.required],
    org: [''],
    email: ['', [Validators.required, businessEmailValidator]],
  });

  demoSubmitting = signal(false);
  demoSucceeded = signal(false);
  demoSubmitted = signal(false);
  demoFailed = signal(false);

  isDemoInvalid(field: string): boolean {
    const ctrl = this.demoForm.get(field);
    return !!(ctrl?.invalid && (ctrl.touched || this.demoSubmitted()));
  }

  async submitDemo() {
    this.demoSubmitted.set(true);
    if (this.demoForm.invalid || this.demoSubmitting()) return;
    this.demoSubmitting.set(true);
    const { name, org, email } = this.demoForm.getRawValue();
    try {
      const res = await fetch('https://formsubmit.co/ajax/founders@deepvariance.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          organization: org,
          _subject: 'DeepVariance: Demo Request',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      this.demoSucceeded.set(true);
    } catch {
      this.demoFailed.set(true);
      setTimeout(() => this.demoFailed.set(false), 4000);
    } finally {
      this.demoSubmitting.set(false);
    }
  }
}
