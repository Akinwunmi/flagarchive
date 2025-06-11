import { type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';

import { InputComponent } from '../input';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteOption } from './autocomplete.model';

type StoryArgs = AutocompleteComponent & {
  options: AutocompleteOption[];
  placeholder?: string;
  value?: string;
  selectedOptionChange: (option: AutocompleteOption) => void;
};

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: AutocompleteComponent,
  title: 'Components/Autocomplete',
  args: {
    options: [
      { label: 'Africa', value: 'af' },
      { label: 'Congo, Democratic Republic of', value: 'cod' },
      { label: 'Congo, Republic of', value: 'cog' },
      { label: 'Comoros', value: 'com' },
      { label: 'Anjouan', value: 'com-anj' },
    ],
    placeholder: 'Search for an entity',
    selectedOptionChange: fn(),
    value: '',
  },
  argTypes: {
    selectedOptionChange: {
      action: 'selectedOptionChange',
      table: {
        category: 'Output',
      },
    },
  },
  render: (props) => {
    return {
      moduleMetadata: {
        imports: [AutocompleteDirective, InputComponent],
      },
      props: {
        ...props,
        selectedOption: props.selectedOption,
      },
      styles: [
        `
          flag-input {
            max-width: 20rem;
          }
        `,
      ],
      template: `
        <flag-input
          label="Autocomplete"
          type="search"
          [flagAutocomplete]="autocomplete"
          ${props.placeholder ? `placeholder="${props.placeholder}"` : ''}
          ${props.value ? `value="${props.value}"` : ''}
        />
        <flag-autocomplete #autocomplete [options]="options" />
      `,
    };
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Autocomplete')).toBeTruthy();
  },
};
