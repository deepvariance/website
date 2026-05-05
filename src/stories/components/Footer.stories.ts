import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from '../../app/components/footer';

/**
 * Global site footer — used once per page.
 * No inputs. Links and social icons are defined internally.
 * Update footer.ts to change nav items, social links, or legal text.
 */
const meta: Meta<FooterComponent> = {
  title: 'Components/Footer',
  component: FooterComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full-width site footer with brand, nav columns, social links, and legal text. No inputs.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<FooterComponent>;

export const Default: Story = {};
