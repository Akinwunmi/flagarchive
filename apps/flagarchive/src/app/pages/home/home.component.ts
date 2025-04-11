import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@flagarchive/ui';

import { EntityComponent } from '../../components/entity';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EntityComponent, IconComponent, RouterLink],
  selector: 'app-home',
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
