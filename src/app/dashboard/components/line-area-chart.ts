import { Component, Input, computed, signal, OnChanges, SimpleChanges } from '@angular/core';

export interface ChartPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-line-area-chart',
  standalone: true,
  template: `
    <div class="lac-wrap">
      <div class="lac-y-axis">
        @for (t of yTicks(); track t.label) {
          <span class="lac-y-label" [style.bottom.%]="t.pct">{{ t.label }}</span>
        }
      </div>
      <div class="lac-svg-wrap">
        <svg [attr.viewBox]="'0 0 ' + W + ' ' + H" preserveAspectRatio="none" class="lac-svg" aria-hidden="true">
          <defs>
            <linearGradient [id]="gradId" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#a3a3a3" stop-opacity="0.22" />
              <stop offset="100%" stop-color="#a3a3a3" stop-opacity="0" />
            </linearGradient>
          </defs>
          @for (t of yTicks(); track t.label) {
            <line [attr.x1]="0" [attr.x2]="W" [attr.y1]="toY(t.rawValue)" [attr.y2]="toY(t.rawValue)" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
          }
          @if (areaPath()) {
            <path [attr.d]="areaPath()" [attr.fill]="'url(#' + gradId + ')'" />
          }
          @if (linePath()) {
            <polyline [attr.points]="linePath()" fill="none" stroke="#a3a3a3" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
          }
          @for (pt of svgPoints(); track pt.label) {
            <circle [attr.cx]="pt.x" [attr.cy]="pt.y" r="3" fill="#fff" stroke="#000" stroke-width="1.5" class="lac-dot">
              <title>{{ pt.label }}: {{ valueFormatter(pt.rawValue) }}</title>
            </circle>
          }
        </svg>
      </div>
      <div class="lac-x-axis">
        @for (pt of svgPoints(); track pt.label; let i = $index; let first = $first; let last = $last) {
          @if (first || last || i === 3) {
            <span class="lac-x-label" [style.left.%]="(pt.x / W) * 100">{{ pt.label }}</span>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .lac-wrap { position: relative; padding-left: 44px; padding-bottom: 24px; height: 100%; min-height: 120px; }
    .lac-y-axis { position: absolute; left: 0; top: 0; bottom: 24px; width: 40px; }
    .lac-y-label { position: absolute; right: 4px; transform: translateY(50%); font-family: var(--font-body); font-size: 9px; color: var(--text-faint); white-space: nowrap; }
    .lac-svg-wrap { height: calc(100% - 24px); min-height: 100px; width: 100%; }
    .lac-svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .lac-dot { opacity: 0; transition: opacity 150ms; }
    .lac-svg:hover .lac-dot { opacity: 1; }
    .lac-x-axis { position: absolute; bottom: 0; left: 44px; right: 0; height: 20px; }
    .lac-x-label { position: absolute; transform: translateX(-50%); font-family: var(--font-body); font-size: 9px; color: var(--text-faint); white-space: nowrap; }
  `],
})
export class LineAreaChartComponent implements OnChanges {
  @Input({ required: true }) points: ChartPoint[] = [];
  @Input() valueFormatter: (v: number) => string = (v) => String(Math.round(v));
  @Input() tickCount = 4;

  readonly W = 400;
  readonly H = 140;
  readonly PADDING = 12;
  readonly gradId = `lac-${Math.random().toString(36).slice(2, 7)}`;

  private readonly _pts = signal<ChartPoint[]>([]);

  ngOnChanges(c: SimpleChanges) {
    if (c['points']) this._pts.set(this.points ?? []);
  }

  readonly maxValue = computed(() => Math.max(...this._pts().map(p => p.value), 1));

  toY(value: number): number {
    const frac = value / this.maxValue();
    return this.H - this.PADDING - frac * (this.H - this.PADDING * 2);
  }

  toX(i: number, total: number): number {
    return total <= 1 ? this.W / 2 : (i / (total - 1)) * this.W;
  }

  readonly svgPoints = computed(() =>
    this._pts().map((p, i) => ({
      x: this.toX(i, this._pts().length),
      y: this.toY(p.value),
      rawValue: p.value,
      label: p.label,
    }))
  );

  readonly linePath = computed(() => {
    const pts = this.svgPoints();
    return pts.length < 2 ? '' :
      pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  });

  readonly areaPath = computed(() => {
    const pts = this.svgPoints();
    if (pts.length < 2) return '';
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    return `${line} L${pts[pts.length - 1].x.toFixed(1)},${this.H} L0,${this.H} Z`;
  });

  readonly yTicks = computed(() => {
    const max = this.maxValue();
    return Array.from({ length: this.tickCount + 1 }, (_, i) => {
      const raw = (max / this.tickCount) * i;
      return { label: this.valueFormatter(raw), pct: (raw / max) * 100, rawValue: raw };
    });
  });
}
