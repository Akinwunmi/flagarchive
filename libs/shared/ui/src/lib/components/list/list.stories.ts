import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { ListItemComponent } from '../list-item/list-item.component';
import { ListComponent } from './list.component';

type StoryArgs = ListComponent & {
  activeItem: number;
  amountOfItems: number;
  actionable: boolean;
  navigable: boolean;
};

const args: StoryArgs = {
  activeItem: 1,
  amountOfItems: 3,
  actionable: false,
  navigable: false,
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: ListComponent,
  title: 'Components/List',
  parameters: {
    actions: {
      handles: ['click button', 'click a'],
    },
  },
  decorators: [withActions],
  render: (args) => {
    const items = Array.from({ length: args.amountOfItems }, (_, i) => i);
    const listItems = items.map((item) => setListItem(item, args)).join('');

    return {
      moduleMetadata: {
        imports: [ListItemComponent],
      },
      template: `
        <flag-list>
          ${listItems}
        </flag-list>
      `,
      props: args,
    };
  },
  args,
  argTypes: {
    amountOfItems: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 1,
      },
    },
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getAllByRole('listitem').length).toBe(3);
  },
};

export const Actionable: Story = {
  args: {
    ...args,
    actionable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getAllByRole('button').length).toBe(3);
  },
};

export const navigable: Story = {
  args: {
    ...args,
    navigable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');
    links.forEach((link) => {
      link.addEventListener('click', (event) => event.preventDefault());
    });

    expect(links.length).toBe(3);
  },
};

function setListItem(item: number, args: StoryArgs): string {
  const label = `Item ${item + 1}`;
  if (args.actionable) {
    return `
      <button flag-list-item ${args.activeItem === item ? 'active' : ''}>
        ${label}
      </button>
    `.trim();
  }

  if (args.navigable) {
    return `
      <a flag-list-item href="#" ${args.activeItem === item ? 'active' : ''}>
        ${label}
      </a>
    `.trim();
  }

  return `
    <flag-list-item>
      ${label}
    </flag-list-item>
  `.trim();
}
