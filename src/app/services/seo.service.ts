import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_URL = 'https://deepvariance.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/meta-dv.png`;
const DEFAULT_TWITTER_HANDLE = '@deepvariance';

export interface SeoInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | null;
  jsonLdId?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(input: SeoInput): void {
    const {
      title,
      description,
      path = '/',
      image = DEFAULT_OG_IMAGE,
      type = 'website',
      jsonLd = null,
      jsonLdId = 'page-jsonld',
    } = input;

    const url = path.startsWith('http') ? path : `${SITE_URL}${path}`;

    this.title.setTitle(title);
    this.upsertMeta('name', 'description', description);
    this.upsertMeta('property', 'og:type', type);
    this.upsertMeta('property', 'og:title', title);
    this.upsertMeta('property', 'og:description', description);
    this.upsertMeta('property', 'og:url', url);
    this.upsertMeta('property', 'og:image', image);
    this.upsertMeta('name', 'twitter:card', 'summary_large_image');
    this.upsertMeta('name', 'twitter:site', DEFAULT_TWITTER_HANDLE);
    this.upsertMeta('name', 'twitter:title', title);
    this.upsertMeta('name', 'twitter:description', description);
    this.upsertMeta('name', 'twitter:image', image);

    this.setCanonical(url);

    if (jsonLd) {
      this.setJsonLd(jsonLdId, jsonLd);
    } else {
      this.removeJsonLd(jsonLdId);
    }
  }

  private upsertMeta(attr: 'name' | 'property', key: string, value: string): void {
    const selector = `${attr}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content: value });
    } else {
      this.meta.addTag({ [attr]: key, content: value });
    }
  }

  private setCanonical(url: string): void {
    let el = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  private setJsonLd(id: string, data: Record<string, unknown>): void {
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private removeJsonLd(id: string): void {
    const script = this.doc.getElementById(id);
    if (script) {
      script.remove();
    }
  }
}
