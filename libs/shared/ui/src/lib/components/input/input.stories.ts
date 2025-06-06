import { type Meta, type StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { InputComponent } from './input.component';

type StoryArgs = InputComponent;

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: InputComponent,
  title: 'Components/Input',
  args: {
    disabled: false,
    errorMessage: '',
    infoMessage: '',
    label: 'Input',
    placeholder: 'Enter text',
    readonly: false,
    required: false,
    type: 'text',
    value: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'search', 'tel', 'url'],
      name: '[type]',
      table: {
        category: 'Inputs',
      },
    },
  },
  render: (props) => ({
    props,
    styles: [
      `
        flag-input {
          max-width: 20rem;
        }
      `,
    ],
    template: `
      <flag-input
        label="${props.label}"
        ${props.disabled ? '[disabled]="true"' : ''}
        ${props.errorMessage ? `errorMessage="${props.errorMessage}"` : ''}
        ${props.infoMessage ? `infoMessage="${props.infoMessage}"` : ''}
        ${props.placeholder ? `placeholder="${props.placeholder}"` : ''}
        ${props.readonly ? '[readonly]="true"' : ''}
        ${props.required ? '[required]="true"' : ''}
        ${props.type ? `type="${props.type}"` : ''}
        ${props.value ? `value="${props.value}"` : ''}
      />
    `,
  }),
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Input')).toBeTruthy();
  },
};

export const SearchInput: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for something...',
    type: 'search',
  },
};
