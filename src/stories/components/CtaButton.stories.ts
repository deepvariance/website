import type { Meta, StoryObj } from '@storybook/angular';
import { CtaButtonComponent, CtaVariant } from '../../app/components/cta-button';

/**
 * All interactive CTAs must use this component.
 * Do NOT recreate button styles with raw Tailwind classes in page templates.
 */
const meta: Meta<CtaButtonComponent> = {
  title: 'Components/CtaButton',
  component: CtaButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'glass', 'ghost'] satisfies CtaVariant[],
    },
    size: { control: 'radio', options: ['md', 'lg'] },
    showArrow: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000;display:inline-block">
        <app-cta-button [variant]="variant" [size]="size" [showArrow]="showArrow" [fullWidth]="fullWidth">
          Get early access
        </app-cta-button>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<CtaButtonComponent>;

export const Primary: Story = { args: { variant: 'primary', size: 'lg', showArrow: true } };
export const Glass: Story = { args: { variant: 'glass', size: 'lg', showArrow: true } };
export const Ghost: Story = { args: { variant: 'ghost', size: 'lg', showArrow: false } };
export const SizeMd: Story = { args: { variant: 'primary', size: 'md', showArrow: true } };
export const FullWidth: Story = {
  args: { variant: 'primary', size: 'lg', showArrow: true, fullWidth: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:24px;background:#000;width:400px">
        <app-cta-button [variant]="variant" [size]="size" [showArrow]="showArrow" [fullWidth]="fullWidth">
          Get early access
        </app-cta-button>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:24px;background:#000">
        <app-cta-button variant="primary">Primary</app-cta-button>
        <app-cta-button variant="glass">Glass</app-cta-button>
        <app-cta-button variant="ghost" [showArrow]="false">Ghost</app-cta-button>
        <app-cta-button variant="primary" size="md">Primary sm</app-cta-button>
      </div>
    `,
  }),
};
