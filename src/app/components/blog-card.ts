import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { SanityPost } from '../services/sanity.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, DatePipe],
  template: `
    <a
      [routerLink]="['/blog', post.slug]"
      class="glass-card rounded-xl flex flex-col overflow-hidden group h-full"
    >
      @if (post.featureImageUrl) {
        <div class="aspect-[16/9] overflow-hidden flex-shrink-0 relative">
          <img
            [src]="post.featureImageUrl"
            [alt]="post.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/85 via-surface-container-lowest/15 to-transparent"
          ></div>
        </div>
      }

      <div class="p-6 flex flex-col flex-1">
        @if (post.primaryTag) {
          <span class="label-caps mb-3 text-neon">
            {{ post.primaryTag.name }}
          </span>
        }

        <h3
          class="font-display text-lg font-semibold text-on-surface leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2"
        >
          {{ post.title }}
        </h3>

        @if (post.excerpt) {
          <p class="text-sm text-on-surface-variant leading-relaxed mb-6 flex-1 line-clamp-3">
            {{ post.excerpt }}
          </p>
        }

        <div
          class="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-outline"
        >
          <time [attr.datetime]="post.publishedAt">
            {{ post.publishedAt | date: 'MMM d, yyyy' }}
          </time>
          <span class="inline-flex items-center gap-1 text-neon">
            Read
            <lucide-icon [img]="ArrowRight" [size]="12" />
          </span>
        </div>
      </div>
    </a>
  `,
})
export class BlogCardComponent {
  @Input({ required: true }) post!: SanityPost;

  readonly ArrowRight = ArrowRight;
}
