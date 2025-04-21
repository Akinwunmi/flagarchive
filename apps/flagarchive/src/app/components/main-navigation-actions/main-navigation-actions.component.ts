import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { DropdownComponent, IconComponent } from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, map, tap } from 'rxjs';

import { AuthService } from '../../services';
import { AdvancedSearchStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownComponent, IconComponent, RouterLink, TranslatePipe],
  selector: 'app-main-navigation-actions',
  styleUrl: './main-navigation-actions.component.css',
  templateUrl: './main-navigation-actions.component.html',
})
export class MainNavigationActionsComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #authService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);

  currentUser = this.#authService.currentUser;

  isLanguageMenuOpen = signal(false);

  #routerPath = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/').slice(1)),
    ),
  );

  mainPage = computed(() => this.#routerPath()?.[0] ?? '');

  getCurrentLanguage(): string {
    return this.#translate.currentLang;
  }

  logOut() {
    this.#authService.logOut();
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
