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
    <div class="dv-bench-bars">

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
              class="bench-view-pill"
              [class.is-active]="model() === opt.id"
              (click)="onModelChange(opt.id)"
            >
              <img [src]="getModelLogo(opt.label)" [alt]="opt.label" class="dv-pill-logo" />
              <span>{{ opt.label }}</span>
            </button>
          }
        </div>
      }

      <!-- Chart: y-axis + bar groups -->
      <div class="flex dv-chart-area dv-chart-overflow">

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
        <div class="relative flex-1 dv-chart-overflow">

          <!-- Grid lines -->
          @for (tick of yTicks(); track tick) {
            <div class="dv-grid-line" [style.bottom]="(tick / ceiling()) * 100 + '%'"></div>
          }

          <!-- Bar groups: stretch so children get a concrete height to compute % against -->
          <div class="absolute inset-0 flex items-stretch dv-bar-row">
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
      <div class="flex mt-2 mb-6 dv-x-axis dv-x-axis--gap">
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
  styleUrl: './bench-bars.scss',
  host: { class: 'dv-bench-bars-host' },
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

  getModelLogo(label: string): string {
    if (label.includes('Llama')) return '/model-logos/meta.svg';
    if (label.includes('Qwen')) return '/model-logos/qwen.svg';
    if (label.includes('Gemma')) return '/model-logos/google.svg';
    if (label.includes('Phi')) return '/model-logos/microsoft.svg';
    if (label.includes('Mistral')) return '/model-logos/mistral.svg';
    if (label.includes('DeepSeek')) return '/model-logos/deepseek.svg';
    if (label.includes('Nemotron')) return '/model-logos/nvidia.svg';
    if (label.includes('GPT')) return '/model-logos/generic.svg';
    return '/model-logos/generic.svg';
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
