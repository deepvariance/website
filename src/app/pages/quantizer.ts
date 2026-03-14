import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CircleCheck, LucideAngularModule } from 'lucide-angular';

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
  imports: [ReactiveFormsModule, LucideAngularModule],
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
        >
          DeepTuner:<br />The
          <span class="text-blue-600 italic">FP8 engine</span>.
        </h1>

        <p
          class="text-base sm:text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
        >
          State-of-the-art quantization techniques for large language models.
          Currently supporting <span class="font-bold text-dark">FP8</span> with
          near-zero perplexity loss.
        </p>

        <div class="max-w-md mx-auto relative group mt-8 sm:mt-0">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-600/50 blur opacity-20 group-hover:opacity-40 transition"
          ></div>
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
        </div>

        <!-- Release Tiers -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-24 text-left"
        >
          <div
            class="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm"
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
      </section>
    </div>

    <!-- Toast -->
    @if (toastVisible()) {
      <div
        class="fixed bottom-6 inset-x-0 z-50 pointer-events-none animate-fade-in flex justify-center px-4"
      >
        <div
          class="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-white/10 max-w-sm w-full sm:w-auto"
        >
          <div
            class="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0"
          >
            <lucide-icon
              [img]="CircleCheck"
              [size]="14"
              class="text-blue-400"
            />
          </div>
          <span class="text-sm font-semibold"
            >You're on the list. We'll reach out soon.</span
          >
        </div>
      </div>
    }
  `,
})
export class QuantizerPageComponent {
  private fb = inject(FormBuilder);
  readonly CircleCheck = CircleCheck;

  form = this.fb.group({
    name: ['', Validators.required],
    org: [''],
    email: ['', [Validators.required, businessEmailValidator]],
    usecase: ['', Validators.required],
  });

  submitting = signal(false);
  toastVisible = signal(false);
  submitted = signal(false);

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
      await fetch('https://formsubmit.co/ajax/founders@deepvariance.com', {
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
      this.form.reset();
      this.submitted.set(false);
      this.toastVisible.set(true);
      setTimeout(() => this.toastVisible.set(false), 4000);
    } finally {
      this.submitting.set(false);
    }
  }
}
