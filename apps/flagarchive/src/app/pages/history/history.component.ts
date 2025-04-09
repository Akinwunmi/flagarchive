import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  selector: 'app-history',
  styleUrl: './history.component.css',
  templateUrl: './history.component.html',
})
export class HistoryComponent {}
