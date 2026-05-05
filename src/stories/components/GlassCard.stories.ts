import type { Meta, StoryObj } from '@storybook/angular';
import { GlassCardComponent, GlassVariant } from '../../app/components/glass-card';

const meta: Meta<GlassCardComponent> = {
  title: 'Components/GlassCard',
  component: GlassCardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['panel', 'card', 'kpi-rail', 'strong'] satisfies GlassVariant[],
      description: '`card` adds hover border transition. `strong` uses border-mid. `panel` is non-interactive.',
    },
    rounded: {
      control: 'select',
      options: ['lg', 'xl', '2xl'],
      description: 'Border radius tier — defaults to xl',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-glass-card [variant]="variant" [rounded]="rounded" style="display:block;max-width:320px">
        <div style="padding:24px;color:#a3a3a3;font-family:IBM Plex Mono,monospace;font-size:13px">
          Card content goes here
        </div>
      </app-glass-card>
    `,
  }),
};
export default meta;
type Story = StoryObj<GlassCardComponent>;

export const Card: Story = { args: { variant: 'card', rounded: 'xl' } };
export const Panel: Story = { args: { variant: 'panel', rounded: 'xl' } };
export const Strong: Story = { args: { variant: 'strong', rounded: 'xl' } };
export const KpiRail: Story = { args: { variant: 'kpi-rail', rounded: 'lg' } };
export const Rounded2xl: Story = { args: { variant: 'card', rounded: '2xl' } };

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;padding:24px;background:#000">
        @for (v of ['panel','card','strong','kpi-rail']; track v) {
          <app-glass-card [variant]="v" style="display:block;width:200px">
            <div style="padding:20px;color:#737373;font-family:IBM Plex Mono,monospace;font-size:11px">
              variant: {{ v }}
            </div>
          </app-glass-card>
        }
      </div>
    `,
  }),
};
