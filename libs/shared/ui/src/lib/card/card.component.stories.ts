import type { Meta, StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  title: 'Card',
  render: (args) => {
    const header = '<lib-card-header>{{ headerTitle }}</lib-card-header>';
    const content = '<lib-card-content>{{ content }}</lib-card-content>';
    const footerPrimaryButton =
      '<button flagButton raised>{{ footerPrimaryAction }}</button>';
    const footerSecondaryButton =
      '<button flagButton ghost>{{ footerSecondaryAction }}</button>';
    const footer = `
      <lib-card-footer>
        ${args.footerPrimaryAction ? footerPrimaryButton : ''}
        ${args.footerSecondaryAction ? footerSecondaryButton : ''}
      </lib-card-footer>
    `;

    return {
      moduleMetadata: {
        imports: [
          CardContentComponent,
          CardFooterComponent,
          CardHeaderComponent,
        ],
      },
      styles: [
        `
          lib-card {
            max-width: 25rem;
          }
        `,
      ],
      template: `
        <lib-card>
          ${args.showHeader ? header : ''}
          ${args.showContent ? content : ''}
          ${args.showFooter ? footer : ''}
        </lib-card>
      `,
      props: args,
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
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/card works!/gi)).toBeTruthy();
  },
};
