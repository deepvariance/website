import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import {
  IsActiveMatchOptions,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ArrowRight, Lock, LucideAngularModule, Menu, X } from 'lucide-angular';
import { HEADER_PRIMARY_NAV } from '../data/site-nav';
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
  readonly Lock = Lock;
  readonly ArrowRight = ArrowRight;
  readonly primaryNav = HEADER_PRIMARY_NAV;
  readonly navSubsetOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };
  readonly navExactOptions: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  private platformId = inject(PLATFORM_ID);

  isMobileMenuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const next = window.scrollY > 80;
    if (next !== this.scrolled()) {
      this.scrolled.set(next);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => {
      const next = !v;
      this.syncMobileMenuScrollLock(next);
      return next;
    });
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.syncMobileMenuScrollLock(false);
  }

  private syncMobileMenuScrollLock(locked: boolean) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
