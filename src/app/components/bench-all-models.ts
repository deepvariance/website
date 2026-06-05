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
          class="bench-view-pill"
          [class.is-active]="metric() === 'ttft'"
          (click)="onMetricChange('ttft')"
        >TTFT reduction</button>
        <button
          class="bench-view-pill"
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
  styleUrl: './bench-all-models.scss',
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
