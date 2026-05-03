import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';

export interface ChipGroup {
  id: string;
  label: string;
  options: string[];
}

export type ChipState = Record<string, string>;

/**
 * Saaspo-style filter chips. Single-select per group; emits the merged state.
 * `__all` is the implicit default per group.
 */
@Component({
  selector: 'app-filter-chips',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      @for (group of groups; track group.id) {
        <div class="flex items-center gap-2 flex-wrap">
          <span class="label-caps text-on-surface-variant/60">
            {{ group.label }}
          </span>
          <button
            type="button"
            class="chip"
            [attr.data-active]="state()[group.id] === '__all'"
            (click)="select(group.id, '__all')"
          >
            All
          </button>
          @for (opt of group.options; track opt) {
            <button
              type="button"
              class="chip"
              [attr.data-active]="state()[group.id] === opt"
              (click)="select(group.id, opt)"
            >
              {{ opt }}
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class FilterChipsComponent {
  @Input() groups: ChipGroup[] = [];
  @Output() readonly stateChange = new EventEmitter<ChipState>();

  readonly state = signal<ChipState>({});

  ngOnInit(): void {
    const initial: ChipState = {};
    this.groups.forEach((g) => (initial[g.id] = '__all'));
    this.state.set(initial);
  }

  select(groupId: string, option: string): void {
    this.state.update((cur) => ({ ...cur, [groupId]: option }));
    this.stateChange.emit(this.state());
  }
}
