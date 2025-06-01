import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IconComponent } from '../icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.checked]': 'checked()',
    '[class.disabled]': 'disabled()',
    '[class.indeterminate]': 'indeterminate()',
    '[class.secondary]': 'secondary()',
    '(click)': 'toggle()',
    '(keydown)': 'onKeydown($event)',
  },
  imports: [IconComponent],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
    },
  ],
  selector: 'flag-checkbox',
  styleUrl: './checkbox.component.css',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input.required<string>();
  disabled = input(false);
  hideLabel = input(false);
  name = input('');
  secondary = input(false);

  checked = model(false);
  indeterminate = model(false);

  uuid = crypto.randomUUID();

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  registerOnChange(fn: (checked: boolean) => void) {
    this.checked.subscribe(fn);
  }

  registerOnTouched() {
    // noop
  }

  toggle() {
    if (!this.checked()) {
      this.indeterminate.set(false);
    }

    this.checked.update((checked) => !checked);
  }

  writeValue(checked: boolean) {
    this.checked.set(checked);
  }
}
