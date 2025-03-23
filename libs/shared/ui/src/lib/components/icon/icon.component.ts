import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flag-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'material-symbols-rounded',
  },
})
export class IconComponent {}
