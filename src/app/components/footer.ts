import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordmarkComponent } from './wordmark';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, WordmarkComponent],
  template: `
    <footer class="border-t border-border">
      <div class="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <div class="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">

          <!-- Brand -->
          <div class="col-span-2 md:col-span-5">
            <a routerLink="/" class="inline-flex items-center mb-5">
              <img src="/logo-mark.svg" alt="" width="40" height="40" class="h-10 w-10 flex-shrink-0" />
              <app-wordmark [size]="24" />
            </a>
            <p class="text-sm text-on-surface-variant leading-relaxed max-w-sm mb-6">
              A software stack for AI infra optimization across memory, latency, and GPU energy efficiency.
            </p>
            <div class="flex items-center gap-2">
              <a href="https://www.linkedin.com/company/deep-variance" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="dv-social">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/deepvariance" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="dv-social">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Products -->
          <div class="md:col-span-3">
            <p class="label-caps mb-5">Products</p>
            <ul class="space-y-3">
              <li><a routerLink="/optimemory" class="dv-foot-link">Optimemory</a></li>
              <li><a routerLink="/hyperrag" class="dv-foot-link">HyperRAG</a></li>
              <li>
                <a routerLink="/deeptuner" class="dv-foot-link inline-flex items-center gap-2">
                  DeepTuner
                  <span class="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border border-border-mid text-outline">Early</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="md:col-span-2">
            <p class="label-caps mb-5">Resources</p>
            <ul class="space-y-3">
              <li><a routerLink="/use-cases" class="dv-foot-link">Use Cases</a></li>
              <li><a routerLink="/pricing" class="dv-foot-link">Pricing</a></li>
              <li><a routerLink="/blog" class="dv-foot-link">Blog</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div class="md:col-span-2">
            <p class="label-caps mb-5">Legal</p>
            <ul class="space-y-3">
              <li><a routerLink="/privacy-policy" class="dv-foot-link">Privacy</a></li>
              <li><a routerLink="/terms" class="dv-foot-link">Terms</a></li>
              <li><a routerLink="/cookie-policy" class="dv-foot-link">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-16 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p class="font-mono text-[11px] uppercase tracking-widest text-outline">
            © 2026 Deep Variance, Inc.
          </p>
          <p class="font-mono text-[11px] uppercase tracking-widest text-outline">
            Precise innovation for production AI.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }

    .dv-foot-link {
      font-family: 'IBM Plex Mono', ui-monospace, monospace;
      font-size: 13px; color: #737373; text-decoration: none;
      transition: color 160ms ease;
    }
    .dv-foot-link:hover { color: #ffffff; }

    .dv-social {
      display: inline-flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: 0.375rem;
      background: #0a0a0a;
      border: 1px solid #1a1a1a;
      color: #737373;
      transition: all 180ms ease;
      text-decoration: none;
    }
    .dv-social:hover { color: #ffffff; border-color: #404040; background: #111111; }
  `],
})
export class FooterComponent {}
