import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';
import { IconComponent } from '@flagarchive/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hoisted-right]': 'hoistedRight()',
    '[class.placeholder]': 'placeholderClass()',
    '[class.reversed]': 'isReversed()',
  },
  imports: [IconComponent],
  selector: 'app-flag-image',
  styleUrl: './flag-image.component.css',
  templateUrl: './flag-image.component.html',
})
export class FlagImageComponent {
  src = input.required<string>();
  alt = input.required<string>();
  hoistedRight = input(false);
  isReversed = input(false);
  placeholder = input(false);

  placeholderClass = linkedSignal(() => this.placeholder());

  handleImageError() {
    this.placeholderClass.set(true);
  }

  handleImageLoad() {
    this.placeholderClass.set(false);
  }
}
