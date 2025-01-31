import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

import { AuthUser } from '../../models';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #firebaseAuth = inject(Auth);
  readonly #userService = inject(UserService);

  #user = toSignal<User | null>(user(this.#firebaseAuth));

  currentUser = computed<AuthUser | undefined>(() => {
    const user = this.#user();
    return user
      ? ({ email: user.email, username: user.displayName } as AuthUser)
      : undefined;
  });

  signUp(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.#firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  logIn(email: string, password: string): Observable<string> {
    const promise = signInWithEmailAndPassword(
      this.#firebaseAuth,
      email,
      password
    ).then(() => 'success');

    return from(promise);
  }

  logOut() {
    this.#userService.favorites.set([]);
    this.#userService.roles.set([]);
    this.#firebaseAuth.signOut();
  }
}
