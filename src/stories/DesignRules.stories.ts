import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

// ──────────────────────────────────────────────────────────────────────────────
// Deep Variance Design Rules
// Authoritative reference for every design decision on the site.
// If a pattern is not documented here, do NOT invent it — raise it first.
// ──────────────────────────────────────────────────────────────────────────────

const RULES = [
  {
    section: 'Typography — Hero h1',
    rule: 'One per page. Sizes are LOCKED — never add a page-level override.',
    code: `<h1 class="font-display font-bold tracking-tight text-on-surface
           text-2xl sm:text-5xl md:text-[3.7rem] leading-[1.04]">
  Heading text
</h1>`,
    table: [
      { key: 'mobile', val: '24px (text-2xl)' },
      { key: 'sm 640px+', val: '48px (text-5xl)' },
      { key: 'md 768px+', val: '59px (text-[3.7rem])' },
    ],
  },
  {
    section: 'Typography — Section h2',
    rule: 'Always use <app-section-header>. Never write a raw <h2> in page templates.',
    code: `<app-section-header eyebrow="The problem" subhead="..." align="center">
  Section heading
</app-section-header>`,
    table: [
      { key: 'Sizes (locked in component)', val: 'text-3xl sm:text-4xl md:text-5xl leading-tight' },
    ],
  },
  {
    section: 'Typography — Body copy',
    rule: 'font-mono text-base text-on-surface-variant leading-relaxed — never use text-sm or text-lg for body',
    code: `<p class="font-mono text-base text-on-surface-variant leading-relaxed">
  Body text here.
</p>`,
    table: [],
  },
  {
    section: 'Typography — Labels / eyebrows',
    rule: 'Use the .label-caps utility class ONLY. Do not recreate manually.',
    code: `<p class="label-caps">The problem</p>`,
    table: [
      { key: 'label-caps', val: '11px / tracking-[0.12em] / uppercase / font-semibold' },
    ],
  },
  {
    section: 'Cards and surfaces',
    rule: 'Never use raw .dv-card or .dv-panel classes in page templates. Use <app-glass-card>.',
    code: `<!-- Correct -->
<app-glass-card variant="card" rounded="xl">
  <!-- content -->
</app-glass-card>`,
    table: [
      { key: 'card', val: 'Interactive card with hover border transition' },
      { key: 'panel', val: 'Static non-interactive surface' },
      { key: 'strong', val: 'Emphasized panel (border-mid)' },
      { key: 'kpi-rail', val: 'Stat/metric display containers' },
    ],
  },
  {
    section: 'Buttons',
    rule: 'Always use <app-cta-button>. Never recreate button styles with raw classes.',
    code: `<app-cta-button variant="primary" size="lg">Get early access</app-cta-button>
<app-cta-button variant="glass" size="lg">View docs</app-cta-button>
<app-cta-button variant="ghost" size="md" [showArrow]="false">Learn more</app-cta-button>`,
    table: [
      { key: 'primary', val: 'Primary CTA — one per hero/section max' },
      { key: 'glass', val: 'Secondary CTA alongside primary' },
      { key: 'ghost', val: 'Inline text-link style action' },
    ],
  },
  {
    section: 'Section container pattern',
    rule: 'Every <section> must use this exact class combination.',
    code: `<section class="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 md:py-20 border-b border-border">
  <!-- content -->
</section>`,
    table: [
      { key: 'Max width', val: 'max-w-[1440px]' },
      { key: 'Horizontal padding', val: 'px-6 lg:px-10' },
      { key: 'Vertical padding', val: 'py-14 md:py-20' },
      { key: 'Bottom border', val: 'border-b border-border' },
    ],
  },
  {
    section: '50/50 section layout',
    rule: 'Every section with content must pair text with a visual at roughly equal weight. Do not wrap entire sections in a card.',
    code: `<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
  <!-- Left: visual (image, diagram, stats) -->
  <div>...</div>
  <!-- Right: text (heading + body + bullets) -->
  <div>...</div>
</div>`,
    table: [],
  },
  {
    section: 'Images in sections',
    rule: 'No border wrappers. All images use mix-blend-mode: screen + radial mask.',
    code: `<img
  src="/image.webp"
  class="w-full h-auto"
  style="mix-blend-mode: screen; mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)"
/>`,
    table: [],
  },
];

const DO_NOTS = [
  'Add desk:text-[...] font size overrides to h1 headings',
  'Write raw <h2> tags in page templates',
  'Use hex color values directly in style="" attributes',
  'Use text-sm or text-lg for body copy',
  'Add border border-border wrappers around section images',
  'Use opacity on section images instead of mix-blend-mode: screen',
  'Create new button styles outside cta-button.ts',
  'Recreate .label-caps with raw Tailwind classes',
];

@Component({
  standalone: true,
  template: `
    <div style="background:#000;color:#fff;font-family:IBM Plex Mono,monospace;padding:40px;max-width:1100px;margin:0 auto">

      <h1 style="font-family:Space Grotesk,system-ui;font-size:36px;font-weight:700;margin:0 0 8px">
        Deep Variance Design Rules
      </h1>
      <p style="font-size:13px;color:#737373;margin:0 0 48px">
        Authoritative reference for every design decision on the site.
        If a pattern is not documented here, do NOT invent it.
      </p>

      @for (r of rules; track r.section) {
        <div style="margin-bottom:48px;padding-bottom:48px;border-bottom:1px solid #1a1a1a">
          <h2 style="font-family:Space Grotesk,system-ui;font-size:18px;font-weight:600;margin:0 0 8px;color:#fff">
            {{ r.section }}
          </h2>
          <p style="font-size:12px;color:#a3a3a3;margin:0 0 16px">{{ r.rule }}</p>
          <pre style="background:#0a0a0a;border:1px solid #1a1a1a;border-radius:8px;padding:16px;font-size:12px;color:#d4d4d4;overflow-x:auto;margin:0 0 16px;white-space:pre-wrap">{{ r.code }}</pre>
          @if (r.table.length > 0) {
            <table style="border-collapse:collapse;font-size:11px;width:100%">
              @for (row of r.table; track row.key) {
                <tr style="border-bottom:1px solid #111">
                  <td style="padding:8px 16px 8px 0;color:#737373;width:200px">{{ row.key }}</td>
                  <td style="padding:8px 0;color:#a3a3a3"><code>{{ row.val }}</code></td>
                </tr>
              }
            </table>
          }
        </div>
      }

      <div>
        <h2 style="font-family:Space Grotesk,system-ui;font-size:18px;font-weight:600;margin:0 0 16px;color:#ef4444">
          Do NOT
        </h2>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
          @for (item of donots; track item) {
            <li style="display:flex;align-items:center;gap:12px;font-size:12px;color:#737373">
              <span style="color:#ef4444;font-size:16px;flex-shrink:0">✗</span>
              {{ item }}
            </li>
          }
        </ul>
      </div>

    </div>
  `,
})
class DesignRulesComponent {
  rules = RULES;
  donots = DO_NOTS;
}

const meta: Meta<DesignRulesComponent> = {
  title: 'Design System/Rules',
  component: DesignRulesComponent,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Rules: StoryObj<DesignRulesComponent> = {};
