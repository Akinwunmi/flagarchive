import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  AdvancedSearchComponent,
  AppFooterComponent,
  MainNavigationComponent,
} from '../../components';
import { TranslationKeyPipe } from '../../pipes';
import { EntitiesStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchComponent,
    AppFooterComponent,
    MainNavigationComponent,
    RouterOutlet,
  ],
  providers: [TranslationKeyPipe],
  selector: 'app-discover',
  styleUrl: './discover.component.css',
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit {
  readonly #entitiesStore = inject(EntitiesStore);

  ngOnInit() {
    this.#entitiesStore.getMainEntities();
  }
}
