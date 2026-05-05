import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

const PALETTE = [
  {
    group: 'Backgrounds & Surfaces',
    tokens: [
      { name: 'background',                    hex: '#000000', tw: 'bg-background' },
      { name: 'surface',                        hex: '#0a0a0a', tw: 'bg-surface' },
      { name: 'surface-dim',                    hex: '#111111', tw: 'bg-surface-dim' },
      { name: 'surface-bright',                 hex: '#1a1a1a', tw: 'bg-surface-bright' },
      { name: 'surface-container-low',          hex: '#0a0a0a', tw: 'bg-surface-container-low' },
      { name: 'surface-container',              hex: '#111111', tw: 'bg-surface-container' },
      { name: 'surface-container-high',         hex: '#1a1a1a', tw: 'bg-surface-container-high' },
      { name: 'surface-container-highest',      hex: '#222222', tw: 'bg-surface-container-highest' },
    ],
  },
  {
    group: 'Type',
    tokens: [
      { name: 'on-surface',         hex: '#ffffff', tw: 'text-on-surface' },
      { name: 'on-surface-variant', hex: '#a3a3a3', tw: 'text-on-surface-variant' },
      { name: 'outline',            hex: '#737373', tw: 'text-outline' },
      { name: 'outline-variant',    hex: '#2a2a2a', tw: 'text-outline-variant' },
    ],
  },
  {
    group: 'Borders',
    tokens: [
      { name: 'border',     hex: '#1a1a1a', tw: 'border-border' },
      { name: 'border-mid', hex: '#2a2a2a', tw: 'border-border-mid' },
      { name: 'border-hi',  hex: '#404040', tw: 'border-border-hi' },
    ],
  },
  {
    group: 'Module Accents',
    tokens: [
      { name: 'module.rag',    hex: '#e5e5e5', tw: 'bg-module-rag' },
      { name: 'module.mem',    hex: '#d4d4d4', tw: 'bg-module-mem' },
      { name: 'module.router', hex: '#a3a3a3', tw: 'bg-module-router' },
      { name: 'module.eval',   hex: '#737373', tw: 'bg-module-eval' },
      { name: 'module.kernel', hex: '#525252', tw: 'bg-module-kernel' },
      { name: 'module.trace',  hex: '#404040', tw: 'bg-module-trace' },
    ],
  },
  {
    group: 'Step Colours',
    tokens: [
      { name: 'step.1', hex: '#ffffff', tw: 'text-step-1' },
      { name: 'step.2', hex: '#d4d4d4', tw: 'text-step-2' },
      { name: 'step.3', hex: '#a3a3a3', tw: 'text-step-3' },
      { name: 'step.4', hex: '#737373', tw: 'text-step-4' },
    ],
  },
];

@Component({
  standalone: true,
  template: `
    <div style="background:#000;padding:32px;font-family:IBM Plex Mono,monospace">
      @for (group of palette; track group.group) {
        <div style="margin-bottom:40px">
          <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#737373;margin:0 0 16px">
            {{ group.group }}
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:12px">
            @for (t of group.tokens; track t.name) {
              <div style="width:160px">
                <div style="height:48px;border-radius:6px;border:1px solid #2a2a2a;margin-bottom:8px"
                     [style.background]="t.hex"></div>
                <p style="font-size:11px;color:#ffffff;margin:0 0 2px">{{ t.name }}</p>
                <p style="font-size:10px;color:#737373;margin:0 0 2px">{{ t.hex }}</p>
                <code style="font-size:9px;color:#525252">{{ t.tw }}</code>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
class ColorPaletteComponent {
  palette = PALETTE;
}

const meta: Meta<ColorPaletteComponent> = {
  title: 'Design Tokens/Colors',
  component: ColorPaletteComponent,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const AllColors: StoryObj<ColorPaletteComponent> = {};
