import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getErrorMessage, passwordsValidator } from '@flagarchive/forms';
import { InputComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-page',
  },
  imports: [InputComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent {
  readonly #authService = inject(AuthService);
  readonly #fb = inject(FormBuilder);

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

    this.#authService.updatePassword(password).subscribe(({ error }) => {
      if (error) {
        // TODO: Add toast service
        console.error('Error updating password:', error);
        return;
      }
    });
  }
}
