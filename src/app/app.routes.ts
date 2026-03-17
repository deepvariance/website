import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'autopilot', loadComponent: () => import('./pages/autopilot').then(m => m.AutopilotPageComponent) },
  { path: 'optimemory', loadComponent: () => import('./pages/optimemory').then(m => m.OptimemoryPageComponent) },
  { path: 'llm-tuner', loadComponent: () => import('./pages/quantizer').then(m => m.QuantizerPageComponent) },
  { path: 'hyperrag', loadComponent: () => import('./pages/hyperrag').then(m => m.HyperRagPageComponent) },
  { path: 'roadmap', loadComponent: () => import('./pages/roadmap').then(m => m.RoadmapPageComponent) },
  { path: 'pricing', loadComponent: () => import('./pages/pricing').then(m => m.PricingPageComponent) },
  { path: 'use-cases', loadComponent: () => import('./pages/use-cases').then(m => m.UseCasesPageComponent) },
  { path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy').then(m => m.PrivacyPolicyComponent) },
  { path: 'terms', loadComponent: () => import('./pages/terms').then(m => m.TermsComponent) },
  { path: 'cookie-policy', loadComponent: () => import('./pages/cookie-policy').then(m => m.CookiePolicyComponent) },
];
