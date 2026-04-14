import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SanityPost, SanityService } from '../services/sanity.service';
import { BlogCardComponent } from '../components/blog-card';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  template: `
    <div class="relative overflow-hidden min-h-screen">
      <div class="absolute inset-0 bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/10 blur-[120px] rounded-full -z-20"></div>

      <section class="container mx-auto px-6 pt-16 md:pt-24 pb-14">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <span class="inline-block text-[10px] font-bold text-primary uppercase tracking-widest mb-6 px-3 py-1.5 bg-primary/10 rounded-full">Blog</span>
          <h1 class="text-4xl sm:text-5xl md:text-7xl font-header font-bold text-dark tracking-tight leading-[1.1] mb-6">
            From the lab.
          </h1>
          <p class="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            Research notes, engineering deep-dives, and infrastructure insights from the Deep Variance team.
          </p>
        </div>

        @if (posts() === null) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            @for (i of skeletons; track i) {
              <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
                <div class="aspect-[16/9] bg-slate-100"></div>
                <div class="p-6 space-y-3">
                  <div class="h-3 bg-slate-100 rounded-full w-1/4"></div>
                  <div class="h-4 bg-slate-100 rounded-full w-3/4"></div>
                  <div class="h-3 bg-slate-100 rounded-full w-full"></div>
                  <div class="h-3 bg-slate-100 rounded-full w-2/3"></div>
                </div>
              </div>
            }
          </div>
        }

        @if (error()) {
          <div class="max-w-md mx-auto text-center py-20">
            <p class="text-slate-400 font-medium text-sm">Unable to load posts. Please try again shortly.</p>
          </div>
        }

        @if (posts() !== null && !error()) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            @for (post of posts()!; track post.slug) {
              <app-blog-card [post]="post" />
            }
          </div>
        }
      </section>
    </div>
  `,
})
export class BlogPageComponent implements OnInit {
  private readonly sanity = inject(SanityService);
  private readonly titleSvc = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  posts = signal<SanityPost[] | null>(null);
  error = signal(false);
  readonly skeletons = [1, 2, 3, 4, 5, 6];

  constructor() {
    this.titleSvc.setTitle('Blog | Deep Variance');
    const desc = 'Research notes, engineering deep-dives, and infrastructure insights from the Deep Variance team.';
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: 'Blog | Deep Variance' });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: 'https://deepvariance.com/blog' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Blog | Deep Variance' });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.setCanonical('https://deepvariance.com/blog');
  }

  ngOnInit(): void {
    this.sanity.getPosts(50).subscribe({
      next: (posts) => this.posts.set(posts),
      error: () => {
        this.error.set(true);
        this.posts.set([]);
      },
    });
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
}
