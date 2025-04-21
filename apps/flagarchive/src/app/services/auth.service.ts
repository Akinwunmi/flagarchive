import { Injectable, signal } from '@angular/core';
import {
  AuthChangeEvent,
  AuthError,
  AuthResponse,
  createClient,
  Session,
  UserResponse,
} from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';

import { SUPABASE_CONFIG } from '../configs';
import { CurrentUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<CurrentUser | null>(null);

  supabase = createClient(SUPABASE_CONFIG.supabaseUrl, SUPABASE_CONFIG.supabaseKey);

  logIn(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    return from(promise);
  }

  logOut() {
    this.supabase.auth.signOut();
  }

  sendPasswordResetEmail(): Observable<AuthError | null> {
    const promise = this.supabase.auth.resetPasswordForEmail(this.currentUser()?.email ?? '', {
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
    const promise = this.supabase.auth.signUp({
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
    const promise = this.supabase.auth.updateUser({
      email,
    });

    return from(promise);
  }

  updatePassword(password: string): Observable<UserResponse> {
    const promise = this.supabase.auth.updateUser({
      password,
    });

    return from(promise);
  }
}
