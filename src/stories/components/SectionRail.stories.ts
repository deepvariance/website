import type { Meta, StoryObj } from '@storybook/angular';
import { SectionRailComponent, RailSection } from '../../app/components/section-rail';

const SECTIONS: RailSection[] = [
  { id: 'hero',         label: 'Overview' },
  { id: 'challenge',    label: 'The problem' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'system',       label: 'What you get' },
  { id: 'benchmarks',   label: 'Benchmarks' },
];

const meta: Meta<SectionRailComponent> = {
  title: 'Components/SectionRail',
  component: SectionRailComponent,
  tags: ['autodocs'],
  parameters: {
    /**
     * Rail is fixed-position — rendered in a tall container so it is visible.
     * Only shows on 2xl screens (1536px+). In Storybook, enable 2xl viewport.
     */
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:800px;background:#000;position:relative">
        <app-section-rail [sections]="sections" ariaLabel="Page sections" />
        <p style="padding:40px;color:#737373;font-family:IBM Plex Mono,monospace;font-size:12px">
          Note: Rail is fixed-positioned and only visible at 2xl breakpoints (1536px+).
        </p>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<SectionRailComponent>;

export const PageSections: Story = { args: { sections: SECTIONS } };
