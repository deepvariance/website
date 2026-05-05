import type { Meta, StoryObj } from '@storybook/angular';
import { ChallengeCalloutsComponent, ChallengeCallout } from '../../app/components/challenge-callouts';

const ITEMS: ChallengeCallout[] = [
  {
    highlight: 'Duplicate work on every request',
    body: 'when different users reference the same documents, each request rebuilds that context from scratch.',
  },
  {
    highlight: 'The cache drops what matters most',
    body: 'entries are evicted by recency, not by how often they are reused — forcing expensive recomputes at peak load.',
  },
  {
    highlight: 'Generation stalls waiting on retrieval',
    body: 'the model sits idle until documents are fetched, even when shared context is already in the cache.',
  },
];

const meta: Meta<ChallengeCalloutsComponent> = {
  title: 'Components/ChallengeCallouts',
  component: ChallengeCalloutsComponent,
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'text' },
    subhead: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000">
        <app-challenge-callouts [headline]="headline" [subhead]="subhead" [items]="items" />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChallengeCalloutsComponent>;

export const Default: Story = {
  args: {
    headline: 'Your cache is working. Just not hard enough.',
    subhead: 'vLLM and SGLang ship with KV cache — but the default implementation misses the patterns that matter.',
    items: ITEMS,
  },
};

export const NoSubhead: Story = {
  args: {
    headline: 'Your cache is working. Just not hard enough.',
    subhead: null,
    items: ITEMS,
  },
};
