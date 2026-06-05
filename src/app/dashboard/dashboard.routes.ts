import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import {
  OverviewApi, ApiKeysApi, UsageApi, ModelsApi, BillingApi, LogsApi, SettingsApi,
} from './services/api';
import {
  MockOverviewApi, MockApiKeysApi, MockUsageApi, MockModelsApi,
  MockBillingApi, MockLogsApi, MockSettingsApi,
} from './services/mock-api';

const API_PROVIDERS = [
  { provide: OverviewApi, useClass: MockOverviewApi },
  { provide: ApiKeysApi, useClass: MockApiKeysApi },
  { provide: UsageApi, useClass: MockUsageApi },
  { provide: ModelsApi, useClass: MockModelsApi },
  { provide: BillingApi, useClass: MockBillingApi },
  { provide: LogsApi, useClass: MockLogsApi },
  { provide: SettingsApi, useClass: MockSettingsApi },
];

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/dashboard-layout').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    providers: API_PROVIDERS,
    data: { prerender: false },
    children: [
      { path: '', loadComponent: () => import('./pages/overview/overview').then(m => m.OverviewComponent), data: { title: 'Overview' } },
      { path: 'api-keys', loadComponent: () => import('./pages/api-keys/api-keys').then(m => m.ApiKeysComponent), data: { title: 'API Keys' } },
      { path: 'usage', loadComponent: () => import('./pages/usage/usage').then(m => m.UsageComponent), data: { title: 'Usage & Analytics' } },
      { path: 'models', loadComponent: () => import('./pages/models/models').then(m => m.ModelsComponent), data: { title: 'Models' } },
      { path: 'playground', loadComponent: () => import('./pages/playground/playground').then(m => m.PlaygroundComponent), data: { title: 'Playground' } },
      { path: 'billing', loadComponent: () => import('./pages/billing/billing').then(m => m.BillingComponent), data: { title: 'Billing & Cost' } },
      { path: 'logs', loadComponent: () => import('./pages/logs/logs').then(m => m.LogsComponent), data: { title: 'Request Logs' } },
      { path: 'settings', loadComponent: () => import('./pages/settings/settings').then(m => m.SettingsComponent), data: { title: 'Settings' } },
    ],
  },
];
