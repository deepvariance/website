import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mx-auto px-6 py-24 md:py-32 max-w-3xl">
      <div class="mb-12">
        <p
          class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4"
        >
          Legal
        </p>
        <h1
          class="text-4xl md:text-5xl font-header font-bold text-dark tracking-tight mb-4"
        >
          Cookie Policy
        </h1>
        <p class="text-slate-500 font-medium">Last updated: March 14, 2026</p>
      </div>

      <div
        class="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed"
      >
        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            1. What Are Cookies
          </h2>
          <p>
            Cookies are small text files placed on your device when you visit a
            website. They allow the site to remember your actions and
            preferences over time, and help us understand how visitors interact
            with our site.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            2. Cookies We Use
          </h2>

          <div class="overflow-x-auto rounded-2xl border border-slate-100">
            <table class="w-full text-sm text-left">
              <thead
                class="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
              >
                <tr>
                  <th class="px-5 py-3.5">Cookie</th>
                  <th class="px-5 py-3.5">Provider</th>
                  <th class="px-5 py-3.5">Type</th>
                  <th class="px-5 py-3.5">Purpose</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr class="bg-white">
                  <td class="px-5 py-4 font-mono text-xs text-slate-700">
                    _ga
                  </td>
                  <td class="px-5 py-4">Google Analytics</td>
                  <td class="px-5 py-4">Analytics</td>
                  <td class="px-5 py-4">
                    Distinguishes users for traffic analysis. Expires after 2
                    years.
                  </td>
                </tr>
                <tr class="bg-white">
                  <td class="px-5 py-4 font-mono text-xs text-slate-700">
                    _ga_*
                  </td>
                  <td class="px-5 py-4">Google Analytics</td>
                  <td class="px-5 py-4">Analytics</td>
                  <td class="px-5 py-4">
                    Persists session state for GA4. Expires after 2 years.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            We use only analytics cookies. We do not use advertising, tracking,
            or profiling cookies.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            3. Analytics Cookies
          </h2>
          <p>
            We use Google Analytics (GA4) to collect anonymized data about how
            visitors use our site — pages visited, time on page, traffic
            sources, and device type. This data helps us improve our website and
            content.
            <strong class="text-dark"
              >No personally identifiable information</strong
            >
            is collected or stored by these cookies.
          </p>
          <p>
            Google Analytics data is processed and stored by Google in
            accordance with their
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener"
              class="text-primary underline"
              >Privacy Policy</a
            >. IP anonymization is enabled for all GA4 sessions on this site.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            4. Managing Cookies
          </h2>
          <p>You can control or disable cookies through several methods:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong class="text-dark">Browser settings:</strong> Most browsers
              allow you to view, block, or delete cookies via their privacy or
              settings menu. Consult your browser's documentation for
              instructions.
            </li>
            <li>
              <strong class="text-dark">Google Analytics opt-out:</strong>
              Install the
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener"
                class="text-primary underline"
                >Google Analytics Opt-out Browser Add-on</a
              >
              to prevent your data from being used by Google Analytics.
            </li>
            <li>
              <strong class="text-dark">Do Not Track:</strong> We respect Do Not
              Track (DNT) signals where technically feasible.
            </li>
          </ul>
          <p class="text-sm text-slate-500">
            Note: Disabling cookies may affect the functionality of some
            third-party tools embedded in our site, but will not impact access
            to any core content.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            5. Session and Local Storage
          </h2>
          <p>
            This website does not use session storage or local storage to
            persist personal data. Any UI state (such as copied code snippets)
            is stored transiently in memory only and is cleared when you close
            the tab.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            6. Updates to This Policy
          </h2>
          <p>
            We may update this Cookie Policy as our use of cookies changes or as
            required by applicable laws. The "Last updated" date at the top of
            this page will reflect any changes.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">7. Contact</h2>
          <p>
            Questions about our cookie practices? Contact us at:<br />
            <strong class="text-dark">Deep Variance, Inc.</strong><br />
            <a
              href="mailto:privacy@deepvariance.com"
              class="text-primary underline"
              >privacy@deepvariance.com</a
            >
          </p>
          <p>
            See also our
            <a routerLink="/privacy-policy" class="text-primary underline"
              >Privacy Policy</a
            >
            and
            <a routerLink="/terms" class="text-primary underline"
              >Terms of Service</a
            >.
          </p>
        </section>
      </div>
    </div>
  `,
})
export class CookiePolicyComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  constructor() {
    this.title.setTitle('Cookie Policy | Deep Variance');
    this.meta.updateTag({ name: 'description', content: 'Deep Variance Cookie Policy. Learn about the cookies we use and how to manage them.' });
    this.meta.updateTag({ property: 'og:title', content: 'Cookie Policy | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: 'Deep Variance Cookie Policy. Learn about the cookies we use and how to manage them.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/cookie-policy' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.setCanonical('https://deepvariance.com/cookie-policy');
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
}
