import type { Meta, StoryObj } from '@storybook/angular';
import { FilterChipsComponent, ChipGroup } from '../../app/components/filter-chips';

const BENCH_GROUPS: ChipGroup[] = [
  {
    id: 'model',
    label: 'Model',
    options: ['Qwen2.5 7B', 'Llama 3 8B', 'Qwen2.5 14B', 'Llama 3 70B'],
  },
  {
    id: 'workload',
    label: 'Workload',
    options: ['High-volume queries', 'Long documents', 'Multi-step agents', 'Complex pipelines'],
  },
];

const meta: Meta<FilterChipsComponent> = {
  title: 'Components/FilterChips',
  component: FilterChipsComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000">
        <app-filter-chips [groups]="groups" (stateChange)="onStateChange($event)" />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<FilterChipsComponent>;

export const BenchmarkFilters: Story = {
  args: { groups: BENCH_GROUPS },
};

export const SingleGroup: Story = {
  args: {
    groups: [{ id: 'size', label: 'Model size', options: ['7B', '14B', '70B', '405B'] }],
  },
};
