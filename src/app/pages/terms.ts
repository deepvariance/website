import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
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
          Terms of Service
        </h1>
        <p class="text-slate-500 font-medium">Last updated: March 14, 2026</p>
      </div>

      <div
        class="prose prose-slate max-w-none space-y-10 text-slate-600 font-medium leading-relaxed"
      >
        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing <strong class="text-dark">deepvariance.com</strong> or
            using any Deep Variance product or service (including the
            <code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
              >deep-variance</code
            >
            and
            <code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
              >dv-hyperrag</code
            >
            packages), you agree to be bound by these Terms of Service
            ("Terms"). If you do not agree, do not use our services.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            2. Description of Services
          </h2>
          <p>Deep Variance provides:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              <strong class="text-dark">Optimemory</strong> — a CUDA virtual
              memory management layer (<code
                class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
                >deep-variance</code
              >).
            </li>
            <li>
              <strong class="text-dark">HyperRAG</strong> — KV cache and
              schedule optimization for RAG serving (<code
                class="bg-slate-100 px-1.5 py-0.5 rounded text-sm"
                >dv-hyperrag</code
              >).
            </li>
            <li>
              <strong class="text-dark">DeepTuner</strong> —
              early-access static analysis tooling for energy-efficient GPU run
              configuration.
            </li>
            <li>This marketing website and associated documentation.</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">3. License</h2>
          <p>
            Subject to these Terms, Deep Variance grants you a limited,
            non-exclusive, non-transferable, revocable license to use our
            software packages in accordance with their respective license files
            distributed with each package. Commercial use, redistribution, or
            modification beyond permitted scope requires a separate written
            agreement.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            4. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>
              Reverse-engineer, decompile, or disassemble any proprietary
              component of our software.
            </li>
            <li>
              Use our services to develop competing products without a written
              agreement.
            </li>
            <li>
              Attempt to gain unauthorized access to any part of our
              infrastructure or services.
            </li>
            <li>
              Use our services in violation of any applicable law or regulation.
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            5. Intellectual Property
          </h2>
          <p>
            All intellectual property rights in Deep Variance products,
            including software, documentation, branding, and website content,
            are owned by Deep Variance, Inc. or its licensors. Nothing in these
            Terms grants you any ownership rights.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            6. Data and Privacy
          </h2>
          <p>
            Our SDK products run on your infrastructure. We do not receive your
            training data, model weights, or proprietary datasets. Your use of
            this website is governed by our
            <a routerLink="/privacy-policy" class="text-primary underline"
              >Privacy Policy</a
            >.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            7. Third-Party APIs
          </h2>
          <p>
            Certain integrations may depend on third-party services (for
            example, cloud infrastructure, analytics, or managed model serving).
            Your use of those third-party services is governed by their
            respective terms and policies. Deep Variance is not responsible for
            third-party service availability, pricing changes, or terms
            modifications.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            8. Disclaimer of Warranties
          </h2>
          <p>
            Our services are provided
            <strong class="text-dark">"as is"</strong> and
            <strong class="text-dark">"as available"</strong> without warranties
            of any kind, express or implied, including but not limited to
            merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that our services will be
            uninterrupted, error-free, or free of harmful components.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            9. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, Deep Variance,
            Inc. shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of or
            inability to use our services, even if advised of the possibility of
            such damages.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            10. Indemnification
          </h2>
          <p>
            You agree to indemnify and hold harmless Deep Variance, Inc. and its
            officers, directors, employees, and agents from any claims, damages,
            or expenses (including reasonable legal fees) arising from your use
            of our services or violation of these Terms.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            11. Modifications
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued
            use of our services after changes are posted constitutes your
            acceptance of the revised Terms. We will update the "Last updated"
            date accordingly.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">
            12. Governing Law
          </h2>
          <p>
            These Terms are governed by the laws of the State of Delaware,
            United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-header font-bold text-dark">13. Contact</h2>
          <p>
            Questions about these Terms? Contact us at:<br />
            <strong class="text-dark">Deep Variance, Inc.</strong><br />
            <a
              href="mailto:legal@deepvariance.com"
              class="text-primary underline"
              >legal@deepvariance.com</a
            >
          </p>
        </section>
      </div>
    </div>
  `,
})
export class TermsComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  constructor() {
    this.title.setTitle('Terms of Service | Deep Variance');
    this.meta.updateTag({ name: 'description', content: 'Deep Variance Terms of Service. Read the terms governing use of our products and website.' });
    this.meta.updateTag({ property: 'og:title', content: 'Terms of Service | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: 'Deep Variance Terms of Service. Read the terms governing use of our products and website.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/terms' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.setCanonical('https://deepvariance.com/terms');
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
