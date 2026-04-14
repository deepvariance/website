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
      class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col overflow-hidden group"
    >
      @if (post.featureImageUrl) {
        <div class="aspect-[16/9] overflow-hidden bg-slate-50 flex-shrink-0">
          <img
            [src]="post.featureImageUrl"
            [alt]="post.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      }

      <div class="p-6 flex flex-col flex-1">
        @if (post.primaryTag) {
          <span class="inline-flex items-center self-start px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary mb-3">
            {{ post.primaryTag.name }}
          </span>
        }

        <h3 class="text-base font-header font-bold text-dark leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {{ post.title }}
        </h3>

        @if (post.excerpt) {
          <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4 flex-1 line-clamp-3">
            {{ post.excerpt }}
          </p>
        }

        <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <time [attr.datetime]="post.publishedAt">
            {{ post.publishedAt | date : 'MMM d, yyyy' }}
          </time>
          <span>{{ post.estimatedReadingTime }} min read</span>
        </div>
      </div>
    </a>
  `,
})
export class BlogCardComponent {
  @Input({ required: true }) post!: SanityPost;

  readonly ArrowRight = ArrowRight;
}
