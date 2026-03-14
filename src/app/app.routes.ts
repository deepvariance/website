import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { OptimemoryPageComponent } from './pages/optimemory';
import { QuantizerPageComponent } from './pages/quantizer';
import { RoadmapPageComponent } from './pages/roadmap';
import { PricingPageComponent } from './pages/pricing';
import { UseCasesPageComponent } from './pages/use-cases';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'optimemory',
    component: OptimemoryPageComponent,
  },
  {
    path: 'llm-tuner',
    component: QuantizerPageComponent,
  },
  {
    path: 'roadmap',
    component: RoadmapPageComponent,
  },
  {
    path: 'pricing',
    component: PricingPageComponent,
  },
  {
    path: 'use-cases',
    component: UseCasesPageComponent,
  },
];
