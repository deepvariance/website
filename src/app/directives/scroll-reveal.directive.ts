import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[dvScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() dvScrollReveal: 'fade' | 'slide' | 'scale' = 'fade';
  @Input() delay: number = 0;
  @Input() duration: number = 0.6;

  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

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
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn();
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private animateIn() {
    const element = this.el.nativeElement;

    switch (this.dvScrollReveal) {
      case 'fade':
        gsap.from(element, {
          opacity: 0,
          duration: this.duration,
          delay: this.delay,
          ease: 'power2.out',
        });
        break;

      case 'slide':
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: this.duration,
          delay: this.delay,
          ease: 'expo.out',
        });
        break;

      case 'scale':
        gsap.from(element, {
          scale: 0.95,
          opacity: 0,
          duration: this.duration,
          delay: this.delay,
          ease: 'back.out(1.7)',
        });
        break;
    }

    element.classList.add('revealed');
  }
}
