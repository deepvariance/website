import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <div class="not-found__inner">
        <p class="not-found__code">404</p>
        <h1 class="not-found__title">Page not found</h1>
        <p class="not-found__body">
          That URL does not exist. Head back to the platform overview or contact us if you need help.
        </p>
        <div class="not-found__actions">
          <a routerLink="/" class="btn-primary btn--sm">Home</a>
          <a routerLink="/platform" class="btn-secondary btn--sm">Platform</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .not-found {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(6rem, 12vw, 8rem) 1.5rem 4rem;
    }
    .not-found__inner {
      max-width: 32rem;
      text-align: center;
    }
    .not-found__code {
      font-family: var(--font-label);
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
    .not-found__title {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 4vw, 2.25rem);
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    .not-found__body {
      font-family: var(--font-body);
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }
    .not-found__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
  `,
})
export class NotFoundComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Page not found | Deep Variance',
      description: 'The page you requested could not be found.',
      path: '/404',
    });
  }
}
