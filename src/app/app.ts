import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
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

  constructor() {
    // Offset anchor scrolling by header height so anchors aren't hidden
    this.viewportScroller.setOffset([0, 80]);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Only scroll to top when there's no fragment — let anchorScrolling handle fragments
      if (!event.urlAfterRedirects.includes('#')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
