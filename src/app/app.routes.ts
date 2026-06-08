import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Platform index
  { path: 'platform', loadComponent: () => import('./pages/platform').then(m => m.PlatformPageComponent) },

  {
    path: 'platform/:slug',
    loadComponent: () => import('./pages/module-detail/module-detail').then((m) => m.ModuleDetailComponent),
  },

  // Legacy short paths redirect to nested module detail pages
  { path: 'optimemory', redirectTo: 'platform/optimemory', pathMatch: 'full' },
  { path: 'hyperrag', redirectTo: 'platform/hyperrag', pathMatch: 'full' },
  { path: 'deeptuner', redirectTo: 'platform/deeptuner', pathMatch: 'full' },
  
  // Docs
  { path: 'docs', loadComponent: () => import('./pages/docs').then(m => m.DocsPageComponent) },
  { path: 'docs/quickstart', redirectTo: 'docs', pathMatch: 'full' },
  { path: 'docs/integration', redirectTo: 'docs', pathMatch: 'full' },
  { path: 'docs/compatibility', redirectTo: 'docs', pathMatch: 'full' },
  { path: 'docs/security', redirectTo: 'docs', pathMatch: 'full' },
  { path: 'docs/faq', redirectTo: 'docs', pathMatch: 'full' },
  
  // Other pages
  { path: 'get-started', loadComponent: () => import('./pages/get-started').then(m => m.GetStartedPageComponent) },
  { path: 'pricing', redirectTo: 'get-started', pathMatch: 'full' },
  { path: 'use-cases', loadComponent: () => import('./pages/use-cases').then(m => m.UseCasesPageComponent) },
  {
    path: 'use-cases/:slug',
    loadComponent: () => import('./pages/use-case-detail').then((m) => m.UseCaseDetailComponent),
  },
  { path: 'blog', loadComponent: () => import('./pages/blog').then(m => m.BlogPageComponent), data: { prerender: false } },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog-post').then(m => m.BlogPostPageComponent), data: { prerender: false } },
  { path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy').then(m => m.PrivacyPolicyComponent) },
  { path: 'terms', loadComponent: () => import('./pages/terms').then(m => m.TermsComponent) },
  { path: 'cookie-policy', loadComponent: () => import('./pages/cookie-policy').then(m => m.CookiePolicyComponent) },

  { path: '**', loadComponent: () => import('./pages/not-found').then(m => m.NotFoundComponent), data: { prerender: false } },
];
