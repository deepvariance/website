import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="mb-10 md:mb-14"
      [class.text-center]="align === 'center'"
      [class.max-w-3xl]="align === 'center'"
      [class.mx-auto]="align === 'center'"
    >
      @if (eyebrow) {
        <span class="label-caps inline-block mb-4">{{ eyebrow }}</span>
      }
      <h2 class="font-display font-bold tracking-tight text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
        <ng-content />
      </h2>
      @if (subhead) {
        <p
          class="mt-5 font-mono text-on-surface-variant text-base sm:text-lg leading-relaxed"
          [class.max-w-2xl]="align === 'center'"
          [class.mx-auto]="align === 'center'"
        >
          {{ subhead }}
        </p>
      }
    </div>
  `,
})
export class SectionHeaderComponent {
  @Input() eyebrow?: string;
  @Input() subhead?: string;
  @Input() align: 'left' | 'center' = 'center';
}
