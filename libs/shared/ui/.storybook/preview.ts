import { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'var(--flag-white)',
        },
        {
          name: 'primary',
          value: 'var(--flag-primary-500)',
        },
        {
          name: 'dark',
          value: 'var(--flag-grey-700)',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
