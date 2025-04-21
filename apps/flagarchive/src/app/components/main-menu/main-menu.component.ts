import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { IconComponent, ListComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { MenuItem } from '../../models';
import { AuthService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkMenu,
    CdkMenuItem,
    CdkTrapFocus,
    IconComponent,
    ListComponent,
    RouterLink,
    TranslatePipe,
  ],
  selector: 'app-main-menu',
  styleUrl: './main-menu.component.css',
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent implements OnInit {
  readonly #authService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  closed = output();

  currentUser = this.#authService.currentUser;

  topMenu = signal<MenuItem[]>([
    {
      label: 'common.flags',
      path: ['flags'],
    },
    {
      label: 'common.about-the-project',
      path: ['about'],
    },
  ]);

  ngOnInit() {
    const path = this.#router.url.split('/').slice(1);
    this.topMenu.update((menu) =>
      menu.map((item) => ({
        ...item,
        active: path[0] === item.path.slice(-1)[0],
      })),
    );

    this.#router.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.close();
    });
  }

  close() {
    this.closed.emit();
  }

  logOut() {
    this.#authService.logOut();
  }
}
