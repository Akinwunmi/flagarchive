import { create } from '@storybook/theming';

import logoUrl from './shared/assets/flagarchive-logo.svg';

export default create({
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Logo
  brandTitle: 'Flag Archive UI',
  brandImage: logoUrl,
  brandTarget: '_self',
});
