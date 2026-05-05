import type { Meta, StoryObj } from '@storybook/angular';
import { PipelineRowComponent, PipelineStep } from '../../app/components/pipeline-row';

const STEPS: PipelineStep[] = [
  {
    label: 'Ingest',
    caption: 'Documents enter the pipeline',
    body: 'Raw documents are chunked and embedded, then indexed in the KnowledgeTree.',
    color: 1,
  },
  {
    label: 'Retrieve',
    caption: 'Prefix-aware cache lookup',
    body: 'HyperRAG checks for shared KV prefixes before touching the retrieval index.',
    color: 2,
  },
  {
    label: 'Prefill',
    caption: 'Parallel retrieval and generation',
    body: 'Cached context starts prefilling while fresh documents are fetched.',
    color: 3,
  },
  {
    label: 'Serve',
    caption: 'Response delivered at speed',
    body: 'The LLM generates from warm KV state. TTFT drops by up to 6x.',
    color: 4,
  },
];

const meta: Meta<PipelineRowComponent> = {
  title: 'Components/PipelineRow',
  component: PipelineRowComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000">
        <app-pipeline-row [steps]="steps" />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<PipelineRowComponent>;

export const FourSteps: Story = { args: { steps: STEPS } };
export const TwoSteps: Story = { args: { steps: STEPS.slice(0, 2) } };
