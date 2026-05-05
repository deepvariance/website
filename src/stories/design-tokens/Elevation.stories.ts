import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const SURFACES = [
  { name: 'background',        hex: '#000000', css: 'background-color: #000000',  usage: 'Page background only' },
  { name: 'surface',           hex: '#0a0a0a', css: 'background-color: #0a0a0a',  usage: 'Primary card surface' },
  { name: 'surface-dim',       hex: '#111111', css: 'background-color: #111111',  usage: 'Elevated cards, inputs' },
  { name: 'surface-bright',    hex: '#1a1a1a', css: 'background-color: #1a1a1a',  usage: 'Active states, hover' },
  { name: 'surface-highest',   hex: '#222222', css: 'background-color: #222222',  usage: 'Tooltips, popovers' },
];

const BORDERS = [
  { name: 'border',     hex: '#1a1a1a', usage: 'Default card border — most surfaces' },
  { name: 'border-mid', hex: '#2a2a2a', usage: 'Emphasized border — active, strong card' },
  { name: 'border-hi',  hex: '#404040', usage: 'Hover / focus border state' },
];

const COMPONENT_CLASSES = [
  { cls: '.dv-card',         usage: 'Interactive card with hover border transition' },
  { cls: '.dv-panel',        usage: 'Static non-interactive surface' },
  { cls: '.glass-input',     usage: 'Form inputs' },
  { cls: '.code-window',     usage: 'Code block container' },
  { cls: '.browser-frame',   usage: 'Screenshot / demo browser chrome' },
  { cls: '.chip',            usage: 'Filter chips, tags' },
];

@Component({
  standalone: true,
  template: `
    <div style="background:#000;padding:32px;font-family:IBM Plex Mono,monospace;color:#fff">

      <section style="margin-bottom:48px">
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Surface Elevation Stack</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          @for (s of surfaces; track s.name; let i = $index) {
            <div style="flex:1;min-width:160px;padding:20px;border-radius:8px;border:1px solid #2a2a2a"
                 [style.background]="s.hex">
              <p style="font-size:11px;color:#ffffff;margin:0 0 4px;font-weight:600">Layer {{ i }}</p>
              <code style="font-size:10px;color:#737373">{{ s.name }}</code><br>
              <code style="font-size:10px;color:#525252">{{ s.hex }}</code>
              <p style="font-size:10px;color:#737373;margin:8px 0 0">{{ s.usage }}</p>
            </div>
          }
        </div>
      </section>

      <section style="margin-bottom:48px">
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Border Tokens</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          @for (b of borders; track b.name) {
            <div style="flex:1;min-width:200px;padding:20px;border-radius:8px;background:#0a0a0a;border-width:1px;border-style:solid"
                 [style.border-color]="b.hex">
              <code style="font-size:11px;color:#ffffff">{{ b.name }}</code><br>
              <code style="font-size:10px;color:#525252">{{ b.hex }}</code>
              <p style="font-size:10px;color:#737373;margin:8px 0 0">{{ b.usage }}</p>
            </div>
          }
        </div>
      </section>

      <section>
        <p class="label-caps" style="margin:0 0 24px;color:#737373">Global CSS Classes (use these, not raw Tailwind)</p>
        <table style="width:100%;border-collapse:collapse;font-size:11px">
          <thead>
            <tr style="border-bottom:1px solid #2a2a2a;color:#737373">
              <th style="text-align:left;padding:8px 0">Class</th>
              <th style="text-align:left;padding:8px 0">Usage</th>
            </tr>
          </thead>
          <tbody>
            @for (c of classes; track c.cls) {
              <tr style="border-bottom:1px solid #111">
                <td style="padding:10px 0"><code style="font-size:11px;color:#e5e5e5">{{ c.cls }}</code></td>
                <td style="padding:10px 0;color:#737373">{{ c.usage }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

    </div>
  `,
})
class ElevationComponent {
  surfaces = SURFACES;
  borders = BORDERS;
  classes = COMPONENT_CLASSES;
}

const meta: Meta<ElevationComponent> = {
  title: 'Design Tokens/Elevation & Borders',
  component: ElevationComponent,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const ElevationAndBorders: StoryObj<ElevationComponent> = {};
