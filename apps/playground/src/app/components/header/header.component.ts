import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@flagarchive/ui';

import { MainMenuComponent } from '../main-menu';
import { find } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CdkPortal, IconComponent, MainMenuComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly #overlay = inject(Overlay);

  mainMenuPortal = viewChild.required(CdkPortal);

  isMainMenuOpen = signal(false);

  #overlayRef!: OverlayRef;

  closeMainMenu() {
    this.#overlayRef.detach();
    this.isMainMenuOpen.set(false);
  }

  openMainMenu() {
    this.#overlayRef = this.#overlay.create({
      hasBackdrop: true,
      positionStrategy: this.#overlay.position().global().left().top(),
    });

    this.#overlayRef.attach(this.mainMenuPortal());
    this.isMainMenuOpen.set(true);

    this.#overlayRef
      .keydownEvents()
      .pipe(find((event) => event.key === 'Escape'))
      .subscribe(() => {
        this.closeMainMenu();
      });

    this.#overlayRef.backdropClick().subscribe(() => {
      this.closeMainMenu();
    });
  }
}
