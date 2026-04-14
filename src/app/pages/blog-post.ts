import { CommonModule, DatePipe, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { SanityPost, SanityService } from '../services/sanity.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, DatePipe],
  template: `
    <div class="relative min-h-screen">
      <div class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

      @if (loading()) {
        <div class="container mx-auto px-6 pt-16 md:pt-24 pb-14 max-w-3xl animate-pulse">
          <div class="h-3 bg-slate-100 rounded-full w-16 mb-8"></div>
          <div class="h-8 bg-slate-100 rounded-full w-3/4 mb-4"></div>
          <div class="h-8 bg-slate-100 rounded-full w-1/2 mb-8"></div>
          <div class="aspect-[16/9] bg-slate-100 rounded-2xl mb-10"></div>
          <div class="space-y-3">
            @for (i of skeletonLines; track i) {
              <div class="h-3 bg-slate-100 rounded-full" [style.width]="i % 3 === 0 ? '70%' : '100%'"></div>
            }
          </div>
        </div>
      }

      @if (error()) {
        <div class="container mx-auto px-6 pt-32 pb-14 text-center">
          <h1 class="text-2xl font-header font-bold text-dark mb-4">Post not found</h1>
          <p class="text-slate-500 font-medium mb-8">This article may have been moved or deleted.</p>
          <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            <lucide-icon [img]="ArrowLeft" [size]="16" />
            Back to Blog
          </a>
        </div>
      }

      @if (post()) {
        <article class="container mx-auto px-6 pt-16 md:pt-24 pb-20 max-w-3xl">
          <a routerLink="/blog" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-primary transition-colors mb-10">
            <lucide-icon [img]="ArrowLeft" [size]="16" />
            All posts
          </a>

          <header class="mb-10">
            @if (post()!.primaryTag) {
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary mb-4">
                {{ post()!.primaryTag!.name }}
              </span>
            }
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-6">
              {{ post()!.title }}
            </h1>
            <div class="flex items-center gap-4 text-sm text-slate-400 font-semibold">
              <time [attr.datetime]="post()!.publishedAt">
                {{ post()!.publishedAt | date : 'MMMM d, yyyy' }}
              </time>
              <span class="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>{{ post()!.estimatedReadingTime }} min read</span>
            </div>
          </header>

          @if (post()!.featureImageUrl) {
            <div class="rounded-2xl overflow-hidden mb-12 aspect-[16/9] bg-slate-50">
              <img
                [src]="post()!.featureImageUrl!"
                [alt]="post()!.title"
                class="w-full h-full object-cover"
              />
            </div>
          }

          <div
            class="blog-body prose prose-slate prose-lg max-w-none
                   prose-headings:font-header prose-headings:font-bold prose-headings:text-dark prose-headings:tracking-tight
                   prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl
                   prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed
                   prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                   prose-strong:text-dark prose-strong:font-bold
                   prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                   prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-2xl prose-pre:shadow-xl prose-pre:overflow-x-auto
                   prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:text-slate-500
                   prose-img:rounded-2xl prose-img:shadow-sm
                   prose-hr:border-slate-100"
            [innerHTML]="safeHtml()"
          ></div>
        </article>
      }
    </div>
  `,
})
export class BlogPostPageComponent implements OnInit {
  private readonly sanity = inject(SanityService);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly titleSvc = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly ArrowLeft = ArrowLeft;

  post = signal<SanityPost | null>(null);
  safeHtml = signal<SafeHtml>('');
  loading = signal(true);
  error = signal(false);
  readonly skeletonLines = Array.from({ length: 12 }, (_, i) => i);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.sanity.getPostBySlug(slug).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loading.set(false);

        if (post.bodyHtml) {
          this.safeHtml.set(this.sanitizer.bypassSecurityTrustHtml(post.bodyHtml));
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.highlightCode(), 0);
          }
        }

        const seoTitle = post.seoTitle ?? `${post.title} | Deep Variance`;
        const seoDesc = post.seoDescription ?? post.excerpt ?? '';
        const ogImage = post.ogImage ?? post.featureImageUrl ?? 'https://deepvariance.com/meta-dv.png';
        const canonicalUrl = `https://deepvariance.com/blog/${post.slug}`;

        this.titleSvc.setTitle(seoTitle);
        this.meta.updateTag({ name: 'description', content: seoDesc });
        this.meta.updateTag({ property: 'og:title', content: seoTitle });
        this.meta.updateTag({ property: 'og:description', content: seoDesc });
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
        this.meta.updateTag({ property: 'og:image', content: ogImage });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ name: 'twitter:title', content: seoTitle });
        this.meta.updateTag({ name: 'twitter:description', content: seoDesc });
        this.meta.updateTag({ name: 'twitter:image', content: ogImage });
        this.setCanonical(canonicalUrl);
        this.setJsonLd(post, canonicalUrl, ogImage);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      },
    });
  }

  private async highlightCode(): Promise<void> {
    const Prism = await import('prismjs');
    await import('prismjs/components/prism-python');
    Prism.default.highlightAll();
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

  private setJsonLd(post: SanityPost, url: string, image: string): void {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt ?? '',
      image,
      url,
      datePublished: post.publishedAt,
      publisher: {
        '@type': 'Organization',
        name: 'Deep Variance',
        url: 'https://deepvariance.com',
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    };

    let script = this.doc.querySelector('script#blog-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'blog-jsonld';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }
}
