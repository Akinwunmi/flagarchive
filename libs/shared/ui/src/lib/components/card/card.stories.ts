import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { CardContentComponent } from '../card-content/card-content.component';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardComponent } from './card.component';

type StoryArgs = CardComponent & {
  content: string;
  footerPrimaryAction: string;
  footerSecondaryAction: string;
  headerTitle: string;
  showContent: boolean;
  showFooter: boolean;
  showHeader: boolean;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: CardComponent,
  title: 'Components/Card',
  render: (args) => {
    const header = '<flag-card-header>{{ headerTitle }}</flag-card-header>';
    const content = '<flag-card-content>{{ content }}</flag-card-content>';
    const footerPrimaryButton =
      '<button flag-button raised>{{ footerPrimaryAction }}</button>';
    const footerSecondaryButton =
      '<button flag-button ghost>{{ footerSecondaryAction }}</button>';
    const footer = `
      <flag-card-footer>
        ${args.footerPrimaryAction ? footerPrimaryButton : ''}
        ${args.footerSecondaryAction ? footerSecondaryButton : ''}
      </flag-card-footer>
    `;

    return {
      moduleMetadata: {
        imports: [
          CardContentComponent,
          CardFooterComponent,
          CardHeaderComponent,
        ],
      },
      props: args,
      styles: [
        `
          flag-card {
            max-width: 25rem;
          }
        `,
      ],
      template: `
        <flag-card>
          ${args.showHeader ? header : ''}
          ${args.showContent ? content : ''}
          ${args.showFooter ? footer : ''}
        </flag-card>
      `,
    };
  },
  args: {
    content: 'Part of Africa',
    footerPrimaryAction: 'Edit',
    footerSecondaryAction: 'Delete',
    headerTitle: 'Comoros',
    showContent: true,
    showFooter: true,
    showHeader: true,
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

/**
 * Card component
 * - Card Header component
 * - Card Content component
 * - Card Footer component
 */

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Comoros/gi)).toBeTruthy();
    expect(canvas.getByText(/Part of Africa/gi)).toBeTruthy();
    expect(canvas.getAllByRole('button')).toHaveLength(2);
  },
};
