import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';

import { HighlightPipe } from '../../pipes';
import { CardComponent } from '../card';
import { ListComponent } from '../list';
import { AutocompleteOption } from './autocomplete.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, HighlightPipe, ListComponent],
  selector: 'flag-autocomplete',
  styleUrl: './autocomplete.component.css',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent {
  options = input.required<AutocompleteOption[]>();

  selectedOption = model<AutocompleteOption>();

  readonly template = viewChild.required(TemplateRef);

  searchValue = signal('');

  filteredOptions = computed(() => {
    const search = this.searchValue().toLowerCase();
    return this.options().filter(
      (option) =>
        option.label.toLowerCase().includes(search) || option.value.toLowerCase().includes(search),
    );
  });

  id = `flag-autocomplete-${crypto.randomUUID()}`;

  selectOption(option: AutocompleteOption) {
    this.selectedOption.set(option);
    this.searchValue.set('');
  }
}
