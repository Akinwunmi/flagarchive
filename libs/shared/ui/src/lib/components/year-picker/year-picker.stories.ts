import type { Meta, StoryObj } from '@storybook/angular';
import { YearPickerComponent } from './year-picker.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<YearPickerComponent> = {
  component: YearPickerComponent,
  title: 'Components/Year Picker',
  args: {
    initial: 2025,
    max: 2025,
    min: 1970,
    rangeSize: 9,
    selected: 2025,
  },
};
export default meta;
type Story = StoryObj<YearPickerComponent>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryAllByRole('button')).toHaveLength(14);
  },
};
