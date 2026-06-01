import { Directive, ElementRef, OnDestroy, inject } from '@angular/core';

/**
 * Tracks pointer on a dot-grid section. Sets --grid-glow-x/y so a masked
 * bright dot layer (::before in .page-hero-grid / .hero-section) lights up dots near the cursor.
 */
@Directive({
  selector: '[appDotGridGlow]',
  standalone: true,
})
export class DotGridGlowDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private boundEnter = (e: PointerEvent) => this.onPointerEnter(e);
  private boundMove = (e: PointerEvent) => this.onPointerMove(e);
  private boundLeave = () => this.onPointerLeave();

  constructor() {
    const node = this.el.nativeElement;
    node.addEventListener('pointerenter', this.boundEnter, { passive: true });
    node.addEventListener('pointermove', this.boundMove, { passive: true });
    node.addEventListener('pointerleave', this.boundLeave);
  }

  ngOnDestroy(): void {
    const node = this.el.nativeElement;
    node.removeEventListener('pointerenter', this.boundEnter);
    node.removeEventListener('pointermove', this.boundMove);
    node.removeEventListener('pointerleave', this.boundLeave);
  }

  private onPointerEnter(e: PointerEvent): void {
    if (e.pointerType === 'touch') {
      return;
    }
    this.el.nativeElement.classList.add('dot-grid-glow--active');
  }

  private onPointerMove(e: PointerEvent): void {
    // Touch drags while scrolling update glow + layout and fight native scroll on mobile
    if (e.pointerType === 'touch') {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = this.el.nativeElement;
    node.style.setProperty('--grid-glow-x', `${x}px`);
    node.style.setProperty('--grid-glow-y', `${y}px`);
    node.classList.add('dot-grid-glow--active');
  }

  private onPointerLeave(): void {
    this.el.nativeElement.classList.remove('dot-grid-glow--active');
  }
}
