import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import {
  AdvancedSearchBarComponent,
  DetailsComponent,
  EntitiesComponent,
  HistoryComponent,
  MobileEntityBarComponent,
  SidenavComponent,
  SourcesComponent,
} from '../../components';
import { ENTITY_MENU_ITEMS } from '../../constants';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchBarComponent,
    DetailsComponent,
    EntitiesComponent,
    HistoryComponent,
    MobileEntityBarComponent,
    SidenavComponent,
    SourcesComponent,
  ],
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css',
})
export class FlagsComponent implements AfterViewInit, OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  fragments = viewChildren<ElementRef<HTMLDivElement>>('fragment');

  isMainEntity = this.#entitiesStore.isMainEntity;

  #routerPath = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/').slice(1)),
    ),
  );

  #activePage = signal<string | null>(null);

  #entityPath = computed(() => this.#routerPath()?.[1]);
  entityId = computed(() => this.#entityPath()?.split('#')[0] ?? '');
  entityItems = computed(() =>
    ENTITY_MENU_ITEMS.map((item) => ({
      ...item,
      active: item.fragment === this.#activePage(),
      path: ['/flags', this.entityId()],
    })),
  );
  mainPage = computed(() => this.#routerPath()?.[0] ?? '');

  ngAfterViewInit(): void {
    const options: IntersectionObserverInit = {
      rootMargin: '-20% 0px -80% 0px', // Activate when in top 20% of viewport
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const componentName = entry.target.id;
        if (entry.isIntersecting) {
          this.#activePage.set(componentName);
        }
      });
    }, options);

    // Observe components
    this.fragments().forEach((fragment) => {
      if (fragment.nativeElement) {
        observer.observe(fragment.nativeElement);
      }
    });
  }

  ngOnInit() {
    this.#route.fragment.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((fragment) => {
      if (fragment) {
        this.#jumpToFragment(fragment);
      }
    });
  }

  #jumpToFragment(fragment: string) {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
