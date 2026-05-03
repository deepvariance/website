import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

export type CtaVariant = 'primary' | 'glass' | 'ghost';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    @if (routerLink) {
      <a
        [routerLink]="routerLink"
        [fragment]="fragment ?? undefined"
        [class]="classes"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    } @else if (href) {
      <a
        [href]="href"
        [target]="external ? '_blank' : null"
        [rel]="external ? 'noopener noreferrer' : null"
        [class]="classes"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    } @else {
      <button type="button" [class]="classes">
        <ng-container *ngTemplateOutlet="content" />
      </button>
    }

    <ng-template #content>
      <ng-content />
      @if (showArrow) {
        <lucide-icon [img]="ArrowRight" [size]="16" class="ml-1.5" />
      }
    </ng-template>
  `,
})
export class CtaButtonComponent {
  @Input() variant: CtaVariant = 'primary';
  @Input() routerLink?: string | string[];
  @Input() fragment?: string;
  @Input() href?: string;
  @Input() external = false;
  @Input() showArrow = true;
  @Input() size: 'md' | 'lg' = 'lg';

  readonly ArrowRight = ArrowRight;

  @Input() fullWidth = false;

  get classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide uppercase rounded-md transition-all duration-300 active:scale-[0.98]';
    const sizing = this.size === 'lg' ? 'px-7 py-3.5 text-[12px] tracking-[0.16em]' : 'px-5 py-2.5 text-[11px] tracking-[0.14em]';
    const variant =
      this.variant === 'primary'
        ? 'btn-primary-glow'
        : this.variant === 'ghost'
          ? 'btn-ghost'
          : 'btn-glass';
    const width = this.fullWidth ? 'w-full' : '';
    return `${base} ${sizing} ${variant} ${width}`.trim();
  }
}
