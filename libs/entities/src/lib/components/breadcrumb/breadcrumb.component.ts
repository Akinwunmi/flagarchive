import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FilterOption } from '@flagarchive/advanced-search';
import { DropdownComponent, IconComponent } from '@flagarchive/ui';

import { FlagImageComponent } from '../flag-image/flag-image.component';
import { BreadcrumbItem } from './breadcrumb.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownComponent, IconComponent, FlagImageComponent],
  selector: 'flag-breadcrumb',
  styleUrl: './breadcrumb.component.css',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();

  handleSelectItem(item: FilterOption) {
    item.callback?.();
  }
}
