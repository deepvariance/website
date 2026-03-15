import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appAos]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input('appAos') animation: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' = 'fade-up';
  @Input() aosDelay = 0;

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const el: HTMLElement = this.el.nativeElement;
    el.classList.add('aos-init', `aos-${this.animation}`);
    if (this.aosDelay) {
      el.style.transitionDelay = `${this.aosDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('aos-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
