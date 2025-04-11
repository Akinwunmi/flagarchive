import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbGroupComponent,
  DropdownComponent,
  HyphenatePipe,
  IconComponent,
} from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';

import { WindowResizeService } from '../../services';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    BreadcrumbGroupComponent,
    UpperCasePipe,
    DropdownComponent,
    HyphenatePipe,
    IconComponent,
    RouterLink,
    TranslatePipe,
  ],
  selector: 'app-navigation-bar',
  styleUrl: './navigation-bar.component.css',
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #translate = inject(TranslateService);
  readonly #windowResizeService = inject(WindowResizeService);

  continents = this.#entitiesStore.continents;
  globalEntities = this.#entitiesStore.globalEntities;
  isMainEntity = this.#entitiesStore.isMainEntity;
  selectedEntity = this.#entitiesStore.selectedEntity;

  isMobile = this.#windowResizeService.isMobile;
  isTablet = this.#windowResizeService.isTablet;

  basePath = '/flags';
  isLanguageMenuOpen = signal(false);
  isMainEntityTypesMenuOpen = signal(false);
  isMainEntitiesMenuOpen = signal(false);

  mainEntities = computed(() => {
    const selectedEntity = this.selectedEntity();
    if (!this.isMainEntity() || !selectedEntity) {
      return [];
    }

    return selectedEntity.type === 'continent' ? this.continents() : this.globalEntities();
  });
  selectedMainEntityType = computed(() => {
    const selectedEntity = this.selectedEntity();
    if (this.isMobile() || !selectedEntity) {
      return '';
    }

    return selectedEntity.type === 'continent' ? 'continents' : 'global';
  });

  mainEntityTypes = ['continents', 'global'];

  closeMainEntitiesMenu() {
    this.isMainEntitiesMenuOpen.set(false);
  }

  closeMainEntityTypesMenu() {
    this.isMainEntityTypesMenuOpen.set(false);
  }

  getCurrentLanguage(): string {
    return this.#translate.currentLang;
  }

  setLanguage(language: string) {
    this.#translate
      .use(language)
      .pipe(
        tap(() => this.#advancedSearchStore.triggerSortDirection()),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe({
        next: () => this.isLanguageMenuOpen.set(false),
        error: (error) => console.error('Error changing language:', error),
      });
  }
}
