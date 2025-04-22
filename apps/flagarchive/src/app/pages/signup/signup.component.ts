import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { getErrorMessage } from '@flagarchive/forms';
import { InputComponent, ToastService } from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-page',
  },
  imports: [InputComponent, ReactiveFormsModule, RouterLink, TranslatePipe],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  readonly #authService = inject(AuthService);
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #toastService = inject(ToastService);
  readonly #translate = inject(TranslateService);

  form = this.#fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
    username: ['', [Validators.minLength(3), Validators.required]],
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get username() {
    return this.form.get('username');
  }

  getControlErrorMessage(control: AbstractControl | null): string {
    return getErrorMessage(control);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, username } = this.form.getRawValue();
    this.#authService.signUp(email, username, password).subscribe(({ error }) => {
      if (error) {
        // TODO: Move to store
        this.#toastService.open(this.#translate.instant('notifications.signup.error'), 'error');
        return;
      }

      this.#toastService.open(this.#translate.instant('notifications.signup.success'), 'success');
      this.#router.navigate(['/']);
    });
  }
}
