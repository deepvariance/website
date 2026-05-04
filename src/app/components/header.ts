import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { WordmarkComponent } from './wordmark';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, WordmarkComponent],
  template: `
    <div class="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <header class="pointer-events-auto" [class.dv-header--scrolled]="scrolled()">
        <div class="dv-header__bar">
          <nav class="max-w-[1440px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-6">

            <!-- Logo -->
            <a routerLink="/" (click)="closeMobileMenu()" class="dv-logo" aria-label="Deep Variance home">
              <img src="/logo-mark.svg" alt="" aria-hidden="true" width="28" height="28" class="dv-logo__mark" />
              <app-wordmark [size]="24" />
            </a>

            <!-- Desktop nav — centered -->
            <div class="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              <a routerLink="/use-cases"  routerLinkActive="dv-nav--active" (click)="closeMobileMenu()" class="dv-nav">Use Cases</a>
              <a routerLink="/pricing"    routerLinkActive="dv-nav--active" (click)="closeMobileMenu()" class="dv-nav">Pricing</a>
              <a routerLink="/blog"       routerLinkActive="dv-nav--active" (click)="closeMobileMenu()" class="dv-nav">Blog</a>
            </div>

            <!-- Right: CTA + mobile toggle -->
            <div class="flex items-center gap-3">
              <a routerLink="/pricing" fragment="contact-form" (click)="closeMobileMenu()" class="dv-cta">
                Talk to us
              </a>
              <button
                (click)="toggleMobileMenu($event)"
                class="md:hidden flex items-center justify-center w-9 h-9 text-on-surface-variant hover:text-white transition-colors rounded-md hover:bg-white/5 border border-transparent hover:border-border"
                aria-label="Toggle menu"
              >
                @if (!isMobileMenuOpen()) {
                  <lucide-icon [img]="Menu" [size]="18" />
                } @else {
                  <lucide-icon [img]="X" [size]="18" />
                }
              </button>
            </div>
          </nav>
        </div>

        <!-- Mobile drawer -->
        @if (isMobileMenuOpen()) {
          <div class="md:hidden border-t border-border bg-black">
            <div class="px-6 py-6 space-y-1">
              <a routerLink="/use-cases" (click)="closeMobileMenu()" class="dv-mobile-nav">Use Cases</a>
              <a routerLink="/pricing"   (click)="closeMobileMenu()" class="dv-mobile-nav">Pricing</a>
              <a routerLink="/blog"      (click)="closeMobileMenu()" class="dv-mobile-nav">Blog</a>
              <div class="pt-4 border-t border-border mt-4">
                <a routerLink="/pricing" fragment="contact-form" (click)="closeMobileMenu()" class="dv-cta block text-center">
                  Talk to us
                </a>
              </div>
            </div>
          </div>
        }
      </header>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .dv-header__bar {
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid #1a1a1a;
      transition: border-color 200ms ease;
    }
    :host ::ng-deep .dv-header--scrolled .dv-header__bar {
      background: rgba(0, 0, 0, 0.95);
      border-bottom-color: #2a2a2a;
    }

    .dv-logo {
      display: flex; align-items: center; text-decoration: none;
    }
    .dv-logo__mark {
      height: 40px; width: 40px; display: block; flex-shrink: 0;
      transition: opacity 200ms ease;
    }
    .dv-logo:hover .dv-logo__mark { opacity: 0.75; }
    .dv-logo__wordmark {
      height: 28px; width: auto; display: block;
      transition: opacity 200ms ease;
    }
    .dv-logo:hover .dv-logo__wordmark { opacity: 0.75; }

    .dv-nav {
      display: inline-flex; align-items: center;
      padding: 0.45rem 0.8rem;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 14px; font-weight: 500;
      color: #737373;
      border-radius: 0.375rem;
      border: 1px solid transparent;
      transition: all 160ms ease;
      text-decoration: none;
    }
    .dv-nav:hover, .dv-nav--active {
      color: #ffffff;
      background: rgba(255,255,255,0.04);
      border-color: #1a1a1a;
    }

    .dv-cta {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.5rem 1rem;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 13px; font-weight: 600;
      color: #000000;
      background: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 0.375rem;
      text-decoration: none;
      transition: all 180ms ease;
      white-space: nowrap;
    }
    .dv-cta:hover {
      background: #e5e5e5;
      border-color: #e5e5e5;
    }

    .dv-mobile-nav {
      display: block; padding: 0.6rem 0;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 15px; font-weight: 500; color: #a3a3a3;
      text-decoration: none; border-radius: 0.25rem;
      transition: color 160ms ease;
    }
    .dv-mobile-nav:hover { color: #ffffff; }
  `],
})
export class HeaderComponent {
  readonly Menu = Menu;
  readonly X = X;

  private platformId = inject(PLATFORM_ID);

  isMobileMenuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 8);
    }
  }

  toggleMobileMenu(event: Event) {
    event.stopPropagation();
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
