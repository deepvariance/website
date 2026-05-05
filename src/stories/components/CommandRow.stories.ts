import type { Meta, StoryObj } from '@storybook/angular';
import { CommandRowComponent } from '../../app/components/command-row';

const meta: Meta<CommandRowComponent> = {
  title: 'Components/CommandRow',
  component: CommandRowComponent,
  tags: ['autodocs'],
  argTypes: {
    command: { control: 'text' },
    linkLabel: { control: 'text' },
    href: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000">
        <app-command-row [command]="command" [linkLabel]="linkLabel" [href]="href" />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<CommandRowComponent>;

export const PipInstall: Story = {
  args: {
    command: 'pip install dv-hyperrag',
    linkLabel: 'View on PyPI',
    href: 'https://pypi.org/project/dv-hyperrag/',
  },
};

export const NpmInstall: Story = {
  args: {
    command: 'npm install deep-variance',
    linkLabel: 'Quickstart',
    href: '#',
  },
};

export const NoLink: Story = {
  args: { command: 'pip install dv-optimemory', linkLabel: null },
};
