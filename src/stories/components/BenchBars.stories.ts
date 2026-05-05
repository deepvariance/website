import type { Meta, StoryObj } from '@storybook/angular';
import { BenchBarsComponent, BenchSeries, BenchOption } from '../../app/components/bench-bars';

const MODEL_OPTIONS: BenchOption[] = [
  { id: 'qwen7b',   label: 'Qwen2.5 7B' },
  { id: 'llama8b',  label: 'Llama 3 8B' },
  { id: 'qwen14b',  label: 'Qwen2.5 14B' },
  { id: 'llama70b', label: 'Llama 3 70B' },
];

const SERIES: BenchSeries[] = [
  {
    title: 'Time to First Token',
    annotation: 'Lower is better',
    rows: [
      { label: 'HyperRAG',  value: 42,  accent: 'neon' },
      { label: 'Baseline',  value: 258, accent: 'muted' },
    ],
    ceiling: 300,
  },
  {
    title: 'Cache Hit Rate',
    annotation: 'Higher is better',
    rows: [
      { label: 'HyperRAG', value: 94, accent: 'neon' },
      { label: 'Baseline', value: 38, accent: 'muted' },
    ],
    ceiling: 100,
  },
];

const meta: Meta<BenchBarsComponent> = {
  title: 'Components/BenchBars',
  component: BenchBarsComponent,
  tags: ['autodocs'],
  argTypes: {
    title:    { control: 'text' },
    subtitle: { control: 'text' },
    eyebrow:  { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000;max-width:900px">
        <app-bench-bars
          [title]="title"
          [subtitle]="subtitle"
          [eyebrow]="eyebrow"
          [series]="series"
          [modelOptions]="modelOptions"
        />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<BenchBarsComponent>;

export const Default: Story = {
  args: {
    title: 'Up to 6x faster, measured',
    subtitle: 'Benchmarked on A100 80GB — same vLLM baseline, HyperRAG layer added.',
    eyebrow: 'Benchmarks',
    series: SERIES,
    modelOptions: MODEL_OPTIONS,
  },
};

export const NoDropdown: Story = {
  args: {
    title: 'Cache hit rate comparison',
    series: [SERIES[1]],
  },
};
