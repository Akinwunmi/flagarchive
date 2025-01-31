import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  CardComponent,
  DropdownTriggerDirective,
  IconComponent,
  PillComponent,
} from '@flagarchive/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, tap } from 'rxjs';

import { Language } from '../../models';
import { AuthService, UserService } from '../../services';
import { AdvancedSearchStore, EntitiesStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    DropdownTriggerDirective,
    IconComponent,
    PillComponent,
    TranslateModule,
    UpperCasePipe,
  ],
  selector: 'app-header',
  styleUrl: './app-header.component.css',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #authService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #router = inject(Router);
  readonly #translateService = inject(TranslateService);
  readonly #userService = inject(UserService);

  menus = viewChildren(DropdownTriggerDirective);

  activeLanguage = toSignal(
    this.#translateService.onLangChange.pipe(map((event) => event.lang))
  );
  currentUser = this.#authService.currentUser;
  isAdmin = this.#userService.isAdmin;

  languages = Object.values(Language);

  setLanguage(language: string) {
    this.#closeMenu();
    this.#translateService
      .use(language)
      .pipe(
        tap(() => this.#advancedSearchStore.triggerSortDirection()),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  goToCreate() {
    this.#closeMenu();
    this.#router.navigate(['create']);
  }

  goToHome() {
    const id = 'af';

    this.#entitiesStore.updateSelectedEntityId(id);
    this.#router.navigate(['discover', 'entity', id]);
  }

  goToLogin() {
    this.#closeMenu();
    this.#router.navigate(['login']);
  }

  logOut() {
    this.#authService.logOut();
    this.#closeMenu();
    this.#router.navigate(['']);
  }

  #closeMenu() {
    this.menus().forEach((menu) => menu.close());
  }
}
