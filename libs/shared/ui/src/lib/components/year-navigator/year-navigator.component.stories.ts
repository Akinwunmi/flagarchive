import type { Meta, StoryObj } from '@storybook/angular';
import { YearNavigatorComponent } from './year-navigator.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<YearNavigatorComponent> = {
  component: YearNavigatorComponent,
  title: 'Components/Year Navigator',
  args: {},
};
export default meta;
type Story = StoryObj<YearNavigatorComponent>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryAllByRole('button')).toHaveLength(6);
  },
};
