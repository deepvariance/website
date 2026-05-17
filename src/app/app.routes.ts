import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'optimemory', loadComponent: () => import('./pages/optimemory').then(m => m.OptimemoryPageComponent) },
  { path: 'deeptuner', loadComponent: () => import('./pages/deeptuner').then(m => m.DeepTunerPageComponent) },
  { path: 'hyperrag', loadComponent: () => import('./pages/hyperrag').then(m => m.HyperRagPageComponent) },
  { path: 'pricing', loadComponent: () => import('./pages/pricing').then(m => m.PricingPageComponent) },
  { path: 'use-cases', loadComponent: () => import('./pages/use-cases').then(m => m.UseCasesPageComponent) },
  { path: 'use-cases/hpc-infrastructure', loadComponent: () => import('./pages/use-case-hpc').then(m => m.UseCaseHpcPageComponent) },
  { path: 'use-cases/gpu-providers', loadComponent: () => import('./pages/use-case-gpu-providers').then(m => m.UseCaseGpuProvidersPageComponent) },
  { path: 'use-cases/enterprise-training', loadComponent: () => import('./pages/use-case-enterprise').then(m => m.UseCaseEnterprisePageComponent) },
  { path: 'use-cases/research-institutions', loadComponent: () => import('./pages/use-case-research').then(m => m.UseCaseResearchPageComponent) },
  { path: 'use-cases/manufacturing', loadComponent: () => import('./pages/use-case-manufacturing').then(m => m.UseCaseManufacturingPageComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog').then(m => m.BlogPageComponent), data: { prerender: false } },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog-post').then(m => m.BlogPostPageComponent), data: { prerender: false } },
  { path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy').then(m => m.PrivacyPolicyComponent) },
  { path: 'terms', loadComponent: () => import('./pages/terms').then(m => m.TermsComponent) },
  { path: 'cookie-policy', loadComponent: () => import('./pages/cookie-policy').then(m => m.CookiePolicyComponent) },
];
