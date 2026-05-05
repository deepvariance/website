import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter([]),
      ],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'dv-dark',
      values: [
        { name: 'dv-dark',    value: '#000000' },
        { name: 'dv-surface', value: '#0a0a0a' },
      ],
    },
    layout: 'padded',
  },
};

export default preview;
