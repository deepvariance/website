import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';

export interface AccordionItem {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  /** Optional left-side mock content (HTML). Renders inside a code-window-ish frame. */
  mockHtml?: string;
}

/**
 * Mirai-style vertical accordion. Each open row pairs a left mock with right copy.
 */
@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-3">
      @for (item of items; track item.id) {
        <div
          class="glass-card rounded-xl overflow-hidden transition-all"
          [class.ring-1]="open() === item.id"
          [class.ring-neon]="open() === item.id"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left"
            (click)="toggle(item.id)"
            [attr.aria-expanded]="open() === item.id"
          >
            <span
              class="font-display text-base md:text-lg font-semibold"
              [class.text-neon-bright]="open() === item.id"
              [class.text-on-surface]="open() !== item.id"
            >
              {{ item.title }}
            </span>
            <span
              class="text-outline transition-transform duration-300"
              [class.rotate-180]="open() === item.id"
            >
              <lucide-icon [img]="ChevronDown" [size]="18" />
            </span>
          </button>

          @if (open() === item.id) {
            <div
              class="grid grid-cols-1 md:grid-cols-12 gap-5 px-5 md:px-6 pb-6 border-t border-white/5 pt-5"
            >
              @if (item.mockHtml) {
                <div
                  class="md:col-span-7 code-window p-4 font-mono text-[12px] text-on-surface-variant leading-relaxed overflow-auto max-h-[240px]"
                  [innerHTML]="item.mockHtml"
                ></div>
              }
              <div [class.md:col-span-12]="!item.mockHtml" [class.md:col-span-5]="item.mockHtml">
                <p class="text-sm text-on-surface-variant leading-relaxed mb-4">
                  {{ item.body }}
                </p>
                @if (item.bullets?.length) {
                  <ul class="space-y-2 text-sm text-on-surface">
                    @for (b of item.bullets ?? []; track b) {
                      <li class="flex items-start gap-2">
                        <span class="text-neon mt-1">✓</span>
                        <span class="text-on-surface-variant">{{ b }}</span>
                      </li>
                    }
                  </ul>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() defaultOpen: string | null = null;

  readonly ChevronDown = ChevronDown;
  readonly open = signal<string | null>(null);

  ngOnInit(): void {
    if (this.defaultOpen) {
      this.open.set(this.defaultOpen);
    } else if (this.items?.length) {
      this.open.set(this.items[0].id);
    }
  }

  toggle(id: string): void {
    this.open.update((cur) => (cur === id ? null : id));
  }
}
