import type { Meta, StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { IconComponent } from './icon.component';

type StoryArgs = IconComponent & { name: string };

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: IconComponent,
  title: 'Components/Icon',
  render: (args) => ({
    template: '<lib-icon>{{ name }}</lib-icon>',
    props: args,
  }),
  args: {
    name: 'menu',
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/menu/i)).toBeTruthy();
  },
};
