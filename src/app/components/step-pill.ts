import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type StepColor = 1 | 2 | 3 | 4;

@Component({
  selector: 'app-step-pill',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-semibold tracking-wide"
      [ngClass]="colorClass"
    >
      <span class="opacity-60">{{ index }}</span>
      {{ label }}
    </span>
  `,
})
export class StepPillComponent {
  @Input() index!: number;
  @Input() label!: string;
  @Input() color: StepColor = 1;

  get colorClass(): string {
    const map: Record<StepColor, string> = {
      1: 'panel-pill text-on-surface-variant',
      2: 'panel-pill text-on-surface-variant',
      3: 'panel-pill text-on-surface-variant',
      4: 'panel-pill text-on-surface-variant',
    };
    return map[this.color];
  }
}
