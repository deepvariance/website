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
      <div class="flex gap-2 mb-7">
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

      <!-- Ranked bars -->
      <div class="dv-rows">
        @for (entry of sortedModels(); track entry.label; let i = $index) {
          <div class="dv-row">
            <span class="dv-row-rank">{{ i + 1 }}</span>
            <span class="dv-row-label">{{ entry.label }}</span>
            <div class="dv-bar-wrap">
              <div
                class="dv-bar-fill"
                [class.is-throughput]="metric() === 'throughput'"
                [style.width.%]="barPct(entry)"
              ></div>
            </div>
            <span class="dv-row-value">{{ valueLabel(entry) }}</span>
          </div>
        }
      </div>

      <!-- Footer note -->
      <p class="dv-note mt-5">
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

    /* ── Row layout ────────────────────────────── */
    .dv-rows { display: flex; flex-direction: column; gap: 9px; }

    .dv-row {
      display: grid;
      grid-template-columns: 18px 88px 1fr 48px;
      align-items: center;
      gap: 8px;
    }
    @media (min-width: 640px) {
      .dv-row {
        grid-template-columns: 22px 130px 1fr 60px;
        gap: 12px;
      }
    }

    .dv-row-rank {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px;
      color: #4b5563;
      text-align: right;
      line-height: 1;
    }

    .dv-row-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #9ca3af;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.4;
    }

    /* ── Bars ──────────────────────────────────── */
    .dv-bar-wrap {
      height: 8px;
      background: rgba(255,255,255,0.05);
      border-radius: 4px;
      overflow: hidden;
    }

    .dv-bar-fill {
      height: 100%;
      border-radius: 4px;
      width: 0%;
      background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
      transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .dv-bar-fill.is-throughput {
      background: linear-gradient(90deg, #059669 0%, #34d399 100%);
    }

    /* ── Value ─────────────────────────────────── */
    .dv-row-value {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      text-align: right;
      white-space: nowrap;
    }
    @media (min-width: 640px) {
      .dv-row-value { font-size: 14px; }
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

  readonly maxValue = computed<number>(() => {
    if (!this.models.length) return 1;
    const m = this.metric();
    return Math.max(...this.models.map(e => m === 'ttft' ? e.ttftPct : e.throughputX));
  });

  barPct(entry: AllModelEntry): number {
    if (!this.barsVisible()) return 0;
    const val = this.metric() === 'ttft' ? entry.ttftPct : entry.throughputX;
    return (val / this.maxValue()) * 100;
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
