import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdvancedSearchComponent, AppFooterComponent } from '../../components';
import { EntitiesStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchComponent,
    AppFooterComponent,
    // SkeletonComponent,
    // MainNavigationComponent,
    RouterOutlet,
  ],
  selector: 'app-discover',
  styleUrl: './discover.component.css',
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit {
  readonly #entitiesStore = inject(EntitiesStore);

  mainEntities = this.#entitiesStore.main;
  selected = this.#entitiesStore.selected;

  ngOnInit() {
    console.log('discover');
    this.#entitiesStore.getMainEntities();
  }
}
