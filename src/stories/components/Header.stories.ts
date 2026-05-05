import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from '../../app/components/header';

/**
 * Global site header — used once per page via app-header selector.
 * No inputs. Scroll state is driven internally via HostListener.
 * Nav links and CTA are hardcoded — update them in header.ts directly.
 */
const meta: Meta<HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Fixed site header with logo, desktop nav, and mobile menu. No inputs — all content is defined internally.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {};
