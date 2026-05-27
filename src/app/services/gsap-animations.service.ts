import { Injectable, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationsService {
  
  /**
   * Hero reveal animation
   * Sequence: overline → headline → subheadline → metrics → CTAs
   */
  heroReveal(container: ElementRef): void {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from('.hero-overline', {
        y: 12,
        opacity: 0,
        duration: 0.6,
      })
      .from('.hero-headline', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      }, '-=0.3')
      .from('.hero-subheadline', {
        y: 15,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from('.hero-metric-badge', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      }, '-=0.3')
      .from('.hero-cta-row .btn-primary, .hero-cta-row .btn-secondary', {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
      }, '-=0.2')
      .from('.hero-trust-line', {
        opacity: 0,
        duration: 0.5,
      }, '-=0.2')
      .from('.hero-grid > div:last-child', {
        x: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.8');

    }, container.nativeElement);
  }

  /**
   * Section reveal animation
   * Generic fade-up with configurable delay
   */
  sectionReveal(el: ElementRef, delay: number = 0): void {
    gsap.from(el.nativeElement, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay,
      ease: 'expo.out',
    });
  }

  /**
   * Metric count-up animation
   * Animates from 0 to target value
   */
  metricCountUp(el: ElementRef, target: number, duration: number = 2): void {
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const formatted = Math.round(obj.value).toLocaleString();
        el.nativeElement.textContent = formatted;
      },
    });
  }

  /**
   * Diagram pulse animation
   * Pulsing glow on Deep Variance layer (for runtime layer diagram)
   */
  diagramPulse(layer: ElementRef): void {
    gsap.to(layer.nativeElement, {
      boxShadow: '0 0 40px rgba(0, 194, 255, 0.4), 0 0 80px rgba(0, 194, 255, 0.15)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  /**
   * Data flow pulse animation
   * Moves dot markers along SVG paths
   */
  dataFlowPulse(paths: SVGPathElement[]): void {
    paths.forEach((path, index) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', '#00C2FF');
      dot.setAttribute('opacity', '0.8');
      
      path.parentElement?.appendChild(dot);

      gsap.to(dot, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        duration: 3,
        repeat: -1,
        delay: index * 0.5,
        ease: 'none',
      });
    });
  }

  /**
   * Stagger-in animation for cards
   * Used for product cards, benchmark cards, etc.
   */
  staggerCards(selector: string, container?: ElementRef): void {
    const ctx = container ? gsap.context(() => {
      this.runStaggerAnimation(selector);
    }, container.nativeElement) : this.runStaggerAnimation(selector);
  }

  private runStaggerAnimation(selector: string): void {
    gsap.from(selector, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
      },
    });
  }

  /**
   * Table row reveal
   * Reveals table rows one by one on scroll
   */
  tableRowReveal(selector: string): void {
    gsap.from(selector, {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
      },
    });
  }

  /**
   * Kill all animations in a context
   */
  killAll(): void {
    gsap.killTweensOf('*');
  }
}
