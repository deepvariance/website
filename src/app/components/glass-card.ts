import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type GlassVariant = 'panel' | 'card' | 'kpi-rail' | 'strong';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative overflow-hidden bg-surface border border-border transition-colors"
      [class.rounded-lg]="rounded === 'lg'"
      [class.rounded-xl]="rounded === 'xl'"
      [class.rounded-2xl]="rounded === '2xl'"
      [class.hover:border-border-hi]="variant === 'card'"
      [class.border-border-mid]="variant === 'strong'"
      [ngClass]="extraClass"
    >
      <ng-content />
    </div>
  `,
})
export class GlassCardComponent {
  @Input() variant: GlassVariant = 'card';
  @Input() glow = false;
  @Input() rounded: 'lg' | 'xl' | '2xl' = 'xl';
  @Input() extraClass = '';
}
