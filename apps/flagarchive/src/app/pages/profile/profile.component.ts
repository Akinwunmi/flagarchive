import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent, InputComponent, ToastService } from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Profile } from '../../models';
import { AuthService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-page',
  },
  imports: [IconComponent, InputComponent, ReactiveFormsModule, TranslatePipe],
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  readonly #authService = inject(AuthService);
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #toastService = inject(ToastService);
  readonly #translate = inject(TranslateService);

  currentUser = this.#authService.currentUser;

  editing = signal(false);
  loading = signal(false);
  profile = signal<Profile | null>(null);

  form = this.#fb.group({
    email: '',
  });

  constructor() {
    effect(() => {
      if (this.currentUser()) {
        this.form.patchValue({
          email: this.currentUser()?.email,
        });
      }
    });
  }

  logOut() {
    this.#authService.logOut();
    this.#toastService.open(this.#translate.instant('notifications.logout.success'));
    this.#router.navigate(['/']);
  }

  onSubmit() {
    const email = this.form.value.email;
    if (!email) {
      return;
    }

    this.#authService.updateEmail(email).subscribe(({ error }) => {
      if (error) {
        // TODO: Move to store
        this.#toastService.open(
          this.#translate.instant('notifications.update-profile.error'),
          'error',
        );
        return;
      }

      this.#toastService.open(
        this.#translate.instant('notifications.update-profile.success'),
        'success',
      );
      this.editing.set(false);
    });
  }

  sendPasswordResetEmail() {
    this.#authService.sendPasswordResetEmail().subscribe((error) => {
      if (error) {
        // TODO: Move to store
        this.#toastService.open(
          this.#translate.instant('notifications.change-password.error'),
          'error',
        );
        return;
      }

      this.#toastService.open(this.#translate.instant('notifications.change-password.success'));
    });
  }

  setEditMode(editing: boolean) {
    this.editing.set(editing);
  }
}
