import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';

import {
  BreadcrumbItem,
  DefaultMainEntity,
  DiscoverSection,
  Entity,
  EntityType,
  FilterOption,
  RootPath,
  RouteIndex,
} from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { EntitiesStore } from '../../state';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MENU_ITEMS } from './main-navigation.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    NgTemplateOutlet,
    TranslateModule,
    TranslationKeyPipe,
  ],
  selector: 'app-main-navigation',
  styleUrl: './main-navigation.component.css',
  templateUrl: './main-navigation.component.html',
})
export class MainNavigationComponent implements OnInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #translationKeyPipe = inject(TranslationKeyPipe);

  mainEntities = this.#entitiesStore.main;
  selected = this.#entitiesStore.selected;

  entityMenuItems = signal(
    MENU_ITEMS.map((item) => ({
      ...item,
      callback: () => this.#setActiveEntityMenuItem(item.value),
    }))
  );
  selectedMainEntityId = signal<string>(DefaultMainEntity.Continents);
  #activeEntityMenuItem = signal(
    this.#router.url.split('/')[RouteIndex.Subtopic]
  );

  continents = computed(() => this.#getEntities(EntityType.Continent));
  organizations = computed(() => this.#getEntities(EntityType.Organization));

  activeEntity = computed(() =>
    this.mainEntities().find(
      (entity) => entity.id === this.selectedMainEntityId()
    )
  );
  activeSection = computed(() =>
    this.selectedMainEntityId().startsWith('o')
      ? DiscoverSection.Organizations
      : DiscoverSection.Continents
  );
  isMainEntity = computed(() =>
    Object.values(EntityType).includes(
      this.selected().entity?.type as EntityType
    )
  );
  mainEntityItems = computed(() => this.#setMainEntityItems());
  sectionItems = computed<FilterOption[]>(() =>
    Object.values(DiscoverSection).map((section) => ({
      active: this.activeSection() === section,
      label: section,
      value: DefaultMainEntity[section],
    }))
  );

  mainBreadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
      label: this.activeSection(),
      options: Object.values(DiscoverSection).map(
        (section) =>
          ({
            active: this.activeSection() === section,
            callback: () => this.setActiveSection(DefaultMainEntity[section]),
            label: section,
            value: DefaultMainEntity[section],
          } as FilterOption)
      ),
    },
    {
      label: this.#translationKeyPipe.transform(
        'ENTITIES',
        this.activeEntity()?.translationKey ?? ''
      ),
      options: this.#setMainEntityItems(),
    },
  ]);
  entityBreadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
      icon: 'more_horiz',
      label: '',
      options: this.mainEntityItems(),
    },
    {
      flag: {
        alt: this.#translationKeyPipe.transform(
          'ENTITIES',
          this.selected().entity?.translationKey
        ),
        src: this.selected().entity?.flags?.official.url ?? '',
      },
      label: this.#translationKeyPipe.transform(
        'ENTITIES',
        this.selected().entity?.translationKey
      ),
    },
    {
      label: this.#translationKeyPipe.transform(
        'DISCOVER',
        this.#activeEntityMenuItem()
      ),
      options: this.entityMenuItems(),
    },
  ]);
  breadcrumbItems = computed<BreadcrumbItem[]>(() =>
    this.isMainEntity()
      ? this.mainBreadcrumbItems()
      : this.entityBreadcrumbItems()
  );

  defaultMainEntity = DefaultMainEntity;
  discoverSection = DiscoverSection;

  ngOnInit() {
    const initialId = this.#router.url.split('/')[RouteIndex.EntityId];
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event.url.split('/').pop()),
        startWith(initialId),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((id) => {
        if (id && id !== this.selectedMainEntityId()) {
          this.selectedMainEntityId.set(id);
        }
        this.#cdr.markForCheck();
      });
  }

  selectMainEntity(id: string, event?: KeyboardEvent) {
    if (event && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    this.selectedMainEntityId.set(id);
    this.#entitiesStore.updateSelectedEntityId(id);
    this.#router.navigate(['entity', id], { relativeTo: this.#route });
  }

  setActiveSection(value: string) {
    this.selectedMainEntityId.set(value);
    this.#router.navigate(['entity', value], { relativeTo: this.#route });
  }

  #getEntities(type: EntityType): Entity[] {
    return this.mainEntities().filter((entity) => entity.type === type);
  }

  #setActiveEntityMenuItem(value: string) {
    // TODO: Find out why navigation relative to the current route does not work
    this.#router.navigate([
      RootPath.Discover,
      RootPath.Entity,
      this.selected().entity.id,
      value,
    ]);
    this.#activeEntityMenuItem.set(value);
    this.entityMenuItems().forEach(
      (item) => (item.active = item.value === value)
    );
  }

  #setMainEntityItems(): FilterOption[] {
    return (
      this.activeSection() === DiscoverSection.Continents
        ? this.continents()
        : this.organizations()
    ).map(
      (entity) =>
        ({
          active: entity.id === this.selectedMainEntityId(),
          callback: () => this.selectMainEntity(entity.id),
          label: `ENTITIES.${entity.translationKey.toUpperCase()}`,
          value: entity.id,
        } as FilterOption)
    );
  }
}
