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
        @for (entry of displayedModels(); track entry.label; let i = $index) {
          <div class="dv-row" [class.is-top3]="i < 3">
            <div class="dv-row-rank" [class.is-top3]="i < 3">{{ getRank(entry) }}</div>
            <div class="dv-row-label">
              <img [src]="getModelLogo(entry.label)" [alt]="entry.label" class="dv-model-logo" />
              <span>{{ entry.label }}</span>
            </div>
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

      <!-- Expand/Collapse button -->
      @if (sortedModels().length > 7) {
        <button class="dv-expand-btn" (click)="expanded.set(!expanded())">
          @if (expanded()) {
            <span>Show less</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 10L8 6L4 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          } @else {
            <span>Show all {{ sortedModels().length }} models</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          }
        </button>
      }

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
    .dv-rows { display: flex; flex-direction: column; gap: 8px; }

    .dv-row {
      display: grid;
      grid-template-columns: 28px 110px minmax(120px, 1fr) 56px;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 8px;
      background: rgba(255,255,255,0.02);
      border: 1px solid transparent;
      transition: all 200ms ease;
    }
    @media (min-width: 640px) {
      .dv-row {
        grid-template-columns: 32px 150px minmax(160px, 1fr) 68px;
        gap: 14px;
        padding: 10px 12px;
      }
    }
    .dv-row:hover {
      background: rgba(124,58,237,0.05);
      border-color: rgba(124,58,237,0.15);
    }
    .dv-row.is-top3 {
      background: rgba(124,58,237,0.08);
      border-color: rgba(124,58,237,0.25);
    }
    .dv-row.is-top3:hover {
      background: rgba(124,58,237,0.12);
      border-color: rgba(124,58,237,0.35);
    }

    .dv-row-rank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px;
      line-height: 1;
    }
    @media (min-width: 640px) {
      .dv-row-rank {
        width: 28px;
        height: 28px;
        font-size: 12px;
      }
    }
    .dv-row-rank.is-top3 {
      background: linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(167,139,250,0.15) 100%);
      border-color: rgba(124,58,237,0.4);
      color: #c4b5fd;
      font-weight: 700;
    }

    .dv-row-label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #9ca3af;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.4;
      transition: color 150ms;
    }
    @media (min-width: 640px) {
      .dv-row-label { font-size: 12px; gap: 10px; }
    }
    .dv-row:hover .dv-row-label {
      color: #d1d5db;
    }
    .dv-row.is-top3 .dv-row-label {
      color: #c4b5fd;
      font-weight: 600;
    }

    .dv-model-logo {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      object-fit: contain;
      opacity: 0.9;
      transition: opacity 150ms;
    }
    @media (min-width: 640px) {
      .dv-model-logo { width: 22px; height: 22px; }
    }
    .dv-row:hover .dv-model-logo {
      opacity: 1;
    }

    /* ── Bars ──────────────────────────────────── */
    .dv-bar-wrap {
      height: 10px;
      background: rgba(255,255,255,0.04);
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06);
    }
    @media (min-width: 640px) {
      .dv-bar-wrap { height: 12px; border-radius: 6px; }
    }

    .dv-bar-fill {
      height: 100%;
      border-radius: 4px;
      width: 0%;
      background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
      box-shadow: 0 0 12px rgba(124,58,237,0.3);
      transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms;
      position: relative;
    }
    .dv-bar-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
      border-radius: 4px 4px 0 0;
    }
    .dv-row:hover .dv-bar-fill {
      box-shadow: 0 0 16px rgba(124,58,237,0.5);
    }
    .dv-bar-fill.is-throughput {
      background: linear-gradient(90deg, #059669 0%, #34d399 100%);
      box-shadow: 0 0 12px rgba(5,150,105,0.3);
    }
    .dv-row:hover .dv-bar-fill.is-throughput {
      box-shadow: 0 0 16px rgba(5,150,105,0.5);
    }

    /* ── Value ─────────────────────────────────── */
    .dv-row-value {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #e5e7eb;
      text-align: right;
      white-space: nowrap;
      transition: color 150ms;
    }
    @media (min-width: 640px) {
      .dv-row-value { font-size: 16px; }
    }
    .dv-row:hover .dv-row-value {
      color: #ffffff;
    }
    .dv-row.is-top3 .dv-row-value {
      color: #c4b5fd;
      font-weight: 800;
    }

    /* ── Expand button ────────────────────────── */
    .dv-expand-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      margin-top: 10px;
      padding: 10px 16px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(124,58,237,0.2);
      border-radius: 8px;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #9ca3af;
      cursor: pointer;
      transition: all 200ms ease;
    }
    .dv-expand-btn:hover {
      background: rgba(124,58,237,0.08);
      border-color: rgba(124,58,237,0.35);
      color: #c4b5fd;
    }
    .dv-expand-btn svg {
      transition: transform 200ms ease;
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
  readonly expanded = signal(false);

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

  readonly displayedModels = computed<AllModelEntry[]>(() => {
    const all = this.sortedModels();
    return this.expanded() ? all : all.slice(0, 7);
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

  getRank(entry: AllModelEntry): number {
    return this.sortedModels().findIndex(e => e.label === entry.label) + 1;
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
