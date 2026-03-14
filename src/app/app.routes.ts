import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { OptimemoryPageComponent } from './pages/optimemory';
import { PricingPageComponent } from './pages/pricing';
import { QuantizerPageComponent } from './pages/quantizer';
import { RoadmapPageComponent } from './pages/roadmap';
import { UseCasesPageComponent } from './pages/use-cases';
import { PrivacyPolicyComponent } from './pages/privacy-policy';
import { TermsComponent } from './pages/terms';
import { CookiePolicyComponent } from './pages/cookie-policy';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'optimemory', component: OptimemoryPageComponent },
  { path: 'llm-tuner', component: QuantizerPageComponent },
  { path: 'roadmap', component: RoadmapPageComponent },
  { path: 'pricing', component: PricingPageComponent },
  { path: 'use-cases', component: UseCasesPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'cookie-policy', component: CookiePolicyComponent },
];
