import { inject } from '@angular/core';
import { SeoService, type SeoInput } from './seo.service';

/** Call from route page constructors to set document meta. */
export function setPageSeo(input: SeoInput): void {
  inject(SeoService).set(input);
}
