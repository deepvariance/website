import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fusion-angular-tailwind-starter');
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  private platformId = inject(PLATFORM_ID);
  private hasHandledInitialNavigation = false;

  constructor() {
    this.viewportScroller.setOffset([0, 80]);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (!isPlatformBrowser(this.platformId)) return;

      if (!this.hasHandledInitialNavigation) {
        this.hasHandledInitialNavigation = true;
        return;
      }

      if (!event.urlAfterRedirects.includes('#')) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
