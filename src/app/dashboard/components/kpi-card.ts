import { Component, Input, OnChanges, SimpleChanges, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, TrendingUp, TrendingDown, Minus } from 'lucide-angular';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="kpi-card">
      <div class="kpi-header">
        <span class="kpi-label">{{ label }}</span>
        @if (change !== null) {
          <span class="kpi-badge" [class]="changeCls">
            <lucide-icon [img]="changeIcon" [size]="10" />
            {{ changeAbs }}%
          </span>
        }
      </div>
      <div class="kpi-value">{{ displayed }}</div>
      @if (sub) { <div class="kpi-sub">{{ sub }}</div> }
    </div>
  `,
  styles: [`
    .kpi-card { background: var(--panel-fill); border-radius: 12px; padding: 20px; box-shadow: var(--panel-inset); display: flex; flex-direction: column; gap: 6px; }
    .kpi-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .kpi-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }
    .kpi-badge { display: inline-flex; align-items: center; gap: 3px; font-family: var(--font-body); font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; }
    .kpi-badge--up { background: rgba(34,197,94,0.1); color: #86efac; }
    .kpi-badge--down { background: rgba(239,68,68,0.1); color: #fca5a5; }
    .kpi-badge--neutral { background: rgba(255,255,255,0.05); color: var(--text-muted); }
    .kpi-value { font-family: var(--font-display,sans-serif); font-size: 28px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; line-height: 1; }
    .kpi-sub { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); margin-top: 2px; }
  `],
})
export class KpiCardComponent implements OnChanges {
  private platformId = inject(PLATFORM_ID);

  @Input({ required: true }) label = '';
  @Input({ required: true }) value = '';
  @Input() change: number | null = null;
  @Input() positiveIsGood = true;
  @Input() sub = '';

  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly Minus = Minus;

  displayed = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.displayed = this.value;
    }
  }

  get changeAbs(): string { return Math.abs(this.change ?? 0).toFixed(1); }

  get changeCls(): string {
    if (this.change === null || this.change === 0) return 'kpi-badge kpi-badge--neutral';
    const isGood = this.positiveIsGood ? this.change > 0 : this.change < 0;
    return isGood ? 'kpi-badge kpi-badge--up' : 'kpi-badge kpi-badge--down';
  }

  get changeIcon() {
    if (this.change === null || this.change === 0) return this.Minus;
    return this.change > 0 ? this.TrendingUp : this.TrendingDown;
  }
}
