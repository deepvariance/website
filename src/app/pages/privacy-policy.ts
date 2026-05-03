import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GlassCardComponent } from '../components/glass-card';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink, GlassCardComponent],
  template: `
    <div class="relative max-w-3xl mx-auto px-6 lg:px-10 pt-32 pb-24">
      <div class="mb-10">
        <p class="label-caps mb-4">Legal</p>
        <h1
          class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-5xl mb-3"
        >
          Privacy Policy
        </h1>
        <p class="text-sm font-mono uppercase tracking-[0.16em] text-outline">
          Last updated: March 14, 2026
        </p>
      </div>

      <app-glass-card variant="strong" rounded="2xl" extraClass="p-8 md:p-12">
        <div
          class="prose prose-invert max-w-none space-y-10 text-on-surface-variant font-medium leading-relaxed"
        >
          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">1. Overview</h2>
            <p>
              Deep Variance, Inc. ("Deep Variance", "we", "us", or "our") operates
              <strong class="text-on-surface">deepvariance.com</strong> and associated developer
              tooling including the
              <code class="bg-black/40 border border-white/5 px-1.5 py-0.5 rounded text-neon font-mono text-sm">deep-variance</code>
              and
              <code class="bg-black/40 border border-white/5 px-1.5 py-0.5 rounded text-neon font-mono text-sm">dv-hyperrag</code>
              Python packages. This Privacy Policy explains how we collect, use, and protect
              information when you interact with our website or products.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">
              2. Information We Collect
            </h2>
            <h3 class="text-base font-semibold text-on-surface">Information you provide directly</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Name and work email address submitted via demo request or contact forms.</li>
              <li>Company or organization name (optional).</li>
              <li>Messages or inquiries you send to our team.</li>
            </ul>
            <h3 class="text-base font-semibold text-on-surface">Information collected automatically</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>
                Anonymized analytics data via Google Analytics (GA4), including page views, session
                duration, referral source, and device type. This data does not personally identify
                you.
              </li>
              <li>Standard web server logs (IP address, browser type, timestamps).</li>
            </ul>
            <h3 class="text-base font-semibold text-on-surface">What we do NOT collect</h3>
            <p>
              Our SDK products run entirely on your infrastructure. We do not receive, transmit, or
              store your training data, model weights, or proprietary datasets.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">
              3. How We Use Your Information
            </h2>
            <ul class="list-disc pl-5 space-y-2">
              <li>To respond to demo requests and support inquiries.</li>
              <li>
                To send product updates, release notes, and relevant announcements (with your
                consent).
              </li>
              <li>
                To improve our website and products using aggregated, anonymized analytics.
              </li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p>
              We do not sell, rent, or share your personal information with third parties for their
              marketing purposes.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">4. Third-Party Services</h2>
            <ul class="list-disc pl-5 space-y-2">
              <li>
                <strong class="text-on-surface">Google Analytics (GA4):</strong> We use Google
                Analytics to understand site traffic. Data is anonymized and subject to
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="text-neon underline">Google's Privacy Policy</a>.
                You can opt out via the
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" class="text-neon underline">Google Analytics Opt-out</a>
                browser add-on.
              </li>
              <li>
                <strong class="text-on-surface">FormSubmit:</strong> Demo request forms are
                processed via FormSubmit.co. Submitted data (name, email, company) is forwarded to
                our team email. No data is stored on FormSubmit servers beyond delivery.
              </li>
            </ul>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">5. Data Retention</h2>
            <p>
              We retain contact form submissions for as long as reasonably necessary to respond to
              your inquiry or to maintain a business relationship. You may request deletion at any
              time by emailing
              <a href="mailto:privacy@deepvariance.com" class="text-neon underline">privacy@deepvariance.com</a>.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">6. Cookies</h2>
            <p>
              This website uses cookies. Please see our
              <a routerLink="/cookie-policy" class="text-neon underline">Cookie Policy</a>
              for details on the cookies we use and how to control them.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">7. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, or delete
              your personal data, or to object to or restrict its processing. To exercise these
              rights, contact us at
              <a href="mailto:privacy@deepvariance.com" class="text-neon underline">privacy@deepvariance.com</a>.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">8. Security</h2>
            <p>
              We implement industry-standard technical and organizational measures to protect your
              information. However, no method of internet transmission is 100% secure.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">9. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by updating the "Last updated" date at the top of this page.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">11. Contact</h2>
            <p>
              Questions about this Privacy Policy? Contact us at:<br />
              <strong class="text-on-surface">Deep Variance, Inc.</strong><br />
              <a href="mailto:privacy@deepvariance.com" class="text-neon underline">privacy@deepvariance.com</a>
            </p>
          </section>
        </div>
      </app-glass-card>
    </div>
  `,
})
export class PrivacyPolicyComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Privacy Policy | Deep Variance',
      description: 'Deep Variance Privacy Policy. Learn how we collect, use, and protect your data.',
      path: '/privacy-policy',
    });
  }
}
