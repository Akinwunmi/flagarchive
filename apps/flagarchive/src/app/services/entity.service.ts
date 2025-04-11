import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Entity } from '@flagarchive/entities';
import { format } from 'date-fns';
import { combineLatest, map, Observable, of, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  readonly #firestore = inject(Firestore);
  readonly #environmentInjector = inject(EnvironmentInjector);

  #entitiesCollection = collection(this.#firestore, 'entities');
  #metadataCollection = collection(this.#firestore, 'metadata');

  isLoggedIn = false;

  getEntityById(id: string): Observable<Entity> {
    return runInInjectionContext(this.#environmentInjector, () => {
      const entities = query(this.#entitiesCollection, where('id', '==', id), limit(1));
      const entities$ = collectionData(entities, {
        idField: 'baseId',
      }) as Observable<Entity[]>;

      return entities$.pipe(map((entities) => entities[0]));
    });
  }

  getEntitiesByParentId(id: string, altParentId?: boolean): Observable<Entity[]> {
    // Injection context is needed when using zoneless change detection
    return runInInjectionContext(this.#environmentInjector, () => {
      const entitiesWithAltParentId = query(
        this.#entitiesCollection,
        where('altParentId', '==', id),
        limit(75),
      );
      const entitiesWithParentId = query(
        this.#entitiesCollection,
        where('parentIds', 'array-contains', id),
        limit(75),
      );
      return combineLatest([
        altParentId
          ? (collectionData(entitiesWithAltParentId, { idField: 'baseId' }) as Observable<Entity[]>)
          : of([]),
        collectionData(entitiesWithParentId, { idField: 'baseId' }) as Observable<Entity[]>,
      ]).pipe(
        map(([entitiesWithAltParentId, entitiesWithParentId]) => [
          ...entitiesWithAltParentId,
          ...entitiesWithParentId,
        ]),
      );
    });
  }

  getEntitiesByCreatedOn(): Observable<Entity[]> {
    return runInInjectionContext(this.#environmentInjector, () => {
      const entities = query(
        this.#entitiesCollection,
        where('createdOn', '!=', null),
        orderBy('createdOn', 'desc'),
        limit(5),
      );
      return collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;
    });
  }

  getEntitiesByType(types: string[]): Observable<Entity[]> {
    return runInInjectionContext(this.#environmentInjector, () => {
      const entities = query(this.#entitiesCollection, where('type', 'in', types), limit(75));
      return collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;
    });
  }

  getFlagOfTheDay(): Observable<Entity> {
    return runInInjectionContext(this.#environmentInjector, () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const currentFlagOfTheDay = doc(this.#metadataCollection, 'flag-of-the-day');

      return from(getDoc(currentFlagOfTheDay)).pipe(
        switchMap((snapshot) => {
          const flagIsUpToDate = snapshot.exists() && snapshot.data()['date'] === today;
          // If the flag is up to date, we can return the entity directly
          if (flagIsUpToDate || !this.isLoggedIn) {
            const id = (snapshot.data()?.['id'] ?? '') as string;

            return this.getEntityById(id);
          }

          // If the flag is not up to date, we need to get a new random entity
          // and set the flag of the day to that entity
          return from(getDocs(this.#entitiesCollection)).pipe(
            switchMap((snapshot) => {
              const entities = snapshot.docs.map(
                (doc) => ({ id: doc.id, ...doc.data() }) as Entity,
              );
              const randomFlag = entities[Math.floor(Math.random() * entities.length)];

              return from(
                setDoc(currentFlagOfTheDay, {
                  date: today,
                  id: randomFlag.id,
                }),
              ).pipe(map(() => randomFlag));
            }),
          );
        }),
      );
    });
  }
}
