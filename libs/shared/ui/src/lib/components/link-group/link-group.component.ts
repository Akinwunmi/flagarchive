import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Link } from './link.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'flag-link-group',
  templateUrl: './link-group.component.html',
})
export class LinkGroupComponent {
  links = input.required<Link[]>();
}
