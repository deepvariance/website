// Generic inline badge for status/tags — distinct from StatusPillComponent which
// is marketing-facing. This one is dashboard-native with requestStatus variants.
import { Component, Input } from '@angular/core';

export type BadgeVariant = 'success' | 'error' | 'warning' | 'neutral' | 'violet';

@Component({
  selector: 'app-dash-badge',
  standalone: true,
  template: `
    <span class="db" [class]="'db--' + variant">
      <span class="db-dot"></span>
      <ng-content />
    </span>
  `,
  styles: [`
    .db {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .db-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
    .db--success { background: rgba(34,197,94,0.1); color: #86efac; }
    .db--success .db-dot { background: #86efac; }
    .db--error { background: rgba(239,68,68,0.1); color: #fca5a5; }
    .db--error .db-dot { background: #fca5a5; }
    .db--warning { background: rgba(234,179,8,0.1); color: #fde68a; }
    .db--warning .db-dot { background: #fde68a; }
    .db--neutral { background: rgba(255,255,255,0.06); color: var(--text-muted); }
    .db--neutral .db-dot { background: #525252; }
    .db--violet { background: rgba(123,97,255,0.15); color: #c4b5fd; }
    .db--violet .db-dot { background: #c4b5fd; }
  `],
})
export class DashBadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';
}
