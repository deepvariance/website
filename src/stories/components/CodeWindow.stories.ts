import type { Meta, StoryObj } from '@storybook/angular';
import { CodeWindowComponent } from '../../app/components/code-window';

const meta: Meta<CodeWindowComponent> = {
  title: 'Components/CodeWindow',
  component: CodeWindowComponent,
  tags: ['autodocs'],
  argTypes: {
    filename: { control: 'text' },
    language: { control: 'text' },
    output: { control: 'text' },
    outputLabel: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000;max-width:600px">
        <app-code-window [filename]="filename" [language]="language" [output]="output" [outputLabel]="outputLabel">
          <pre style="margin:0;color:#a3a3a3">import hyperrag

client = hyperrag.Client()
result = client.query("What is the capital of France?")</pre>
        </app-code-window>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<CodeWindowComponent>;

export const Python: Story = {
  args: { filename: 'query.py', language: 'python', output: '42 ms', outputLabel: 'TTFT' },
};

export const NoOutput: Story = {
  args: { filename: 'main.py', language: 'python', output: '' },
};

export const WithOutput: Story = {
  args: { filename: 'benchmark.py', language: 'python', output: '6.1x faster', outputLabel: 'Speedup' },
};
