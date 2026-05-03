import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';

export interface BenchRow {
  label: string;
  value: number;
  stddev?: number;
  /** Optional override accent color, default = neon (only the first row). */
  accent?: 'neon' | 'muted';
}

export interface BenchSeries {
  /** Group title, e.g. "Prompt, t/s" */
  title: string;
  /** Optional annotation, default "Higher is better". */
  annotation?: string;
  rows: BenchRow[];
  /** If specified, bars are normalized against this value. Otherwise max(rows). */
  ceiling?: number;
}

export interface BenchOption {
  id: string;
  label: string;
}

/**
 * Mirai-style horizontal benchmark bar chart with optional dropdowns.
 */
@Component({
  selector: 'app-bench-bars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel rounded-xl p-6 md:p-8">
      <div
        class="flex flex-wrap items-end justify-between gap-4 mb-6"
      >
        <div>
          @if (eyebrow) {
            <p class="label-caps text-neon mb-1">{{ eyebrow }}</p>
          }
          <h3
            class="font-display text-xl md:text-2xl font-semibold text-on-surface"
          >
            {{ title }}
          </h3>
          @if (subtitle) {
            <p class="text-sm text-on-surface-variant mt-1">
              {{ subtitle }}
            </p>
          }
        </div>

        <div class="flex flex-wrap gap-2">
          @if (modelOptions?.length) {
            <select
              class="glass-input px-3 py-2 text-xs font-mono uppercase tracking-[0.14em]"
              [value]="model()"
              (change)="onModelChange($any($event.target).value)"
            >
              @for (opt of modelOptions ?? []; track opt.id) {
                <option [value]="opt.id">{{ opt.label }}</option>
              }
            </select>
          }
          @if (hardwareOptions?.length) {
            <select
              class="glass-input px-3 py-2 text-xs font-mono uppercase tracking-[0.14em]"
              [value]="hardware()"
              (change)="onHardwareChange($any($event.target).value)"
            >
              @for (opt of hardwareOptions ?? []; track opt.id) {
                <option [value]="opt.id">{{ opt.label }}</option>
              }
            </select>
          }
        </div>
      </div>

      <div class="flex flex-col gap-7">
        @for (series of activeSeries(); track series.title) {
          <div>
            <div class="flex items-center gap-3 mb-3">
              <p class="font-display font-semibold text-on-surface">
                {{ series.title }}
              </p>
              <span class="text-[11px] text-neon font-mono uppercase tracking-[0.16em]">
                {{ series.annotation ?? 'Higher is better' }}
              </span>
            </div>

            @for (row of series.rows; track row.label; let i = $index) {
              <div class="flex items-center gap-4 py-2">
                <span
                  class="w-24 shrink-0 font-mono text-xs"
                  [class.text-white]="(row.accent ?? (i === 0 ? 'neon' : 'muted')) === 'neon'"
                  [class.text-on-surface-variant]="(row.accent ?? (i === 0 ? 'neon' : 'muted')) === 'muted'"
                >
                  {{ row.label }}
                </span>
                <div class="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                  <div
                    class="h-full rounded-full transition-[width] duration-700 ease-out"
                    [style.width.%]="pct(row.value, series)"
                    [style.background]="
                      (row.accent ?? (i === 0 ? 'neon' : 'muted')) === 'neon'
                        ? 'linear-gradient(90deg, #9d6fff 0%, #c4b5fd 100%)'
                        : 'rgba(218,230,213,0.28)'
                    "
                    [style.box-shadow]="
                      (row.accent ?? (i === 0 ? 'neon' : 'muted')) === 'neon'
                        ? '0 0 14px rgba(157,111,255,0.45)'
                        : 'none'
                    "
                  ></div>
                </div>
                <span
                  class="w-32 shrink-0 text-right font-mono text-xs"
                  [class.text-white]="(row.accent ?? (i === 0 ? 'neon' : 'muted')) === 'neon'"
                  [class.text-on-surface-variant]="(row.accent ?? (i === 0 ? 'neon' : 'muted')) === 'muted'"
                >
                  {{ row.value | number: '1.0-3' }}
                  @if (row.stddev !== undefined && row.stddev !== null) {
                    <span class="text-outline">
                      ± {{ row.stddev | number: '1.0-3' }}
                    </span>
                  }
                </span>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class BenchBarsComponent {
  @Input() eyebrow: string | null = null;
  @Input() title = 'Benchmarks';
  @Input() subtitle: string | null = null;
  @Input() modelOptions: BenchOption[] | null = null;
  @Input() hardwareOptions: BenchOption[] | null = null;

  /**
   * Either a flat series array (no dropdown filtering) or a map keyed by
   * `${modelId}:${hardwareId}` returning a series array. The map enables
   * dropdown-driven filtering.
   */
  @Input() series: BenchSeries[] | Record<string, BenchSeries[]> = [];

  readonly model = signal<string>('');
  readonly hardware = signal<string>('');

  @Input()
  set defaultModel(v: string) {
    this.model.set(v);
  }
  @Input()
  set defaultHardware(v: string) {
    this.hardware.set(v);
  }

  readonly activeSeries = computed<BenchSeries[]>(() => {
    if (Array.isArray(this.series)) return this.series;
    const key = `${this.model()}:${this.hardware()}`;
    if (this.series[key]) return this.series[key];
    const fallback = Object.values(this.series)[0];
    return fallback ?? [];
  });

  pct(value: number, series: BenchSeries): number {
    const ceiling =
      series.ceiling ?? Math.max(1, ...series.rows.map((r) => r.value));
    if (ceiling <= 0) return 0;
    return Math.min(100, Math.max(2, (value / ceiling) * 100));
  }

  onModelChange(value: string): void {
    this.model.set(value);
  }
  onHardwareChange(value: string): void {
    this.hardware.set(value);
  }
}
