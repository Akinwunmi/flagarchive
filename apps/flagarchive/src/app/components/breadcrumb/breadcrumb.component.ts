import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DropdownComponent, IconComponent } from '@flagarchive/ui';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbItem, FilterOption } from '../../models';
import { FlagImageComponent } from '../flag-image/flag-image.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownComponent,
    IconComponent,
    FlagImageComponent,
    TranslateModule,
  ],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.component.css',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();

  handleSelectItem(item: FilterOption) {
    item.callback?.();
  }
}
