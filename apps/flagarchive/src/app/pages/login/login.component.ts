import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { getErrorMessage } from '@flagarchive/forms';
import { IconComponent, InputComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { UserStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-page',
  },
  imports: [IconComponent, InputComponent, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly #fb = inject(FormBuilder);
  readonly #userStore = inject(UserStore);

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
    this.#userStore.logIn({ email, password });
  }
}
