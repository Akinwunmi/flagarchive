import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FormFieldComponent } from '../form-field';
import { IconComponent } from '../icon';
import { InputType } from './input.model';
import { InputService } from './input.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'textbox',
  },
  imports: [IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  selector: 'flag-input',
  styleUrls: [
    '../form-field/form-field.component.css',
    '../form-field/input.css',
    './input.component.css',
  ],
  templateUrl: './input.component.html',
})
export class InputComponent extends FormFieldComponent implements ControlValueAccessor {
  readonly #inputService = inject(InputService);

  placeholder = input('');
  readonly = input(false);
  type = input<InputType>('text');

  changed = output<string | number>();

  disabled = model(false);
  value = model<string | number>('');

  uuid = crypto.randomUUID();

  constructor() {
    super();
    effect(() => {
      this.value.set(this.#inputService.value());
    });
  }

  #onChange: (value: string | number) => void = () => {
    this.changed.emit(this.value());
  };

  #onTouched: () => void = () => {
    // noop
  };

  onBlur() {
    this.#onTouched();
  }

  onInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.#setValue(value);
    this.#onChange(this.value());
  }

  registerOnChange(fn: (value: string | number) => void) {
    this.#onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.#onTouched = fn;
  }

  setDisabledState?(disabled: boolean) {
    this.disabled.set(disabled);
  }

  writeValue(value: string) {
    this.#setValue(value);
  }

  #setValue(value: string) {
    this.value.set(this.type() === 'number' ? Number(value) : value);
  }
}
