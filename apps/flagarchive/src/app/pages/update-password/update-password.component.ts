import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { getErrorMessage, passwordsValidator } from '@flagarchive/forms';
import { InputComponent, ToastService } from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services';
import { Router } from '@angular/router';

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
  readonly #router = inject(Router);
  readonly #toastService = inject(ToastService);
  readonly #translate = inject(TranslateService);

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
        // TODO: Move to store
        this.#toastService.open(
          this.#translate.instant('notifications.update-password.error'),
          'error',
        );
        return;
      }

      this.#toastService.open(
        this.#translate.instant('notifications.update-password.success'),
        'success',
      );
      this.#router.navigate(['/']);
    });
  }
}
