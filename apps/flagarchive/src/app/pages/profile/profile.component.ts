import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IconComponent, InputComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { Profile } from '../../models';
import { UserStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'auth-page',
  },
  imports: [IconComponent, InputComponent, ReactiveFormsModule, TranslatePipe],
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #userStore = inject(UserStore);

  #profile = this.#userStore.profile;
  currentUser = this.#userStore.currentUser;
  editing = this.#userStore.editing;

  loading = signal(false);
  profile = signal<Profile | null>(null);

  form = this.#fb.group({
    email: '',
    firstName: '',
    lastName: '',
  });

  constructor() {
    effect(() => {
      const currentUser = this.currentUser();
      const profile = this.#profile();

      if (currentUser) {
        this.form.patchValue({
          email: currentUser.email,
        });
      }

      if (profile) {
        this.form.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
        });
      }
    });
  }

  ngOnInit() {
    this.#userStore.loadProfile();
  }

  logOut() {
    this.#userStore.logOut();
  }

  onSubmit() {
    const email = this.form.value.email;
    if (!email) {
      return;
    }

    this.#userStore.updateEmail(email);
  }

  sendPasswordResetEmail() {
    this.#userStore.sendPasswordResetEmail();
  }

  setEditing(editing: boolean) {
    this.#userStore.setEditing(editing);
  }
}
