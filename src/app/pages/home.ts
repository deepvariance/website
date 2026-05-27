import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { StackVizComponent } from '../components/stack-viz';
import { DotGridGlowDirective } from '../directives/dot-grid-glow.directive';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    StackVizComponent,
    DotGridGlowDirective,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnDestroy {
  readonly ArrowRight = ArrowRight;

  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  // ── Typewriter for hero headline ──────────────────────────────────────────
  private readonly LINE_1 = 'Your GPUs are fast.';
  private readonly LINE_2_PREFIX = 'Your ';
  private readonly LINE_2_HIGHLIGHT = 'infrastructure';
  private readonly LINE_2_SUFFIX = ' isn\u2019t.';
  private readonly LINE_2 =
    this.LINE_2_PREFIX + this.LINE_2_HIGHLIGHT + this.LINE_2_SUFFIX;
  private readonly CHAR_MS = 45;
  private readonly LINE_PAUSE_MS = 350;

  private idx1 = signal(0);
  private idx2 = signal(0);

  line1Typed = computed(() => this.LINE_1.slice(0, this.idx1()));
  line2Prefix = computed(() => {
    const n = this.idx2();
    const end = this.LINE_2_PREFIX.length;
    return n <= end ? this.LINE_2_PREFIX.slice(0, n) : this.LINE_2_PREFIX;
  });
  line2Highlight = computed(() => {
    const n = this.idx2();
    const start = this.LINE_2_PREFIX.length;
    const end = start + this.LINE_2_HIGHLIGHT.length;
    if (n <= start) return '';
    if (n <= end) return this.LINE_2_HIGHLIGHT.slice(0, n - start);
    return this.LINE_2_HIGHLIGHT;
  });
  line2Suffix = computed(() => {
    const n = this.idx2();
    const start = this.LINE_2_PREFIX.length + this.LINE_2_HIGHLIGHT.length;
    if (n <= start) return '';
    return this.LINE_2.slice(start, n);
  });
  line1Done  = computed(() => this.idx1() >= this.LINE_1.length);
  line2Done  = computed(() => this.idx2() >= this.LINE_2.length);

  /** Inline caret on line 1 while typing, or during pause before line 2 */
  showCaretLine1 = computed(
    () => !this.line1Done() || (this.line1Done() && this.idx2() === 0),
  );

  /** Inline caret on line 2 once it starts typing (stays through finish) */
  showCaretLine2 = computed(() => this.line1Done() && this.idx2() > 0);

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    this.seo.set({
      title: 'Deep Variance | AI Infra Optimization',
      description: 'Deep Variance sits between your framework and the hardware driver. It intercepts memory waste, cache misses, and kernel inefficiency before they cost you.',
      path: '/',
    });

    if (isPlatformBrowser(this.platformId)) {
      const startLine2 = () => {
        const t2 = setInterval(() => {
          if (this.idx2() < this.LINE_2.length) {
            this.idx2.update(n => n + 1);
          } else {
            clearInterval(t2);
          }
        }, this.CHAR_MS);
        this.timers.push(t2 as unknown as ReturnType<typeof setTimeout>);
      };

      const t1 = setInterval(() => {
        if (this.idx1() < this.LINE_1.length) {
          this.idx1.update(n => n + 1);
        } else {
          clearInterval(t1);
          const pause = setTimeout(startLine2, this.LINE_PAUSE_MS);
          this.timers.push(pause);
        }
      }, this.CHAR_MS);
      this.timers.push(t1 as unknown as ReturnType<typeof setTimeout>);
    } else {
      this.idx1.set(this.LINE_1.length);
      this.idx2.set(this.LINE_2.length);
    }
  }

  ngOnDestroy(): void {
    this.timers.forEach(t => {
      clearTimeout(t);
      clearInterval(t as unknown as ReturnType<typeof setInterval>);
    });
  }

  heroMetrics = [
    {
      value: '+65%',
      dim: 'More memory',
      label: 'Fit bigger models, or serve more users at the same time.',
    },
    {
      value: '6x',
      dim: 'Inference speed',
      label: 'Real-time tuning unlocks more tokens and more requests per GPU.',
    },
    {
      value: '-50%',
      dim: 'Energy efficiency',
      label: 'Cut power draw per token. Lower cost, smaller fleet, same SLA.',
    },
  ];
}
