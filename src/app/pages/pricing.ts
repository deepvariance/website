import { Component, signal } from '@angular/core';
import {
  LucideAngularModule,
  CircleCheck, Server, Users,
} from 'lucide-angular';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="relative overflow-hidden min-h-screen">
      <!-- Background -->
      <div class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"></div>

      <section class="container mx-auto px-6 pt-24 md:pt-32 pb-24">
        <!-- Hero -->
        <div class="max-w-3xl mx-auto text-center mb-20">
          <span class="inline-block text-[10px] font-bold text-primary uppercase tracking-widest mb-6 px-3 py-1.5 bg-primary/8 rounded-full">Pricing</span>
          <h1 class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-8">
            Tailored to your<br>infrastructure.
          </h1>
          <p class="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            Every team runs different hardware, different workloads, and different constraints.
            We work directly with you to scope what fits.
          </p>
        </div>

        <!-- Cards -->
        <div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          <div class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
              <lucide-icon [img]="CircleCheck" [size]="20" />
            </div>
            <h3 class="text-base font-header font-bold text-dark mb-2">No seat limits</h3>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">Pricing is scoped to your deployment, not headcount. Every engineer on your team can use it.</p>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
              <lucide-icon [img]="Server" [size]="20" />
            </div>
            <h3 class="text-base font-header font-bold text-dark mb-2">On-premise first</h3>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">Every solution runs entirely on your infrastructure. No data leaves your environment, ever.</p>
          </div>

          <div class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
              <lucide-icon [img]="Users" [size]="20" />
            </div>
            <h3 class="text-base font-header font-bold text-dark mb-2">Dedicated support</h3>
            <p class="text-sm text-slate-500 font-medium leading-relaxed">Direct access to the engineering team. Integration help, custom kernel work, and ongoing guidance included.</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="max-w-xl mx-auto">
          <div class="text-center mb-10">
            <h2 id="contact-form" class="text-2xl sm:text-3xl font-header font-bold text-dark mb-3 tracking-tight">
              Tell us what you're building.
            </h2>
            <p class="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Share a bit about your setup and what you're working on. We'll take it from there.
            </p>
          </div>

          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary to-primary/40 blur opacity-10 group-hover:opacity-20 transition rounded-3xl"></div>
            <div class="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input #nameInput type="text" placeholder="Your name" required
                  class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-slate-50/50 transition-colors"
                  [class.border-red-300]="showErrors() && !nameInput.value.trim()"
                  [class.border-slate-200]="!(showErrors() && !nameInput.value.trim())">
                <input #orgInput type="text" placeholder="Organization"
                  class="px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border border-slate-200 bg-slate-50/50">
              </div>
              <input #emailInput type="email" placeholder="Work email" required
                class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-slate-50/50 transition-colors"
                [class.border-red-300]="showErrors() && (!emailInput.value.trim() || !isValidEmail(emailInput.value))"
                [class.border-slate-200]="!(showErrors() && (!emailInput.value.trim() || !isValidEmail(emailInput.value)))">
              <textarea #messageInput placeholder="Describe your workload, hardware setup, and team size." rows="4" required
                class="w-full px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl border bg-slate-50/50 resize-none transition-colors"
                [class.border-red-300]="showErrors() && !messageInput.value.trim()"
                [class.border-slate-200]="!(showErrors() && !messageInput.value.trim())"></textarea>
              @if (showErrors()) {
                @if (!nameInput.value.trim()) {
                  <p class="text-xs text-red-500 font-semibold">Please enter your name.</p>
                } @else if (!emailInput.value.trim()) {
                  <p class="text-xs text-red-500 font-semibold">Please enter your work email.</p>
                } @else if (!isValidEmail(emailInput.value)) {
                  <p class="text-xs text-red-500 font-semibold">Please use a valid business email address.</p>
                } @else if (!messageInput.value.trim()) {
                  <p class="text-xs text-red-500 font-semibold">Please describe your workload.</p>
                }
              }
              <button
                (click)="submitContact(nameInput.value, orgInput.value, emailInput.value, messageInput.value)"
                [disabled]="submitting()"
                class="w-full bg-primary text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ submitting() ? 'Sending…' : 'Talk to our team' }}
              </button>
              <p class="text-center text-[11px] text-slate-400 font-medium">We typically respond within one business day.</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Toast -->
    @if (toastVisible()) {
      <div class="fixed bottom-6 inset-x-0 z-50 pointer-events-none animate-fade-in flex justify-center px-4">
        <div class="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-white/10 max-w-sm w-full sm:w-auto">
          <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <lucide-icon [img]="CircleCheck" [size]="14" class="text-emerald-400" />
          </div>
          <span class="text-sm font-semibold">Thanks! We'll be in touch soon.</span>
        </div>
      </div>
    }
  `
})
export class PricingPageComponent {
  readonly CircleCheck = CircleCheck;
  readonly Server = Server;
  readonly Users = Users;

  submitting = signal(false);
  toastVisible = signal(false);
  showErrors = signal(false);

  isValidEmail(email: string) {
    const v = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return false;
    const blocked = ['mailinator','yopmail','guerrillamail','trashmail','temp-mail','throwaway','maildrop','sharklasers','spamgourmet','mailnull','getairmail','tempmail','dispostable','airmail.cc','spam4.me','yomail','throwam','fakeinbox','getnada','33mail','trashmail','mailexpire','spamex','spamfree','spaml','spamoff','tempr.email','tempr','throwam','inboxbear','crazymailing','emailondeck','filzmail','tmail','tmpmail','moakt'];
    const domain = v.split('@')[1];
    return !blocked.some(b => domain.includes(b));
  }

  async submitContact(name: string, org: string, email: string, message: string) {
    if (!name.trim() || !email.trim() || !message.trim() || !this.isValidEmail(email)) {
      this.showErrors.set(true);
      return;
    }
    this.showErrors.set(false);
    if (this.submitting()) return;
    this.submitting.set(true);
    try {
      await fetch('https://formsubmit.co/ajax/founders@deepvariance.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          organization: org,
          message,
          _subject: 'DeepVariance — Talk to Sales',
          _captcha: 'false',
        }),
      });
      this.toastVisible.set(true);
      setTimeout(() => this.toastVisible.set(false), 4000);
    } finally {
      this.submitting.set(false);
    }
  }
}
