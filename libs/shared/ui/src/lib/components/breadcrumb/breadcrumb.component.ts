import { ChangeDetectionStrategy, Component, contentChild, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DropdownComponent } from '../dropdown';
import { IconComponent } from '../icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RouterLink],
  selector: 'flag-breadcrumb',
  styleUrl: './breadcrumb.component.css',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  label = input.required<string>();
  link = input.required<string[]>();
  hideArrow = input(false);
  hideLabel = input(false);
  icon = input<string>();

  dropdown = contentChild(DropdownComponent);

  active = signal(false);
}
