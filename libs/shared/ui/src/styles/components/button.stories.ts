import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { IconComponent } from '../../lib/components';

type StoryArgs = {
  disabled: boolean;
  extraSmall: boolean;
  ghost: boolean;
  icon: string;
  label: string;
  raised: boolean;
  rounded: boolean;
  secondary: boolean;
  small: boolean;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  title: 'Components/Button',
  render: (props) => ({
    moduleMetadata: {
      imports: [IconComponent],
    },
    props,
    template: `
      <button
        flag-button
        ${props.disabled ? 'disabled' : ''}
        ${props.extraSmall ? 'extra-small' : ''}
        ${props.ghost ? 'ghost' : ''}
        ${props.raised ? 'raised' : ''}
        ${props.rounded ? 'rounded' : ''}
        ${props.secondary ? 'secondary' : ''}
        ${props.small ? 'small' : ''}
      >
        ${props.icon ? `<flag-icon>${props.icon}</flag-icon>` : ''}
        ${props.label}
      </button>
    `,
  }),
  args: {
    disabled: false,
    extraSmall: false,
    ghost: false,
    icon: 'menu',
    label: 'Button',
    raised: false,
    rounded: false,
    secondary: false,
    small: false,
  },
  argTypes: {
    extraSmall: {
      name: 'extra-small',
    },
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toHaveTextContent('Button');
  },
};
