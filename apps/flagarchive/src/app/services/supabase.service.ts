import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

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
}
