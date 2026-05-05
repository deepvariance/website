import type { Meta, StoryObj } from '@storybook/angular';
import { StatStripComponent, Stat } from '../../app/components/stat-strip';

const TWO_STATS: Stat[] = [
  { value: '94.2%', label: 'Cache hit rate', qualifier: 'avg' },
  { value: '6x',    label: 'Faster',         qualifier: 'up to' },
];

const THREE_STATS: Stat[] = [
  { value: '94.2%', label: 'Cache hit rate' },
  { value: '6x',    label: 'Faster TTFT' },
  { value: '<1ms',  label: 'Overhead' },
];

const ONE_STAT: Stat[] = [
  { value: '6x', label: 'Faster TTFT', qualifier: 'up to' },
];

const meta: Meta<StatStripComponent> = {
  title: 'Components/StatStrip',
  component: StatStripComponent,
  tags: ['autodocs'],
  argTypes: {
    centered: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<StatStripComponent>;

export const TwoStats: Story = {
  args: { stats: TWO_STATS, centered: false },
};

export const ThreeStats: Story = {
  args: { stats: THREE_STATS, centered: true },
};

export const OneStat: Story = {
  args: { stats: ONE_STAT, centered: false },
};
