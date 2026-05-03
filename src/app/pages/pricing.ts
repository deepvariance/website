import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  Banknote,
  CircleCheck,
  LucideAngularModule,
  Lock,
  Server,
  Users,
  Wallet,
  X,
} from 'lucide-angular';

import {
  ChallengeCalloutsComponent,
  ChallengeCallout,
} from '../components/challenge-callouts';
import { GlassCardComponent } from '../components/glass-card';
import { StatusPillComponent } from '../components/status-pill';
import { SeoService } from '../services/seo.service';

function businessEmailValidator(control: AbstractControl): ValidationErrors | null {
  const v = (control.value || '').trim().toLowerCase();
  if (!v) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { invalidEmail: true };
  const blocked = [
    'mailinator', 'yopmail', 'guerrillamail', 'trashmail', 'temp-mail', 'throwaway',
    'maildrop', 'sharklasers', 'spamgourmet', 'mailnull', 'getairmail', 'tempmail',
    'dispostable', 'airmail.cc', 'spam4.me', 'yomail', 'throwam', 'fakeinbox',
    'getnada', '33mail', 'mailexpire', 'spamex', 'spamfree', 'spaml', 'spamoff',
    'tempr.email', 'tempr', 'inboxbear', 'crazymailing', 'emailondeck', 'filzmail',
    'tmail', 'tmpmail', 'moakt',
  ];
  const domain = v.split('@')[1];
  return blocked.some((b) => domain.includes(b)) ? { disposableEmail: true } : null;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    GlassCardComponent,
    ChallengeCalloutsComponent,
    StatusPillComponent,
  ],
  template: `
    <div class="relative">
      <!-- Hero -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-12 md:pt-40 md:pb-16">
        <div aria-hidden="true" class="hero-halo-neon top-12 left-1/2 -translate-x-1/2 opacity-70"></div>
        <div aria-hidden="true" class="hero-halo-indigo right-[-10%] top-12"></div>

        <div class="relative max-w-3xl mx-auto text-center">
          <div class="flex justify-center mb-7">
            <app-status-pill variant="live">Enterprise ready · scoped to fit</app-status-pill>
          </div>
          <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
            Tailored to your
            <br class="hidden sm:block" />
            <span class="text-white">infrastructure</span>.
          </h1>
          <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed">
            Every team runs different hardware, different workloads, and different constraints. We
            work directly with you to scope what fits.
          </p>
        </div>
      </section>

      <!-- 3-up alliterative principles -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-10 md:py-14">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <app-glass-card extraClass="p-7">
            <p class="font-display text-3xl text-on-surface mb-2">Memory.</p>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Optimemory is metered by GPU node-month. No tenant lock-in.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-7">
            <p class="font-display text-3xl text-on-surface mb-2">Models.</p>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              HyperRAG and DeepTuner are scoped per workload, pay for the optimization runtime,
              not seats.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-7">
            <p class="font-display text-3xl text-on-surface mb-2">Money.</p>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Every pilot is scoped to a measurable target, utilization, TTFT, joules. If we don't
              hit it, we revise the contract.
            </p>
          </app-glass-card>
        </div>
      </section>

      <!-- Challenge callouts -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-10 md:py-14">
        <app-challenge-callouts
          headline="Most enterprise AI pricing is just SaaS pricing in a hat."
          subhead="Per-seat licensing, opaque overages, and a cap on how much value you can extract per dollar. Our pricing tracks your hardware utilization, not your headcount."
          [items]="pricingChallenges"
        />
      </section>

      <!-- Feature trio (kept, secondary) -->
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <app-glass-card extraClass="p-7">
            <div class="dv-feature-icon"><lucide-icon [img]="CircleCheck" [size]="20" /></div>
            <h3 class="font-display text-lg font-semibold text-on-surface mb-2">No seat limits</h3>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Pricing is scoped to your deployment, not headcount. Every engineer on your team can
              use it.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-7">
            <div class="dv-feature-icon"><lucide-icon [img]="Server" [size]="20" /></div>
            <h3 class="font-display text-lg font-semibold text-on-surface mb-2">On-premise first</h3>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Every solution runs entirely on your infrastructure. No data leaves your environment,
              ever.
            </p>
          </app-glass-card>
          <app-glass-card extraClass="p-7">
            <div class="dv-feature-icon"><lucide-icon [img]="Users" [size]="20" /></div>
            <h3 class="font-display text-lg font-semibold text-on-surface mb-2">Dedicated support</h3>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              Direct access to the engineering team. Integration help, custom kernel work, and
              ongoing guidance included.
            </p>
          </app-glass-card>
        </div>
      </section>

      <!-- Contact form -->
      <section id="contact-form" class="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 md:py-24 scroll-mt-28">
        <div class="max-w-xl mx-auto">
          <div class="text-center mb-10">
            <span class="label-caps mb-4 inline-block">Talk to us</span>
            <h2 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-4xl leading-tight">
              Tell us what you're <span class="text-white">building</span>.
            </h2>
            <p class="mt-4 text-on-surface-variant leading-relaxed">
              Share a bit about your setup and what you're working on. We'll take it from there.
            </p>
          </div>

          @if (!succeeded()) {
            <app-glass-card variant="strong" rounded="2xl" extraClass="p-8 md:p-10" [glow]="true">
              <form [formGroup]="form" (ngSubmit)="submitContact()" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    formControlName="name"
                    type="text"
                    placeholder="Your name"
                    class="glass-input w-full px-4 py-3 text-sm font-medium"
                    [class.!border-red-400]="isInvalid('name')"
                  />
                  <input
                    formControlName="org"
                    type="text"
                    placeholder="Organization"
                    class="glass-input w-full px-4 py-3 text-sm font-medium"
                  />
                </div>
                <input
                  formControlName="email"
                  type="email"
                  placeholder="Work email"
                  class="glass-input w-full px-4 py-3 text-sm font-medium"
                  [class.!border-red-400]="isInvalid('email')"
                />
                <textarea
                  formControlName="message"
                  placeholder="Describe your workload, hardware setup, and team size."
                  rows="4"
                  class="glass-input w-full px-4 py-3 text-sm font-medium resize-none"
                  [class.!border-red-400]="isInvalid('message')"
                ></textarea>

                @if (submitted()) {
                  @if (isInvalid('name')) {
                    <p class="text-xs text-red-400 font-mono uppercase tracking-[0.16em]">
                      Please enter your name.
                    </p>
                  } @else if (isInvalid('email') && form.get('email')?.hasError('required')) {
                    <p class="text-xs text-red-400 font-mono uppercase tracking-[0.16em]">
                      Please enter your work email.
                    </p>
                  } @else if (isInvalid('email')) {
                    <p class="text-xs text-red-400 font-mono uppercase tracking-[0.16em]">
                      Please use a valid business email address.
                    </p>
                  } @else if (isInvalid('message')) {
                    <p class="text-xs text-red-400 font-mono uppercase tracking-[0.16em]">
                      Please describe your workload.
                    </p>
                  }
                }

                <button
                  type="submit"
                  [disabled]="submitting()"
                  class="w-full inline-flex items-center justify-center gap-2 dv-btn-primary px-7 py-3.5 rounded-md text-[12px] tracking-[0.16em] uppercase font-display font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {{ submitting() ? 'Sending…' : 'Talk to our team' }}
                </button>

                <p class="text-center text-[11px] font-mono uppercase tracking-[0.18em] text-outline">
                  We typically respond within one business day.
                </p>
              </form>
            </app-glass-card>
          } @else {
            <app-glass-card variant="strong" rounded="2xl" extraClass="p-10 text-center" [glow]="true">
              <div
                class="w-[72px] h-[72px] rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-6"
              >
                <lucide-icon [img]="CircleCheck" [size]="40" class="text-white" />
              </div>
              <h3 class="font-display text-2xl font-semibold text-on-surface mb-3">
                We'll be in touch.
              </h3>
              <p class="text-on-surface-variant leading-relaxed max-w-md mx-auto">
                Thank you for reaching out. Your message landed directly in the founders' inbox , 
                they'll reach out personally.
              </p>
            </app-glass-card>
          }
        </div>
      </section>
    </div>

    @if (failed()) {
      <div
        class="fixed bottom-6 inset-x-0 z-50 pointer-events-none animate-fade-in flex justify-center px-4"
      >
        <div
          class="flex items-center gap-3 px-5 py-3.5 rounded-md bg-red-600/90 text-white shadow-2xl backdrop-blur-md max-w-sm w-full sm:w-auto"
        >
          <lucide-icon [img]="X" [size]="16" class="flex-shrink-0" />
          <span class="text-sm font-semibold">Failed to send. Please try again.</span>
        </div>
      </div>
    }
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
        width: 44px;
        height: 44px;
        border-radius: 0.5rem;
        margin-bottom: 1.1rem;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
        color: #9d6fff;
      }
    `,
  ],
})
export class PricingPageComponent {
  private fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);

  readonly CircleCheck = CircleCheck;
  readonly Server = Server;
  readonly Users = Users;
  readonly X = X;

  readonly pricingChallenges: ChallengeCallout[] = [
    {
      icon: Wallet,
      highlight: 'Per-seat licensing',
      body: 'caps your value extraction at your headcount, not your hardware. We scope by node, not by user.',
    },
    {
      icon: Lock,
      highlight: 'Opaque overage',
      body: 'fees show up after the close. We bake all multipliers into the contract so spend is predictable from day one.',
    },
    {
      icon: Banknote,
      highlight: 'Fixed-tier plans',
      body: 'force every team into the same SKU regardless of workload. Every Deep Variance pilot is scoped to a measurable target.',
    },
  ];

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

  constructor() {
    this.seo.set({
      title: 'Pricing | Deep Variance',
      description:
        'Deep Variance pricing. Get access to Optimemory, HyperRAG, and DeepTuner. Talk to our team for enterprise and HPC plans.',
      path: '/pricing',
    });
  }

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
          _subject: 'Deep Variance: Talk to Sales',
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
