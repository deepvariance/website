import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, CheckCircle2, LucideAngularModule } from 'lucide-angular';
import { map } from 'rxjs/operators';

import { CtaButtonComponent } from '../components/cta-button';
import { GlassCardComponent } from '../components/glass-card';
import { PageHeroComponent } from '../components/page-hero';
import type { PageHeroImage, PageHeroKpi } from '../components/page-hero';
import { findUseCase, type UseCaseDetail } from '../data/use-cases';
import { setPageSeo } from '../services/page-seo';

const HERO_IMAGE_SIZE = { width: 1536, height: 1024 } as const;

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
  styles: [`:host { display: block; }`],
})
export class UseCaseDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly ArrowLeft = ArrowLeft;
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

  heroImage(uc: UseCaseDetail): PageHeroImage {
    return {
      src: uc.heroImage,
      alt: uc.label,
      ...HERO_IMAGE_SIZE,
      desktopBlend: true,
      mobileBlendOpacity: 0.9,
    };
  }

  heroKpis(uc: UseCaseDetail): PageHeroKpi[] {
    return uc.kpis.map((k) => ({
      value: k.value,
      label: k.label,
      highlight: k.highlight,
    }));
  }
}
