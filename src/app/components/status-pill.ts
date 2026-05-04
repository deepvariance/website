import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';

export type StatusVariant = 'live' | 'beta' | 'preview' | 'soon';

interface VariantConfig {
  dot: string;
  bg: string;
  border: string;
  text: string;
}

const VARIANT_MAP: Record<StatusVariant, VariantConfig> = {
  live:    { dot: '#ffffff', bg: '#111111', border: '#2a2a2a', text: '#a3a3a3' },
  beta:    { dot: '#e5e5e5', bg: '#111111', border: '#2a2a2a', text: '#737373' },
  preview: { dot: '#737373', bg: '#111111', border: '#1a1a1a', text: '#737373' },
  soon:    { dot: '#404040', bg: '#0a0a0a', border: '#1a1a1a', text: '#525252' },
};

@Component({
  selector: 'app-status-pill',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest"
      [style.background]="cfg().bg"
      [style.border]="'1px solid ' + cfg().border"
      [style.color]="cfg().text"
    >
      <span
        class="inline-flex w-1.5 h-1.5 rounded-full flex-shrink-0"
        [style.background]="cfg().dot"
      ></span>
      <ng-content></ng-content>
    </span>
  `,
})
export class StatusPillComponent {
  private readonly _variant = signal<StatusVariant>('live');

  @Input()
  set variant(value: StatusVariant) { this._variant.set(value); }

  readonly cfg = computed(() => VARIANT_MAP[this._variant()]);
}
