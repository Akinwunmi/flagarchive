import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-label': 'Loading...',
    '[class.loading]': 'loading()',
    '[class.soft]': 'soft()',
  },
  selector: 'flag-skeleton',
  styleUrl: './skeleton.component.css',
  template: '',
})
export class SkeletonComponent {
  public loading = input(false);
  public soft = input(false);
}
