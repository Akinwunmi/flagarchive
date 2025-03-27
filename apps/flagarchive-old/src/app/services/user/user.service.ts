import { Injectable, computed, inject, signal } from '@angular/core';
import { Auth, User as FirebaseUser, user } from '@angular/fire/auth';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { EMPTY, Observable, from, map, switchMap, tap } from 'rxjs';

import { DatabaseCollection, User, UserRole } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #firebaseAuth = inject(Auth);
  readonly #firestore = inject(Firestore);

  #docRef$: Observable<
    DocumentReference<DocumentData, DocumentData> | undefined
  > = user(this.#firebaseAuth).pipe(
    map((user: FirebaseUser | null) =>
      user
        ? doc(this.#firestore, `${DatabaseCollection.Users}/${user.uid}`)
        : undefined
    )
  );

  favorites = signal<string[]>([]);
  roles = signal<UserRole[]>([]);

  isAdmin = computed(() => this.roles().includes(UserRole.Admin));

  addUser(name: string, surname: string): Observable<void> {
    return this.#docRef$.pipe(
      switchMap((docRef) => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = setDoc(docRef, { favorites: [], name, surname });
        return from(promise);
      })
    );
  }

  getUser(): Observable<User> {
    return this.#docRef$.pipe(
      switchMap((docRef) => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = getDoc(docRef).then(
          (snapshot) => snapshot.data() as User
        );
        return from(promise).pipe(
          tap((user) => {
            this.favorites.set(user.favorites);
            this.roles.set(user.roles ?? []);
          })
        );
      })
    );
  }

  addFavorite(id: string): Observable<User> {
    return this.#docRef$.pipe(
      switchMap((docRef) => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = updateDoc(docRef, { favorites: arrayUnion(id) });
        return from(promise).pipe(
          switchMap(() => this.getUser()),
          tap((user) => this.favorites.set(user.favorites))
        );
      })
    );
  }

  removeFavorite(id: string): Observable<User> {
    return this.#docRef$.pipe(
      switchMap((docRef) => {
        if (!docRef) {
          return EMPTY;
        }

        const promise = updateDoc(docRef, { favorites: arrayRemove(id) });
        return from(promise).pipe(
          switchMap(() => this.getUser()),
          tap((user) => this.favorites.set(user.favorites))
        );
      })
    );
  }
}
