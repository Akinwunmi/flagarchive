import { inject, Injectable } from '@angular/core';
import { EntityType } from '@flagarchive/entities';

import { SupabaseService } from './supabase.service';

const ENTITY_SELECT_QUERY =
  '*, entity_flags(*, entity_flag_ranges(*)), entity_ranges(*), entity_sources(*)';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  readonly #supabaseService = inject(SupabaseService);

  isLoggedIn = false;

  getEntitiesByAltParentId(uniqueId: string) {
    return this.#supabaseService.entities.select(ENTITY_SELECT_QUERY).eq('alt_parent_id', uniqueId);
  }

  getEntitiesByParentId(uniqueId: string) {
    return this.#supabaseService.entities
      .select(ENTITY_SELECT_QUERY)
      .contains('parent_ids', [uniqueId]);
  }

  getEntitiesByUniqueId(uniqueIds: string[]) {
    return this.#supabaseService.entities
      .select(ENTITY_SELECT_QUERY)
      .in('unique_id', uniqueIds)
      .limit(5);
  }

  getEntityById(uniqueId: string) {
    return this.#supabaseService.entities
      .select(ENTITY_SELECT_QUERY)
      .eq('unique_id', uniqueId)
      .limit(1);
  }

  getFlagOfTheDay() {
    // TODO: Get and set random entity from the database
    return this.getEntityById('com');
  }

  getMainEntities() {
    const types = [EntityType.Continent, EntityType.Organization];
    return this.#supabaseService.entities.select().in('type', types);
  }

  getRecentEntities() {
    return this.#supabaseService.entities
      .select(ENTITY_SELECT_QUERY)
      .order('inserted_at', { ascending: false })
      .limit(5);
  }
}
