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
      1: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
      2: 'bg-blue-500/10   text-blue-300   border border-blue-500/20',
      3: 'bg-green-500/10  text-green-300  border border-green-500/20',
      4: 'bg-amber-500/10  text-amber-300  border border-amber-500/20',
    };
    return map[this.color];
  }
}
