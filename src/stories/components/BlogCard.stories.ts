import type { Meta, StoryObj } from '@storybook/angular';
import { BlogCardComponent } from '../../app/components/blog-card';
import { SanityPost } from '../../app/services/sanity.service';

const MOCK_POST: SanityPost = {
  _id: 'mock-1',
  title: 'How HyperRAG achieves 6x faster TTFT without changing your stack',
  slug: 'hyperrag-6x-faster-ttft',
  excerpt: 'Most RAG deployments leave the majority of their KV cache performance on the table. Here is what the default implementation misses and how HyperRAG fixes it.',
  publishedAt: '2026-04-15T00:00:00.000Z',
  estimatedReadingTime: 5,
  featureImageUrl: 'https://placehold.co/800x450/0a0a0a/404040?text=Feature+Image',
  primaryTag: { name: 'Engineering', slug: 'engineering' },
  tags: [],
  bodyHtml: null,
  seoTitle: null,
  seoDescription: null,
  ogImage: null,
};

const NO_IMAGE_POST: SanityPost = {
  ...MOCK_POST,
  _id: 'mock-2',
  slug: 'mock-2',
  featureImageUrl: null,
};

const meta: Meta<BlogCardComponent> = {
  title: 'Components/BlogCard',
  component: BlogCardComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<BlogCardComponent>;

export const WithImage: Story = {
  args: { post: MOCK_POST },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000;max-width:360px">
        <app-blog-card [post]="post" />
      </div>
    `,
  }),
};

export const NoImage: Story = {
  args: { post: NO_IMAGE_POST },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000;max-width:360px">
        <app-blog-card [post]="post" />
      </div>
    `,
  }),
};

export const CardGrid: Story = {
  args: { post: MOCK_POST },
  render: () => ({
    template: `
      <div style="padding:24px;background:#000;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1100px">
        <app-blog-card [post]="post1" />
        <app-blog-card [post]="post2" />
        <app-blog-card [post]="post3" />
      </div>
    `,
    props: {
      post1: MOCK_POST,
      post2: { ...MOCK_POST, _id: 'mock-2', slug: 'mock-2', title: 'Cache eviction strategies in production RAG systems' },
      post3: { ...MOCK_POST, _id: 'mock-3', slug: 'mock-3', featureImageUrl: undefined, title: 'Why prefix sharing is the most under-used optimization in LLM serving' },
    },
  }),
};
