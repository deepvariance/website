import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';

export interface RailSection {
  id: string;
  label: string;
}

/**
 * Neon-style sticky left section rail. IntersectionObserver-driven.
 * Hidden on small screens.
 */
@Component({
  selector: 'app-section-rail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside
      class="hidden 2xl:flex flex-col fixed left-4 top-20 z-30"
      [attr.aria-label]="ariaLabel"
    >
      <ul class="flex flex-col gap-1.5">
        @for (s of sections; track s.id) {
          <li class="flex items-center gap-3 group">
            <span class="rail-dot" [attr.data-active]="active() === s.id"></span>
            <a
              [href]="'#' + s.id"
              (click)="onClick($event, s.id)"
              class="text-[11px] font-mono uppercase tracking-[0.16em] transition-colors"
              [class.text-neon]="active() === s.id"
              [class.text-on-surface-variant]="active() !== s.id"
              [class.opacity-0]="active() !== s.id"
              [class.group-hover:opacity-100]="true"
            >
              {{ s.label }}
            </a>
          </li>
        }
      </ul>
    </aside>
  `,
})
export class SectionRailComponent implements AfterViewInit, OnDestroy {
  @Input() sections: RailSection[] = [];
  @Input() ariaLabel = 'Section navigation';

  readonly active = signal<string>('');
  private observer: IntersectionObserver | null = null;
  private readonly browser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.browser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.browser) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible[0]) {
          this.active.set((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );
    setTimeout(() => {
      this.sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) this.observer?.observe(el);
      });
      if (this.sections[0]) this.active.set(this.sections[0].id);
    }, 0);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onClick(event: Event, id: string): void {
    if (!this.browser) return;
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    }
  }
}
