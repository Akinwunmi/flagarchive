import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { EntityComponent, FooterComponent } from '../../components';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EntityComponent, FooterComponent, IconComponent, RouterLink, TranslatePipe],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly #entitiesStore = inject(EntitiesStore);

  flagOfTheDay = this.#entitiesStore.flagOfTheDay;
  newestAdditions = this.#entitiesStore.newestAdditions;

  ngOnInit() {
    this.#entitiesStore.loadFlagOfTheDay();
    this.#entitiesStore.loadNewestAdditions();
  }
}
