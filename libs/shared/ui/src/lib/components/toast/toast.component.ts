import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IconComponent } from '../icon';
import { ToastType } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'type()',
    '(mouseenter)': 'pause()',
    '(mouseleave)': 'resume()',
  },
  imports: [IconComponent],
  selector: 'flag-toast',
  styleUrl: './toast.component.css',
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #toastService = inject(ToastService);

  message = input.required<string>();
  type = input<ToastType>('info');

  icon = computed(() => (this.type() === 'success' ? 'check_circle' : this.type()));

  ngOnInit() {
    this.#toastService.completed$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.#toastService.close();
    });
  }

  close() {
    this.#toastService.close();
  }

  pause() {
    this.#toastService.pause();
  }

  resume() {
    this.#toastService.resume();
  }
}
