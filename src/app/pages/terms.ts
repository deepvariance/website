import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GlassCardComponent } from '../components/glass-card';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink, GlassCardComponent],
  template: `
    <div class="relative max-w-3xl mx-auto px-6 lg:px-10 pt-32 pb-24">
      <div class="mb-10">
        <p class="label-caps mb-4">Legal</p>
        <h1 class="font-display font-bold tracking-tight text-on-surface text-3xl md:text-5xl mb-3">
          Terms of Service
        </h1>
        <p class="text-sm font-mono uppercase tracking-[0.16em] text-outline">
          Last updated: March 14, 2026
        </p>
      </div>

      <app-glass-card variant="strong" rounded="2xl" extraClass="p-8 md:p-12">
        <div class="prose prose-invert max-w-none space-y-10 text-on-surface-variant font-medium leading-relaxed">
          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">1. Acceptance of Terms</h2>
            <p>
              By accessing <strong class="text-on-surface">deepvariance.com</strong> or using any
              Deep Variance product or service (including the
              <code class="bg-black/40 border border-white/5 px-1.5 py-0.5 rounded text-neon font-mono text-sm">deep-variance</code>
              and
              <code class="bg-black/40 border border-white/5 px-1.5 py-0.5 rounded text-neon font-mono text-sm">dv-hyperrag</code>
              packages), you agree to be bound by these Terms of Service ("Terms"). If you do not
              agree, do not use our services.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">2. Description of Services</h2>
            <p>Deep Variance provides:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong class="text-on-surface">Optimemory</strong>, a CUDA virtual memory management layer.</li>
              <li><strong class="text-on-surface">HyperRAG</strong>, KV cache and schedule optimization for RAG serving.</li>
              <li><strong class="text-on-surface">DeepTuner</strong>, early-access static analysis tooling for energy-efficient GPU run configuration.</li>
              <li>This marketing website and associated documentation.</li>
            </ul>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">3. License</h2>
            <p>
              Subject to these Terms, Deep Variance grants you a limited, non-exclusive,
              non-transferable, revocable license to use our software packages in accordance with
              their respective license files. Commercial use, redistribution, or modification
              beyond permitted scope requires a separate written agreement.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Reverse-engineer, decompile, or disassemble any proprietary component of our software.</li>
              <li>Use our services to develop competing products without a written agreement.</li>
              <li>Attempt to gain unauthorized access to any part of our infrastructure or services.</li>
              <li>Use our services in violation of any applicable law or regulation.</li>
            </ul>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">5. Intellectual Property</h2>
            <p>
              All intellectual property rights in Deep Variance products, including software,
              documentation, branding, and website content, are owned by Deep Variance, Inc. or
              its licensors. Nothing in these Terms grants you any ownership rights.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">6. Data and Privacy</h2>
            <p>
              Our SDK products run on your infrastructure. We do not receive your training data,
              model weights, or proprietary datasets. Your use of this website is governed by our
              <a routerLink="/privacy-policy" class="text-neon underline">Privacy Policy</a>.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">7. Third-Party APIs</h2>
            <p>
              Certain integrations may depend on third-party services. Your use of those third-party
              services is governed by their respective terms and policies. Deep Variance is not
              responsible for third-party service availability, pricing changes, or terms
              modifications.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">8. Disclaimer of Warranties</h2>
            <p>
              Our services are provided <strong class="text-on-surface">"as is"</strong> and
              <strong class="text-on-surface">"as available"</strong> without warranties of any
              kind, express or implied, including but not limited to merchantability, fitness for a
              particular purpose, and non-infringement.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Deep Variance, Inc. shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of or inability to use our services.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Deep Variance, Inc. and its officers,
              directors, employees, and agents from any claims, damages, or expenses arising from
              your use of our services or violation of these Terms.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">11. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of our services
              after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Delaware, United States, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <section class="space-y-4">
            <h2 class="font-display text-xl font-semibold text-on-surface">13. Contact</h2>
            <p>
              Questions about these Terms? Contact us at:<br />
              <strong class="text-on-surface">Deep Variance, Inc.</strong><br />
              <a href="mailto:legal@deepvariance.com" class="text-neon underline">legal@deepvariance.com</a>
            </p>
          </section>
        </div>
      </app-glass-card>
    </div>
  `,
})
export class TermsComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Terms of Service | Deep Variance',
      description:
        'Deep Variance Terms of Service. Read the terms governing use of our products and website.',
      path: '/terms',
    });
  }
}
