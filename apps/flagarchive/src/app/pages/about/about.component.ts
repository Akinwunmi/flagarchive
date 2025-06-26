import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TagComponent, TagGroupComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagComponent, TagGroupComponent, TranslatePipe],
  styleUrl: './about.component.css',
  templateUrl: './about.component.html',
})
export class AboutComponent {}
