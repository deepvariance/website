import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowUpRight,
  Check,
  Copy,
  LucideAngularModule,
} from 'lucide-angular';

/**
 * Mastra-style inline command pill + secondary link.
 * `$ pip install deep-variance` (copyable) | Quickstart →
 */
@Component({
  selector: 'app-command-row',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        (click)="copy()"
        class="group inline-flex items-center gap-2 pl-3 pr-2 py-2 rounded-md font-mono text-[13px] text-on-surface bg-black/30 border border-white/10 hover:border-neon/45 transition-colors"
      >
        <span class="text-neon select-none">$</span>
        <span class="text-on-surface">{{ command }}</span>
        <span
          class="ml-1 inline-flex items-center justify-center w-7 h-7 rounded text-outline group-hover:text-neon transition-colors"
        >
          @if (copied()) {
            <lucide-icon [img]="Check" [size]="14" />
          } @else {
            <lucide-icon [img]="Copy" [size]="14" />
          }
        </span>
      </button>

      @if (linkLabel) {
        @if (routerLink) {
          <a
            [routerLink]="routerLink"
            [fragment]="fragment ?? undefined"
            class="inline-flex items-center gap-1 text-sm font-display font-semibold text-neon hover:text-white transition-colors"
          >
            {{ linkLabel }}
            <lucide-icon [img]="ArrowUpRight" [size]="14" />
          </a>
        } @else if (href) {
          <a
            [href]="href"
            class="inline-flex items-center gap-1 text-sm font-display font-semibold text-neon hover:text-white transition-colors"
          >
            {{ linkLabel }}
            <lucide-icon [img]="ArrowUpRight" [size]="14" />
          </a>
        }
      }
    </div>
  `,
})
export class CommandRowComponent {
  @Input() command = 'pip install deep-variance';
  @Input() linkLabel: string | null = 'Quickstart';
  @Input() routerLink: string | null = null;
  @Input() href: string | null = null;
  @Input() fragment: string | null = null;

  readonly copied = signal(false);
  readonly Copy = Copy;
  readonly Check = Check;
  readonly ArrowUpRight = ArrowUpRight;

  private readonly browser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.browser = isPlatformBrowser(platformId);
  }

  copy(): void {
    if (!this.browser) return;
    try {
      navigator.clipboard.writeText(this.command);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      /* noop */
    }
  }
}
