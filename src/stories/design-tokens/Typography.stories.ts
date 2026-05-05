import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

// Mirrors tailwind.config.js fontSize + fontFamily exactly.
// These are the ONLY sizes that may be used across the site.

const TYPE_SCALE = [
  { token: 'display',    size: '62px', lh: '1.04', weight: '700', usage: 'Hero h1 — one per page only' },
  { token: 'h1',         size: '46px', lh: '1.08', weight: '700', usage: 'Page-level headings' },
  { token: 'h2',         size: '30px', lh: '1.2',  weight: '700', usage: 'Section headings via app-section-header' },
  { token: 'h3',         size: '22px', lh: '1.3',  weight: '600', usage: 'Card headings' },
  { token: 'body-lg',    size: '17px', lh: '1.65', weight: '400', usage: 'Lead paragraph' },
  { token: 'body-md',    size: '15px', lh: '1.6',  weight: '400', usage: 'Standard body copy' },
  { token: 'label-caps', size: '11px', lh: '1',    weight: '600', usage: 'Eyebrow labels — use .label-caps class only' },
  { token: 'label-mono', size: '13px', lh: '1',    weight: '500', usage: 'Mono labels — use .label-mono class only' },
];

const RESPONSIVE = [
  { name: 'Hero h1', mobile: 'text-2xl (24px)', sm: 'text-5xl (48px)', md: 'text-[3.7rem] (59px)', note: 'Fixed — no page overrides' },
  { name: 'Section h2', mobile: 'text-3xl (30px)', sm: 'text-4xl (36px)', md: 'text-5xl (48px)', note: 'Via app-section-header only' },
];

const FAMILIES = [
  { name: 'display / sans / editorial', value: 'Space Grotesk', usage: 'Headings, labels, UI chrome' },
  { name: 'body / mono',                value: 'IBM Plex Mono', usage: 'Body copy, code, captions' },
];

@Component({
  standalone: true,
  template: `
    <div style="background:#000;padding:32px;font-family:IBM Plex Mono,monospace;color:#fff">

      <section style="margin-bottom:48px">
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Font Families</p>
        @for (f of families; track f.name) {
          <div style="margin-bottom:20px;padding:20px;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:8px">
            <p style="font-family:{{ f.value }},system-ui;font-size:28px;font-weight:700;margin:0 0 8px">
              {{ f.value }} — The quick brown fox
            </p>
            <code style="font-size:11px;color:#737373">font-{{ f.name }} → {{ f.usage }}</code>
          </div>
        }
      </section>

      <section style="margin-bottom:48px">
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Type Scale</p>
        @for (s of scale; track s.token) {
          <div style="display:flex;align-items:baseline;gap:24px;padding:16px 0;border-bottom:1px solid #111">
            <code style="width:96px;font-size:10px;color:#525252;flex-shrink:0">{{ s.token }}</code>
            <span [style.font-size]="s.size" [style.line-height]="s.lh" [style.font-weight]="s.weight"
                  style="font-family:Space Grotesk,system-ui;flex:1">
              {{ s.token }} — {{ s.size }}
            </span>
            <p style="font-size:10px;color:#737373;flex-shrink:0;max-width:260px;text-align:right">{{ s.usage }}</p>
          </div>
        }
      </section>

      <section>
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Responsive Heading Rules (strict)</p>
        <table style="width:100%;border-collapse:collapse;font-size:11px">
          <thead>
            <tr style="border-bottom:1px solid #2a2a2a;color:#737373">
              <th style="text-align:left;padding:8px 0">Element</th>
              <th style="text-align:left;padding:8px 12px">Mobile</th>
              <th style="text-align:left;padding:8px 12px">sm (640px+)</th>
              <th style="text-align:left;padding:8px 12px">md (768px+)</th>
              <th style="text-align:left;padding:8px 0">Rule</th>
            </tr>
          </thead>
          <tbody>
            @for (r of responsive; track r.name) {
              <tr style="border-bottom:1px solid #111;color:#a3a3a3">
                <td style="padding:10px 0;color:#fff;font-weight:600">{{ r.name }}</td>
                <td style="padding:10px 12px">{{ r.mobile }}</td>
                <td style="padding:10px 12px">{{ r.sm }}</td>
                <td style="padding:10px 12px">{{ r.md }}</td>
                <td style="padding:10px 0;color:#525252">{{ r.note }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

    </div>
  `,
})
class TypographyComponent {
  scale = TYPE_SCALE;
  families = FAMILIES;
  responsive = RESPONSIVE;
}

const meta: Meta<TypographyComponent> = {
  title: 'Design Tokens/Typography',
  component: TypographyComponent,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const TypeScale: StoryObj<TypographyComponent> = {};
