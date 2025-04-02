import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'material-symbols-rounded',
  },
  selector: 'flag-icon',
  styleUrl: './icon.component.css',
  templateUrl: './icon.component.html',
})
export class IconComponent {}
