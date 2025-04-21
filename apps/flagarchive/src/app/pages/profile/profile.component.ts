import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent, InputComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

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
    this.#router.navigate(['/']);
  }

  onSubmit() {
    const email = this.form.value.email;
    if (!email) {
      return;
    }

    this.#authService.updateEmail(email).subscribe(({ error }) => {
      if (error) {
        // TODO: Add toast service
        console.error('Error updating email:', error);
        return;
      }

      this.editing.set(false);
    });
  }

  sendPasswordResetEmail() {
    this.#authService.sendPasswordResetEmail().subscribe((error) => {
      if (error) {
        // TODO: Add toast service
        console.error('Error sending reset password email:', error);
        return;
      }

      console.log('Password reset email sent');
    });
  }

  setEditMode(editing: boolean) {
    this.editing.set(editing);
  }
}
