import { type Meta, type StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TabComponent } from '../tab';
import { TabGroupComponent } from './tab-group.component';

type StoryArgs = {
  active: number;
  amount: number;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: TabGroupComponent,
  title: 'Components/Tab Group',
  args: {
    active: 2,
    amount: 4,
  },
  argTypes: {
    active: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 1,
      },
      name: '[active]',
      table: {
        category: 'Inputs',
      },
    },
    amount: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
        step: 1,
      },
      table: {
        category: 'Custom',
      },
    },
  },
  render: (props) => ({
    moduleMetadata: {
      imports: [TabComponent],
    },
    props,
    styles: [
      `
        .tab-content {
          background-color: var(--flag-grey-100);
          color: var(--flag-primary);
          font-family: var(--flag-font-family);
          padding: var(--flag-space-md);
        }
      `,
    ],
    template: `
      <flag-tab-group [active]="${props.active - 1}">
        ${setTabs(props)}
      </flag-tab-group>
    `,
  }),
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('tablist')).toBeTruthy();
  },
};

function setTabs(props: StoryArgs): string {
  const array = Array.from({ length: props.amount }, (_, i) => i);
  return `
    ${array
      .map((tab) => {
        return `
          <flag-tab [label]="'Tab ${tab + 1}'">
            <div class="tab-content">
              Content for Tab ${tab + 1}
            </div>
          </flag-tab>
        `.trim();
      })
      .join('')}
  `;
}
