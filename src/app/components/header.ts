import { NgClass, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ChevronDown,
  Gauge,
  Lightbulb,
  LucideAngularModule,
  Menu,
  Phone,
  Server,
  X,
  Zap,
} from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, NgClass],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200/60 shadow-sm font-sans transition-colors duration-300"
      [ngClass]="scrolled() ? 'bg-white/90' : 'bg-white/50'"
    >
      <nav
        class="container mx-auto px-6 py-2 flex items-center justify-between gap-8 relative"
      >
        <a
          routerLink="/"
          (click)="closeAllMenus()"
          class="flex-shrink-0 text-xl tracking-tighter text-dark flex items-center group/logo relative z-[110]"
        >
          <div class="logo-text leading-none flex items-baseline">
            <span class="font-bold">deep</span>
            <span class="font-light">variance</span>
          </div>
        </a>

        <!-- Main Navigation (Desktop) -->
        <div
          class="hidden md:flex items-center gap-8 text-[13px] font-semibold text-slate-500"
        >
          <!-- Products Megamenu -->
          <div
            class="relative py-2"
            (mouseenter)="isProductsMenuOpen.set(true)"
            (mouseleave)="isProductsMenuOpen.set(false)"
          >
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-primary transition-all cursor-default"
              [class.bg-slate-100]="isProductsMenuOpen()"
              [class.text-primary]="isProductsMenuOpen()"
            >
              Products
              <lucide-icon
                [img]="ChevronDown"
                [size]="16"
                class="transition-transform duration-200"
                [class.rotate-180]="isProductsMenuOpen()"
              />
            </button>

            <!-- Megamenu Content -->
            <div
              class="absolute top-full left-0 pt-4 transition-all duration-200"
              [class.opacity-0]="!isProductsMenuOpen()"
              [class.invisible]="!isProductsMenuOpen()"
              [class.translate-y-1]="!isProductsMenuOpen()"
              [class.opacity-100]="isProductsMenuOpen()"
              [class.visible]="isProductsMenuOpen()"
              [class.translate-y-0]="isProductsMenuOpen()"
            >
              <div
                class="w-[600px] -translate-x-12 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-2 pointer-events-auto"
              >
                <div class="grid grid-cols-2 gap-2">
                  <!-- Autopilot -->
                  <a
                    routerLink="/autopilot"
                    routerLinkActive="bg-slate-50 border-slate-200"
                    (click)="closeAllMenus()"
                    class="flex items-start gap-4 p-6 rounded-2xl hover:bg-slate-50 border border-transparent transition-all group/item"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform"
                    >
                      <lucide-icon [img]="Zap" [size]="20" />
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <h4 class="text-sm font-bold text-dark">Autopilot</h4>
                        <span
                          class="text-[9px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded"
                          >deepvariance-sdk</span
                        >
                      </div>
                      <p
                        class="text-xs text-slate-500 font-medium leading-relaxed"
                      >
                        End-to-end AutoML pipeline. Raw data to trained model in
                        one call, powered by LLM-driven code generation.
                      </p>
                    </div>
                  </a>

                  <!-- Optimemory -->
                  <a
                    routerLink="/optimemory"
                    routerLinkActive="bg-slate-50 border-slate-200"
                    (click)="closeAllMenus()"
                    class="flex items-start gap-4 p-6 rounded-2xl hover:bg-slate-50 border border-transparent transition-all group/item"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover/item:scale-110 transition-transform"
                    >
                      <lucide-icon [img]="Server" [size]="20" />
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <h4 class="text-sm font-bold text-dark">Optimemory</h4>
                        <span
                          class="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded"
                          >deep-variance</span
                        >
                      </div>
                      <p
                        class="text-xs text-slate-500 font-medium leading-relaxed"
                      >
                        CUDA VMM layer for physical memory pooling and virtual
                        address stitching. Zero-overhead buffer reuse across
                        training steps.
                      </p>
                    </div>
                  </a>

                  <!-- LLM Tuner -->
                  <a
                    routerLink="/llm-tuner"
                    routerLinkActive="bg-slate-50 border-slate-200"
                    (click)="closeAllMenus()"
                    class="flex items-start gap-4 p-6 rounded-2xl hover:bg-slate-50 border border-transparent transition-all group/item"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover/item:scale-110 transition-transform"
                    >
                      <lucide-icon [img]="Lightbulb" [size]="20" />
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <h4 class="text-sm font-bold text-dark">LLM Tuner</h4>
                        <span
                          class="text-[9px] px-1.5 py-0.5 bg-blue-600/10 text-blue-600 rounded-full uppercase tracking-widest font-extrabold"
                          >Early</span
                        >
                      </div>
                      <p
                        class="text-xs text-slate-500 font-medium leading-relaxed"
                      >
                        Weight quantization and fine-tuning tooling for large
                        language models. FP8 support in early access.
                      </p>
                    </div>
                  </a>

                  <!-- HyperRAG -->
                  <a
                    routerLink="/hyperrag"
                    routerLinkActive="bg-slate-50 border-slate-200"
                    (click)="closeAllMenus()"
                    class="flex items-start gap-4 p-6 rounded-2xl hover:bg-slate-50 border border-transparent transition-all group/item"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover/item:scale-110 transition-transform"
                    >
                      <lucide-icon [img]="Gauge" [size]="20" />
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <h4 class="text-sm font-bold text-dark">HyperRAG</h4>
                        <span
                          class="text-[9px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded"
                          >dv-hyperrag</span
                        >
                      </div>
                      <p
                        class="text-xs text-slate-500 font-medium leading-relaxed"
                      >
                        KV cache optimization for RAG serving. Prefix-trie
                        caching, PGDSF eviction, and Pareto schedule search
                        for up to 9x faster TTFT.
                      </p>
                    </div>
                  </a>
                </div>

                <!-- Megamenu Footer -->
                <div
                  class="bg-slate-50 p-6 flex items-center justify-between mt-2"
                >
                  <p
                    class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                  >
                    Researching Multi-GPU & NVlink Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a
            routerLink="/use-cases"
            routerLinkActive="text-primary"
            (click)="closeAllMenus()"
            class="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-primary transition-all"
            >Use Cases</a
          >
          <a
            routerLink="/pricing"
            routerLinkActive="text-primary"
            (click)="closeAllMenus()"
            class="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-primary transition-all"
            >Pricing</a
          >
          <a
            routerLink="/blog"
            routerLinkActive="text-primary"
            (click)="closeAllMenus()"
            class="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-primary transition-all"
            >Blog</a
          >
        </div>

        <div class="flex items-center gap-3 ml-auto relative z-[110]">
          <a
            routerLink="/pricing"
            fragment="contact-form"
            (click)="closeAllMenus()"
            class="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
          >
            <lucide-icon [img]="Phone" [size]="16" />
            Talk to Sales
          </a>

          <!-- Mobile Menu Toggle -->
          <button
            (click)="toggleMobileMenu($event)"
            class="md:hidden flex items-center justify-center p-3 -mr-2 text-slate-600 hover:text-primary transition-all rounded-xl hover:bg-slate-50 relative z-[150]"
            [class.bg-slate-50]="isMobileMenuOpen()"
            [class.text-primary]="isMobileMenuOpen()"
            aria-label="Toggle menu"
          >
            @if (!isMobileMenuOpen()) {
              <lucide-icon [img]="Menu" [size]="24" class="animate-fade-in" />
            }
            @if (isMobileMenuOpen()) {
              <lucide-icon [img]="X" [size]="24" class="animate-fade-in" />
            }
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Content -->
      @if (isMobileMenuOpen()) {
        <div
          class="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-2xl p-6 space-y-8 animate-fade-in z-[140] max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div class="space-y-4">
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Products
            </p>
            <div class="grid gap-4">
              <a
                routerLink="/autopilot"
                (click)="closeAllMenus()"
                class="flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                >
                  <lucide-icon [img]="Zap" [size]="16" />
                </div>
                <span class="text-sm font-bold text-dark">Autopilot</span>
              </a>
              <a
                routerLink="/optimemory"
                (click)="closeAllMenus()"
                class="flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600"
                >
                  <lucide-icon [img]="Server" [size]="16" />
                </div>
                <span class="text-sm font-bold text-dark">Optimemory</span>
              </a>
              <a
                routerLink="/llm-tuner"
                (click)="closeAllMenus()"
                class="flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600"
                >
                  <lucide-icon [img]="Lightbulb" [size]="16" />
                </div>
                <span class="text-sm font-bold text-dark">LLM Tuner</span>
              </a>
              <a
                routerLink="/hyperrag"
                (click)="closeAllMenus()"
                class="flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600"
                >
                  <lucide-icon [img]="Gauge" [size]="16" />
                </div>
                <span class="text-sm font-bold text-dark">HyperRAG</span>
              </a>
            </div>
          </div>

          <div class="space-y-4 pt-4 border-t border-slate-50">
            <a
              routerLink="/use-cases"
              (click)="closeAllMenus()"
              class="block text-sm font-bold text-dark"
              >Use Cases</a
            >
            <a
              routerLink="/pricing"
              (click)="closeAllMenus()"
              class="block text-sm font-bold text-dark"
              >Pricing</a
            >
            <a
              routerLink="/blog"
              (click)="closeAllMenus()"
              class="block text-sm font-bold text-dark"
              >Blog</a
            >
          </div>

          <div class="pt-4">
            <a
              routerLink="/pricing"
              fragment="contact-form"
              (click)="closeAllMenus()"
              class="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 text-center"
            >
              <lucide-icon [img]="Phone" [size]="16" />
              Talk to Sales
            </a>
          </div>
        </div>
      }
    </header>
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
export class HeaderComponent {
  readonly ChevronDown = ChevronDown;
  readonly Zap = Zap;
  readonly Server = Server;
  readonly Lightbulb = Lightbulb;
  readonly Gauge = Gauge;
  readonly Phone = Phone;
  readonly Menu = Menu;
  readonly X = X;

  private platformId = inject(PLATFORM_ID);

  isProductsMenuOpen = signal(false);
  isMobileMenuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 10);
    }
  }

  toggleMobileMenu(event: Event) {
    event.stopPropagation();
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeAllMenus() {
    this.isProductsMenuOpen.set(false);
    this.isMobileMenuOpen.set(false);
  }
}
