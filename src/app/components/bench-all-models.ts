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

export interface AllModelEntry {
  label: string;
  ttftPct: number;
  throughputX: number;
  hyperMs: number;
  baseMs: number;
  hyperTps: number;
  baseTps: number;
}

type Metric = 'ttft' | 'throughput';

@Component({
  selector: 'app-bench-all-models',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dv-all-card">

      <!-- Metric toggle -->
      <div class="flex gap-2 mb-6">
        <button
          class="dv-pill"
          [class.is-active]="metric() === 'ttft'"
          (click)="onMetricChange('ttft')"
        >TTFT reduction</button>
        <button
          class="dv-pill"
          [class.is-active]="metric() === 'throughput'"
          (click)="onMetricChange('throughput')"
        >Throughput gain</button>
      </div>

      <!-- Chart: y-axis + vertical bars -->
      <div class="flex dv-chart-area">

        <!-- Y-axis labels -->
        <div class="dv-y-axis relative shrink-0">
          @for (tick of yTicks(); track tick) {
            <span
              class="dv-y-label"
              [style.bottom]="(tick / ceiling()) * 100 + '%'"
            >{{ tick }}{{ metric() === 'ttft' ? '%' : '×' }}</span>
          }
        </div>

        <!-- Chart body -->
        <div class="relative flex-1">

          <!-- Grid lines -->
          @for (tick of yTicks(); track tick) {
            <div class="dv-grid-line" [style.bottom]="(tick / ceiling()) * 100 + '%'"></div>
          }

          <!-- Vertical bars -->
          <div class="absolute inset-0 flex items-stretch gap-[2px] sm:gap-1">
            @for (entry of sortedModels(); track entry.label) {
              <div
                class="dv-bar-col"
                (mouseenter)="hovered.set(entry.label)"
                (mouseleave)="hovered.set(null)"
              >
                @if (hovered() === entry.label) {
                  <div class="dv-tooltip">
                    <p class="dv-tooltip-title">{{ entry.label }}</p>
                    <p class="dv-tooltip-value">{{ valueLabel(entry) }}</p>
                  </div>
                }
                <div
                  class="dv-bar"
                  [class.is-throughput]="metric() === 'throughput'"
                  [style.height.%]="barPct(entry)"
                ></div>
              </div>
            }
          </div>

        </div>
      </div>

      <!-- X-axis labels (rank numbers) -->
      <div class="flex mt-2 gap-[2px] sm:gap-1 dv-x-axis items-start justify-center">
        @for (entry of sortedModels(); track entry.label; let i = $index) {
          <div class="dv-x-label">{{ i + 1 }}</div>
        }
      </div>

      <!-- Footer note -->
      <p class="dv-note mt-6">
        {{ metric() === 'ttft'
          ? 'TTFT reduction vs baseline. Higher is better. Averaged across 4 RAG workload patterns.'
          : 'Throughput multiplier vs baseline. Higher is better. Tokens per second, same hardware.'
        }}
      </p>

    </div>
  `,
  styles: [
    `
    :host { display: block; }

    .dv-all-card {
      background: #0f0f14;
      border: 1px solid rgba(124, 58, 237, 0.2);
      border-radius: 12px;
      padding: 16px;
    }
    @media (min-width: 640px) {
      .dv-all-card { padding: 28px; }
    }

    /* ── Pills ─────────────────────────────────── */
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
    .dv-chart-area { height: 180px; overflow: visible; }
    .dv-y-axis     { width: 34px; }
    .dv-x-axis     { padding-left: 34px; }
    @media (min-width: 640px) {
      .dv-chart-area { height: 220px; }
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

    /* ── Bar columns ──────────────────────────── */
    .dv-bar-col {
      position: relative;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      cursor: default;
    }

    .dv-bar {
      width: 100%;
      max-width: 28px;
      border-radius: 3px 3px 0 0;
      min-height: 2px;
      height: 0%;
      transition: height 600ms cubic-bezier(0.16, 1, 0.3, 1);
      background: linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%);
      box-shadow: 0 0 8px rgba(124,58,237,0.3);
    }
    @media (min-width: 640px) {
      .dv-bar { max-width: 36px; }
    }

    .dv-bar.is-throughput {
      background: linear-gradient(180deg, #34d399 0%, #059669 100%);
      box-shadow: 0 0 8px rgba(5,150,105,0.3);
    }

    /* ── Tooltip ──────────────────────────────── */
    .dv-tooltip {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      background: #16162a;
      border: 1px solid rgba(124,58,237,0.35);
      border-radius: 8px;
      padding: 8px 12px;
      white-space: nowrap;
      z-index: 20;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    }
    .dv-tooltip-title {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      color: #9ca3af;
      margin: 0 0 3px;
    }
    .dv-tooltip-value {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }

    /* ── X-axis (rank numbers) ───────────────── */
    .dv-x-label {
      flex: 1;
      text-align: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9px;
      color: #4b5563;
      font-weight: 500;
      line-height: 1;
    }
    @media (min-width: 640px) {
      .dv-x-label { font-size: 10px; }
    }

    /* ── Note ──────────────────────────────────── */
    .dv-note {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: #4b5563;
      letter-spacing: 0.04em;
      margin: 0;
    }
    `,
  ],
})
export class BenchAllModelsComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  @Input() models: AllModelEntry[] = [];

  readonly metric = signal<Metric>('ttft');
  readonly barsVisible = signal(false);
  readonly hovered = signal<string | null>(null);

  private initTimer: ReturnType<typeof setTimeout> | null = null;
  private switchTimer: ReturnType<typeof setTimeout> | null = null;

  readonly sortedModels = computed<AllModelEntry[]>(() => {
    const m = this.metric();
    return [...this.models].sort((a, b) => {
      const va = m === 'ttft' ? a.ttftPct : a.throughputX;
      const vb = m === 'ttft' ? b.ttftPct : b.throughputX;
      return vb - va;
    });
  });

  readonly ceiling = computed<number>(() => {
    if (!this.models.length) return 100;
    const m = this.metric();
    const max = Math.max(...this.models.map(e => m === 'ttft' ? e.ttftPct : e.throughputX));
    if (m === 'ttft') {
      const step = 20;
      return Math.ceil(max / step) * step;
    } else {
      const step = 1;
      return Math.ceil(max / step) * step;
    }
  });

  readonly yTicks = computed<number[]>(() => {
    const ceil = this.ceiling();
    const m = this.metric();
    const step = m === 'ttft' ? 20 : 1;
    const ticks: number[] = [];
    for (let t = 0; t <= ceil; t += step) ticks.push(t);
    return ticks;
  });

  barPct(entry: AllModelEntry): number {
    if (!this.barsVisible()) return 0;
    const val = this.metric() === 'ttft' ? entry.ttftPct : entry.throughputX;
    return (val / this.ceiling()) * 100;
  }

  valueLabel(entry: AllModelEntry): string {
    if (this.metric() === 'ttft') return entry.ttftPct.toFixed(0) + '%';
    return entry.throughputX.toFixed(2) + '×';
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.initTimer !== null) clearTimeout(this.initTimer);
      if (this.switchTimer !== null) clearTimeout(this.switchTimer);
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.barsVisible.set(true);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initTimer = setTimeout(() => this.barsVisible.set(true), 200);
    }
  }

  onMetricChange(m: Metric): void {
    this.metric.set(m);
    if (isPlatformBrowser(this.platformId)) {
      this.barsVisible.set(false);
      this.switchTimer = setTimeout(() => this.barsVisible.set(true), 50);
    }
  }
}
