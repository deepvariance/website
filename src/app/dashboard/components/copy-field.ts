import { Component, Input, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Copy, Check } from 'lucide-angular';

@Component({
  selector: 'app-copy-field',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="cf-wrap">
      @if (label) { <span class="cf-label">{{ label }}</span> }
      <div class="cf-row">
        <span class="cf-value" [class.cf-value--secret]="secret">{{ display }}</span>
        <button class="cf-btn" (click)="copy()" [attr.aria-label]="'Copy ' + (label || 'value')">
          <lucide-icon [img]="copied() ? Check : Copy" [size]="13" />
          <span>{{ copied() ? 'Copied' : 'Copy' }}</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cf-wrap { display: flex; flex-direction: column; gap: 4px; }
    .cf-label { font-family: var(--font-body); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
    .cf-row {
      display: flex;
      align-items: center;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px;
      overflow: hidden;
    }
    .cf-value {
      flex: 1;
      padding: 8px 12px;
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--text-secondary);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cf-value--secret { letter-spacing: 0.04em; color: var(--text-muted); }
    .cf-btn {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 12px;
      border: none;
      border-left: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.04);
      color: var(--text-secondary);
      font-family: var(--font-body);
      font-size: 11px;
      cursor: pointer;
      transition: all 150ms;
    }
    .cf-btn:hover { background: rgba(255,255,255,0.08); color: var(--text-primary); }
  `],
})
export class CopyFieldComponent {
  private platformId = inject(PLATFORM_ID);

  @Input({ required: true }) value = '';
  @Input() label = '';
  @Input() secret = false;

  readonly Copy = Copy;
  readonly Check = Check;
  readonly copied = signal(false);

  get display(): string {
    return this.value;
  }

  copy() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.value).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {});
  }
}
