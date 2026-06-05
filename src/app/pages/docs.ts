import { Component, inject } from '@angular/core';
import { HeroFluidShaderComponent } from '../components/hero-fluid-shader';
import { CodeWindowComponent } from '../components/code-window';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [HeroFluidShaderComponent, CodeWindowComponent],
  templateUrl: './docs.html',
  styleUrl: './docs.scss',
})
export class DocsPageComponent {
  private seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Documentation | Deep Variance',
      description: 'Deep Variance documentation is coming soon.',
      path: '/docs',
    });
  }
}
