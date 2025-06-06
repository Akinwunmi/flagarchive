import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';

import { DropdownComponent } from './dropdown.component';

type StoryArgs = DropdownComponent & {
  amountOfItems: number;
  listItemSelected: () => void;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: DropdownComponent,
  title: 'Components/Dropdown',
  render: (args) => {
    const itemsArray = Array.from(
      { length: args.amountOfItems },
      (_, i) => i + 1
    );

    return {
      props: args,
      template: `
        <flag-dropdown
          [icon]="icon"
          [isOpen]="isOpen"
          [hideChevron]="hideChevron"
          [label]="label"
          [secondary]="secondary"
        >
          @for (item of [${itemsArray}]; track item) {
            <button
              flag-list-item
              [attr.secondary]="secondary || undefined"
              (click)="listItemSelected('List item ' + item)"
            >
              List item {{ item }}
            </button>
          }
        </flag-dropdown>
      `,
    };
  },
  args: {
    amountOfItems: 3,
    hideChevron: false,
    icon: 'category',
    isOpen: false,
    label: 'Dropdown',
    listItemSelected: fn(),
    secondary: false,
  },
  argTypes: {
    amountOfItems: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
      },
    },
    icon: {
      control: {
        type: 'text',
      },
    },
    hideChevron: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    listItemSelected: {
      action: 'listItemSelected',
    },
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toHaveTextContent('Dropdown');
  },
};
