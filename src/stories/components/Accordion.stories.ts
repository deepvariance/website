import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent, AccordionItem } from '../../app/components/accordion';

const ITEMS: AccordionItem[] = [
  {
    id: 'prefix',
    title: 'Prefix-aware caching',
    body: 'HyperRAG builds a live KnowledgeTree of all document prefixes seen across requests. When a new query shares a prefix, the cached KV state is reused immediately — no recompute.',
    bullets: ['Sub-millisecond lookup', 'Works across concurrent requests', 'No index rebuild required'],
  },
  {
    id: 'eviction',
    title: 'Cost-aware eviction',
    body: 'PGDSF scoring weighs reuse frequency, recency, and token cost. The entries most likely to be requested next stay in memory; the cheapest-to-recompute entries leave first.',
    bullets: ['Frequency × recency × cost model', 'Adaptive to traffic patterns', 'Drop-in over default LRU'],
  },
  {
    id: 'overlap',
    title: 'Retrieval–generation overlap',
    body: 'HyperRAG pipelines retrieval and prefill in parallel. The LLM starts processing cached context while fresh documents are still being fetched — removing sequential wait entirely.',
    bullets: ['Speculative prefill', 'Zero idle time on cache hits', 'Visible on first request'],
  },
];

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'text', description: 'ID of item open by default' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000;max-width:800px">
        <app-accordion [items]="items" [defaultOpen]="defaultOpen" />
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = { args: { items: ITEMS, defaultOpen: 'prefix' } };
export const NoneOpen: Story = { args: { items: ITEMS, defaultOpen: null } };
