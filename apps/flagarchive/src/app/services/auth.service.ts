import { inject, Injectable, signal } from '@angular/core';
import {
  AuthChangeEvent,
  AuthError,
  AuthResponse,
  Session,
  UserResponse,
} from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';

import { CurrentUser } from '../models';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #supabaseService = inject(SupabaseService);

  currentUser = signal<CurrentUser | null>(null);

  readonly auth = this.#supabaseService.supabase.auth;

  logIn(email: string, password: string): Observable<AuthResponse> {
    const promise = this.auth.signInWithPassword({
      email,
      password,
    });

    return from(promise);
  }

  logOut() {
    this.auth.signOut();
  }

  sendPasswordResetEmail(): Observable<AuthError | null> {
    const promise = this.auth.resetPasswordForEmail(this.currentUser()?.email ?? '', {
      redirectTo: `${window.location.origin}/update-password`,
    });

    return from(promise).pipe(map(({ error }) => error));
  }

  setCurrentUser(event: AuthChangeEvent, session: Session | null) {
    if (event === 'SIGNED_IN' && session?.user) {
      this.currentUser.set({
        email: session.user.email ?? '',
        username: session.user.identities?.at(0)?.identity_data?.['username'] ?? '',
      });
      return;
    }

    if (event === 'SIGNED_OUT') {
      this.currentUser.set(null);
      return;
    }
  }

  signUp(email: string, username: string, password: string): Observable<AuthResponse> {
    const promise = this.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    return from(promise);
  }

  updateEmail(email: string): Observable<UserResponse> {
    const promise = this.auth.updateUser({
      email,
    });

    return from(promise);
  }

  updatePassword(password: string): Observable<UserResponse> {
    const promise = this.auth.updateUser({
      password,
    });

    return from(promise);
  }
}
