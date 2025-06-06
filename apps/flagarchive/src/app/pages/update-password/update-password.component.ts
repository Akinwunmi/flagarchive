import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getErrorMessage, passwordsValidator } from '@flagarchive/forms';
import { InputComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { UserStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-page',
  },
  imports: [InputComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent {
  readonly #fb = inject(FormBuilder);
  readonly #userStore = inject(UserStore);

  form = this.#fb.group(
    {
      password: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordsValidator,
    },
  );

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  getControlErrorMessage(control: AbstractControl | null): string {
    return getErrorMessage(control, this.form);
  }

  onSubmit() {
    const { password, confirmPassword } = this.form.getRawValue();
    if (!password || !confirmPassword || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.#userStore.updatePassword(password);
  }
}
