import { CommonModule } from '@angular/common';
import {
  Component,
  Type,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ModuleBenchmarkTableComponent } from '../../components/module-benchmark-table';
import { ModuleFaqSectionComponent } from '../../components/module-faq-section';
import { PageHeroComponent } from '../../components/page-hero';
import { SectionRailComponent } from '../../components/section-rail';
import { getModulePageConfig } from '../../data/module-page.config';
import { findModule } from '../../data/modules';
import { setPageSeo } from '../../services/page-seo';
import { DeeptunerBodyComponent } from './bodies/deeptuner-body.component';
import { HyperragBodyComponent } from './bodies/hyperrag-body.component';
import { OptimemoryBodyComponent } from './bodies/optimemory-body.component';

const BODY_BY_SLUG: Record<string, Type<unknown>> = {
  optimemory: OptimemoryBodyComponent,
  hyperrag: HyperragBodyComponent,
  deeptuner: DeeptunerBodyComponent,
};

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [
    CommonModule,
    PageHeroComponent,
    SectionRailComponent,
    ModuleFaqSectionComponent,
    ModuleBenchmarkTableComponent,
  ],
  templateUrl: './module-detail.html',
})
export class ModuleDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly config = computed(() => getModulePageConfig(this.slug()));
  readonly module = computed(() => findModule(this.slug()));
  readonly bodyComponent = computed(() => BODY_BY_SLUG[this.slug()] ?? null);

  readonly railAriaLabel = computed(() => {
    const mod = this.module();
    return mod ? `${mod.title} section navigation` : 'Module section navigation';
  });

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const cfg = getModulePageConfig(slug);
    const mod = findModule(slug);

    if (!cfg || !mod) {
      void this.router.navigateByUrl('/this-route-does-not-exist', { replaceUrl: true });
      return;
    }

    setPageSeo({ title: cfg.seo.title, description: cfg.seo.description, path: `/platform/${slug}` });
  }
}
