import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ExternalLink, Zap, Clock, Hash } from 'lucide-angular';
import { ModelsApi } from '../../services/api';
import { HostedModel } from '../../models';
import { PageHeaderComponent } from '../../components/page-header';
import { StatusPillComponent } from '../../../components/status-pill';

function fmtCtx(n: number): string {
  return (n / 1000).toFixed(0) + 'K';
}

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, PageHeaderComponent, StatusPillComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="Models" subtitle="Available inference models — pricing, specs, and status" />

      @if (!models().length) {
        <div class="models-grid">
          @for (_ of [1,2,3,4,5]; track $index) { <div class="model-skeleton"></div> }
        </div>
      } @else {
        <div class="models-grid">
          @for (m of models(); track m.id) {
            <div class="model-card">
              <!-- Header -->
              <div class="model-card-header">
                <div class="model-title-row">
                  <h3 class="model-name">{{ m.name }}</h3>
                  <app-status-pill [variant]="m.status">{{ m.status }}</app-status-pill>
                </div>
                <p class="model-family">{{ m.family }} · {{ m.params }}B</p>
              </div>

              <!-- Description -->
              <p class="model-desc">{{ m.description }}</p>

              <!-- Specs grid -->
              <div class="model-specs">
                <div class="spec-item">
                  <span class="spec-label"><lucide-icon [img]="Hash" [size]="10" /> Context</span>
                  <span class="spec-value">{{ fmtCtx(m.contextWindow) }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label"><lucide-icon [img]="Zap" [size]="10" /> Quant</span>
                  <span class="spec-value">{{ m.quantization }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label"><lucide-icon [img]="Clock" [size]="10" /> p50 TTFT</span>
                  <span class="spec-value">{{ m.latencyP50Ms }}ms</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">TP</span>
                  <span class="spec-value">{{ m.tensorParallel }}× {{ m.gpuType }}</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="model-tags">
                @for (tag of m.tags; track tag) {
                  <span class="model-tag">{{ tag }}</span>
                }
              </div>

              <!-- Pricing -->
              <div class="model-pricing">
                <div class="price-col">
                  <span class="price-label">Input</span>
                  <span class="price-value">{{'$'}}{{ m.priceInPer1M.toFixed(2) }}<span class="price-unit">/1M</span></span>
                </div>
                <div class="price-col">
                  <span class="price-label">Cached</span>
                  <span class="price-value">{{'$'}}{{ m.cachedInPer1M.toFixed(2) }}<span class="price-unit">/1M</span></span>
                </div>
                <div class="price-col">
                  <span class="price-label">Output</span>
                  <span class="price-value">{{'$'}}{{ m.priceOutPer1M.toFixed(2) }}<span class="price-unit">/1M</span></span>
                </div>
              </div>

              <!-- Actions -->
              <div class="model-actions">
                @if (m.status !== 'soon') {
                  <a [routerLink]="['/dashboard/playground']" [queryParams]="{ model: m.id }" class="btn-secondary btn--sm model-play-btn">
                    <lucide-icon [img]="ExternalLink" [size]="12" />
                    Open in Playground
                  </a>
                } @else {
                  <button class="btn-ghost btn--sm" disabled>Coming soon</button>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .dash-page { padding: 32px 32px 48px; max-width: 1280px; margin: 0 auto; }
    @media (max-width: 767px) { .dash-page { padding: 20px 16px 48px; } }

    .models-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    }
    .model-skeleton { height: 340px; border-radius: 12px; background: var(--panel-fill); animation: shimmer 1.5s ease-in-out infinite; }
    @keyframes shimmer { 0%,100% { opacity:0.5 } 50% { opacity:1 } }

    .model-card {
      background: var(--panel-fill);
      border-radius: 12px;
      box-shadow: var(--panel-inset);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: background 150ms;
    }
    .model-card:hover { background: rgba(255,255,255,0.048); }

    .model-card-header { display: flex; flex-direction: column; gap: 4px; }
    .model-title-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .model-name { font-family: var(--font-display,sans-serif); font-size: 15px; font-weight: 700; color: var(--text-primary); }
    .model-family { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); }
    .model-desc { font-family: var(--font-body); font-size: 11px; color: var(--text-secondary); line-height: 1.55; }

    .model-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .spec-item { display: flex; flex-direction: column; gap: 2px; background: rgba(255,255,255,0.04); border-radius: 6px; padding: 8px 10px; }
    .spec-label { display: flex; align-items: center; gap: 4px; font-family: var(--font-body); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-faint); }
    .spec-value { font-family: var(--font-body); font-size: 12px; font-weight: 600; color: var(--dv-blue-dim); }

    .model-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .model-tag { font-family: var(--font-body); font-size: 9px; padding: 2px 7px; border-radius: 3px; background: rgba(255,255,255,0.05); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }

    .model-pricing {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06);
    }
    .price-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 10px;
      border-right: 1px solid rgba(255,255,255,0.06);
    }
    .price-col:last-child { border-right: none; }
    .price-label { font-family: var(--font-body); font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); }
    .price-value { font-family: var(--font-display,sans-serif); font-size: 14px; font-weight: 700; color: var(--text-primary); }
    .price-unit { font-family: var(--font-body); font-size: 10px; font-weight: 400; color: var(--text-muted); }

    .model-actions { margin-top: auto; }
    .model-play-btn { display: inline-flex; align-items: center; gap: 6px; }
  `],
})
export class ModelsComponent implements OnInit {
  private modelsApi = inject(ModelsApi);

  readonly ExternalLink = ExternalLink;
  readonly Zap = Zap;
  readonly Clock = Clock;
  readonly Hash = Hash;
  readonly fmtCtx = fmtCtx;

  readonly models = signal<HostedModel[]>([]);

  ngOnInit() {
    this.modelsApi.list().subscribe(m => this.models.set(m));
  }
}
