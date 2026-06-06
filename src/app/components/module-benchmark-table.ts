import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type { ModuleDef } from '../data/modules';

@Component({
  selector: 'app-module-benchmark-table',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (module.benchmarkRows.length) {
    <section
      [id]="sectionId"
      class="page-section py-14 md:py-20 border-b border-border"
    >
      <p class="label-caps mb-4">Benchmarks</p>
      <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-6">
        Measured results
      </h2>
      <div class="overflow-x-auto rounded-xl border border-border">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="px-4 py-3 ui-table-head text-on-surface-variant">Metric</th>
              <th class="px-4 py-3 ui-table-head text-on-surface-variant">Baseline</th>
              <th class="px-4 py-3 ui-table-head text-on-surface-variant">Deep Variance</th>
              <th class="px-4 py-3 ui-table-head text-on-surface-variant">Delta</th>
            </tr>
          </thead>
          <tbody>
            @for (row of module.benchmarkRows; track row.label) {
              <tr class="border-b border-border last:border-0">
                <td class="px-4 py-3 text-on-surface-variant">{{ row.label }}</td>
                <td class="px-4 py-3 ui-body-sm text-on-surface-variant">{{ row.baseline }}</td>
                <td class="px-4 py-3 font-body text-white">{{ row.deepVariance }}</td>
                <td class="px-4 py-3 font-body text-neon">{{ row.delta }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      @if (module.benchmarkNote) {
        <p class="ui-body-sm text-on-surface-variant mt-4 leading-relaxed">{{ module.benchmarkNote }}</p>
      }
    </section>
  }
  `,
})
export class ModuleBenchmarkTableComponent {
  @Input({ required: true }) module!: ModuleDef;
  @Input() sectionId = 'benchmark-data';
}
