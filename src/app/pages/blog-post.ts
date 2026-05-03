import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';

import { SanityPost, SanityService } from '../services/sanity.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, DatePipe],
  template: `
    <div class="relative min-h-screen">
      @if (loading()) {
        <div class="max-w-3xl mx-auto px-6 lg:px-10 pt-32 pb-14 animate-pulse">
          <div class="h-3 bg-white/5 rounded-full w-16 mb-8"></div>
          <div class="h-8 bg-white/5 rounded-full w-3/4 mb-4"></div>
          <div class="h-8 bg-white/5 rounded-full w-1/2 mb-8"></div>
          <div class="aspect-[16/9] bg-white/5 rounded-2xl mb-10"></div>
          <div class="space-y-3">
            @for (i of skeletonLines; track i) {
              <div
                class="h-3 bg-white/5 rounded-full"
                [style.width]="i % 3 === 0 ? '70%' : '100%'"
              ></div>
            }
          </div>
        </div>
      }

      @if (error()) {
        <div class="max-w-2xl mx-auto px-6 pt-32 pb-14 text-center">
          <h1 class="font-display text-2xl font-semibold text-on-surface mb-4">Post not found</h1>
          <p class="text-on-surface-variant mb-8">This article may have been moved or deleted.</p>
          <a
            routerLink="/blog"
            class="inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-[0.16em] text-white hover:text-on-surface-variant transition-colors"
          >
            <lucide-icon [img]="ArrowLeft" [size]="16" />
            Back to Blog
          </a>
        </div>
      }

      @if (post()) {
        <article class="max-w-3xl mx-auto px-6 lg:px-10 pt-32 pb-24">
          <a
            routerLink="/blog"
            class="inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.18em] text-on-surface-variant hover:text-white transition-colors mb-12"
          >
            <lucide-icon [img]="ArrowLeft" [size]="14" />
            All posts
          </a>

          <header class="mb-12">
            @if (post()!.primaryTag) {
              <span class="status-chip mb-6">
                <span class="status-chip__dot"></span>
                {{ post()!.primaryTag!.name }}
              </span>
            }
            <h1
              class="font-display font-bold tracking-tight text-on-surface text-3xl sm:text-4xl md:text-5xl leading-[1.08] mb-6"
            >
              {{ post()!.title }}
            </h1>
            <div
              class="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.18em] text-outline"
            >
              <time [attr.datetime]="post()!.publishedAt">
                {{ post()!.publishedAt | date: 'MMMM d, yyyy' }}
              </time>
              <span class="w-1 h-1 rounded-full bg-outline"></span>
              <span>{{ post()!.estimatedReadingTime }} min read</span>
            </div>
          </header>

          @if (post()!.featureImageUrl) {
            <div
              class="rounded-2xl overflow-hidden mb-14 aspect-[16/9] border border-white/5 bg-black/20"
            >
              <img
                [src]="post()!.featureImageUrl!"
                [alt]="post()!.title"
                class="w-full h-full object-cover"
              />
            </div>
          }

          <div
            class="blog-body prose prose-invert prose-lg max-w-none
                   prose-headings:font-display prose-headings:font-semibold prose-headings:text-on-surface prose-headings:tracking-tight
                   prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                   prose-p:text-on-surface-variant prose-p:font-medium prose-p:leading-relaxed
                   prose-a:text-white prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                   prose-strong:text-on-surface prose-strong:font-semibold
                   prose-li:text-on-surface-variant"
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
  private readonly platformId = inject(PLATFORM_ID);
  private readonly seo = inject(SeoService);

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
        const path = `/blog/${post.slug}`;

        this.seo.set({
          title: seoTitle,
          description: seoDesc,
          path,
          image: ogImage,
          type: 'article',
          jsonLdId: 'blog-jsonld',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt ?? '',
            image: ogImage,
            url: `https://deepvariance.com${path}`,
            datePublished: post.publishedAt,
            publisher: {
              '@type': 'Organization',
              name: 'Deep Variance',
              url: 'https://deepvariance.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://deepvariance.com${path}`,
            },
          },
        });
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
}
