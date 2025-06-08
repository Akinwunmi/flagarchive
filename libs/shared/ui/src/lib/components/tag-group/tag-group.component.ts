import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-tag-group',
  styleUrl: './tag-group.component.css',
  templateUrl: './tag-group.component.html',
})
export class TagGroupComponent {}
