import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type GlassVariant = 'panel' | 'card' | 'kpi-rail' | 'strong';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="panel-box relative overflow-hidden"
      [class.panel-box--strong]="variant === 'strong'"
      [class.panel-box--highlighted]="glow"
      [class.panel-box--hover]="variant === 'card'"
      [class.rounded-lg]="rounded === 'lg'"
      [class.rounded-xl]="rounded === 'xl'"
      [class.rounded-2xl]="rounded === '2xl'"
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
