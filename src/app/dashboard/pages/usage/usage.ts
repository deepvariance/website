import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { UsageApi } from '../../services/api';
import { UsageSummary, UsageMetric, UsagePeriod } from '../../models';
import { PageHeaderComponent } from '../../components/page-header';
import { LineAreaChartComponent, ChartPoint } from '../../components/line-area-chart';
import { KpiCardComponent } from '../../components/kpi-card';

function fmtM(v: number): string {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + 'B';
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
  if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K';
  return String(Math.round(v));
}

function usd(v: number): string { return '$' + v.toFixed(2); }

@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, LineAreaChartComponent, KpiCardComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="Usage & Analytics" subtitle="Requests, tokens, and latency across models and keys">
        <!-- Period toggle -->
        <div class="pill-toggle">
          @for (p of periods; track p) {
            <button class="pill-btn" [class.pill-btn--active]="period() === p" (click)="setPeriod(p)">{{ p }}</button>
          }
        </div>
      </app-dash-page-header>

      <!-- Metric toggle -->
      <div class="metric-tabs">
        @for (m of metrics; track m.key) {
          <button class="metric-tab" [class.metric-tab--active]="metric() === m.key" (click)="metric.set(m.key)">{{ m.label }}</button>
        }
      </div>

      <!-- Time-series chart -->
      <div class="chart-card usage-chart-card">
        <div class="chart-card-body">
          <app-line-area-chart
            [points]="chartPoints()"
            [valueFormatter]="activeFormatter()"
          />
        </div>
      </div>

      <!-- Token in/out split -->
      @if (summary()) {
        <div class="token-split-row">
          <app-kpi-card
            label="Total tokens in"
            [value]="fmtM(summary()!.totalTokensIn)"
            [change]="null"
            sub="this period"
          />
          <app-kpi-card
            label="Total tokens out"
            [value]="fmtM(summary()!.totalTokensOut)"
            [change]="null"
            sub="this period"
          />
          <app-kpi-card
            label="TTFT p50"
            [value]="summary()!.ttftPercentiles.p50 + 'ms'"
            [change]="null"
            sub="time to first token"
          />
          <app-kpi-card
            label="TTFT p99"
            [value]="summary()!.ttftPercentiles.p99 + 'ms'"
            [change]="null"
            sub=""
          />
          <app-kpi-card
            label="TPOT p50"
            [value]="summary()!.tpotPercentiles.p50 + 'ms'"
            [change]="null"
            sub="inter-token latency"
          />
          <app-kpi-card
            label="TPOT p99"
            [value]="summary()!.tpotPercentiles.p99 + 'ms'"
            [change]="null"
            sub=""
          />
        </div>
      }

      <!-- Per-model & per-key breakdown -->
      @if (summary()) {
        <div class="breakdown-row">
          <!-- Per model -->
          <div class="breakdown-card">
            <div class="breakdown-header"><span class="dash-section-label">By model</span></div>
            <div class="breakdown-bar-list">
              @for (m of summary()!.byModel; track m.modelId; let i = $index) {
                <div class="breakdown-bar-row">
                  <span class="breakdown-name">{{ m.modelName }}</span>
                  <div class="bar-track">
                    <div class="bar-fill" [style.width.%]="(m.requests / maxModelReqs()) * 100"></div>
                  </div>
                  <span class="breakdown-val">{{ fmtM(m.requests) }} req</span>
                  <span class="breakdown-cost">{{ usd(m.costUsd) }}</span>
                </div>
              }
            </div>
          </div>
          <!-- Per key -->
          <div class="breakdown-card">
            <div class="breakdown-header"><span class="dash-section-label">By key</span></div>
            <div class="breakdown-bar-list">
              @for (k of summary()!.byKey; track k.keyId) {
                <div class="breakdown-bar-row">
                  <span class="breakdown-name">{{ k.keyName }}</span>
                  <div class="bar-track">
                    <div class="bar-fill" [style.width.%]="(k.requests / maxKeyReqs()) * 100"></div>
                  </div>
                  <span class="breakdown-val">{{ fmtM(k.requests) }} req</span>
                  <span class="breakdown-cost">{{ usd(k.costUsd) }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dash-page { padding: 32px 32px 48px; max-width: 1280px; margin: 0 auto; }
    @media (max-width: 767px) { .dash-page { padding: 20px 16px 48px; } }

    .pill-toggle { display: flex; gap: 4px; background: rgba(255,255,255,0.04); border-radius: 6px; padding: 3px; }
    .pill-btn { padding: 5px 12px; border-radius: 4px; font-family: var(--font-body); font-size: 11px; border: none; background: none; color: var(--text-muted); cursor: pointer; }
    .pill-btn--active { background: rgba(255,255,255,0.08); color: var(--text-primary); }

    .metric-tabs { display: flex; gap: 0; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 16px; }
    .metric-tab { padding: 10px 18px; font-family: var(--font-body); font-size: 11px; font-weight: 500; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); cursor: pointer; transition: all 150ms; margin-bottom: -1px; }
    .metric-tab--active { color: var(--text-primary); border-bottom-color: var(--text-primary); }

    .chart-card { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; margin-bottom: 20px; }
    .usage-chart-card .chart-card-body { padding: 20px; height: 220px; }

    .token-split-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }

    .breakdown-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 768px) { .breakdown-row { grid-template-columns: 1fr; } }
    .breakdown-card { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; }
    .breakdown-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .dash-section-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }
    .breakdown-bar-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; }
    .breakdown-bar-row { display: grid; grid-template-columns: 1fr 120px 70px 56px; align-items: center; gap: 10px; }
    .breakdown-name { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .bar-track { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
    .bar-fill { height: 100%; background: linear-gradient(90deg, #525252 0%, #d4d4d4 100%); border-radius: 2px; transition: width 500ms cubic-bezier(0.16,1,0.3,1); }
    .breakdown-val { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); text-align: right; }
    .breakdown-cost { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); text-align: right; }
  `],
})
export class UsageComponent implements OnInit {
  private usageApi = inject(UsageApi);

  readonly fmtM = fmtM;
  readonly usd = usd;

  readonly periods: UsagePeriod[] = ['7d', '30d', '90d'];
  readonly metrics: { key: UsageMetric; label: string }[] = [
    { key: 'requests', label: 'Requests' },
    { key: 'tokens', label: 'Tokens out' },
    { key: 'ttft', label: 'Avg TTFT (ms)' },
  ];

  readonly period = signal<UsagePeriod>('7d');
  readonly metric = signal<UsageMetric>('requests');
  readonly summary = signal<UsageSummary | null>(null);

  ngOnInit() { this.load(); }

  setPeriod(p: UsagePeriod) {
    this.period.set(p);
    this.load();
  }

  private load() {
    this.usageApi.getSummary(this.period()).subscribe(s => this.summary.set(s));
  }

  readonly chartPoints = computed((): ChartPoint[] => {
    const s = this.summary();
    if (!s) return [];
    const m = this.metric();
    return s.points.map(p => ({
      label: p.date.slice(5),
      value: m === 'requests' ? p.requests : m === 'tokens' ? p.tokensOut : p.ttftMs,
    }));
  });

  activeFormatter() {
    const m = this.metric();
    if (m === 'ttft') return (v: number) => v.toFixed(0) + 'ms';
    return fmtM;
  }

  readonly maxModelReqs = computed(() => Math.max(...(this.summary()?.byModel.map(m => m.requests) ?? [1])));
  readonly maxKeyReqs = computed(() => Math.max(...(this.summary()?.byKey.map(k => k.requests) ?? [1])));
}
