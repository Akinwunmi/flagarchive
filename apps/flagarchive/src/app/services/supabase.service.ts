import { Injectable } from '@angular/core';
import { createClient, PostgrestError } from '@supabase/supabase-js';

import { SUPABASE_CONFIG } from '../configs';
import { Database } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly supabase = createClient<Database>(
    SUPABASE_CONFIG.supabaseUrl,
    SUPABASE_CONFIG.supabaseKey,
  );

  get entities() {
    return this.supabase.from('entities');
  }

  get flagCategories() {
    return this.supabase.from('entity_flag_categories');
  }

  get flagCategoryRanges() {
    return this.supabase.from('entity_flag_category_ranges');
  }

  get flagOfTheDay() {
    return this.supabase.from('flag_of_the_day');
  }

  get flagRanges() {
    return this.supabase.from('entity_flag_category_ranges');
  }

  get ranges() {
    return this.supabase.from('entity_ranges');
  }

  handleError<T>(response: { data: T | null; error: PostgrestError | null }): T {
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data as T;
  }
}
