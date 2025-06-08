import { type Meta, type StoryObj } from '@storybook/angular';

import { TagComponent } from '../tag';
import { TagGroupComponent } from './tag-group.component';

type StoryArgs = TagGroupComponent & {
  amount: number;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: TagGroupComponent,
  title: 'Components/Tag Group',
  args: {
    amount: 4,
  },
  argTypes: {
    amount: {
      control: {
        type: 'range',
        min: 1,
        max: 12,
        step: 1,
      },
      table: {
        category: 'Custom',
      },
    },
  },
  render: (props) => {
    function setTags() {
      return Array.from(
        { length: props.amount },
        (_, i) => `<flag-tag [removable]="true">Tag ${i + 1}</flag-tag>`,
      ).join('');
    }

    return {
      moduleMetadata: {
        imports: [TagComponent],
      },
      props,
      styles: [
        `
          flag-tag-group {
            max-width: 25rem;
          }
        `,
      ],
      template: `
        <flag-tag-group>
          ${setTags()}
        </flag-tag-group>
      `,
    };
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
