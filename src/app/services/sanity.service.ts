import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SanityTag {
  name: string;
  slug: string;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featureImageUrl: string | null;
  publishedAt: string;
  estimatedReadingTime: number;
  primaryTag: SanityTag | null;
  tags: SanityTag[];
  bodyHtml: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
}

interface SanityQueryResponse<T> {
  result: T;
}

@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly http = inject(HttpClient);
  private readonly config = environment.sanity;
  private readonly baseUrl = `https://${this.config.projectId}.${this.config.useCdn ? 'cdn' : 'api'}.sanity.io/v${this.config.apiVersion}/data/query/${this.config.dataset}`;

  private imageUrl(ref: string): string {
    // Sanity image ref format: image-{id}-{dimensions}-{format}
    const [, id, dims, format] = ref.split('-');
    return `https://cdn.sanity.io/images/${this.config.projectId}/${this.config.dataset}/${id}-${dims}.${format}`;
  }

  private blocksToHtml(blocks: readonly SanityBlock[]): string {
    if (!blocks || blocks.length === 0) return '';

    const parts: string[] = [];
    let i = 0;

    while (i < blocks.length) {
      const block = blocks[i];

      // Group consecutive list items
      if (block._type === 'block' && block.listItem) {
        const tag = block.listItem === 'number' ? 'ol' : 'ul';
        const items: string[] = [];
        while (i < blocks.length && blocks[i]._type === 'block' && blocks[i].listItem === block.listItem) {
          const text = this.spansToHtml(blocks[i].children ?? [], blocks[i].markDefs ?? []);
          items.push(`<li>${text}</li>`);
          i++;
        }
        parts.push(`<${tag}>${items.join('')}</${tag}>`);
        continue;
      }

      parts.push(this.blockToHtml(block));
      i++;
    }

    return parts.join('\n');
  }

  private blockToHtml(block: SanityBlock): string {
    if (block._type === 'image' && block.asset?._ref) {
      const url = this.imageUrl(block.asset._ref);
      const alt = block.alt ?? '';
      return `<figure><img src="${url}" alt="${this.escapeHtml(alt)}" loading="lazy" /></figure>`;
    }

    if (block._type === 'code') {
      const lang = block.language ? `language-${this.escapeHtml(block.language)}` : '';
      return `<pre${lang ? ` class="${lang}"` : ''}><code${lang ? ` class="${lang}"` : ''}>${this.escapeHtml(block.code ?? '')}</code></pre>`;
    }

    if (block._type !== 'block') return '';

    const text = this.spansToHtml(block.children ?? [], block.markDefs ?? []);

    switch (block.style) {
      case 'h1': return `<h1>${text}</h1>`;
      case 'h2': return `<h2>${text}</h2>`;
      case 'h3': return `<h3>${text}</h3>`;
      case 'h4': return `<h4>${text}</h4>`;
      case 'blockquote': return `<blockquote><p>${text}</p></blockquote>`;
      default: return `<p>${text}</p>`;
    }
  }

  private spansToHtml(children: readonly SanitySpan[], markDefs: readonly SanityMarkDef[]): string {
    return children.map((child) => {
      let html = this.escapeHtml(child.text ?? '');
      for (const mark of child.marks ?? []) {
        if (mark === 'strong') { html = `<strong>${html}</strong>`; }
        else if (mark === 'em') { html = `<em>${html}</em>`; }
        else if (mark === 'code') { html = `<code>${html}</code>`; }
        else if (mark === 'underline') { html = `<u>${html}</u>`; }
        else if (mark === 'strike-through') { html = `<s>${html}</s>`; }
        else {
          const def = markDefs.find((d) => d._key === mark);
          if (def?._type === 'link' && def.href) {
            html = `<a href="${this.escapeHtml(def.href)}" target="_blank" rel="noopener noreferrer">${html}</a>`;
          }
        }
      }
      return html;
    }).join('');
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private mapPost(raw: SanityRawPost): SanityPost {
    const bodyHtml = raw.body ? this.blocksToHtml(raw.body) : null;
    const wordCount = raw.body
      ? raw.body.reduce((acc: number, b: SanityBlock) => {
          if (b._type === 'block') {
            return acc + (b.children ?? []).reduce((a: number, c: SanitySpan) => a + (c.text ?? '').split(/\s+/).filter(Boolean).length, 0);
          }
          if (b._type === 'code') {
            return acc + (b.code ?? '').split(/\s+/).filter(Boolean).length;
          }
          return acc;
        }, 0)
      : 0;

    return {
      _id: raw._id,
      title: raw.title ?? '',
      slug: raw.slug?.current ?? '',
      excerpt: raw.excerpt ?? null,
      featureImageUrl: raw.mainImage?.asset?._ref ? this.imageUrl(raw.mainImage.asset._ref) : null,
      publishedAt: raw.publishedAt ?? raw._createdAt ?? '',
      estimatedReadingTime: Math.max(1, Math.round(wordCount / 200)),
      primaryTag: raw.categories?.[0] ? { name: raw.categories[0].title, slug: raw.categories[0].slug?.current ?? '' } : null,
      tags: (raw.categories ?? []).filter(Boolean).map((c: SanityRawCategory) => ({ name: c.title, slug: c.slug?.current ?? '' })),
      bodyHtml,
      seoTitle: raw.seoTitle ?? null,
      seoDescription: raw.seoDescription ?? null,
      ogImage: raw.ogImage?.asset?._ref ? this.imageUrl(raw.ogImage.asset._ref) : null,
    };
  }

  getPosts(limit = 10): Observable<SanityPost[]> {
    const query = `*[_type == "post"] | order(publishedAt desc)[0...${limit}]{
      _id, title, slug, excerpt, publishedAt, _createdAt,
      mainImage{ asset{ _ref } },
      "categories": categories[]->{ title, slug },
      body
    }`;

    return this.http
      .get<SanityQueryResponse<SanityRawPost[]>>(this.baseUrl, { params: { query } })
      .pipe(map((res) => res.result.map((raw) => this.mapPost(raw))));
  }

  getPostBySlug(slug: string): Observable<SanityPost> {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      _id, title, slug, excerpt, publishedAt, _createdAt,
      mainImage{ asset{ _ref } },
      "categories": categories[]->{ title, slug },
      body,
      seoTitle, seoDescription,
      ogImage{ asset{ _ref } }
    }`;

    return this.http
      .get<SanityQueryResponse<SanityRawPost>>(this.baseUrl, { params: { query, '$slug': `"${slug}"` } })
      .pipe(map((res) => this.mapPost(res.result)));
  }
}

// Raw Sanity types (internal)
interface SanityMarkDef {
  readonly _key: string;
  readonly _type: string;
  readonly href?: string;
}

interface SanitySpan {
  readonly _type?: string;
  readonly text?: string;
  readonly marks?: readonly string[];
}

interface SanityBlock {
  readonly _type: string;
  readonly style?: string;
  readonly listItem?: string;
  readonly children?: readonly SanitySpan[];
  readonly markDefs?: readonly SanityMarkDef[];
  readonly asset?: { readonly _ref: string };
  readonly alt?: string;
  readonly language?: string;
  readonly code?: string;
}

interface SanityRawCategory {
  readonly title: string;
  readonly slug: { readonly current: string };
}

interface SanityRawPost {
  readonly _id: string;
  readonly _createdAt?: string;
  readonly title?: string;
  readonly slug?: { readonly current: string };
  readonly excerpt?: string;
  readonly publishedAt?: string;
  readonly mainImage?: { readonly asset?: { readonly _ref: string } };
  readonly categories?: readonly SanityRawCategory[];
  readonly body?: readonly SanityBlock[];
  readonly seoTitle?: string;
  readonly seoDescription?: string;
  readonly ogImage?: { readonly asset?: { readonly _ref: string } };
}
