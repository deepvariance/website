import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  Input,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

// ── Primary data model ─────────────────────────────────────────────────────────
export interface BenchWorkload {
  id: string;
  label: string;
  hyperMs: number;
  baseMs: number;
}

export type BenchModelData = Record<string, BenchWorkload[]>;

// ── Kept for Storybook / backwards compat ─────────────────────────────────────
export interface BenchRow {
  label: string;
  value: number;
  stddev?: number;
  accent?: 'neon' | 'muted';
}

export interface BenchSeries {
  title: string;
  annotation?: string;
  rows: BenchRow[];
  ceiling?: number;
}

export interface BenchOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-bench-bars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dv-bench-card">

      <!-- Hero -->
      <div class="dv-bench-hero">
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
          <span class="dv-bench-hero-num">{{ displayBestSpeedup() | number:'1.2-2' }}</span>
          <span class="dv-bench-hero-x">×</span>
          <span class="dv-bench-hero-caption">
            faster than baseline
            <span class="dv-bench-hero-dim">(best workload)</span>
          </span>
        </div>
        <p class="dv-bench-hero-sub">HyperRAG vs. baseline &middot; latency in ms (lower is better)</p>
      </div>

      <!-- Model pills -->
      @if (modelOptions?.length) {
        <div class="dv-pill-row mb-6">
          @for (opt of modelOptions ?? []; track opt.id) {
            <button
              class="dv-pill"
              [class.is-active]="model() === opt.id"
              (click)="onModelChange(opt.id)"
            >{{ opt.label }}</button>
          }
        </div>
      }

      <!-- Chart: y-axis + bar groups -->
      <div class="flex dv-chart-area" style="overflow:visible">

        <!-- Y-axis labels -->
        <div class="dv-y-axis relative shrink-0">
          @for (tick of yTicks(); track tick) {
            <span
              class="dv-y-label"
              [style.bottom]="(tick / ceiling()) * 100 + '%'"
            >{{ tick }}ms</span>
          }
        </div>

        <!-- Chart body -->
        <div class="relative flex-1" style="overflow:visible">

          <!-- Grid lines -->
          @for (tick of yTicks(); track tick) {
            <div class="dv-grid-line" [style.bottom]="(tick / ceiling()) * 100 + '%'"></div>
          }

          <!-- Bar groups: stretch so children get a concrete height to compute % against -->
          <div class="absolute inset-0 flex items-stretch" style="gap:8px;padding-right:4px">
            @for (w of displayWorkloads(); track w.id) {
              <div
                class="dv-bar-group"
                (mouseenter)="hovered.set(w.id)"
                (mouseleave)="hovered.set(null)"
              >
                @if (hovered() === w.id) {
                  <div class="dv-tooltip">
                    <p class="dv-tooltip-title">{{ w.label }}</p>
                    <div class="dv-tooltip-row">
                      <span class="dv-dot dv-dot--hyper"></span>
                      <span class="dv-tooltip-text">HyperRAG: <b>{{ w.hyperMs | number:'1.1-1' }}ms</b></span>
                    </div>
                    <div class="dv-tooltip-row">
                      <span class="dv-dot dv-dot--base"></span>
                      <span class="dv-tooltip-text">Baseline: <b>{{ w.baseMs | number:'1.1-1' }}ms</b></span>
                    </div>
                  </div>
                }
                <div class="dv-bar dv-bar--hyper" [style.height.%]="w.hyperPct"></div>
                <div class="dv-bar dv-bar--base"  [style.height.%]="w.basePct"></div>
              </div>
            }
          </div>

        </div>
      </div>

      <!-- X-axis labels -->
      <div class="flex mt-2 mb-6 dv-x-axis" style="gap:8px">
        @for (w of activeWorkloads(); track w.id) {
          <div class="dv-x-label">{{ w.label }}</div>
        }
      </div>

      <!-- Stat cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        @for (w of activeWorkloads(); track w.id) {
          <div class="dv-stat" [class.is-best]="isBest(w)">
            <p class="dv-stat-label">{{ w.label }}</p>
            <p class="dv-stat-speedup">{{ speedupOf(w) | number:'1.2-2' }}<span class="dv-stat-x">×</span></p>
            <p class="dv-stat-ms">{{ w.hyperMs | number:'1.1-1' }}ms vs {{ w.baseMs | number:'1.1-1' }}ms</p>
          </div>
        }
      </div>

    </div>
  `,
  styles: [
    `
    :host { display: block; }

    .dv-bench-card {
      background: #0f0f14;
      border: 1px solid rgba(124, 58, 237, 0.2);
      border-radius: 12px;
      padding: 16px;
    }
    @media (min-width: 640px) {
      .dv-bench-card { padding: 28px; }
    }

    /* ── Hero ─────────────────────────────────── */
    .dv-bench-hero { margin-bottom: 20px; }
    .dv-bench-hero-num {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 36px;
      font-weight: 700;
      color: #a78bfa;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    @media (min-width: 640px) {
      .dv-bench-hero-num { font-size: clamp(40px, 5vw, 56px); }
    }
    .dv-bench-hero-x {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 26px;
      font-weight: 600;
      color: #7c3aed;
    }
    .dv-bench-hero-caption {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #ffffff;
    }
    .dv-bench-hero-dim { color: #9ca3af; font-weight: 400; }
    .dv-bench-hero-sub {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #6b7280;
      letter-spacing: 0.02em;
      margin: 0;
    }

    /* ── Model pills ──────────────────────────── */
    .dv-pill-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .dv-pill {
      background: #1a1a2e;
      border: 1px solid #2d2d4e;
      border-radius: 6px;
      padding: 5px 14px;
      font-size: 13px;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-weight: 500;
      color: #9ca3af;
      cursor: pointer;
      transition: border-color 150ms, color 150ms, background 150ms;
      line-height: 1.5;
    }
    .dv-pill:hover { border-color: rgba(124,58,237,0.45); color: #c4b5fd; }
    .dv-pill.is-active { background: #2d1b6b; border-color: #7c3aed; color: #ffffff; }

    /* ── Chart + Y-axis dimensions (responsive) ── */
    .dv-chart-area { height: 160px; }
    .dv-y-axis     { width: 34px; }
    .dv-x-axis     { padding-left: 34px; }
    @media (min-width: 640px) {
      .dv-chart-area { height: 200px; }
      .dv-y-axis     { width: 44px; }
      .dv-x-axis     { padding-left: 44px; }
    }

    /* ── Y-axis ───────────────────────────────── */
    .dv-y-label {
      position: absolute;
      right: 8px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: #4b5563;
      line-height: 1;
      transform: translateY(50%);
      white-space: nowrap;
    }

    /* ── Grid lines ───────────────────────────── */
    .dv-grid-line {
      position: absolute;
      left: 0; right: 0;
      height: 1px;
      background: rgba(255,255,255,0.05);
    }

    /* ── Bar groups ───────────────────────────── */
    .dv-bar-group {
      position: relative;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 4px;
      cursor: default;
    }
    .dv-bar {
      width: 22px;
      flex: none;
      border-radius: 3px 3px 0 0;
      min-height: 2px;
      transition: height 600ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    @media (min-width: 640px) {
      .dv-bar { width: 30px; }
    }
    .dv-bar--hyper {
      background: linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%);
      box-shadow: 0 0 10px rgba(124,58,237,0.4);
    }
    .dv-bar--base { background: #2d2d4e; }

    /* ── Tooltip ──────────────────────────────── */
    .dv-tooltip {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      background: #16162a;
      border: 1px solid rgba(124,58,237,0.35);
      border-radius: 8px;
      padding: 10px 14px;
      white-space: nowrap;
      z-index: 20;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    }
    .dv-tooltip-title {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 6px;
    }
    .dv-tooltip-row { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; }
    .dv-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
    .dv-dot--hyper { background: #7c3aed; }
    .dv-dot--base  { background: #4b5563; }
    .dv-tooltip-text {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #9ca3af;
    }
    .dv-tooltip-text b { color: #ffffff; font-weight: 500; }

    /* ── X-axis ───────────────────────────────── */
    .dv-x-label {
      flex: 1;
      text-align: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ── Stat cards ───────────────────────────── */
    .dv-stat {
      background: #12121f;
      border: 1px solid #1f1f3a;
      border-radius: 8px;
      padding: 12px 14px;
      transition: border-color 200ms;
    }
    .dv-stat.is-best { border-color: rgba(124,58,237,0.5); }
    .dv-stat-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 0 0 4px;
    }
    .dv-stat-speedup {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #a78bfa;
      line-height: 1.1;
      margin: 0 0 2px;
    }
    .dv-stat-x { font-size: 14px; color: #7c3aed; margin-left: 1px; }
    .dv-stat-ms {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #6b7280;
      margin: 0;
    }
    `,
  ],
})
export class BenchBarsComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  @Input() data: BenchModelData = {};
  @Input() modelOptions: BenchOption[] | null = null;
  @Input() set defaultModel(v: string) { this.model.set(v); }

  /** Kept for Storybook/backwards compat — not used in current chart. */
  @Input() eyebrow: string | null = null;
  @Input() title = '';
  @Input() subtitle: string | null = null;
  @Input() series: BenchSeries[] | Record<string, BenchSeries[]> = [];
  @Input() hardwareOptions: BenchOption[] | null = null;
  @Input() set defaultHardware(_: string) {}

  readonly model              = signal<string>('');
  readonly barsVisible        = signal(false);
  readonly hovered            = signal<string | null>(null);
  readonly displayBestSpeedup = signal(0);

  private animFrameId: number | null = null;
  private initTimer:   ReturnType<typeof setTimeout> | null = null;

  readonly activeWorkloads = computed<BenchWorkload[]>(() => {
    const map = this.data;
    return map[this.model()] ?? Object.values(map)[0] ?? [];
  });

  readonly ceiling = computed<number>(() => {
    const wl = this.activeWorkloads();
    if (!wl.length) return 100;
    const max = Math.max(...wl.map(w => w.baseMs));
    const step = max > 60 ? 20 : 10;
    return Math.ceil(max / step) * step;
  });

  readonly yTicks = computed<number[]>(() => {
    const ceil = this.ceiling();
    const step = ceil > 60 ? 20 : 10;
    const ticks: number[] = [];
    for (let t = 0; t <= ceil; t += step) ticks.push(t);
    return ticks;
  });

  readonly bestSpeedup = computed<number>(() => {
    const wl = this.activeWorkloads();
    if (!wl.length) return 0;
    return Math.max(...wl.map(w => w.baseMs / w.hyperMs));
  });

  readonly displayWorkloads = computed(() => {
    const vis  = this.barsVisible();
    const ceil = this.ceiling();
    return this.activeWorkloads().map(w => ({
      ...w,
      hyperPct: vis ? (w.hyperMs / ceil) * 100 : 0,
      basePct:  vis ? (w.baseMs  / ceil) * 100 : 0,
    }));
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.animFrameId !== null) cancelAnimationFrame(this.animFrameId);
      if (this.initTimer   !== null) clearTimeout(this.initTimer);
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.barsVisible.set(true);
      this.displayBestSpeedup.set(this.bestSpeedup());
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initTimer = setTimeout(() => {
        this.barsVisible.set(true);
        this.animateHero(0, this.bestSpeedup(), 700);
      }, 200);
    }
  }

  speedupOf(w: BenchWorkload): number {
    return w.baseMs / w.hyperMs;
  }

  isBest(w: BenchWorkload): boolean {
    return Math.abs(this.speedupOf(w) - this.bestSpeedup()) < 0.001;
  }

  onModelChange(id: string): void {
    this.model.set(id);
    if (!isPlatformBrowser(this.platformId)) {
      this.displayBestSpeedup.set(this.bestSpeedup());
      return;
    }
    const from = this.displayBestSpeedup();
    const to   = this.bestSpeedup();
    this.barsVisible.set(false);
    setTimeout(() => this.barsVisible.set(true), 50);
    this.animateHero(from, to, 500);
  }

  private animateHero(from: number, to: number, duration: number): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    const t0   = performance.now();
    const tick = (now: number): void => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      this.displayBestSpeedup.set(from + (to - from) * e);
      if (p < 1) {
        this.animFrameId = requestAnimationFrame(tick);
      } else {
        this.displayBestSpeedup.set(to);
        this.animFrameId = null;
      }
    };
    this.animFrameId = requestAnimationFrame(tick);
  }
}
