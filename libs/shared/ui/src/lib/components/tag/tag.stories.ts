import { type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { TagComponent } from './tag.component';
import { FormsModule } from '@angular/forms';

type StoryArgs = TagComponent & {
  label: string;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: TagComponent,
  title: 'Components/Tag',
  args: {
    checkable: false,
    checked: false,
    label: 'Tag',
    removable: false,
  },
  argTypes: {},
  render: (props) => ({
    moduleMetadata: {
      imports: [FormsModule],
    },
    props,
    template: `
      <flag-tag
        ${props.checkable ? '[checkable]="true"' : ''}
        ${props.checked ? '[checked]="true"' : ''}
        ${props.removable ? '[removable]="true"' : ''}
      >
        ${props.label}
      </flag-tag>
    `,
  }),
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Tag')).toBeTruthy();
  },
};
