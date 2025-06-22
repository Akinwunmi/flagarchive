import type { Meta, StoryObj } from '@storybook/angular';

import { IconComponent } from '../icon';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

type StoryArgs = {
  message: string;
};

const args: StoryArgs = {
  message: 'This is a tooltip',
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: TooltipComponent,
  title: 'Components/Tooltip',
  render: (props) => ({
    moduleMetadata: {
      imports: [IconComponent, TooltipDirective],
    },
    props,
    styles: [
      `
        flag-icon {
          color: var(--flag-primary);
        }
      `,
    ],
    template: `
      <flag-icon flagTooltip="${props.message}">info</flag-icon>
    `,
  }),
  args,
  argTypes: {},
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
