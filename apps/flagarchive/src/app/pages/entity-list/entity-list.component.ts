import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Entity, Layout, RouteIndex } from '../../models';
import { AdvancedSearchStore, EntitiesStore } from '../../state';
import { getActiveRange } from '../../utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-list',
  styleUrl: './entity-list.component.css',
  templateUrl: './entity-list.component.html',
})
export class EntityListComponent implements OnInit {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #meta = inject(Meta);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  entities = this.#entitiesStore.filteredEntities;
  layout = this.#advancedSearchStore.layout;
  sortDirection = this.#advancedSearchStore.sortDirection;

  isGridLayout = computed(() => this.layout() === Layout.Grid);

  #flagCategory = this.#advancedSearchStore.flagCategory;
  #selectedEntityId = this.#entitiesStore.selectedId;
  #selectedYear = this.#advancedSearchStore.selectedYear;

  constructor() {
    effect(() => {
      this.#meta.updateTag({
        property: 'og:url',
        content: `https://flagarchive.com/discover/entity/${this.#selectedEntityId()}`,
      });
    });
  }

  ngOnInit() {
    console.log('entity list');
    const id = this.#router.url.split('/')[RouteIndex.EntityId];
    this.#getEntities(id);

    this.#router.events
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        const id = this.#router.url.split('/')[RouteIndex.EntityId];
        if (id !== this.#selectedEntityId()) {
          this.#getEntities(id);
        }
        this.#cdr.markForCheck();
      });
  }

  getActiveRange(entity: Entity) {
    return getActiveRange(
      this.#selectedYear(),
      entity.flags?.[this.#flagCategory()]?.ranges ?? entity.ranges
    );
  }

  getEntitiesAndNavigate(entity: Entity) {
    const id = entity.altId?.startsWith(this.#selectedEntityId())
      ? entity.altId
      : entity.id;

    this.#getEntities(id);
    this.#router.navigate(['../..', id], { relativeTo: this.#route });
  }

  #getEntities(id?: string) {
    if (id) {
      this.#entitiesStore.getEntities(id);
    }
  }
}
