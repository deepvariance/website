import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const SPACING = [
  { token: 'gutter',             value: '20px', usage: 'Column/card inner gap' },
  { token: 'card-padding',       value: '24px', usage: 'Default card padding' },
  { token: 'container-margin',   value: '32px', usage: 'Outer container margin' },
  { token: 'container-max',      value: '1440px', usage: 'max-w-[1440px] on every section' },
];

const SECTION_PADDING = [
  { name: 'Section vertical',  classes: 'py-14 md:py-20', mobile: '56px', desktop: '80px' },
  { name: 'Section horizontal', classes: 'px-6 lg:px-10', mobile: '24px', desktop: '40px' },
];

const RADIUS = [
  { token: 'sm',   value: '4px',    usage: 'Subtle rounding' },
  { token: 'md',   value: '8px',    usage: 'Inputs, chips' },
  { token: 'lg',   value: '12px',   usage: 'Default card radius' },
  { token: 'xl',   value: '16px',   usage: 'Large cards' },
  { token: '2xl',  value: '24px',   usage: 'Hero image containers' },
  { token: 'full', value: '9999px', usage: 'Pills, badges' },
];

@Component({
  standalone: true,
  template: `
    <div style="background:#000;padding:32px;font-family:IBM Plex Mono,monospace;color:#fff">

      <section style="margin-bottom:48px">
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Spacing Tokens</p>
        <div style="display:flex;flex-direction:column;gap:12px">
          @for (s of spacing; track s.token) {
            <div style="display:flex;align-items:center;gap:24px;padding:14px 20px;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:8px">
              <div [style.width]="s.value === '1440px' ? '100%' : s.value"
                   style="max-width:200px;height:8px;background:#ffffff;border-radius:2px;flex-shrink:0"></div>
              <code style="font-size:11px;color:#a3a3a3;min-width:180px">spacing-{{ s.token }} = {{ s.value }}</code>
              <p style="font-size:11px;color:#525252;margin:0">{{ s.usage }}</p>
            </div>
          }
        </div>
      </section>

      <section style="margin-bottom:48px">
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Section Container Pattern (locked)</p>
        <div style="padding:20px;background:#0a0a0a;border:1px solid #2a2a2a;border-radius:8px;margin-bottom:12px">
          <code style="font-size:12px;color:#e5e5e5">max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20</code>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:11px">
          <thead>
            <tr style="border-bottom:1px solid #2a2a2a;color:#737373">
              <th style="text-align:left;padding:8px 0">Property</th>
              <th style="text-align:left;padding:8px 12px">Classes</th>
              <th style="text-align:left;padding:8px 12px">Mobile</th>
              <th style="text-align:left;padding:8px 0">Desktop</th>
            </tr>
          </thead>
          <tbody>
            @for (r of sectionPadding; track r.name) {
              <tr style="border-bottom:1px solid #111;color:#a3a3a3">
                <td style="padding:10px 0;color:#fff">{{ r.name }}</td>
                <td style="padding:10px 12px"><code style="font-size:11px">{{ r.classes }}</code></td>
                <td style="padding:10px 12px">{{ r.mobile }}</td>
                <td style="padding:10px 0">{{ r.desktop }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <section>
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Border Radius</p>
        <div style="display:flex;flex-wrap:wrap;gap:16px">
          @for (r of radius; track r.token) {
            <div style="text-align:center">
              <div style="width:80px;height:80px;background:#1a1a1a;border:1px solid #2a2a2a;margin-bottom:8px"
                   [style.border-radius]="r.value"></div>
              <code style="font-size:10px;color:#a3a3a3;display:block">rounded-{{ r.token }}</code>
              <p style="font-size:10px;color:#525252;margin:4px 0 0">{{ r.value }}</p>
              <p style="font-size:9px;color:#404040;margin:2px 0 0">{{ r.usage }}</p>
            </div>
          }
        </div>
      </section>

    </div>
  `,
})
class SpacingComponent {
  spacing = SPACING;
  sectionPadding = SECTION_PADDING;
  radius = RADIUS;
}

const meta: Meta<SpacingComponent> = {
  title: 'Design Tokens/Spacing & Radius',
  component: SpacingComponent,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const SpacingAndRadius: StoryObj<SpacingComponent> = {};
