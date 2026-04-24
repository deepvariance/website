import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
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
          Privacy Policy
        </h1>
        <p class="text-slate-500 font-medium">Last updated: March 14, 2026</p>
      </div>

      <div
        class="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed"
      >
        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">1. Overview</h2>
          <p>
            Deep Variance, Inc. ("Deep Variance", "we", "us", or "our") operates
            <strong class="text-dark">deepvariance.com</strong> and associated
            developer tooling including the
            <code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
              >deep-variance</code
            >
            and
            <code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
              >dv-hyperrag</code
            >
            Python packages. This Privacy Policy explains how we collect, use,
            and protect information when you interact with our website or
            products.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            2. Information We Collect
          </h2>
          <h3 class="text-base font-bold text-dark">
            Information you provide directly
          </h3>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              Name and work email address submitted via demo request or contact
              forms.
            </li>
            <li>Company or organization name (optional).</li>
            <li>Messages or inquiries you send to our team.</li>
          </ul>
          <h3 class="text-base font-bold text-dark">
            Information collected automatically
          </h3>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              Anonymized analytics data via Google Analytics (GA4), including
              page views, session duration, referral source, and device type.
              This data does not personally identify you.
            </li>
            <li>
              Standard web server logs (IP address, browser type, timestamps).
            </li>
          </ul>
          <h3 class="text-base font-bold text-dark">What we do NOT collect</h3>
          <p>
            Our SDK products (<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
              >deep-variance</code
            >,
            <code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
              >dv-hyperrag</code
            >) run entirely on your infrastructure. We do not receive, transmit,
            or store your training data, model weights, or proprietary datasets.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            3. How We Use Your Information
          </h2>
          <ul class="list-disc pl-5 space-y-2">
            <li>To respond to demo requests and support inquiries.</li>
            <li>
              To send product updates, release notes, and relevant announcements
              (with your consent).
            </li>
            <li>
              To improve our website and products using aggregated, anonymized
              analytics.
            </li>
            <li>To comply with legal obligations.</li>
          </ul>
          <p>
            We do not sell, rent, or share your personal information with third
            parties for their marketing purposes.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            4. Third-Party Services
          </h2>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong class="text-dark">Google Analytics (GA4):</strong> We use
              Google Analytics to understand site traffic. Data is anonymized
              and subject to
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener"
                class="text-primary underline"
                >Google's Privacy Policy</a
              >. You can opt out via the
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener"
                class="text-primary underline"
                >Google Analytics Opt-out</a
              >
              browser add-on.
            </li>
            <li>
              <strong class="text-dark">FormSubmit:</strong> Demo request forms
              are processed via FormSubmit.co. Submitted data (name, email,
              company) is forwarded to our team email. No data is stored on
              FormSubmit servers beyond delivery.
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            5. Data Retention
          </h2>
          <p>
            We retain contact form submissions for as long as reasonably
            necessary to respond to your inquiry or to maintain a business
            relationship. You may request deletion at any time by emailing
            <a
              href="mailto:privacy@deepvariance.com"
              class="text-primary underline"
              >privacy@deepvariance.com</a
            >.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">6. Cookies</h2>
          <p>
            This website uses cookies. Please see our
            <a routerLink="/cookie-policy" class="text-primary underline"
              >Cookie Policy</a
            >
            for details on the cookies we use and how to control them.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            7. Your Rights
          </h2>
          <p>
            Depending on your jurisdiction, you may have the right to access,
            correct, or delete your personal data, or to object to or restrict
            its processing. To exercise these rights, contact us at
            <a
              href="mailto:privacy@deepvariance.com"
              class="text-primary underline"
              >privacy@deepvariance.com</a
            >.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">8. Security</h2>
          <p>
            We implement industry-standard technical and organizational measures
            to protect your information. However, no method of internet
            transmission is 100% secure.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            9. Children's Privacy
          </h2>
          <p>
            Our services are not directed to individuals under the age of 16. We
            do not knowingly collect personal information from children.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            10. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of material changes by updating the "Last updated" date at the
            top of this page.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">11. Contact</h2>
          <p>
            Questions about this Privacy Policy? Contact us at:<br />
            <strong class="text-dark">Deep Variance, Inc.</strong><br />
            <a
              href="mailto:privacy@deepvariance.com"
              class="text-primary underline"
              >privacy@deepvariance.com</a
            >
          </p>
        </section>
      </div>
    </div>
  `,
})
export class PrivacyPolicyComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  constructor() {
    this.title.setTitle('Privacy Policy | Deep Variance');
    this.meta.updateTag({ name: 'description', content: 'Deep Variance Privacy Policy. Learn how we collect, use, and protect your data.' });
    this.meta.updateTag({ property: 'og:title', content: 'Privacy Policy | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: 'Deep Variance Privacy Policy. Learn how we collect, use, and protect your data.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/privacy-policy' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.setCanonical('https://deepvariance.com/privacy-policy');
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
