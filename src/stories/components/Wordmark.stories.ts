import type { Meta, StoryObj } from '@storybook/angular';
import { WordmarkComponent } from '../../app/components/wordmark';

const meta: Meta<WordmarkComponent> = {
  title: 'Components/Wordmark',
  component: WordmarkComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Height in px — width scales from SVG aspect ratio' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000">
        <app-wordmark [size]="size" />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<WordmarkComponent>;

export const NavSize: Story = { args: { size: 20 } };
export const FooterSize: Story = { args: { size: 28 } };
export const HeroSize: Story = { args: { size: 40 } };

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px;background:#000">
        <div style="display:flex;align-items:center;gap:16px">
          <app-wordmark [size]="20" />
          <span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#525252">size=20 (nav)</span>
        </div>
        <div style="display:flex;align-items:center;gap:16px">
          <app-wordmark [size]="28" />
          <span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#525252">size=28 (footer)</span>
        </div>
        <div style="display:flex;align-items:center;gap:16px">
          <app-wordmark [size]="40" />
          <span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#525252">size=40 (hero)</span>
        </div>
      </div>
    `,
  }),
};
