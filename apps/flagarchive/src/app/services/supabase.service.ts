import { Injectable } from '@angular/core';
import { createClient, PostgrestError } from '@supabase/supabase-js';

import { environment } from '../../environments/environment';
import { Database } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly supabase = createClient<Database>(environment.supabase.url, environment.supabase.key);

  get entities() {
    return this.supabase.from('entities');
  }

  get flagOfTheDay() {
    return this.supabase.from('flag_of_the_day');
  }

  handleError<T>(response: { data: T | null; error: PostgrestError | null }): T {
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data as T;
  }
}
