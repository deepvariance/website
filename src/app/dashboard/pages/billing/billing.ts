import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { LucideAngularModule, Download, Sparkles } from 'lucide-angular';
import { BillingApi } from '../../services/api';
import { BillingSummary } from '../../models';
import { PageHeaderComponent } from '../../components/page-header';
import { KpiCardComponent } from '../../components/kpi-card';
import { DashBadgeComponent } from '../../components/dash-badge';

function usd(v: number): string { return '$' + v.toFixed(2); }
function pct(used: number, total: number): number { return Math.min((used / total) * 100, 100); }

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [TitleCasePipe, LucideAngularModule, PageHeaderComponent, KpiCardComponent, DashBadgeComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="Billing & Cost" subtitle="Current cycle spend, projections, and invoice history" />

      @if (summary()) {
        <!-- KPI row -->
        <div class="billing-kpi-row">
          <app-kpi-card
            label="This cycle"
            [value]="usd(summary()!.currentCycle.totalUsd)"
            [change]="null"
            sub="{{ summary()!.currentCycle.periodStart }} → {{ summary()!.currentCycle.periodEnd }}"
          />
          <app-kpi-card
            label="Projected total"
            [value]="usd(summary()!.currentCycle.projectedUsd)"
            [change]="null"
            sub="end of cycle"
          />
          <app-kpi-card
            label="Cached savings"
            [value]="usd(summary()!.currentCycle.cachedSavingsUsd)"
            [change]="null"
            sub="prefix cache benefit"
          />
          <app-kpi-card
            label="Credits remaining"
            [value]="usd(summary()!.creditUsd)"
            [change]="null"
            sub="applied at billing"
          />
        </div>

        <!-- Plan + rate limits -->
        <div class="billing-main-row">
          <!-- Plan card -->
          <div class="plan-card">
            <div class="plan-card-header">
              <div>
                <p class="section-label">Current plan</p>
                <p class="plan-name">{{ summary()!.plan | titlecase }}</p>
              </div>
              <app-dash-badge variant="violet">Active</app-dash-badge>
            </div>
            <div class="plan-limits">
              <div class="limit-row">
                <div class="limit-info">
                  <span class="limit-label">Requests / min</span>
                  <span class="limit-vals">{{ summary()!.rpmUsed }} / {{ summary()!.rpmLimit }}</span>
                </div>
                <div class="limit-bar-track">
                  <div class="limit-bar-fill" [style.width.%]="pct(summary()!.rpmUsed, summary()!.rpmLimit)"></div>
                </div>
              </div>
              <div class="limit-row">
                <div class="limit-info">
                  <span class="limit-label">Tokens / min</span>
                  <span class="limit-vals">{{ fmtK(summary()!.tpmUsed) }} / {{ fmtK(summary()!.tpmLimit) }}</span>
                </div>
                <div class="limit-bar-track">
                  <div class="limit-bar-fill" [style.width.%]="pct(summary()!.tpmUsed, summary()!.tpmLimit)"></div>
                </div>
              </div>
            </div>
            <p class="next-billing">Next billing: {{ summary()!.nextBillingDate }}</p>
          </div>

          <!-- Per-model cost breakdown -->
          <div class="model-cost-card">
            <div class="model-cost-header"><span class="section-label">Spend by model — this cycle</span></div>
            <div class="model-cost-list">
              @for (m of summary()!.currentCycle.byModel; track m.modelName) {
                <div class="model-cost-row">
                  <span class="model-cost-name">{{ m.modelName }}</span>
                  <div class="model-cost-bar-track">
                    <div class="model-cost-bar" [style.width.%]="pct(m.usd, maxModelCost())"></div>
                  </div>
                  <span class="model-cost-usd">{{ usd(m.usd) }}</span>
                </div>
              }
              <!-- Cached savings row -->
              <div class="model-cost-row model-cost-row--savings">
                <span class="model-cost-name savings-label">
                  <lucide-icon [img]="Sparkles" [size]="11" />
                  Prefix cache savings
                </span>
                <div class="model-cost-bar-track"></div>
                <span class="model-cost-usd savings-val">-{{ usd(summary()!.currentCycle.cachedSavingsUsd) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoices table -->
        <div class="invoices-card">
          <div class="invoices-header"><span class="section-label">Invoice history</span></div>
          <div class="invoices-table-header">
            <span>Period</span>
            <span>Amount</span>
            <span>Status</span>
            <span></span>
          </div>
          @for (inv of summary()!.invoices; track inv.id) {
            <div class="invoices-row">
              <span class="inv-period">{{ inv.period }}</span>
              <span class="inv-amount">{{ usd(inv.amountUsd) }}</span>
              <span>
                <app-dash-badge [variant]="inv.status === 'paid' ? 'success' : inv.status === 'pending' ? 'warning' : 'error'">
                  {{ inv.status }}
                </app-dash-badge>
              </span>
              <a [href]="inv.pdfUrl" class="inv-dl" title="Download PDF">
                <lucide-icon [img]="Download" [size]="13" />
              </a>
            </div>
          }
        </div>
      } @else {
        <div class="billing-skeleton-grid">
          @for (_ of [1,2,3,4]; track $index) { <div class="billing-skeleton"></div> }
        </div>
      }
    </div>
  `,
  styles: [`
    .dash-page { padding: 32px 32px 48px; max-width: 1280px; margin: 0 auto; }
    @media (max-width: 767px) { .dash-page { padding: 20px 16px 48px; } }

    .billing-kpi-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-bottom: 20px; }

    .billing-main-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    @media (max-width: 860px) { .billing-main-row { grid-template-columns: 1fr; } }

    .section-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }

    .plan-card { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); padding: 20px; display: flex; flex-direction: column; gap: 16px; }
    .plan-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .plan-name { font-family: var(--font-display,sans-serif); font-size: 24px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin-top: 4px; }
    .plan-limits { display: flex; flex-direction: column; gap: 12px; }
    .limit-row { display: flex; flex-direction: column; gap: 5px; }
    .limit-info { display: flex; justify-content: space-between; }
    .limit-label { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); }
    .limit-vals { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); }
    .limit-bar-track { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
    .limit-bar-fill { height: 100%; background: linear-gradient(90deg, #525252, #a3a3a3); border-radius: 2px; transition: width 600ms cubic-bezier(0.16,1,0.3,1); }
    .next-billing { font-family: var(--font-body); font-size: 11px; color: var(--text-faint); margin-top: auto; }

    .model-cost-card { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; }
    .model-cost-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .model-cost-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; }
    .model-cost-row { display: grid; grid-template-columns: 1fr 120px 72px; align-items: center; gap: 10px; }
    .model-cost-name { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); }
    .model-cost-bar-track { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
    .model-cost-bar { height: 100%; background: linear-gradient(90deg, #525252, #d4d4d4); border-radius: 2px; transition: width 500ms cubic-bezier(0.16,1,0.3,1); }
    .model-cost-usd { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); text-align: right; }
    .model-cost-row--savings .model-cost-name { display: flex; align-items: center; gap: 5px; color: #86efac; }
    .savings-label { color: #86efac !important; }
    .savings-val { color: #86efac !important; }

    .invoices-card { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); overflow: hidden; }
    .invoices-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .invoices-table-header,
    .invoices-row { display: grid; grid-template-columns: 1fr 120px 100px 44px; align-items: center; gap: 12px; padding: 0 20px; }
    .invoices-table-header { height: 36px; }
    .invoices-table-header span { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-faint); }
    .invoices-row { height: 52px; border-top: 1px solid rgba(255,255,255,0.04); transition: background 150ms; }
    .invoices-row:hover { background: rgba(255,255,255,0.02); }
    .inv-period { font-family: var(--font-body); font-size: 12px; color: var(--dv-blue-dim); }
    .inv-amount { font-family: var(--font-body); font-size: 12px; color: var(--text-secondary); }
    .inv-dl { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.08); color: var(--text-muted); transition: all 150ms; }
    .inv-dl:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.2); }

    .billing-skeleton-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
    .billing-skeleton { height: 100px; border-radius: 12px; background: var(--panel-fill); animation: shimmer 1.5s ease-in-out infinite; }
    @keyframes shimmer { 0%,100% { opacity:0.5 } 50% { opacity:1 } }
  `],
})
export class BillingComponent implements OnInit {
  private billingApi = inject(BillingApi);

  readonly Download = Download;
  readonly Sparkles = Sparkles;
  readonly usd = usd;
  readonly pct = pct;

  readonly summary = signal<BillingSummary | null>(null);

  ngOnInit() {
    this.billingApi.getSummary().subscribe(s => this.summary.set(s));
  }

  fmtK(v: number): string {
    return v >= 1000 ? (v / 1000).toFixed(0) + 'K' : String(v);
  }

  readonly maxModelCost = computed(() => {
    const costs = this.summary()?.currentCycle.byModel.map(m => m.usd) ?? [1];
    return Math.max(...costs, 1);
  });
}
