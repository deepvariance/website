import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { BlogCardComponent } from '../components/blog-card';
import { GlassCardComponent } from '../components/glass-card';
import { SanityPost, SanityService } from '../services/sanity.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, GlassCardComponent],
  template: `
    <div class="relative">
      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 pb-12 md:pt-40 md:pb-16">
        <div aria-hidden="true" class="hero-halo-neon top-12 left-1/2 -translate-x-1/2 opacity-70"></div>
        <div aria-hidden="true" class="hero-halo-indigo right-[-10%] top-12"></div>

        <div class="relative max-w-3xl mx-auto text-center">
          <span class="status-chip mx-auto mb-7">
            <span class="status-chip__dot"></span>
            Notes from the lab
          </span>
          <h1 class="font-display font-bold tracking-tight text-on-surface text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] mb-6">
            From the
            <span class="text-white">lab</span>.
          </h1>
          <p class="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed">
            Research notes, engineering deep-dives, and infrastructure insights from the Deep
            Variance team.
          </p>
        </div>
      </section>

      <section class="relative max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        @if (posts() === null) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @for (i of skeletons; track i) {
              <div class="glass-card rounded-xl overflow-hidden animate-pulse">
                <div class="aspect-[16/9] bg-white/5"></div>
                <div class="p-6 space-y-3">
                  <div class="h-3 bg-white/5 rounded-full w-1/4"></div>
                  <div class="h-4 bg-white/5 rounded-full w-3/4"></div>
                  <div class="h-3 bg-white/5 rounded-full w-full"></div>
                  <div class="h-3 bg-white/5 rounded-full w-2/3"></div>
                </div>
              </div>
            }
          </div>
        }

        @if (error()) {
          <div class="max-w-md mx-auto text-center py-16">
            <p class="text-on-surface-variant font-mono uppercase tracking-[0.16em] text-sm">
              Unable to load posts. Please try again shortly.
            </p>
          </div>
        }

        @if (posts() !== null && !error() && posts()!.length === 0) {
          <app-glass-card extraClass="max-w-lg mx-auto py-12 px-6 text-center">
            <h3 class="font-display text-2xl font-semibold text-on-surface mb-2">No posts yet</h3>
            <p class="text-on-surface-variant">Check back soon.</p>
          </app-glass-card>
        }

        @if (posts() !== null && !error() && posts()!.length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
  private readonly seo = inject(SeoService);

  posts = signal<SanityPost[] | null>(null);
  error = signal(false);
  readonly skeletons = [1, 2, 3, 4, 5, 6];

  constructor() {
    this.seo.set({
      title: 'Blog | Deep Variance',
      description:
        'Research notes, engineering deep-dives, and infrastructure insights from the Deep Variance team.',
      path: '/blog',
    });
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
}
