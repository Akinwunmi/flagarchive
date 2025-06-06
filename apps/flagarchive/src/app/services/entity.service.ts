import { inject, Injectable } from '@angular/core';
import { Entity } from '@flagarchive/entities';
import { combineLatest, map, Observable, from } from 'rxjs';

import { DbEntity } from '../models';
import { sanitizeEntity } from '../utils';
import { SupabaseService } from './supabase.service';

const ENTITY_SELECT_QUERY =
  '*, entity_flags(*, entity_flag_ranges(*)), entity_ranges(*), entity_sources(*)';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  readonly #supabaseService = inject(SupabaseService);

  isLoggedIn = false;

  getEntityById(uniqueId: string): Observable<Entity> {
    const query = this.#supabaseService.entities
      .select(ENTITY_SELECT_QUERY)
      .eq('unique_id', uniqueId)
      .limit(1);

    return from(query).pipe(
      map((response) => {
        const entity = this.#supabaseService.handleError<DbEntity[]>(response)[0];

        return sanitizeEntity(entity);
      }),
    );
  }

  getEntitiesByParentId(uniqueId: string, altParentId?: boolean): Observable<Entity[]> {
    const queries = [
      this.#supabaseService.entities.select(ENTITY_SELECT_QUERY).contains('parent_ids', [uniqueId]),
      altParentId
        ? this.#supabaseService.entities.select(ENTITY_SELECT_QUERY).eq('alt_parent_id', uniqueId)
        : [],
    ];

    return combineLatest(queries).pipe(
      map(([parentIds, altParentId]) => ({
        data: [...(parentIds.data ?? []), ...(altParentId.data ?? [])] as DbEntity[],
        error: parentIds.error ?? altParentId.error,
      })),
      map((response) => {
        const entities = this.#supabaseService.handleError<DbEntity[]>(response);
        return entities.map((entity) => sanitizeEntity(entity));
      }),
    );
  }

  getRecentEntities(): Observable<Entity[]> {
    const query = this.#supabaseService.entities
      .select(ENTITY_SELECT_QUERY)
      .order('inserted_at', { ascending: false })
      .limit(5);

    return from(query).pipe(
      map((response) => {
        const entities = this.#supabaseService.handleError<DbEntity[]>(response);
        return entities.map((entity) => sanitizeEntity(entity));
      }),
    );
  }

  getEntitiesByType(types: string[]): Observable<Entity[]> {
    const query = this.#supabaseService.entities.select().in('type', types);

    return from(query).pipe(
      map((response) => {
        const entities = this.#supabaseService.handleError<DbEntity[]>(response);

        return entities.map((entity) => sanitizeEntity(entity));
      }),
    );
  }

  getFlagOfTheDay(): Observable<Entity> {
    // TODO: Get and set random entity from the database
    return this.getEntityById('com');
  }
}
