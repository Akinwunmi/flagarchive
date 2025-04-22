import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { IconComponent } from '../icon';
import { ToastService } from './toast.service';
import { ToastType } from './toast.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'type()',
  },
  imports: [IconComponent],
  selector: 'flag-toast',
  styleUrl: './toast.component.css',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  readonly #toastService = inject(ToastService);

  message = input.required<string>();
  type = input<ToastType>('info');

  icon = computed(() => (this.type() === 'success' ? 'check_circle' : this.type()));

  close() {
    this.#toastService.close();
  }
}
