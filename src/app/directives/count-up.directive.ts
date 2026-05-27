import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[dvCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() dvCountUp!: number;
  @Input() duration: number = 2;
  @Input() decimals: number = 0;
  @Input() prefix: string = '';
  @Input() suffix: string = '';

  private el = inject(ElementRef);
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  ngOnInit() {
    this.setupObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCount();
          this.hasAnimated = true;
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private animateCount() {
    const obj = { value: 0 };
    const element = this.el.nativeElement;

    gsap.to(obj, {
      value: this.dvCountUp,
      duration: this.duration,
      ease: 'power2.out',
      onUpdate: () => {
        const formatted = this.decimals > 0
          ? obj.value.toFixed(this.decimals)
          : Math.round(obj.value).toLocaleString();
        
        element.textContent = `${this.prefix}${formatted}${this.suffix}`;
      },
    });
  }
}
