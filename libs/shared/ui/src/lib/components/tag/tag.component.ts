import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconComponent } from '../icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, FormsModule, NgTemplateOutlet],
  selector: 'flag-tag',
  styleUrl: './tag.component.css',
  templateUrl: './tag.component.html',
})
export class TagComponent {
  checkable = input(false);
  removable = input(false);

  checked = model(false);

  id = crypto.randomUUID();
}
