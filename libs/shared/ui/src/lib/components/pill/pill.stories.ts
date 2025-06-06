import { Meta, StoryObj } from '@storybook/angular';

import { PillComponent } from './pill.component';
import { PillTheme, PillType } from './pill.model';

export type StoryArgs = PillComponent & {
  label: string;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: PillComponent,
  title: 'Components/Pill',
  render: (args) => ({
    props: args,
    template: `
      <flag-pill [theme]="theme" [type]="type">
        ${args.label}
      </flag-pill>
    `,
  }),
  args: {
    label: 'Beta',
    theme: 'light',
    type: 'primary',
  },
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Beta',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'] as PillTheme[],
      defaultValue: 'light',
    },
    type: {
      control: 'select',
      options: [
        'error',
        'primary',
        'secondary',
        'success',
        'warning',
      ] as PillType[],
      defaultValue: 'primary',
    },
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Warning: Story = {
  args: {
    label: 'Warning',
    type: 'warning',
  },
};
