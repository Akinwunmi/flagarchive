import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { ListItemComponent } from './list-item.component';

type StoryArgs = ListItemComponent & {
  label: string;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: ListItemComponent,
  title: 'Components/List Item',
  render: (args) => ({
    template: `
      <flag-list-item [active]="active">
        {{ label }}
      </flag-list-item>
    `,
    props: args,
  }),
  args: {
    disabled: false,
    label: 'List Item',
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/List Item/gi)).toBeTruthy();
  },
};
