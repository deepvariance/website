import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';

interface CometLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  duration: number;
  delay: number;
  dashTotal: number;
  reverse: boolean;
}

interface CometAura {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

const COMET_SPECS: ReadonlyArray<{
  angle: number;
  duration: number;
  delay: number;
  reverse?: boolean;
}> = [
  { angle: -34, duration: 3.5, delay: 0 },
  { angle: 11, duration: 4.2, delay: 0.85, reverse: true },
  { angle: -6, duration: 3.1, delay: 1.55 },
  { angle: 22, duration: 4.5, delay: 2.15, reverse: true },
  { angle: -19, duration: 3.8, delay: 0.4 },
  { angle: 38, duration: 3.3, delay: 2.65, reverse: true },
];

/**
 * Wraps hero line 1: grid-aligned comet streaks + soft aura sized to the line box.
 */
@Component({
  selector: 'app-hero-comet-frame',
  standalone: true,
  template: `
    @if (!reducedMotion()) {
      <svg
        class="hero-comet-frame__svg"
        [attr.viewBox]="viewBox()"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hero-comet-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(157, 111, 255, 0.14)" />
            <stop offset="55%" stop-color="rgba(255, 255, 255, 0.04)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
          </radialGradient>
          @for (c of comets(); track c.id) {
            <linearGradient
              [attr.id]="'hero-comet-grad-' + c.id"
              gradientUnits="userSpaceOnUse"
              [attr.x1]="c.x1"
              [attr.y1]="c.y1"
              [attr.x2]="c.x2"
              [attr.y2]="c.y2"
            >
              <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
              <stop offset="72%" stop-color="rgba(255, 255, 255, 0)" />
              <stop offset="88%" stop-color="rgba(255, 255, 255, 0.16)" />
              <stop offset="96%" stop-color="rgba(157, 111, 255, 0.55)" />
              <stop offset="100%" stop-color="rgba(220, 210, 255, 0.92)" />
            </linearGradient>
          }
        </defs>

        @if (aura(); as a) {
          <ellipse
            class="hero-comet-frame__aura"
            [attr.cx]="a.cx"
            [attr.cy]="a.cy"
            [attr.rx]="a.rx"
            [attr.ry]="a.ry"
            fill="url(#hero-comet-aura)"
          />
        }

        @for (c of comets(); track c.id) {
          <line
            class="hero-comet-frame__streak"
            [class.hero-comet-frame__streak--reverse]="c.reverse"
            [attr.x1]="c.x1"
            [attr.y1]="c.y1"
            [attr.x2]="c.x2"
            [attr.y2]="c.y2"
            [attr.stroke]="'url(#hero-comet-grad-' + c.id + ')'"
            [style.--comet-dash-total]="c.dashTotal"
            [style.--comet-duration]="c.duration + 's'"
            [style.animation-delay]="c.delay + 's'"
          />
        }
      </svg>
    }
    <div class="hero-comet-frame__content">
      <ng-content />
    </div>
  `,
  styleUrl: './hero-comet-frame.scss',
})
export class HeroCometFrameComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private resizeObserver?: ResizeObserver;
  private motionQuery?: MediaQueryList;
  private motionListener?: () => void;
  private scrollEndTimer?: ReturnType<typeof setTimeout>;
  private layoutRaf = 0;
  private scrolling = false;
  private readonly boundScroll = () => this.onWindowScroll();

  readonly viewBox = signal('0 0 100 100');
  readonly comets = signal<CometLine[]>([]);
  readonly aura = signal<CometAura | null>(null);
  readonly reducedMotion = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion.set(this.motionQuery.matches);
    this.motionListener = () => this.reducedMotion.set(this.motionQuery!.matches);
    this.motionQuery.addEventListener('change', this.motionListener);

    this.resizeObserver = new ResizeObserver(() => this.scheduleLayout());
    this.resizeObserver.observe(this.host.nativeElement);
    const content = this.host.nativeElement.querySelector('.hero-comet-frame__content');
    if (content) {
      this.resizeObserver.observe(content);
    }

    window.addEventListener('scroll', this.boundScroll, { passive: true });
    this.layout();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.removeEventListener('scroll', this.boundScroll);
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
    }
    if (this.layoutRaf) {
      cancelAnimationFrame(this.layoutRaf);
    }
    if (this.motionQuery && this.motionListener) {
      this.motionQuery.removeEventListener('change', this.motionListener);
    }
  }

  private onWindowScroll(): void {
    this.scrolling = true;
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
    }
    this.scrollEndTimer = setTimeout(() => {
      this.scrolling = false;
      this.scheduleLayout();
    }, 150);
  }

  private scheduleLayout(): void {
    if (this.layoutRaf) {
      return;
    }
    this.layoutRaf = requestAnimationFrame(() => {
      this.layoutRaf = 0;
      if (!this.scrolling) {
        this.layout();
      }
    });
  }

  private layout(): void {
    const frame = this.host.nativeElement;
    const content = frame.querySelector('.hero-comet-frame__content') as HTMLElement | null;
    const section = frame.closest('.hero-section') as HTMLElement | null;
    if (!content) {
      return;
    }

    const grid = this.readGridSize(section);
    const contentW = content.offsetWidth;
    const contentH = content.offsetHeight;
    if (contentW < 1 || contentH < 1) {
      return;
    }

    const padX = grid * 5;
    const padY = grid * 2.5;
    const w = contentW + padX * 2;
    const h = contentH + padY * 2;
    const cx = padX + contentW / 2;
    const cy = padY + contentH / 2;
    const span = Math.hypot(w, h) * 0.62;

    const frameRect = frame.getBoundingClientRect();
    const sectionRect = section?.getBoundingClientRect();

    const snapPoint = (lx: number, ly: number): { x: number; y: number } => {
      if (!sectionRect) {
        return {
          x: Math.round(lx / grid) * grid,
          y: Math.round(ly / grid) * grid,
        };
      }
      const pageX = frameRect.left - padX + lx;
      const pageY = frameRect.top - padY + ly;
      const relX = pageX - sectionRect.left;
      const relY = pageY - sectionRect.top;
      const snappedRelX = Math.round(relX / grid) * grid;
      const snappedRelY = Math.round(relY / grid) * grid;
      return {
        x: snappedRelX + (sectionRect.left - frameRect.left) + padX,
        y: snappedRelY + (sectionRect.top - frameRect.top) + padY,
      };
    };

    const lines: CometLine[] = COMET_SPECS.map((spec, index) => {
      const rad = (spec.angle * Math.PI) / 180;
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);
      const rawX1 = cx - dx * span;
      const rawY1 = cy - dy * span;
      const rawX2 = cx + dx * span;
      const rawY2 = cy + dy * span;
      const p1 = snapPoint(rawX1, rawY1);
      const p2 = snapPoint(rawX2, rawY2);
      const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const dashTotal = Math.round(len + grid * 4);

      return {
        id: `c${index}`,
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        duration: spec.duration,
        delay: spec.delay,
        dashTotal,
        reverse: spec.reverse ?? false,
      };
    });

    frame.style.setProperty('--comet-pad-x', `${padX}px`);
    frame.style.setProperty('--comet-pad-y', `${padY}px`);

    this.viewBox.set(`0 0 ${Math.round(w)} ${Math.round(h)}`);
    this.comets.set(lines);
    this.aura.set({
      cx,
      cy,
      rx: contentW / 2 + grid * 1.75,
      ry: contentH / 2 + grid * 1.1,
    });
  }

  private readGridSize(section: HTMLElement | null): number {
    const source = section ?? this.host.nativeElement;
    const raw = getComputedStyle(source).getPropertyValue('--grid-size').trim();
    const parsed = parseFloat(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 28;
  }
}
