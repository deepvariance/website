import type { Meta, StoryObj } from '@storybook/angular';
import { ToolStripComponent, ToolItem } from '../../app/components/tool-strip';

const TOOLS: ToolItem[] = [
  { name: 'vLLM',         imgSrc: '/vllm-logo.webp',   imgWidth: 80, imgHeight: 28 },
  { name: 'SGLang',       imgSrc: '/sglang-logo.webp', imgWidth: 80, imgHeight: 28 },
  { name: 'TensorRT-LLM' },
  { name: 'Triton' },
  { name: 'FAISS' },
  { name: 'pgvector' },
];

const meta: Meta<ToolStripComponent> = {
  title: 'Components/ToolStrip',
  component: ToolStripComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:40px 24px;background:#000">
        <app-tool-strip [label]="label" [tools]="tools" />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<ToolStripComponent>;

export const Default: Story = {
  args: { label: 'Works with', tools: TOOLS },
};

export const LogosOnly: Story = {
  args: {
    label: null,
    tools: [
      { name: 'vLLM',   imgSrc: '/vllm-logo.webp',   imgWidth: 80, imgHeight: 28 },
      { name: 'SGLang', imgSrc: '/sglang-logo.webp',  imgWidth: 80, imgHeight: 28 },
    ],
  },
};
