import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Trash2, Plus, Globe, Users, Webhook, AlertTriangle } from 'lucide-angular';
import { SettingsApi } from '../../services/api';
import { OrgSettings, TeamMember, Webhook as WebhookModel } from '../../models';
import { PageHeaderComponent } from '../../components/page-header';
import { CopyFieldComponent } from '../../components/copy-field';
import { DashBadgeComponent } from '../../components/dash-badge';

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
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, PageHeaderComponent, CopyFieldComponent, DashBadgeComponent],
  template: `
    <div class="dash-page">
      <app-dash-page-header title="Settings" subtitle="Organization profile, team, webhooks, and integrations" />

      @if (org()) {
        <div class="settings-grid">

          <!-- Org profile -->
          <section class="settings-section">
            <div class="section-title-row">
              <lucide-icon [img]="Globe" [size]="15" class="section-icon" />
              <h2 class="section-heading">Organization</h2>
            </div>
            <div class="settings-card">
              <div class="settings-field">
                <label class="field-label">Organization name</label>
                <div class="field-row">
                  <input type="text" [(ngModel)]="editOrgName" class="settings-input" />
                  <button class="btn-secondary btn--sm" (click)="saveOrgName()">
                    {{ saved() ? 'Saved' : 'Save' }}
                  </button>
                </div>
              </div>
              <div class="settings-field">
                <app-copy-field label="API Base URL" [value]="org()!.apiBaseUrl" />
              </div>
              <div class="settings-field">
                <app-copy-field label="Organization ID" [value]="org()!.orgId" />
              </div>
            </div>
          </section>

          <!-- Team members -->
          <section class="settings-section">
            <div class="section-title-row">
              <lucide-icon [img]="Users" [size]="15" class="section-icon" />
              <h2 class="section-heading">Team members</h2>
            </div>
            <div class="settings-card settings-card--no-pad">
              <div class="members-header">
                <span class="col-member">Member</span>
                <span class="col-role">Role</span>
                <span class="col-joined">Joined</span>
                <span class="col-seen">Last seen</span>
              </div>
              @for (m of org()!.members; track m.id) {
                <div class="members-row">
                  <div class="col-member member-info">
                    <div class="member-avatar">{{ initials(m.name) }}</div>
                    <div>
                      <p class="member-name">{{ m.name }}</p>
                      <p class="member-email">{{ m.email }}</p>
                    </div>
                  </div>
                  <span class="col-role">
                    <app-dash-badge [variant]="m.role === 'owner' ? 'violet' : 'neutral'">{{ m.role }}</app-dash-badge>
                  </span>
                  <span class="col-joined member-meta">{{ fmtDate(m.joinedAt) }}</span>
                  <span class="col-seen member-meta">{{ relTime(m.lastSeenAt) }}</span>
                </div>
              }
              <div class="members-footer">
                <button class="btn-ghost btn--sm invite-btn">
                  <lucide-icon [img]="Plus" [size]="12" />
                  Invite member
                </button>
              </div>
            </div>
          </section>

          <!-- Webhooks -->
          <section class="settings-section">
            <div class="section-title-row">
              <lucide-icon [img]="WebhookIcon" [size]="15" class="section-icon" />
              <h2 class="section-heading">Webhooks</h2>
            </div>
            <div class="settings-card settings-card--no-pad">
              @for (wh of org()!.webhooks; track wh.id) {
                <div class="webhook-row">
                  <div class="webhook-main">
                    <div class="webhook-url-row">
                      <app-dash-badge [variant]="wh.status === 'active' ? 'success' : 'neutral'">{{ wh.status }}</app-dash-badge>
                      <span class="webhook-url">{{ wh.url }}</span>
                    </div>
                    <div class="webhook-events">
                      @for (e of wh.events; track e) {
                        <span class="event-chip">{{ e }}</span>
                      }
                    </div>
                    <div class="webhook-meta">
                      Last delivery: {{ relTime(wh.lastDeliveredAt) }}
                      @if (wh.failureCount > 0) {
                        · <span class="webhook-failures">{{ wh.failureCount }} failures</span>
                      }
                    </div>
                  </div>
                  <app-copy-field label="Secret" [value]="wh.secret" [secret]="true" />
                </div>
              }
              <div class="members-footer">
                <button class="btn-ghost btn--sm invite-btn">
                  <lucide-icon [img]="Plus" [size]="12" />
                  Add webhook
                </button>
              </div>
            </div>
          </section>

          <!-- Danger zone -->
          <section class="settings-section settings-section--danger">
            <div class="section-title-row">
              <lucide-icon [img]="AlertTriangle" [size]="15" class="section-icon section-icon--danger" />
              <h2 class="section-heading section-heading--danger">Danger zone</h2>
            </div>
            <div class="settings-card settings-card--danger">
              <div class="danger-row">
                <div>
                  <p class="danger-title">Rotate API master key</p>
                  <p class="danger-sub">Revokes all existing keys. Requires re-issuing all integrations.</p>
                </div>
                <button class="btn-secondary btn--sm danger-action-btn">Rotate</button>
              </div>
              <div class="danger-row danger-row--last">
                <div>
                  <p class="danger-title">Delete organization</p>
                  <p class="danger-sub">Permanently removes the org, all keys, and billing data. Cannot be undone.</p>
                </div>
                <button class="btn-secondary btn--sm danger-action-btn danger-action-btn--red">Delete org</button>
              </div>
            </div>
          </section>

        </div>
      } @else {
        <div class="settings-skeleton-grid">
          @for (_ of [1,2,3]; track $index) { <div class="settings-skeleton"></div> }
        </div>
      }
    </div>
  `,
  styles: [`
    .dash-page { padding: 32px 32px 48px; max-width: 900px; margin: 0 auto; }
    @media (max-width: 767px) { .dash-page { padding: 20px 16px 48px; } }

    .settings-grid { display: flex; flex-direction: column; gap: 32px; }

    .section-title-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .section-icon { color: var(--text-muted); }
    .section-icon--danger { color: #f87171; }
    .section-heading { font-family: var(--font-display,sans-serif); font-size: 16px; font-weight: 700; color: var(--text-primary); }
    .section-heading--danger { color: #fca5a5; }

    .settings-card { background: var(--panel-fill); border-radius: 12px; box-shadow: var(--panel-inset); padding: 20px; display: flex; flex-direction: column; gap: 16px; }
    .settings-card--no-pad { padding: 0; overflow: hidden; }
    .settings-card--danger { border: 1px solid rgba(239,68,68,0.15); background: rgba(239,68,68,0.03); box-shadow: none; }

    .settings-field { display: flex; flex-direction: column; gap: 6px; }
    .field-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
    .field-row { display: flex; gap: 8px; }
    .settings-input { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 9px 12px; font-family: var(--font-body); font-size: 13px; color: var(--text-primary); outline: none; }
    .settings-input:focus { border-color: rgba(255,255,255,0.3); }

    /* Members */
    .members-header, .members-row {
      display: grid;
      grid-template-columns: 1fr 90px 110px 90px;
      align-items: center;
      gap: 12px;
      padding: 0 20px;
    }
    .members-header { height: 36px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .members-header span { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-faint); }
    .members-row { height: 60px; border-top: 1px solid rgba(255,255,255,0.04); }
    .member-info { display: flex; align-items: center; gap: 10px; }
    .member-avatar { width: 28px; height: 28px; border-radius: 50%; background: rgba(123,97,255,0.2); border: 1px solid rgba(123,97,255,0.3); display: flex; align-items: center; justify-content: center; font-family: var(--font-display,sans-serif); font-size: 10px; font-weight: 700; color: #c4b5fd; flex-shrink: 0; }
    .member-name { font-family: var(--font-body); font-size: 12px; color: var(--dv-blue-dim); font-weight: 500; }
    .member-email { font-family: var(--font-body); font-size: 10px; color: var(--text-muted); }
    .member-meta { font-family: var(--font-body); font-size: 10px; color: var(--text-muted); }
    .members-footer { padding: 12px 16px; border-top: 1px solid rgba(255,255,255,0.04); }
    .invite-btn { display: flex; align-items: center; gap: 6px; }

    /* Webhooks */
    .webhook-row { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.04); display: flex; flex-direction: column; gap: 10px; }
    .webhook-main { display: flex; flex-direction: column; gap: 6px; }
    .webhook-url-row { display: flex; align-items: center; gap: 8px; }
    .webhook-url { font-family: var(--font-body); font-size: 12px; color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; }
    .webhook-events { display: flex; gap: 5px; flex-wrap: wrap; }
    .event-chip { font-family: var(--font-body); font-size: 9px; padding: 2px 6px; border-radius: 3px; background: rgba(255,255,255,0.05); color: var(--text-muted); }
    .webhook-meta { font-family: var(--font-body); font-size: 10px; color: var(--text-faint); }
    .webhook-failures { color: #f87171; }

    /* Danger */
    .danger-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid rgba(239,68,68,0.1); }
    .danger-row--last { border-bottom: none; padding-bottom: 0; }
    .danger-title { font-family: var(--font-body); font-size: 13px; color: var(--dv-blue-dim); font-weight: 500; }
    .danger-sub { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); margin-top: 3px; line-height: 1.4; }
    .danger-action-btn { flex-shrink: 0; }
    .danger-action-btn--red { color: #fca5a5 !important; border-color: rgba(239,68,68,0.3) !important; }
    .danger-action-btn--red:hover { background: rgba(239,68,68,0.1) !important; }

    .settings-skeleton-grid { display: flex; flex-direction: column; gap: 20px; }
    .settings-skeleton { height: 160px; border-radius: 12px; background: var(--panel-fill); animation: shimmer 1.5s ease-in-out infinite; }
    @keyframes shimmer { 0%,100% { opacity:0.5 } 50% { opacity:1 } }
  `],
})
export class SettingsComponent implements OnInit {
  private settingsApi = inject(SettingsApi);

  readonly Globe = Globe;
  readonly Users = Users;
  readonly WebhookIcon = Webhook;
  readonly AlertTriangle = AlertTriangle;
  readonly Plus = Plus;
  readonly Trash2 = Trash2;

  readonly org = signal<OrgSettings | null>(null);
  editOrgName = '';
  readonly saved = signal(false);

  readonly relTime = relTime;
  readonly fmtDate = fmtDate;

  ngOnInit() {
    this.settingsApi.getOrg().subscribe(o => {
      this.org.set(o);
      this.editOrgName = o.orgName;
    });
  }

  saveOrgName() {
    if (!this.editOrgName.trim()) return;
    this.settingsApi.updateOrgName(this.editOrgName).subscribe(() => {
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2000);
    });
  }

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }
}
