import { CommonModule } from '@angular/common';
import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface ToolItem {
  name: string;
  /** Optional inline SVG string. Rendered via DomSanitizer. */
  logo?: string;
  /** Optional image path (WebP/PNG). Rendered as <img> with greyscale filter. */
  imgSrc?: string;
  imgWidth?: number;
  imgHeight?: number;
}

@Component({
  selector: 'app-tool-strip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      @if (label) {
        <p class="label-caps text-center mb-5" style="color:#8a8a8a">{{ label }}</p>
      }
      <div class="tool-strip-mask">
        <div class="flex items-center justify-center gap-x-10 md:gap-x-14 gap-y-5 flex-wrap px-2">
          @for (tool of tools; track tool.name) {
            <span class="inline-flex items-center">
              @if (tool.imgSrc) {
                <img
                  [src]="tool.imgSrc"
                  [alt]="tool.name"
                  [width]="tool.imgWidth || 80"
                  [height]="tool.imgHeight || 28"
                  class="h-7 w-auto"
                  style="filter:grayscale(1) brightness(3);opacity:0.45"
                  loading="lazy"
                />
              } @else if (tool.logo) {
                <span class="inline-flex items-center text-on-surface-variant/55 hover:text-on-surface-variant transition-colors" [innerHTML]="sanitize(tool.logo)"></span>
              } @else {
                <span class="font-display font-semibold text-sm tracking-[0.12em] uppercase text-on-surface-variant/55 hover:text-on-surface-variant transition-colors">{{ tool.name }}</span>
              }
            </span>
          }
        </div>
      </div>
    </div>
  `,
})
export class ToolStripComponent {
  @Input() label: string | null = 'Works with';
  @Input() tools: ToolItem[] = [];

  constructor(private san: DomSanitizer) {}

  sanitize(svg: string): SafeHtml {
    return this.san.bypassSecurityTrustHtml(svg);
  }
}
