import { inject, Injectable } from '@angular/core';
import { from, map } from 'rxjs';

import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #supabaseService = inject(SupabaseService);

  #supabase = this.#supabaseService.supabase;

  getProfile() {
    const promise = this.#supabase.from('profiles').select('first_name, last_name');

    return from(promise).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }

        if (!data || data.length === 0) {
          return null;
        }

        return data.slice(-1)[0];
      }),
    );
  }
}
