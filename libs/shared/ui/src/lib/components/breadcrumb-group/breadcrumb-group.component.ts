import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
} from '@angular/core';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-breadcrumb-group',
  styleUrl: './breadcrumb-group.component.css',
  templateUrl: './breadcrumb-group.component.html',
})
export class BreadcrumbGroupComponent {
  breadcrumbs = contentChildren(BreadcrumbComponent);

  constructor() {
    effect(() => {
      this.breadcrumbs().forEach((breadcrumb, index) => {
        breadcrumb.active.set(index === this.breadcrumbs().length - 1);
      });
    });
  }
}
