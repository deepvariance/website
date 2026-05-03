import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GlassCardComponent } from '../components/glass-card';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [RouterLink, GlassCardComponent],
  template: `
    <div class="relative max-w-3xl mx-auto px-6 lg:px-10 pt-32 pb-24">
      <div class="mb-10">
        <p class="label-caps mb-4">Legal</p>
        <h1 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-5xl mb-3">
          Cookie Policy
        </h1>
        <p class="text-sm font-mono uppercase tracking-[0.16em] text-outline">
          Last updated: March 14, 2026
        </p>
      </div>

      <app-glass-card variant="strong" rounded="2xl" extraClass="p-8 md:p-12">
        <div class="prose prose-invert max-w-none space-y-10 text-on-surface-variant font-medium leading-relaxed">
          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">1. What Are Cookies</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They
              allow the site to remember your actions and preferences over time, and help us
              understand how visitors interact with our site.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">2. Cookies We Use</h2>

            <div class="overflow-x-auto rounded-xl border border-white/8 bg-black/20 not-prose">
              <table class="w-full text-sm text-left">
                <thead class="text-[11px] font-mono uppercase tracking-[0.16em] text-outline border-b border-white/8">
                  <tr>
                    <th class="px-5 py-3.5">Cookie</th>
                    <th class="px-5 py-3.5">Provider</th>
                    <th class="px-5 py-3.5">Type</th>
                    <th class="px-5 py-3.5">Purpose</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr>
                    <td class="px-5 py-4 font-mono text-xs text-neon">_ga</td>
                    <td class="px-5 py-4 text-on-surface-variant">Google Analytics</td>
                    <td class="px-5 py-4 text-on-surface-variant">Analytics</td>
                    <td class="px-5 py-4 text-on-surface-variant">
                      Distinguishes users for traffic analysis. Expires after 2 years.
                    </td>
                  </tr>
                  <tr>
                    <td class="px-5 py-4 font-mono text-xs text-neon">_ga_*</td>
                    <td class="px-5 py-4 text-on-surface-variant">Google Analytics</td>
                    <td class="px-5 py-4 text-on-surface-variant">Analytics</td>
                    <td class="px-5 py-4 text-on-surface-variant">
                      Persists session state for GA4. Expires after 2 years.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>We use only analytics cookies. We do not use advertising, tracking, or profiling cookies.</p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">3. Analytics Cookies</h2>
            <p>
              We use Google Analytics (GA4) to collect anonymized data about how visitors use our
              site. <strong class="text-on-surface">No personally identifiable information</strong>
              is collected or stored by these cookies.
            </p>
            <p>
              Google Analytics data is processed and stored by Google in accordance with their
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="text-neon underline">Privacy Policy</a>.
              IP anonymization is enabled for all GA4 sessions on this site.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">4. Managing Cookies</h2>
            <p>You can control or disable cookies through several methods:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong class="text-on-surface">Browser settings:</strong> Most browsers allow you to view, block, or delete cookies via their privacy or settings menu.</li>
              <li>
                <strong class="text-on-surface">Google Analytics opt-out:</strong> Install the
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" class="text-neon underline">Google Analytics Opt-out Browser Add-on</a>.
              </li>
              <li><strong class="text-on-surface">Do Not Track:</strong> We respect Do Not Track (DNT) signals where technically feasible.</li>
            </ul>
            <p class="text-sm text-on-surface-variant">
              Note: Disabling cookies may affect the functionality of some third-party tools, but
              will not impact access to any core content.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">5. Session and Local Storage</h2>
            <p>
              This website does not use session storage or local storage to persist personal data.
              Any UI state (such as copied code snippets) is stored transiently in memory and is
              cleared when you close the tab.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy as our use of cookies changes or as required by
              applicable laws. The "Last updated" date at the top of this page will reflect any
              changes.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">7. Contact</h2>
            <p>
              Questions about our cookie practices? Contact us at:<br />
              <strong class="text-on-surface">Deep Variance, Inc.</strong><br />
              <a href="mailto:privacy@deepvariance.com" class="text-neon underline">privacy@deepvariance.com</a>
            </p>
            <p>
              See also our
              <a routerLink="/privacy-policy" class="text-neon underline">Privacy Policy</a>
              and
              <a routerLink="/terms" class="text-neon underline">Terms of Service</a>.
            </p>
          </section>
        </div>
      </app-glass-card>
    </div>
  `,
})
export class CookiePolicyComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Cookie Policy | Deep Variance',
      description:
        'Deep Variance Cookie Policy. Learn about the cookies we use and how to manage them.',
      path: '/cookie-policy',
    });
  }
}
