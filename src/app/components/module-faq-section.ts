import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type { ModuleDef } from '../data/modules';

@Component({
  selector: 'app-module-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (module.faqs.length) {
      <section
        [id]="sectionId"
        class="page-section py-14 md:py-20 border-b border-border"
      >
        <p class="label-caps mb-4">FAQ</p>
        <h2 class="font-display font-bold text-white text-3xl md:text-4xl leading-tight tracking-tight mb-8">
          Common questions
        </h2>
        <dl class="space-y-6">
          @for (faq of module.faqs; track faq.q) {
            <div class="panel-box rounded-xl p-6">
              <dt class="font-display font-semibold text-on-surface mb-2">{{ faq.q }}</dt>
              <dd class="ui-body-sm text-on-surface-variant leading-relaxed">{{ faq.a }}</dd>
            </div>
          }
        </dl>
      </section>
    }
  `,
})
export class ModuleFaqSectionComponent {
  @Input({ required: true }) module!: ModuleDef;
  @Input() sectionId = 'faqs';
}
