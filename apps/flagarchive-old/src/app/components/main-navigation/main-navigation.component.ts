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
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { Entity, EntityType } from '@flagarchive/entities';
import {
  BreadcrumbComponent,
  BreadcrumbGroupComponent,
  DropdownComponent,
  FlagImageComponent,
} from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';

import { DefaultMainEntity, DiscoverSection, RouteIndex } from '../../models';
import { EntitiesStore } from '../../state';
import { MENU_ITEMS } from './main-navigation.constants';
import { BreadcrumbItem } from './main-navigation.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    BreadcrumbGroupComponent,
    DropdownComponent,
    FlagImageComponent,
    NgTemplateOutlet,
    RouterLink,
    TranslatePipe,
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
  readonly #translate = inject(TranslateService);

  mainEntities = this.#entitiesStore.main;
  selected = this.#entitiesStore.selected;

  selectedMainEntityId = signal<string>(DefaultMainEntity.Continents);

  #activeEntityMenuItem = signal(
    this.#router.url.split('/')[RouteIndex.Subtopic]
  );
  #entityMenuItems = signal(
    MENU_ITEMS.map((item) => ({
      ...item,
      label: this.#translate.instant(item.label ?? ''),
      link: ['entity', this.selected().entity?.id, item.value] as string[],
    }))
  );

  #activeEntity = computed(() =>
    this.mainEntities().find(
      (entity) => entity.id === this.selectedMainEntityId()
    )
  );
  #activeSection = computed(() =>
    this.selectedMainEntityId().startsWith('o')
      ? DiscoverSection.Organizations
      : DiscoverSection.Continents
  );

  continents = computed(() => this.#getEntities(EntityType.Continent));
  organizations = computed(() => this.#getEntities(EntityType.Organization));
  isMainEntity = computed(() =>
    Object.values(EntityType).includes(
      this.selected().entity?.type as EntityType
    )
  );

  #mainBreadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
      label: this.#activeSection(),
      options: Object.values(DiscoverSection).map(
        (section) =>
          ({
            active: this.#activeSection() === section,
            label: section,
            link: ['entity', DefaultMainEntity[section]],
            value: DefaultMainEntity[section],
          } as BreadcrumbItem)
      ),
    },
    {
      label: this.#translate.instant(
        `entities.${this.#activeEntity()?.name ?? ''}`
      ),
      options: this.#setMainEntityItems(),
    },
  ]);
  #mainEntityItems = computed(() => this.#setMainEntityItems());

  #entityBreadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
      icon: 'more_horiz',
      label: '',
      options: this.#mainEntityItems(),
    },
    {
      flag: {
        alt: `entities.${this.selected().entity?.name}`,
        src: this.selected().entity?.flags?.official.url ?? '',
      },
      label: this.#translate.instant(
        `entities.${this.selected().entity?.name}`
      ),
    },
    {
      label: this.#translate.instant(
        `discover.${this.#activeEntityMenuItem()}`
      ),
      options: this.#entityMenuItems(),
    },
  ]);
  breadcrumbItems = computed<BreadcrumbItem[]>(() =>
    this.isMainEntity()
      ? this.#mainBreadcrumbItems()
      : this.#entityBreadcrumbItems()
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

  #setMainEntityItems(): BreadcrumbItem[] {
    return (
      this.#activeSection() === DiscoverSection.Continents
        ? this.continents()
        : this.organizations()
    ).map(
      (entity) =>
        ({
          active: entity.id === this.selectedMainEntityId(),
          label: this.#translate.instant(`entities.${entity.name}`),
          link: ['entity', entity.id],
          value: entity.id,
        } as BreadcrumbItem)
    );
  }
}
