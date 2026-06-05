import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dash-page-header',
  standalone: true,
  template: `
    <div class="dash-page-header">
      <div>
        <h1 class="dash-page-title">{{ title }}</h1>
        @if (subtitle) { <p class="dash-page-sub">{{ subtitle }}</p> }
      </div>
      <ng-content />
    </div>
  `,
  styles: [`
    .dash-page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .dash-page-title {
      font-family: var(--font-display,sans-serif);
      font-size: 22px;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    .dash-page-sub {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }
  `],
})
export class PageHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
}
