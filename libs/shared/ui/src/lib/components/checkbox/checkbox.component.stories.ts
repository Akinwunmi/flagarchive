import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { CheckboxComponent } from './checkbox.component';

type StoryArgs = CheckboxComponent;

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: CheckboxComponent,
  title: 'Components/Checkbox',
  render: (args) => ({
    props: args,
    template: `
      <flag-checkbox
        label="${args.label}"
        ${args.checked ? '[checked]="true"' : ''}
        ${args.disabled ? '[disabled]="true"' : ''}
        ${args.indeterminate ? '[indeterminate]="true"' : ''}
        ${args.name ? `name="${args.name}"` : ''}
      />
    `,
  }),
  args: {
    checked: true,
    disabled: false,
    indeterminate: false,
    label: 'Checkbox',
    name: 'checkbox',
  },
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    name: {
      control: {
        type: 'text',
      },
    },
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('checkbox')).toHaveTextContent('check');
  },
};
