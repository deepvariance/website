import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-window',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-window relative">
      <!-- Title bar with traffic lights -->
      <div
        class="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-black/30"
      >
        <div class="flex gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/60"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500/60"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-500/60"></span>
        </div>
        <span class="ml-3 text-[11px] font-mono text-on-surface-variant tracking-wider">{{ filename }}</span>
        @if (language) {
          <span class="ml-auto text-[10px] font-mono uppercase tracking-[0.2em] text-outline">
            {{ language }}
          </span>
        }
      </div>

      <!-- Body -->
      <div class="p-6 font-mono text-[13px] leading-relaxed text-on-surface-variant overflow-x-auto">
        <ng-content />
      </div>

      <!-- Optional console output footer -->
      @if (output) {
        <div
          class="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-black/30 text-[10px] font-mono uppercase tracking-[0.18em]"
        >
          <span class="text-outline">{{ outputLabel }}</span>
          <span class="text-neon">{{ output }}</span>
        </div>
      }
    </div>
  `,
})
export class CodeWindowComponent {
  @Input() filename = 'main.py';
  @Input() language = '';
  @Input() output = '';
  @Input() outputLabel = 'Output';
}
