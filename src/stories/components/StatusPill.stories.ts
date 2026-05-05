import type { Meta, StoryObj } from '@storybook/angular';
import { StatusPillComponent, StatusVariant } from '../../app/components/status-pill';

const meta: Meta<StatusPillComponent> = {
  title: 'Components/StatusPill',
  component: StatusPillComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['live', 'beta', 'preview', 'soon'] satisfies StatusVariant[],
      description: 'Visual variant controlling dot color, bg, and text opacity',
    },
  },
  render: (args) => ({
    props: args,
    template: `<app-status-pill [variant]="variant">HyperRAG · {{ variant }}</app-status-pill>`,
  }),
};
export default meta;
type Story = StoryObj<StatusPillComponent>;

export const Live: Story = { args: { variant: 'live' } };
export const Beta: Story = { args: { variant: 'beta' } };
export const Preview: Story = { args: { variant: 'preview' } };
export const Soon: Story = { args: { variant: 'soon' } };

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:24px;background:#000">
        <app-status-pill variant="live">Product · Live</app-status-pill>
        <app-status-pill variant="beta">HyperRAG · Beta</app-status-pill>
        <app-status-pill variant="preview">Optimemory · Preview</app-status-pill>
        <app-status-pill variant="soon">DeepTuner · Coming soon</app-status-pill>
      </div>
    `,
  }),
};
