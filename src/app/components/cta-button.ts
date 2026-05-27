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
        <lucide-icon [img]="ArrowRight" [size]="14" />
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
    const variantClass =
      this.variant === 'primary'
        ? 'btn-primary'
        : this.variant === 'ghost'
          ? 'btn-ghost'
          : 'btn-secondary';
    const sizeClass = this.size === 'lg' ? 'btn--lg' : '';
    const widthClass = this.fullWidth ? 'w-full' : '';
    return [variantClass, sizeClass, widthClass].filter(Boolean).join(' ');
  }
}
