import { provideRouter, RouterLink } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BreadcrumbGroupComponent } from './breadcrumb-group.component';

type StoryArgs = BreadcrumbGroupComponent & {
  amount: number;
  dropdownBreadcrumbs: number[];
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: BreadcrumbGroupComponent,
  title: 'Components/Breadcrumb Group',
  args: {
    amount: 5,
    dropdownBreadcrumbs: [1],
  },
  argTypes: {
    amount: {
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
    dropdownBreadcrumbs: {
      control: {
        type: 'multi-select',
      },
      options: Array.from({ length: 9 }, (_, i) => i + 1),
    },
  },
  render: (props) => ({
    applicationConfig: {
      providers: [provideRouter([])],
    },
    moduleMetadata: {
      imports: [BreadcrumbComponent, DropdownComponent, RouterLink],
    },
    props,
    template: `
      <flag-breadcrumb-group>
        ${setBreadcrumbs(props)}
      </flag-breadcrumb-group>
    `,
  }),
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('navigation')).toBeTruthy();
  },
};

function setBreadcrumbs(props: StoryArgs): string {
  const array = Array.from({ length: props.amount }, (_, i) => i);
  return `
    ${array
      .map((breadcrumb) => {
        if (props.dropdownBreadcrumbs.includes(breadcrumb + 1)) {
          return `
            <flag-breadcrumb
              label="Dropdown"
              [link]="['/', '${breadcrumb + 1}']"
            >
              <flag-dropdown icon="more_horiz" label="" [extraSmall]="true" [hideChevron]="true">
                <a flag-list-item [routerLink]="['/', '${breadcrumb + 1}1']">Item 1</a>
                <a flag-list-item [routerLink]="['/', '${breadcrumb + 1}2']">Item 2</a>
              </flag-dropdown>
            </flag-breadcrumb>
          `.trim();
        }

        return `
          <flag-breadcrumb
            [label]="'Item ' + (${breadcrumb} + 1)"
            [link]="['/', '${breadcrumb + 1}']"
          />
        `.trim();
      })
      .join('')}
  `;
}
