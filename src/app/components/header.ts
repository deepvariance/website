import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArrowRight, LucideAngularModule, Menu, X } from 'lucide-angular';
import { WordmarkComponent } from './wordmark';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, WordmarkComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly Menu = Menu;
  readonly X = X;
  readonly ArrowRight = ArrowRight;

  /** Highlight nav when on child routes (e.g. /platform/optimemory). */
  readonly navActiveOptions = {
    paths: 'subset' as const,
    queryParams: 'ignored' as const,
    fragment: 'ignored' as const,
    matrixParams: 'ignored' as const,
  };

  readonly navExactOptions = {
    paths: 'exact' as const,
    queryParams: 'ignored' as const,
    fragment: 'ignored' as const,
    matrixParams: 'ignored' as const,
  };

  private platformId = inject(PLATFORM_ID);

  isMobileMenuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 80);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
