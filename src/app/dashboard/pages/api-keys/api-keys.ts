import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Trash2, Copy, Check, Eye, EyeOff, X } from 'lucide-angular';
import { ApiKeysApi } from '../../services/api';
import { ApiKey, KeyScope } from '../../models';
import { PageHeaderComponent } from '../../components/page-header';
import { DashBadgeComponent } from '../../components/dash-badge';
import { CopyFieldComponent } from '../../components/copy-field';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

function relTime(iso: string | null): string {
  if (!iso) return 'Never';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

@Component({
  selector: 'app-api-keys',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, PageHeaderComponent, DashBadgeComponent, CopyFieldComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="API Keys" subtitle="Manage access credentials for the inference API">
        <button class="btn-primary btn--sm" (click)="openCreateModal()">
          <lucide-icon [img]="Plus" [size]="13" />
          New key
        </button>
      </app-dash-page-header>

      <!-- Keys table -->
      <div class="keys-table-card">
        <div class="keys-table-header">
          <span class="col-name">Name</span>
          <span class="col-key">Key</span>
          <span class="col-scopes">Scopes</span>
          <span class="col-last">Last used</span>
          <span class="col-created">Created</span>
          <span class="col-status">Status</span>
          <span class="col-actions"></span>
        </div>
        @for (key of keys(); track key.id) {
          <div class="keys-table-row" [class.keys-table-row--revoked]="key.status === 'revoked'">
            <span class="col-name key-name">{{ key.name }}</span>
            <span class="col-key">
              <code class="key-masked">{{ key.maskedKey }}</code>
            </span>
            <span class="col-scopes">
              @for (s of key.scopes; track s) {
                <span class="scope-chip">{{ s }}</span>
              }
            </span>
            <span class="col-last key-meta">{{ relTime(key.lastUsedAt) }}</span>
            <span class="col-created key-meta">{{ fmtDate(key.createdAt) }}</span>
            <span class="col-status">
              <app-dash-badge [variant]="key.status === 'active' ? 'success' : 'neutral'">
                {{ key.status }}
              </app-dash-badge>
            </span>
            <span class="col-actions">
              @if (key.status === 'active') {
                <button class="action-btn action-btn--danger" (click)="revoke(key)" title="Revoke key">
                  <lucide-icon [img]="Trash2" [size]="13" />
                </button>
              }
            </span>
          </div>
        }
        @if (!keys().length) {
          <div class="keys-empty">
            <span class="ui-code text-[13px] text-on-surface-variant">No API keys yet.</span>
          </div>
        }
      </div>

      <!-- Create key modal -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <span class="modal-title">Create API key</span>
              <button class="modal-close" (click)="closeModal()"><lucide-icon [img]="X" [size]="16" /></button>
            </div>

            @if (!createdKey()) {
              <!-- Create form -->
              <div class="modal-body">
                <div class="modal-field">
                  <label class="modal-label">Key name</label>
                  <input
                    type="text"
                    [(ngModel)]="newKeyName"
                    placeholder="e.g. Production server"
                    class="modal-input"
                    autofocus
                  />
                </div>
                <div class="modal-field">
                  <label class="modal-label">Scopes</label>
                  <div class="scope-checks">
                    @for (scope of allScopes; track scope) {
                      <label class="scope-check-row">
                        <input type="checkbox" [checked]="newKeyScopes.includes(scope)" (change)="toggleScope(scope)" />
                        <span class="font-body text-[12px] text-on-surface">{{ scope }}</span>
                      </label>
                    }
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn-secondary btn--sm" (click)="closeModal()">Cancel</button>
                <button class="btn-primary btn--sm" (click)="createKey()" [disabled]="creating() || !newKeyName">
                  @if (creating()) { Creating… } @else { Create key }
                </button>
              </div>
            } @else {
              <!-- Reveal once -->
              <div class="modal-body">
                <div class="reveal-banner">
                  <p class="reveal-warning">Copy this key now. It will never be shown again.</p>
                </div>
                <app-copy-field
                  label="Secret key"
                  [value]="createdKey()!"
                />
                <p class="reveal-note">Store this securely (e.g. a secrets manager). Never commit it to source control.</p>
              </div>
              <div class="modal-footer">
                <button class="btn-primary btn--sm" (click)="closeModal()">Done</button>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dash-page { padding: 32px 32px 48px; max-width: 1280px; margin: 0 auto; }
    @media (max-width: 767px) { .dash-page { padding: 20px 16px 48px; } }

    .keys-table-card {
      background: var(--panel-fill);
      border-radius: 12px;
      box-shadow: var(--panel-inset);
      overflow: hidden;
    }
    .keys-table-header,
    .keys-table-row {
      display: grid;
      grid-template-columns: 140px 1fr 180px 100px 110px 90px 48px;
      align-items: center;
      gap: 12px;
      padding: 0 20px;
    }
    @media (max-width: 900px) {
      .keys-table-header,
      .keys-table-row {
        grid-template-columns: 120px 1fr 80px 80px;
        gap: 8px;
      }
      .col-scopes, .col-status, .col-actions { display: none; }
    }
    .keys-table-header {
      height: 40px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .keys-table-header span {
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-faint);
    }
    .keys-table-row {
      height: 56px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      transition: background 150ms;
    }
    .keys-table-row:last-child { border-bottom: none; }
    .keys-table-row:hover { background: rgba(255,255,255,0.02); }
    .keys-table-row--revoked { opacity: 0.5; }
    .key-name { font-family: var(--font-body); font-size: 12px; color: var(--dv-blue-dim); font-weight: 500; }
    .key-masked { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); }
    .key-meta { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); }
    .scope-chip {
      display: inline-block;
      font-family: var(--font-body);
      font-size: 9px;
      padding: 2px 6px;
      border-radius: 3px;
      background: rgba(255,255,255,0.06);
      color: var(--text-secondary);
      margin-right: 4px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px; height: 28px;
      border-radius: 5px;
      background: none;
      border: 1px solid transparent;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 150ms;
    }
    .action-btn--danger:hover { border-color: rgba(239,68,68,0.4); color: #fca5a5; background: rgba(239,68,68,0.08); }
    .keys-empty { padding: 40px; text-align: center; }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .modal {
      background: #0d0d0d;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.8);
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .modal-title { font-family: var(--font-display,sans-serif); font-size: 15px; font-weight: 700; color: var(--text-primary); }
    .modal-close { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 2px; }
    .modal-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
    .modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.06); }
    .modal-field { display: flex; flex-direction: column; gap: 6px; }
    .modal-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
    .modal-input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 9px 12px; font-family: var(--font-body); font-size: 13px; color: var(--text-primary); outline: none; width: 100%; }
    .modal-input:focus { border-color: rgba(255,255,255,0.3); }
    .scope-checks { display: flex; flex-direction: column; gap: 8px; }
    .scope-check-row { display: flex; align-items: center; gap: 8px; cursor: pointer; }
    .scope-check-row input { accent-color: #7b61ff; }
    .reveal-banner { background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.2); border-radius: 6px; padding: 10px 14px; }
    .reveal-warning { font-family: var(--font-body); font-size: 12px; color: #fde68a; }
    .reveal-note { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); line-height: 1.5; }
  `],
})
export class ApiKeysComponent implements OnInit {
  private keysApi = inject(ApiKeysApi);
  private platformId = inject(PLATFORM_ID);

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Copy = Copy;
  readonly Check = Check;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly X = X;
  readonly relTime = relTime;
  readonly fmtDate = fmtDate;

  readonly keys = signal<ApiKey[]>([]);
  readonly showModal = signal(false);
  readonly creating = signal(false);
  readonly createdKey = signal<string | null>(null);

  newKeyName = '';
  newKeyScopes: KeyScope[] = ['completions'];
  readonly allScopes: KeyScope[] = ['completions', 'embeddings', 'admin'];

  ngOnInit() {
    this.keysApi.list().subscribe(k => this.keys.set(k));
  }

  openCreateModal() {
    this.newKeyName = '';
    this.newKeyScopes = ['completions'];
    this.createdKey.set(null);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.createdKey.set(null);
    if (this.createdKey() === null) {
      this.keysApi.list().subscribe(k => this.keys.set(k));
    }
  }

  toggleScope(scope: KeyScope) {
    if (this.newKeyScopes.includes(scope)) {
      this.newKeyScopes = this.newKeyScopes.filter(s => s !== scope);
    } else {
      this.newKeyScopes = [...this.newKeyScopes, scope];
    }
  }

  createKey() {
    if (!this.newKeyName || !this.newKeyScopes.length) return;
    this.creating.set(true);
    this.keysApi.create({ name: this.newKeyName, scopes: this.newKeyScopes }).subscribe(res => {
      this.createdKey.set(res.fullKey);
      this.creating.set(false);
      this.keysApi.list().subscribe(k => this.keys.set(k));
    });
  }

  revoke(key: ApiKey) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!confirm(`Revoke key "${key.name}"? This cannot be undone.`)) return;
    this.keysApi.revoke(key.id).subscribe(() => {
      this.keysApi.list().subscribe(k => this.keys.set(k));
    });
  }
}
