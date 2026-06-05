import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LucideIconData, LayoutDashboard, Key, BarChart2, Cpu, Terminal, CreditCard, ScrollText, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X } from 'lucide-angular';
import { AuthService } from '../services/auth.service';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIconData;
  exact?: boolean;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <div class="dash-shell">
      <aside class="dash-sidebar" [class.dash-sidebar--collapsed]="collapsed()">
        <div class="dash-brand">
          @if (!collapsed()) {
            <a routerLink="/" class="dash-wordmark">Deep Variance</a>
          } @else {
            <a routerLink="/" class="dash-wordmark">DV</a>
          }
          <button class="dash-collapse-btn" (click)="collapsed.set(!collapsed())" [attr.aria-label]="collapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
            <lucide-icon [img]="collapsed() ? ChevronRight : ChevronLeft" [size]="14" />
          </button>
        </div>

        <nav class="dash-nav" aria-label="Dashboard navigation">
          <span class="dash-nav-label" [class.sr-only]="collapsed()">Platform</span>
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path === '' ? '/dashboard' : ['/dashboard', item.path]"
              routerLinkActive="dash-nav-item--active"
              [routerLinkActiveOptions]="{ exact: !!item.exact }"
              class="dash-nav-item"
              [class.justify-center]="collapsed()"
              [title]="collapsed() ? item.label : ''"
            >
              <lucide-icon [img]="item.icon" [size]="16" class="flex-shrink-0" />
              @if (!collapsed()) { <span>{{ item.label }}</span> }
            </a>
          }
        </nav>

        <div class="dash-sidebar-footer">
          @if (!collapsed()) {
            <div class="dash-user-row">
              <div class="dash-avatar" aria-hidden="true">{{ user()?.avatarInitials }}</div>
              <div class="min-w-0">
                <p class="dash-user-name">{{ user()?.name }}</p>
                <p class="dash-user-email">{{ user()?.email }}</p>
              </div>
            </div>
          } @else {
            <div class="flex justify-center mb-2">
              <div class="dash-avatar" aria-hidden="true">{{ user()?.avatarInitials }}</div>
            </div>
          }
          <button class="dash-signout-btn" [class.dash-signout-btn--center]="collapsed()" (click)="logout()">
            <lucide-icon [img]="LogOut" [size]="14" />
            @if (!collapsed()) { <span>Sign out</span> }
          </button>
        </div>
      </aside>

      <!-- Mobile header -->
      <header class="dash-mobile-header" role="banner">
        <button class="dash-mobile-menu-btn" (click)="mobileOpen.set(!mobileOpen())" [attr.aria-expanded]="mobileOpen()" aria-label="Toggle menu">
          <lucide-icon [img]="mobileOpen() ? X : Menu" [size]="20" />
        </button>
        <span class="dash-mobile-brand">Deep Variance</span>
        <div class="dash-avatar dash-avatar--sm" aria-hidden="true">{{ user()?.avatarInitials }}</div>
      </header>

      @if (mobileOpen()) {
        <div class="dash-mobile-overlay" (click)="mobileOpen.set(false)" aria-hidden="true">
          <aside class="dash-mobile-drawer" (click)="$event.stopPropagation()">
            <nav>
              @for (item of navItems; track item.path) {
                <a
                  [routerLink]="item.path === '' ? '/dashboard' : ['/dashboard', item.path]"
                  routerLinkActive="dash-nav-item--active"
                  [routerLinkActiveOptions]="{ exact: !!item.exact }"
                  class="dash-nav-item"
                  (click)="mobileOpen.set(false)"
                >
                  <lucide-icon [img]="item.icon" [size]="16" />
                  <span>{{ item.label }}</span>
                </a>
              }
            </nav>
            <button class="dash-signout-btn dash-signout-btn--full" (click)="logout()">
              <lucide-icon [img]="LogOut" [size]="14" />
              <span>Sign out</span>
            </button>
          </aside>
        </div>
      }

      <main class="dash-main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .dash-shell { display: flex; min-height: 100vh; min-height: 100svh; background: #000; }

    .dash-sidebar {
      position: fixed; top: 0; left: 0; bottom: 0; width: 224px;
      background: var(--panel-fill);
      border-right: 1px solid rgba(255,255,255,0.06);
      display: flex; flex-direction: column;
      transition: width 240ms cubic-bezier(0.16,1,0.3,1);
      z-index: 40; overflow: hidden;
    }
    .dash-sidebar--collapsed { width: 56px; }
    @media (max-width: 767px) { .dash-sidebar { display: none; } }

    .dash-brand { display: flex; align-items: center; justify-content: space-between; padding: 18px 14px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); min-height: 56px; gap: 8px; }
    .dash-wordmark { font-family: var(--font-display,sans-serif); font-weight: 700; font-size: 15px; color: var(--text-primary); text-decoration: none; white-space: nowrap; overflow: hidden; letter-spacing: -0.01em; }
    .dash-collapse-btn { flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); color: var(--text-muted); cursor: pointer; transition: all 150ms; }
    .dash-collapse-btn:hover { color: var(--text-primary); border-color: rgba(255,255,255,0.2); }

    .dash-nav { flex: 1; padding: 12px 8px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; overflow-x: hidden; }
    .dash-nav-label { font-family: var(--font-body); font-size: 9px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-faint); padding: 4px 8px 6px; }
    .dash-nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; font-family: var(--font-body); font-size: 12px; font-weight: 500; color: var(--text-secondary); text-decoration: none; transition: all 150ms; white-space: nowrap; }
    .dash-nav-item:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
    .dash-nav-item--active { background: rgba(255,255,255,0.08); color: var(--text-primary); box-shadow: var(--panel-inset); }

    .dash-sidebar-footer { padding: 12px 8px; border-top: 1px solid rgba(255,255,255,0.05); }
    .dash-user-row { display: flex; align-items: center; gap: 10px; padding: 6px 8px 10px; overflow: hidden; }
    .dash-avatar { flex-shrink: 0; width: 30px; height: 30px; border-radius: 50%; background: rgba(123,97,255,0.25); border: 1px solid rgba(123,97,255,0.4); display: flex; align-items: center; justify-content: center; font-family: var(--font-display,sans-serif); font-size: 11px; font-weight: 700; color: #c4b5fd; letter-spacing: 0.02em; }
    .dash-avatar--sm { width: 26px; height: 26px; font-size: 10px; }
    .dash-user-name { font-family: var(--font-display,sans-serif); font-size: 13px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .dash-user-email { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .dash-signout-btn { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 6px; font-family: var(--font-body); font-size: 12px; color: var(--text-muted); cursor: pointer; background: transparent; border: none; transition: all 150ms; }
    .dash-signout-btn:hover { color: var(--text-primary); background: rgba(255,255,255,0.04); }
    .dash-signout-btn--center { justify-content: center; }
    .dash-signout-btn--full { width: 100%; }

    .dash-mobile-header { display: none; position: fixed; top: 0; left: 0; right: 0; height: 52px; background: rgba(0,0,0,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); align-items: center; justify-content: space-between; padding: 0 16px; z-index: 50; }
    @media (max-width: 767px) { .dash-mobile-header { display: flex; } }
    .dash-mobile-brand { font-family: var(--font-display,sans-serif); font-weight: 700; font-size: 15px; color: var(--text-primary); }
    .dash-mobile-menu-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px; display: flex; align-items: center; }

    .dash-mobile-overlay { position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); }
    .dash-mobile-drawer { position: absolute; top: 0; left: 0; bottom: 0; width: 240px; background: #0a0a0a; border-right: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; padding: 16px 8px; gap: 4px; }

    .dash-main { flex: 1; min-height: 100vh; margin-left: 224px; transition: margin-left 240ms cubic-bezier(0.16,1,0.3,1); overflow-x: clip; }
    @media (max-width: 767px) { .dash-main { margin-left: 0; padding-top: 52px; } }

    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }
    .flex { display: flex; }
    .justify-center { justify-content: center; }
    .flex-shrink-0 { flex-shrink: 0; }
    .min-w-0 { min-width: 0; }
    .mb-2 { margin-bottom: 8px; }
  `],
})
export class DashboardLayoutComponent {
  private auth = inject(AuthService);

  readonly LayoutDashboard = LayoutDashboard;
  readonly Key = Key;
  readonly BarChart2 = BarChart2;
  readonly Cpu = Cpu;
  readonly Terminal = Terminal;
  readonly CreditCard = CreditCard;
  readonly ScrollText = ScrollText;
  readonly Settings = Settings;
  readonly LogOut = LogOut;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Menu = Menu;
  readonly X = X;

  readonly collapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly user = this.auth.currentUser;

  readonly navItems: NavItem[] = [
    { path: '', label: 'Overview', icon: LayoutDashboard, exact: true },
    { path: 'api-keys', label: 'API Keys', icon: Key },
    { path: 'usage', label: 'Usage', icon: BarChart2 },
    { path: 'models', label: 'Models', icon: Cpu },
    { path: 'playground', label: 'Playground', icon: Terminal },
    { path: 'billing', label: 'Billing', icon: CreditCard },
    { path: 'logs', label: 'Logs', icon: ScrollText },
    { path: 'settings', label: 'Settings', icon: Settings },
  ];

  logout() { this.auth.logout(); }
}
