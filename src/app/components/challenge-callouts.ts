import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface ChallengeCallout {
  icon?: LucideIconData;
  highlight: string;
  body: string;
}

@Component({
  selector: 'app-challenge-callouts',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="dv-panel rounded-xl p-6 md:p-10">
      <h2 class="font-display font-bold text-white text-3xl md:text-4xl tracking-tight mb-3 max-w-3xl">
        {{ headline }}
      </h2>
      @if (subhead) {
        <p class="font-mono text-on-surface-variant max-w-2xl mb-8 leading-relaxed">{{ subhead }}</p>
      }
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        @for (item of items; track item.highlight) {
          <div class="dv-card rounded-xl p-5 flex flex-col gap-3">
            @if (item.icon) {
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-md text-on-surface-variant bg-surface-dim border border-border">
                <lucide-icon [img]="item.icon" [size]="16" />
              </span>
            }
            <p class="font-mono text-sm text-on-surface-variant leading-relaxed">
              <span class="font-display font-semibold text-white">{{ item.highlight }}</span>
              {{ item.body }}
            </p>
          </div>
        }
      </div>
    </div>
  `,
})
export class ChallengeCalloutsComponent {
  @Input() headline = '';
  @Input() subhead: string | null = null;
  @Input() items: ChallengeCallout[] = [];
}
