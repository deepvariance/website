import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { LucideAngularModule, ChevronRight, X } from 'lucide-angular';
import { LogsApi } from '../../services/api';
import { RequestLogEntry, RequestStatus } from '../../models';
import { PageHeaderComponent } from '../../components/page-header';
import { DashBadgeComponent, BadgeVariant } from '../../components/dash-badge';

function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, DashBadgeComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="Request Logs" subtitle="Recent API calls with status, latency, and token usage" />

      <!-- Filter chips -->
      <div class="filter-row">
        @for (f of filters; track f.value) {
          <button class="filter-chip" [class.filter-chip--active]="activeFilter() === f.value" (click)="setFilter(f.value)">
            {{ f.label }}
          </button>
        }
      </div>

      <!-- Table -->
      <div class="logs-card">
        <div class="logs-header">
          <span class="col-id">ID</span>
          <span class="col-model">Model</span>
          <span class="col-tok">Tokens in/out</span>
          <span class="col-ttft">TTFT</span>
          <span class="col-status">Status</span>
          <span class="col-cost">Cost</span>
          <span class="col-ts">Time</span>
          <span class="col-action"></span>
        </div>

        @for (log of filteredLogs(); track log.id) {
          <div class="logs-row" (click)="selectedLog.set(log)" [class.logs-row--selected]="selectedLog()?.id === log.id">
            <span class="col-id log-id">{{ log.id }}</span>
            <span class="col-model log-model">{{ log.modelName }}</span>
            <span class="col-tok log-tok">{{ fmtK(log.tokensIn) }} / {{ fmtK(log.tokensOut) }}</span>
            <span class="col-ttft log-ttft">{{ log.ttftMs ? log.ttftMs + 'ms' : '—' }}</span>
            <span class="col-status">
              <app-dash-badge [variant]="statusVariant(log.status)">{{ log.status }}</app-dash-badge>
            </span>
            <span class="col-cost log-cost">{{'$'}}{{ log.costUsd.toFixed(4) }}</span>
            <span class="col-ts log-ts">{{ relTime(log.timestamp) }}</span>
            <span class="col-action">
              <lucide-icon [img]="ChevronRight" [size]="13" class="row-chevron" />
            </span>
          </div>
        }
      </div>

      <!-- Detail panel -->
      @if (selectedLog()) {
        <div class="detail-overlay" (click)="selectedLog.set(null)">
          <div class="detail-panel" (click)="$event.stopPropagation()">
            <div class="detail-header">
              <span class="detail-title">{{ selectedLog()!.id }}</span>
              <button class="detail-close" (click)="selectedLog.set(null)"><lucide-icon [img]="X" [size]="16" /></button>
            </div>
            <div class="detail-body">
              <div class="detail-grid">
                <div class="detail-item"><span class="dk">Model</span><span class="dv">{{ selectedLog()!.modelName }}</span></div>
                <div class="detail-item"><span class="dk">Key</span><span class="dv">{{ selectedLog()!.keyName }}</span></div>
                <div class="detail-item"><span class="dk">Status</span>
                  <app-dash-badge [variant]="statusVariant(selectedLog()!.status)">{{ selectedLog()!.status }}</app-dash-badge>
                </div>
                <div class="detail-item"><span class="dk">Tokens in</span><span class="dv">{{ selectedLog()!.tokensIn.toLocaleString() }}</span></div>
                <div class="detail-item"><span class="dk">Tokens out</span><span class="dv">{{ selectedLog()!.tokensOut.toLocaleString() }}</span></div>
                <div class="detail-item"><span class="dk">Cached tokens</span><span class="dv">{{ selectedLog()!.cachedTokens.toLocaleString() }}</span></div>
                <div class="detail-item"><span class="dk">TTFT</span><span class="dv">{{ selectedLog()!.ttftMs ? selectedLog()!.ttftMs + 'ms' : '—' }}</span></div>
                <div class="detail-item"><span class="dk">TPOT</span><span class="dv">{{ selectedLog()!.tpotMs ? selectedLog()!.tpotMs + 'ms' : '—' }}</span></div>
                <div class="detail-item"><span class="dk">Total latency</span><span class="dv">{{ selectedLog()!.totalMs.toLocaleString() }}ms</span></div>
                <div class="detail-item"><span class="dk">Cost</span><span class="dv">{{'$'}}{{ selectedLog()!.costUsd.toFixed(6) }}</span></div>
                <div class="detail-item"><span class="dk">Timestamp</span><span class="dv">{{ selectedLog()!.timestamp }}</span></div>
                @if (selectedLog()!.errorCode) {
                  <div class="detail-item"><span class="dk">Error code</span><span class="dv dv--error">{{ selectedLog()!.errorCode }}</span></div>
                }
              </div>
              @if (selectedLog()!.prompt) {
                <div class="detail-section">
                  <span class="detail-section-label">Prompt (truncated)</span>
                  <pre class="detail-pre">{{ selectedLog()!.prompt }}</pre>
                </div>
              }
              @if (selectedLog()!.completion) {
                <div class="detail-section">
                  <span class="detail-section-label">Completion (truncated)</span>
                  <pre class="detail-pre">{{ selectedLog()!.completion }}</pre>
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

    .filter-row { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
    .filter-chip { font-family: var(--font-body); font-size: 11px; padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); background: none; color: var(--text-muted); cursor: pointer; transition: all 150ms; }
    .filter-chip--active { background: rgba(255,255,255,0.08); color: var(--text-primary); border-color: rgba(255,255,255,0.15); }

    .logs-card { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; }
    .logs-header,
    .logs-row {
      display: grid;
      grid-template-columns: 110px 1fr 110px 70px 90px 76px 80px 24px;
      align-items: center;
      gap: 10px;
      padding: 0 16px;
    }
    @media (max-width: 900px) {
      .logs-header, .logs-row {
        grid-template-columns: 90px 1fr 70px 80px 24px;
        gap: 8px;
      }
      .col-ttft, .col-cost { display: none; }
    }
    .logs-header { height: 38px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .logs-header span { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-faint); }
    .logs-row { height: 52px; border-top: 1px solid rgba(255,255,255,0.04); cursor: pointer; transition: background 150ms; }
    .logs-row:hover, .logs-row--selected { background: rgba(255,255,255,0.03); }
    .log-id { font-family: var(--font-body); font-size: 10px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .log-model { font-family: var(--font-body); font-size: 11px; color: var(--dv-blue-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .log-tok { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); }
    .log-ttft { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); }
    .log-cost { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); }
    .log-ts { font-family: var(--font-body); font-size: 10px; color: var(--text-faint); }
    .row-chevron { color: var(--text-faint); }

    /* Detail panel */
    .detail-overlay { position: fixed; inset: 0; z-index: 80; background: rgba(0,0,0,0.5); }
    .detail-panel { position: fixed; right: 0; top: 0; bottom: 0; width: min(480px, 100vw); background: #0a0a0a; border-left: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; overflow: hidden; }
    .detail-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .detail-title { font-family: var(--font-body); font-size: 12px; color: var(--text-secondary); }
    .detail-close { background: none; border: none; color: var(--text-muted); cursor: pointer; }
    .detail-body { overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .detail-item { display: flex; flex-direction: column; gap: 3px; background: rgba(255,255,255,0.04); border-radius: 6px; padding: 10px; }
    .dk { font-family: var(--font-body); font-size: 9px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-faint); }
    .dv { font-family: var(--font-body); font-size: 12px; color: var(--dv-blue-dim); font-weight: 500; }
    .dv--error { color: #fca5a5; }
    .detail-section { display: flex; flex-direction: column; gap: 6px; }
    .detail-section-label { font-family: var(--font-body); font-size: 9px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-faint); }
    .detail-pre { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); background: rgba(255,255,255,0.04); border-radius: 6px; padding: 12px; white-space: pre-wrap; line-height: 1.55; margin: 0; }
  `],
})
export class LogsComponent implements OnInit {
  private logsApi = inject(LogsApi);

  readonly ChevronRight = ChevronRight;
  readonly X = X;

  readonly filters: { label: string; value: RequestStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Success', value: 'success' },
    { label: 'Error', value: 'error' },
    { label: 'Timeout', value: 'timeout' },
  ];

  readonly activeFilter = signal<RequestStatus | 'all'>('all');
  readonly allLogs = signal<RequestLogEntry[]>([]);
  readonly selectedLog = signal<RequestLogEntry | null>(null);

  readonly filteredLogs = computed(() => {
    const f = this.activeFilter();
    const logs = this.allLogs();
    if (f === 'all') return logs;
    return logs.filter(l => l.status === f);
  });

  ngOnInit() {
    this.logsApi.list().subscribe(l => this.allLogs.set(l));
  }

  setFilter(f: RequestStatus | 'all') {
    this.activeFilter.set(f);
    this.selectedLog.set(null);
  }

  fmtK(v: number): string {
    return v >= 1000 ? (v / 1000).toFixed(1) + 'K' : String(v);
  }

  statusVariant(s: RequestStatus): BadgeVariant {
    if (s === 'success') return 'success';
    if (s === 'error') return 'error';
    return 'warning';
  }

  relTime = relTime;
}
