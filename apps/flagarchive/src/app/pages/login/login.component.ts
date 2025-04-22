import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { getErrorMessage } from '@flagarchive/forms';
import { IconComponent, InputComponent, ToastService } from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-page',
  },
  imports: [IconComponent, InputComponent, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly #authService = inject(AuthService);
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #toastService = inject(ToastService);
  readonly #translate = inject(TranslateService);

  form = this.#fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  getControlErrorMessage(control: AbstractControl | null): string {
    return getErrorMessage(control);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.#authService.logIn(email, password).subscribe(({ error }) => {
      if (error) {
        this.#toastService.open(this.#translate.instant('notifications.login.error'), 'error');
        return;
      }

      this.#toastService.open(this.#translate.instant('notifications.login.success'));
      this.#router.navigate(['/']);
    });
  }
}
