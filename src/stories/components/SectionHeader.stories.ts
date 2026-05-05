import type { Meta, StoryObj } from '@storybook/angular';
import { SectionHeaderComponent } from '../../app/components/section-header';

/**
 * Used for all section h2 headings. Do NOT write raw h2 elements in page templates.
 * Font sizes are locked: text-3xl sm:text-4xl md:text-5xl — never override.
 */
const meta: Meta<SectionHeaderComponent> = {
  title: 'Components/SectionHeader',
  component: SectionHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: { control: 'text', description: 'Optional CAPS label above heading' },
    subhead: { control: 'text', description: 'Optional body below heading (font-mono)' },
    align: { control: 'radio', options: ['left', 'center'] },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:40px;background:#000">
        <app-section-header [eyebrow]="eyebrow" [subhead]="subhead" [align]="align">
          Section heading text
        </app-section-header>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<SectionHeaderComponent>;

export const CenterAligned: Story = {
  args: {
    eyebrow: 'The problem',
    subhead: 'Most RAG deployments waste GPU cycles on context they have already seen.',
    align: 'center',
  },
};

export const LeftAligned: Story = {
  args: {
    eyebrow: 'How it works',
    subhead: 'Drop in one wrapper. HyperRAG handles the rest.',
    align: 'left',
  },
};

export const HeadingOnly: Story = {
  args: { align: 'center' },
};
