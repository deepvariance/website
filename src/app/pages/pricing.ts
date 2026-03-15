import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  CircleCheck,
  LucideAngularModule,
  Server,
  Users,
  X,
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
  selector: 'app-pricing',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="relative overflow-hidden min-h-screen">
      <!-- Background -->
      <div
        class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      ></div>
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"
      ></div>

      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-24">
        <!-- Hero -->
        <div class="max-w-3xl mx-auto text-center mb-20">
          <span
            class="inline-block text-[10px] font-bold text-primary uppercase tracking-widest mb-6 px-3 py-1.5 bg-primary/8 rounded-full"
            >Pricing</span
          >
          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8"
          >
            Tailored to your<br />infrastructure.
          </h1>
          <p
            class="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed"
          >
            Every team runs different hardware, different workloads, and
            different constraints. We work directly with you to scope what fits.
          </p>
        </div>

        <!-- Cards -->
        <div
          class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
        >
          <div
            class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5"
            >
              <lucide-icon [img]="CircleCheck" [size]="20" />
            </div>
            <h3 class="text-base font-header font-bold text-dark mb-2">
              No seat limits
            </h3>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Pricing is scoped to your deployment, not headcount. Every
              engineer on your team can use it.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5"
            >
              <lucide-icon [img]="Server" [size]="20" />
            </div>
            <h3 class="text-base font-header font-bold text-dark mb-2">
              On-premise first
            </h3>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Every solution runs entirely on your infrastructure. No data
              leaves your environment, ever.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5"
            >
              <lucide-icon [img]="Users" [size]="20" />
            </div>
            <h3 class="text-base font-header font-bold text-dark mb-2">
              Dedicated support
            </h3>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">
              Direct access to the engineering team. Integration help, custom
              kernel work, and ongoing guidance included.
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="max-w-xl mx-auto">
          <div class="text-center mb-10">
            <h2
              id="contact-form"
              class="text-2xl sm:text-3xl font-header font-bold text-dark mb-3 tracking-tight"
            >
              Tell us what you're building.
            </h2>
            <p
              class="text-slate-500 text-sm sm:text-base font-medium leading-relaxed"
            >
              Share a bit about your setup and what you're working on. We'll
              take it from there.
            </p>
          </div>

          <div class="relative group">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-primary to-primary/40 blur opacity-10 group-hover:opacity-20 transition rounded-3xl"
            ></div>
            @if (!succeeded()) {
              <form
                [formGroup]="form"
                (ngSubmit)="submitContact()"
                class="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-4"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    formControlName="name"
                    type="text"
                    placeholder="Your name"
                    class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-slate-50/50 transition-colors"
                    [class.border-red-300]="isInvalid('name')"
                    [class.border-slate-200]="!isInvalid('name')"
                  />
                  <input
                    formControlName="org"
                    type="text"
                    placeholder="Organization"
                    class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>
                <input
                  formControlName="email"
                  type="email"
                  placeholder="Work email"
                  class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-slate-50/50 transition-colors"
                  [class.border-red-300]="isInvalid('email')"
                  [class.border-slate-200]="!isInvalid('email')"
                />
                <textarea
                  formControlName="message"
                  placeholder="Describe your workload, hardware setup, and team size."
                  rows="4"
                  class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-slate-50/50 resize-none transition-colors"
                  [class.border-red-300]="isInvalid('message')"
                  [class.border-slate-200]="!isInvalid('message')"
                ></textarea>
                @if (submitted()) {
                  @if (isInvalid('name')) {
                    <p class="text-xs text-red-500 font-semibold">
                      Please enter your name.
                    </p>
                  } @else if (
                    isInvalid('email') && form.get('email')?.hasError('required')
                  ) {
                    <p class="text-xs text-red-500 font-semibold">
                      Please enter your work email.
                    </p>
                  } @else if (isInvalid('email')) {
                    <p class="text-xs text-red-500 font-semibold">
                      Please use a valid business email address.
                    </p>
                  } @else if (isInvalid('message')) {
                    <p class="text-xs text-red-500 font-semibold">
                      Please describe your workload.
                    </p>
                  }
                }
                <button
                  type="submit"
                  [disabled]="submitting()"
                  class="w-full bg-primary text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {{ submitting() ? 'Sending…' : 'Talk to our team' }}
                </button>
                <p class="text-center text-[11px] text-slate-400 font-medium">
                  We typically respond within one business day.
                </p>
              </form>
            } @else {
              <div
                class="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center text-center"
              >
                <div class="w-[72px] h-[72px] rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                  <lucide-icon [img]="CircleCheck" [size]="44" class="text-emerald-500" />
                </div>
                <h3 class="text-2xl font-header font-bold text-dark mb-3 tracking-tight">
                  We'll be in touch ✨
                </h3>
                <p class="text-slate-500 text-sm font-medium leading-relaxed">
                  Thank you for reaching out. Your message landed directly in our founders' inbox and they'll reach out personally.
                </p>
              </div>
            }
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
export class PricingPageComponent {
  private fb = inject(FormBuilder);
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  constructor() {
    this.title.setTitle('Pricing | Deep Variance');
    this.meta.updateTag({ name: 'description', content: 'Deep Variance pricing. Get access to Autopilot, Optimemory, and DeepTuner. Talk to our team for enterprise plans.' });
    this.meta.updateTag({ property: 'og:title', content: 'Pricing | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: 'Deep Variance pricing. Get access to Autopilot, Optimemory, and DeepTuner. Talk to our team for enterprise plans.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/pricing' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Pricing | Deep Variance' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Deep Variance pricing. Get access to Autopilot, Optimemory, and DeepTuner. Talk to our team for enterprise plans.' });
    this.setCanonical('https://deepvariance.com/pricing');
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
  readonly Server = Server;
  readonly Users = Users;
  readonly X = X;

  form = this.fb.group({
    name: ['', Validators.required],
    org: [''],
    email: ['', [Validators.required, businessEmailValidator]],
    message: ['', Validators.required],
  });

  submitting = signal(false);
  succeeded = signal(false);
  submitted = signal(false);
  failed = signal(false);

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && (ctrl.touched || this.submitted()));
  }

  async submitContact() {
    this.submitted.set(true);
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    const { name, org, email, message } = this.form.getRawValue();
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
          message,
          _subject: 'DeepVariance: Talk to Sales',
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
