import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type StatusVariant = 'live' | 'beta' | 'preview' | 'soon';

@Component({
  selector: 'app-status-pill',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-pill" [class]="'status-pill--' + variant">
      <span class="status-pill__dot" aria-hidden="true"></span>
      <ng-content />
    </span>
  `,
  styleUrl: './status-pill.scss',
})
export class StatusPillComponent {
  @Input() variant: StatusVariant = 'live';
}
