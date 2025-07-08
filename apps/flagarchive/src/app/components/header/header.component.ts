import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@flagarchive/ui';
import { combineLatest, find, tap } from 'rxjs';

import { AdvancedSearchStore } from '../../store';
import { MainMenuComponent } from '../main-menu';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkPortal, IconComponent, MainMenuComponent, RouterLink],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #destroyRef = inject(DestroyRef);
  readonly #overlay = inject(Overlay);

  mainMenuPortal = viewChild.required(CdkPortal);

  #isTablet = this.#advancedSearchStore.isTablet;

  isMainMenuOpen = signal(false);

  #overlayRef!: OverlayRef;

  closeMainMenu() {
    this.#overlayRef.detach();
    this.isMainMenuOpen.set(false);
  }

  openMainMenu() {
    let positionStrategy = this.#overlay.position().global().left().top();
    if (this.#isTablet()) {
      positionStrategy = this.#overlay.position().global().right().top();
    }

    this.#overlayRef = this.#overlay.create({
      hasBackdrop: true,
      positionStrategy,
    });

    this.#overlayRef.attach(this.mainMenuPortal());
    this.isMainMenuOpen.set(true);

    combineLatest([
      this.#overlayRef.backdropClick().pipe(tap(() => this.closeMainMenu())),
      this.#overlayRef.keydownEvents().pipe(
        find((event) => event.key === 'Escape'),
        tap(() => this.closeMainMenu()),
      ),
    ])
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }
}
