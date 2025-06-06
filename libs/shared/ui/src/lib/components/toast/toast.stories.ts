import { Meta, StoryObj } from '@storybook/angular';

import { ToastComponent } from './toast.component';
import { ToastType } from './toast.model';

export type StoryArgs = ToastComponent;

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: ToastComponent,
  title: 'Components/Toast',
  render: (args) => ({
    props: args,
    template: `
      <flag-toast [message]="message" [type]="type" />
    `,
  }),
  args: {
    message: 'Toast message',
    type: 'info',
  },
  argTypes: {
    message: {
      control: 'text',
      defaultValue: 'Toast message',
    },
    type: {
      control: 'select',
      options: ['error', 'info', 'success', 'warning'] as ToastType[],
      defaultValue: 'info',
    },
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    message: 'Toast message',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    message: 'Toast message',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    message: 'Toast message',
    type: 'error',
  },
};
