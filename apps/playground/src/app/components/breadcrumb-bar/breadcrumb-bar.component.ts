import { Component, inject } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbGroupComponent, IconComponent } from '@flagarchive/ui';

import { EntitiesStore } from '../../store';

@Component({
  selector: 'app-breadcrumb-bar',
  imports: [BreadcrumbComponent, BreadcrumbGroupComponent, IconComponent],
  templateUrl: './breadcrumb-bar.component.html',
  styleUrl: './breadcrumb-bar.component.css',
})
export class BreadcrumbBarComponent {
  readonly #entitiesStore = inject(EntitiesStore);

  selectedEntity = this.#entitiesStore.selectedEntity;
}
