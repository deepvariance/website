import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

import { StepColor, StepPillComponent } from './step-pill';

export interface PipelineStep {
  label: string;
  caption: string;
  body?: string;
  color: StepColor;
  icon?: LucideIconData;
  /** Optional inline mock content (HTML / text) rendered in a code/mock area. */
  mockHtml?: string;
}

/**
 * CallSine-style 4-up pipeline row.
 * Each step: color-coded pill, mock area, caption.
 */
@Component({
  selector: 'app-pipeline-row',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StepPillComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      @for (step of steps; track step.label; let i = $index) {
        <div class="relative flex flex-col">
          <div class="mb-3 flex items-center gap-2">
            <app-step-pill
              [index]="i + 1"
              [label]="step.label"
              [color]="step.color"
            />
          </div>
          <div
            class="glass-card rounded-xl p-5 flex-1 flex flex-col min-h-[160px]"
          >
            @if (step.icon) {
              <div class="dv-step-icon mb-4">
                <lucide-icon [img]="step.icon" [size]="18" />
              </div>
            }
            @if (step.mockHtml) {
              <div
                class="mb-3 font-mono text-[11px] leading-relaxed text-on-surface-variant"
                [innerHTML]="step.mockHtml"
              ></div>
            }
            @if (step.body) {
              <p class="text-xs text-on-surface-variant leading-relaxed">
                {{ step.body }}
              </p>
            }
          </div>
          <p class="mt-3 text-xs text-on-surface-variant/80 leading-snug">
            {{ step.caption }}
          </p>
          @if (i < steps.length - 1) {
            <div
              class="hidden lg:block absolute right-[-14px] top-[34px] text-outline/60 text-xs"
              aria-hidden="true"
            >
              →
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .dv-step-icon {
        @apply inline-flex items-center justify-center w-9 h-9 rounded-md text-neon;
        background: rgba(157, 111, 255, 0.06);
        border: 1px solid rgba(157, 111, 255, 0.22);
      }
    `,
  ],
})
export class PipelineRowComponent {
  @Input() steps: PipelineStep[] = [];
}
