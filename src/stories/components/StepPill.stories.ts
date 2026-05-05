import type { Meta, StoryObj } from '@storybook/angular';
import { StepPillComponent } from '../../app/components/step-pill';

const meta: Meta<StepPillComponent> = {
  title: 'Components/StepPill',
  component: StepPillComponent,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: [1, 2, 3, 4], description: '1=violet 2=blue 3=green 4=amber' },
    index: { control: 'number' },
    label: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="padding:24px;background:#000"><app-step-pill [index]="index" [label]="label" [color]="color" /></div>`,
  }),
};
export default meta;
type Story = StoryObj<StepPillComponent>;

export const Step1: Story = { args: { index: 1, label: 'Ingest', color: 1 } };
export const Step2: Story = { args: { index: 2, label: 'Retrieve', color: 2 } };
export const Step3: Story = { args: { index: 3, label: 'Generate', color: 3 } };
export const Step4: Story = { args: { index: 4, label: 'Serve', color: 4 } };

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:10px;flex-wrap:wrap;padding:24px;background:#000">
        <app-step-pill [index]="1" label="Ingest"   [color]="1" />
        <app-step-pill [index]="2" label="Retrieve" [color]="2" />
        <app-step-pill [index]="3" label="Generate" [color]="3" />
        <app-step-pill [index]="4" label="Serve"    [color]="4" />
      </div>
    `,
  }),
};
