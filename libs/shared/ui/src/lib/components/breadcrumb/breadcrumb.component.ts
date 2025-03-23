import { ChangeDetectionStrategy, Component, contentChild, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DropdownComponent } from '../dropdown/dropdown.component';
import { FlagImageComponent } from '../flag-image/flag-image.component';
import { IconComponent } from '../icon/icon.component';

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
  flagImage = contentChild(FlagImageComponent);

  active = signal(false);
}
