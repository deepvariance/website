import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { LucideAngularModule, Activity, AlertCircle, Zap } from 'lucide-angular';
import { KpiCardComponent } from '../../components/kpi-card';
import { LineAreaChartComponent, ChartPoint } from '../../components/line-area-chart';
import { DashBadgeComponent } from '../../components/dash-badge';
import { PageHeaderComponent } from '../../components/page-header';
import { OverviewApi, UsageApi } from '../../services/api';
import { OverviewStats, ModelHealth, ActivityEvent, UsageSummary } from '../../models';

function fmtK(v: number): string {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
  if (v >= 1_000) return (v / 1_000).toFixed(1) + 'K';
  return String(v);
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [LucideAngularModule, KpiCardComponent, LineAreaChartComponent, DashBadgeComponent, PageHeaderComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="Overview" subtitle="Platform health at a glance" />

      <!-- KPI grid -->
      @if (stats()) {
        <div class="kpi-grid">
          <app-kpi-card
            label="Requests today"
            [value]="fmtK(stats()!.requestsToday)"
            [change]="stats()!.requestsChange"
            [positiveIsGood]="true"
            sub="vs. yesterday"
          />
          <app-kpi-card
            label="Tokens in"
            [value]="fmtK(stats()!.tokensInToday)"
            [change]="null"
            sub="today"
          />
          <app-kpi-card
            label="Tokens out"
            [value]="fmtK(stats()!.tokensOutToday)"
            [change]="null"
            sub="today"
          />
          <app-kpi-card
            label="Avg TTFT"
            [value]="stats()!.avgTtftMs + 'ms'"
            [change]="stats()!.ttftChange"
            [positiveIsGood]="false"
            sub="p50, all models"
          />
          <app-kpi-card
            label="Error rate"
            [value]="stats()!.errorRate + '%'"
            [change]="stats()!.errorRateChange"
            [positiveIsGood]="false"
            sub="last 24h"
          />
          <app-kpi-card
            label="Spend today"
            [value]="'$' + stats()!.spendToday.toFixed(2)"
            [change]="stats()!.spendChange"
            [positiveIsGood]="false"
            sub="USD"
          />
        </div>
      } @else {
        <div class="kpi-grid">
          @for (_ of [1,2,3,4,5,6]; track $index) {
            <div class="kpi-skeleton"></div>
          }
        </div>
      }

      <!-- Charts + sidebar row -->
      <div class="overview-main-row">
        <!-- Requests chart -->
        <div class="chart-card">
          <div class="chart-card-header">
            <span class="dash-section-label">Requests — last 7 days</span>
          </div>
          <div class="chart-card-body">
            <app-line-area-chart
              [points]="requestPoints()"
              [valueFormatter]="fmtK"
            />
          </div>
        </div>

        <!-- Model health -->
        <div class="overview-side">
          <div class="side-card">
            <div class="side-card-header">
              <span class="dash-section-label">Model health</span>
            </div>
            @if (health().length) {
              <div class="health-list">
                @for (m of health(); track m.modelId) {
                  <div class="health-row">
                    <div class="health-info">
                      <span class="health-name">{{ m.modelName }}</span>
                      <span class="health-meta">{{ m.latencyMs }}ms · {{ m.errorRate }}% err</span>
                    </div>
                    <div class="health-status-wrap">
                      <app-dash-badge [variant]="healthVariant(m)">{{ m.status }}</app-dash-badge>
                      <span class="health-replicas">{{ m.replicaCount }}×</span>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div class="side-skeleton-list">
                @for (_ of [1,2,3,4]; track $index) { <div class="side-skeleton"></div> }
              </div>
            }
          </div>

          <!-- Activity feed -->
          <div class="side-card">
            <div class="side-card-header">
              <span class="dash-section-label">Recent activity</span>
            </div>
            @if (activity().length) {
              <div class="activity-list">
                @for (event of activity(); track event.id) {
                  <div class="activity-row">
                    <lucide-icon [img]="activityIcon(event.type)" [size]="13" class="activity-icon" />
                    <div class="activity-body">
                      <p class="activity-msg">{{ event.message }}</p>
                      <p class="activity-time">{{ relativeTime(event.timestamp) }}</p>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div class="side-skeleton-list">
                @for (_ of [1,2,3]; track $index) { <div class="side-skeleton"></div> }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dash-page { padding: 32px 32px 48px; max-width: 1280px; margin: 0 auto; }
    @media (max-width: 767px) { .dash-page { padding: 20px 16px 48px; } }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }
    .kpi-skeleton {
      height: 92px;
      border-radius: 12px;
      background: var(--panel-fill);
      animation: shimmer 1.5s ease-in-out infinite;
    }

    .overview-main-row {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 1024px) { .overview-main-row { grid-template-columns: 1fr; } }

    .chart-card {
      background: var(--panel-fill);
      border-radius: 12px;
      box-shadow: var(--panel-inset);
      overflow: hidden;
    }
    .chart-card-header {
      padding: 16px 20px 12px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .chart-card-body { padding: 16px 20px; height: 200px; }

    .overview-side { display: flex; flex-direction: column; gap: 16px; }
    .side-card {
      background: var(--panel-fill);
      border-radius: 12px;
      box-shadow: var(--panel-inset);
      overflow: hidden;
    }
    .side-card-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }

    .dash-section-label {
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .health-list { padding: 8px 0; }
    .health-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .health-row:last-child { border-bottom: none; }
    .health-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .health-name { font-family: var(--font-body); font-size: 11px; color: var(--dv-blue-dim); font-weight: 500; }
    .health-meta { font-family: var(--font-body); font-size: 10px; color: var(--text-muted); }
    .health-status-wrap { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .health-replicas { font-family: var(--font-body); font-size: 10px; color: var(--text-faint); }

    .activity-list { padding: 8px 0; }
    .activity-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .activity-row:last-child { border-bottom: none; }
    .activity-icon { color: var(--text-muted); margin-top: 1px; flex-shrink: 0; }
    .activity-body { min-width: 0; }
    .activity-msg { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); line-height: 1.4; }
    .activity-time { font-family: var(--font-body); font-size: 10px; color: var(--text-faint); margin-top: 2px; }

    .side-skeleton-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
    .side-skeleton { height: 36px; border-radius: 6px; background: rgba(255,255,255,0.04); animation: shimmer 1.5s ease-in-out infinite; }

    @keyframes shimmer { 0%,100% { opacity:0.5 } 50% { opacity:1 } }
  `],
})
export class OverviewComponent implements OnInit {
  private api = inject(OverviewApi);
  private usageApi = inject(UsageApi);

  readonly Activity = Activity;
  readonly AlertCircle = AlertCircle;
  readonly Zap = Zap;
  readonly fmtK = fmtK;

  readonly stats = signal<OverviewStats | null>(null);
  readonly health = signal<ModelHealth[]>([]);
  readonly activity = signal<ActivityEvent[]>([]);
  readonly usage = signal<UsageSummary | null>(null);

  readonly requestPoints = computed((): ChartPoint[] => {
    const u = this.usage();
    if (!u) return [];
    return u.points.map(p => ({ label: p.date.slice(5), value: p.requests }));
  });

  ngOnInit() {
    this.api.getStats().subscribe(s => this.stats.set(s));
    this.api.getModelHealth().subscribe(h => this.health.set(h));
    this.api.getActivity().subscribe(a => this.activity.set(a));
    this.usageApi.getSummary('7d').subscribe(u => this.usage.set(u));
  }

  healthVariant(m: ModelHealth): 'success' | 'warning' | 'error' {
    if (m.status === 'online') return 'success';
    if (m.status === 'degraded') return 'warning';
    return 'error';
  }

  activityIcon(type: string) {
    if (type === 'billing' || type === 'key_created' || type === 'key_revoked') return this.AlertCircle;
    if (type === 'model_status') return this.Zap;
    return this.Activity;
  }

  relativeTime(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }
}
