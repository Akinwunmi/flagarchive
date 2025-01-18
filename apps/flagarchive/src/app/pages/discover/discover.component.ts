import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // AdvancedSearchComponent,
    // AppFooterComponent,
    // FlagSkeletonComponent,
    // MainNavigationComponent,
    RouterOutlet,
  ],
  selector: 'app-discover',
  styleUrl: './discover.component.css',
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit {
  // readonly #entitiesStore = inject(EntitiesStore);

  // mainEntities = this.#entitiesStore.main;
  // selected = this.#entitiesStore.selected;

  ngOnInit() {
    console.log('discover');
    // this.#entitiesStore.getMainEntities();
  }
}
