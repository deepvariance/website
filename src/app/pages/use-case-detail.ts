import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArrowRight, CheckCircle2, LucideAngularModule } from 'lucide-angular';
import { map } from 'rxjs/operators';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { PageHeroComponent } from '../components/page-hero';
import type { PageHeroKpi } from '../components/page-hero';
import {
  findUseCase,
  type UseCaseDetail,
  type UseCaseKpi,
} from '../data/use-cases';
import { setPageSeo } from '../services/page-seo';

@Component({
  selector: 'app-use-case-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    PageHeroComponent,
    GlassCardComponent,
    CtaButtonComponent,
  ],
  templateUrl: './use-case-detail.html',
  styles: [
    `
      :host {
        display: block;
      }
      .page-hero__image-plain {
        mix-blend-mode: screen;
        mask-image: radial-gradient(ellipse 80% 70% at center, black 40%, transparent 90%);
      }
    `,
  ],
})
export class UseCaseDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly ArrowRight = ArrowRight;
  readonly CheckCircle2 = CheckCircle2;

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly useCase = computed(() => findUseCase(this.slug()));

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const uc = findUseCase(slug);
    if (!uc) {
      void this.router.navigateByUrl('/this-route-does-not-exist', { replaceUrl: true });
      return;
    }
    setPageSeo({
      title: uc.seo.title,
      description: uc.seo.description,
      path: `/use-cases/${slug}`,
    });
  }

  heroKpis(uc: UseCaseDetail): PageHeroKpi[] {
    return uc.kpis.slice(0, 2).map((k) => ({
      value: k.value,
      label: k.label,
      highlight: k.highlight,
    }));
  }

  asideKpis(uc: UseCaseDetail): UseCaseKpi[] {
    return uc.kpis.slice(2, 4);
  }
}
