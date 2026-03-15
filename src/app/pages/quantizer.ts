import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import {
  Activity,
  CircleCheck,
  Layers,
  LucideAngularModule,
  X,
  Zap,
} from 'lucide-angular';

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
  selector: 'app-quantizer',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, AnimateOnScrollDirective],
  template: `
    <div
      class="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center justify-center"
    >
      <!-- Grid and Blur Background -->
      <div
        class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-blue-600/15 blur-[160px] rounded-full -z-20"
      ></div>

      <section class="container mx-auto px-6 py-16 md:py-24 text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/5 border border-blue-600/10 text-blue-600 text-[11px] font-bold uppercase tracking-wider mb-12 animate-fade-in"
        >
          LLM Tuner - in beta testing.
        </div>

        <h1
          class="text-5xl sm:text-6xl md:text-8xl font-header font-bold text-dark tracking-tighter leading-[1] mb-12 max-w-4xl mx-auto"
          appAos="fade-in" [aosDelay]="0"
        >
          DeepTuner:<br />The
          <span class="text-blue-600">FP8 engine</span>.
        </h1>

        <p
          class="text-base sm:text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
          appAos="fade-in" [aosDelay]="80"
        >
          State-of-the-art quantization techniques for large language models.
          Currently supporting <span class="font-bold text-dark">FP8</span> with
          near-zero perplexity loss.
        </p>

        <div class="max-w-md mx-auto relative group mt-8 sm:mt-0" appAos="fade-up">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-600/50 blur opacity-20 group-hover:opacity-40 transition"
          ></div>
          @if (!succeeded()) {
            <form
              [formGroup]="form"
              (ngSubmit)="submitAccess()"
              class="relative bg-white p-6 rounded-2xl border border-slate-200 space-y-3"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  formControlName="name"
                  type="text"
                  placeholder="Your name"
                  class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 rounded-xl border bg-slate-50/50 transition-colors"
                  [class.border-red-300]="isInvalid('name')"
                  [class.border-slate-200]="!isInvalid('name')"
                />
                <input
                  formControlName="org"
                  type="text"
                  placeholder="Organization"
                  class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>
              <input
                formControlName="email"
                type="email"
                placeholder="Work email"
                class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 rounded-xl border bg-slate-50/50 transition-colors"
                [class.border-red-300]="isInvalid('email')"
                [class.border-slate-200]="!isInvalid('email')"
              />
              <textarea
                formControlName="usecase"
                placeholder="Describe your use case: model size, hardware, and what you want to fine-tune."
                rows="3"
                class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 rounded-xl border bg-slate-50/50 resize-none transition-colors"
                [class.border-red-300]="isInvalid('usecase')"
                [class.border-slate-200]="!isInvalid('usecase')"
              ></textarea>
              @if (submitted()) {
                @if (isInvalid('name')) {
                  <p class="text-xs text-red-500 font-semibold text-left">
                    Please enter your name.
                  </p>
                } @else if (
                  isInvalid('email') && form.get('email')?.hasError('required')
                ) {
                  <p class="text-xs text-red-500 font-semibold text-left">
                    Please enter your work email.
                  </p>
                } @else if (isInvalid('email')) {
                  <p class="text-xs text-red-500 font-semibold text-left">
                    Please use a valid business email address.
                  </p>
                } @else if (isInvalid('usecase')) {
                  <p class="text-xs text-red-500 font-semibold text-left">
                    Please describe your use case.
                  </p>
                }
              }
              <button
                type="submit"
                [disabled]="submitting()"
                class="w-full bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ submitting() ? 'Sending…' : 'Request Early Access' }}
              </button>
            </form>
          } @else {
            <div
              class="relative bg-white p-8 rounded-2xl border border-slate-200 flex flex-col items-center text-center"
            >
              <div class="w-[72px] h-[72px] rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
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

        <!-- Release Tiers -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-24 text-left"
        >
          <div
            class="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm"
            appAos="fade-up" [aosDelay]="0"
          >
            <span
              class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4 block"
              >Active Release</span
            >
            <h4 class="text-xl font-header font-bold text-dark mb-4">
              Native FP8 Precision
            </h4>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-6">
              Our research-backed FP8 kernels enable fine-tuning with 50% less
              memory than BF16 while maintaining 99.9% accuracy signatures.
            </p>
            <ul class="space-y-3 text-[11px] font-bold text-slate-600">
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-blue-600"></div>
                Reduced VRAM requirements
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-blue-600"></div>
                Higher throughput kernels
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-blue-600"></div>
                Minimal perplexity shift
              </li>
            </ul>
          </div>
          <div
            class="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm"
            appAos="fade-up" [aosDelay]="100"
          >
            <span
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block"
              >Upcoming Phase</span
            >
            <h4 class="text-xl font-header font-bold text-dark mb-4">
              Sparse-Aware Fine-Tuning
            </h4>
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-6">
              Exploiting activation sparsity during backward passes to further
              accelerate training on H100 hardware.
            </p>
            <ul class="space-y-3 text-[11px] font-bold text-slate-400">
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-slate-300"></div>
                2:4 Sparsity integration
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1 h-1 rounded-full bg-slate-300"></div>
                Structured mask optimization
              </li>
            </ul>
          </div>
        </div>

        <!-- Technical Architecture -->
        <div class="max-w-4xl mx-auto mt-24 text-left">
          <h2
            class="text-2xl sm:text-3xl font-header font-bold text-dark mb-4 text-center tracking-tight"
            appAos="fade-up"
          >
            How DeepTuner Achieves Near-Zero Perplexity Loss
          </h2>
          <p
            class="text-slate-500 text-base font-medium text-center mb-12 max-w-xl mx-auto"
          >
            Three precision-aware techniques work in concert to maintain
            convergence quality while halving memory requirements.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/10"
              appAos="fade-up" [aosDelay]="0"
            >
              <div
                class="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4"
              >
                <lucide-icon [img]="Layers" [size]="20" />
              </div>
              <h4 class="font-header font-bold text-dark mb-2">
                Dual-Format FP8
              </h4>
              <p class="text-sm text-slate-500 font-medium leading-relaxed">
                Forward pass uses E4M3 (4-bit exponent, 3-bit mantissa) for
                high accuracy. Backward pass uses E5M2 (5-bit exponent, 2-bit
                mantissa) for wider dynamic range during gradient flow.
              </p>
            </div>
            <div
              class="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/10"
              appAos="fade-up" [aosDelay]="100"
            >
              <div
                class="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4"
              >
                <lucide-icon [img]="Activity" [size]="20" />
              </div>
              <h4 class="font-header font-bold text-dark mb-2">
                Adaptive Loss Scaling
              </h4>
              <p class="text-sm text-slate-500 font-medium leading-relaxed">
                Auto-scaling mu policy monitors per-tensor saturation ratios
                every step. When saturation exceeds 0.001%, mu is halved
                immediately. When stable, mu grows back toward its maximum
                over a 1,000-step window.
              </p>
            </div>
            <div
              class="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/10"
              appAos="fade-up" [aosDelay]="200"
            >
              <div
                class="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4"
              >
                <lucide-icon [img]="Zap" [size]="20" />
              </div>
              <h4 class="font-header font-bold text-dark mb-2">
                Compressed Optimizer States
              </h4>
              <p class="text-sm text-slate-500 font-medium leading-relaxed">
                First-order momentum stored in FP8, second-order variance in
                FP16, master weights in FP16. Reduces optimizer memory from 16
                bytes per parameter to under 7 bytes.
              </p>
            </div>
          </div>
        </div>

        <!-- Optimization Levels -->
        <div class="max-w-4xl mx-auto mt-16 text-left">
          <h3
            class="text-xl sm:text-2xl font-header font-bold text-dark mb-8 text-center tracking-tight"
            appAos="fade-up"
          >
            Three Levels of FP8 Optimization
          </h3>
          <div class="space-y-4">
            <div
              class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-6"
              appAos="fade-up" [aosDelay]="0"
            >
              <div
                class="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600/5 border border-blue-600/10 flex items-center justify-center"
              >
                <span class="text-blue-600 font-header font-bold text-sm"
                  >O1</span
                >
              </div>
              <div>
                <h4 class="font-header font-bold text-dark mb-1">
                  FP8 Gradient Communication
                </h4>
                <p class="text-sm text-slate-500 font-medium leading-relaxed">
                  FP8 all-reduce for DDP gradient synchronization. Compresses
                  inter-GPU bandwidth by up to 2x with no change to the model
                  or optimizer code.
                </p>
              </div>
            </div>
            <div
              class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-6"
              appAos="fade-up" [aosDelay]="100"
            >
              <div
                class="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600/5 border border-blue-600/10 flex items-center justify-center"
              >
                <span class="text-blue-600 font-header font-bold text-sm"
                  >O2</span
                >
              </div>
              <div>
                <h4 class="font-header font-bold text-dark mb-1">
                  FP8 Optimizer States
                </h4>
                <p class="text-sm text-slate-500 font-medium leading-relaxed">
                  Includes O1 plus first-order momentum compression to FP8.
                  Cuts peak optimizer memory by over 2x, enabling larger models
                  or larger batch sizes on the same GPU.
                </p>
              </div>
            </div>
            <div
              class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-6"
              appAos="fade-up" [aosDelay]="200"
            >
              <div
                class="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center"
              >
                <span class="text-blue-600 font-header font-bold text-sm"
                  >O3</span
                >
              </div>
              <div>
                <h4 class="font-header font-bold text-dark mb-1">
                  Full FP8 Pipeline with ZeRO
                </h4>
                <p class="text-sm text-slate-500 font-medium leading-relaxed">
                  Includes O2 plus ZeRO-aware FP8 weight partitioning for
                  multi-GPU setups. Enables the full distributed FP8 training
                  pipeline with minimal precision loss across all ranks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Failure Toast -->
    @if (failed()) {
      <div class="fixed bottom-6 inset-x-0 z-50 pointer-events-none animate-fade-in flex justify-center px-4">
        <div class="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-red-600 text-white shadow-2xl max-w-sm w-full sm:w-auto">
          <lucide-icon [img]="X" [size]="16" class="flex-shrink-0" />
          <span class="text-sm font-semibold">Failed to send. Please try again.</span>
        </div>
      </div>
    }
  `,
})
export class QuantizerPageComponent {
  private fb = inject(FormBuilder);
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  constructor() {
    this.title.setTitle('LLM Tuner — FP8 Quantization Engine | Deep Variance');
    this.meta.updateTag({ name: 'description', content: 'DeepTuner delivers near-zero perplexity loss FP8 training. Dual-format E4M3/E5M2 precision, adaptive loss scaling, and compressed optimizer states. Currently in beta.' });
    this.meta.updateTag({ property: 'og:title', content: 'LLM Tuner — FP8 Quantization Engine | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: 'DeepTuner delivers near-zero perplexity loss FP8 training. Dual-format E4M3/E5M2 precision, adaptive loss scaling, and compressed optimizer states. Currently in beta.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/llm-tuner' });
    this.meta.updateTag({ name: 'twitter:title', content: 'LLM Tuner — FP8 Quantization Engine | Deep Variance' });
    this.meta.updateTag({ name: 'twitter:description', content: 'DeepTuner delivers near-zero perplexity loss FP8 training. Dual-format E4M3/E5M2 precision, adaptive loss scaling, and compressed optimizer states. Currently in beta.' });
    this.setCanonical('https://deepvariance.com/llm-tuner');
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
  readonly CircleCheck = CircleCheck;
  readonly Layers = Layers;
  readonly Activity = Activity;
  readonly Zap = Zap;
  readonly X = X;

  form = this.fb.group({
    name: ['', Validators.required],
    org: [''],
    email: ['', [Validators.required, businessEmailValidator]],
    usecase: ['', Validators.required],
  });

  submitting = signal(false);
  succeeded = signal(false);
  submitted = signal(false);
  failed = signal(false);

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && (ctrl.touched || this.submitted()));
  }

  async submitAccess() {
    this.submitted.set(true);
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    const { name, org, email, usecase } = this.form.getRawValue();
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
          usecase,
          _subject: 'LLM Tuner: Early Access Request',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      this.succeeded.set(true);
    } catch {
      this.failed.set(true);
      setTimeout(() => this.failed.set(false), 4000);
    } finally {
      this.submitting.set(false);
    }
  }
}
