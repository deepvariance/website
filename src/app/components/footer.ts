import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lock, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <footer class="bg-white border-t border-slate-100 py-24 mt-24">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-16">
          <div class="sm:col-span-2 md:col-span-2 space-y-8">
            <a
              routerLink="/"
              class="flex-shrink-0 text-xl tracking-tighter text-dark flex items-center group/logo"
            >
              <div class="logo-text leading-none flex items-baseline">
                <span class="font-bold">deep</span>
                <span class="font-light">variance</span>
              </div>
            </a>
            <p
              class="text-slate-500 text-[14px] font-medium leading-relaxed max-w-sm"
            >
              An infrastructure research lab building hardware-aware
              optimization layers for the next generation of AI training stacks.
            </p>
            <div class="flex gap-4">
              <a
                href="https://www.linkedin.com/company/deep-variance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Deep Variance on LinkedIn"
                class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100"
                ><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  /></svg
              ></a>
              <a
                href="#"
                aria-label="Deep Variance on X (Twitter)"
                class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100"
                ><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  /></svg
              ></a>
              <a
                href="https://github.com/deepvariance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Deep Variance on GitHub"
                class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100"
                ><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  /></svg
              ></a>
            </div>
          </div>

          <div class="space-y-6">
            <h4
              class="font-header font-bold text-dark text-sm uppercase tracking-wider"
            >
              Products
            </h4>
            <ul class="space-y-4 text-[13px] text-slate-500 font-medium">
              <li>
                <a routerLink="/" class="hover:text-primary transition-colors"
                  >Autopilot</a
                >
              </li>
              <li>
                <a
                  routerLink="/optimemory"
                  class="hover:text-primary transition-colors"
                  >Optimemory</a
                >
              </li>
              <li>
                <a
                  routerLink="/llm-tuner"
                  class="hover:text-primary transition-colors"
                  >LLM Tuner</a
                >
              </li>
            </ul>
          </div>

          <div class="space-y-6">
            <h4 class="font-header font-bold text-dark text-sm uppercase tracking-wider">Use Cases</h4>
            <ul class="space-y-4 text-[13px] text-slate-500 font-medium">
              <li><a routerLink="/use-cases" fragment="gpu-providers" class="hover:text-primary transition-colors">GPU Providers</a></li>
              <li><a routerLink="/use-cases" fragment="enterprise-training" class="hover:text-primary transition-colors">Enterprise Training</a></li>
              <li><a routerLink="/use-cases" fragment="research-institutions" class="hover:text-primary transition-colors">Research Institutions</a></li>
              <li><a routerLink="/use-cases" fragment="manufacturing" class="hover:text-primary transition-colors">Manufacturing</a></li>
            </ul>
          </div>

          <div class="space-y-6">
            <h4
              class="font-header font-bold text-dark text-sm uppercase tracking-wider"
            >
              Resources
            </h4>
            <ul class="space-y-4 text-[13px] text-slate-400 font-medium">
              <li
                class="flex items-center gap-2 cursor-not-allowed select-none"
              >
                <lucide-icon
                  [img]="Lock"
                  [size]="12"
                  class="text-slate-300 flex-shrink-0"
                />
                API Reference
                <span
                  class="text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded"
                  >Soon</span
                >
              </li>
              <li
                class="flex items-center gap-2 cursor-not-allowed select-none"
              >
                <lucide-icon
                  [img]="Lock"
                  [size]="12"
                  class="text-slate-300 flex-shrink-0"
                />
                Benchmarks
                <span
                  class="text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded"
                  >Soon</span
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400 font-medium"
        >
          <p>&copy; 2026 Deep Variance, Inc. All rights reserved.</p>
          <div class="flex gap-8">
            <a routerLink="/privacy-policy" class="hover:text-primary transition-colors"
              >Privacy Policy</a
            >
            <a routerLink="/terms" class="hover:text-primary transition-colors"
              >Terms of Service</a
            >
            <a routerLink="/cookie-policy" class="hover:text-slate-900 transition-colors"
              >Cookie Policy</a
            >
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .logo-text {
        font-family: 'Inter var', 'Inter', sans-serif;
        font-feature-settings: 'cv11' 1;
        letter-spacing: -0.04em;
      }
    `,
  ],
})
export class FooterComponent {
  readonly Lock = Lock;
}
