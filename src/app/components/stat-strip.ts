import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Stat {
  value: string;
  label: string;
  qualifier?: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-stat-strip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="rounded-lg overflow-hidden border border-border divide-x divide-border"
      [style.max-width]="stats.length === 1 ? '200px' : stats.length === 2 ? '420px' : '48rem'"
      [class.mx-auto]="centered"
      [style.display]="'grid'"
      [style.grid-template-columns]="'repeat(' + stats.length + ', minmax(0, 1fr))'"
    >
      @for (s of stats; track s.label) {
        <div class="px-3 sm:px-6 py-4 sm:py-5 text-center bg-surface">
          @if (s.qualifier) {
            <p class="font-mono text-[10px] uppercase tracking-[0.22em] mb-1" style="color:#8a8a8a">{{ s.qualifier }}</p>
          }
          <p class="font-display font-bold tracking-tight text-white text-2xl sm:text-4xl mb-1">
            {{ s.value }}
          </p>
          <p class="font-mono text-[10px] uppercase tracking-[0.1em] leading-snug" style="color:#a3a3a3">{{ s.label }}</p>
        </div>
      }
    </div>
  `,
})
export class StatStripComponent {
  @Input({ required: true }) stats!: readonly Stat[];
  @Input() centered = false;
}
