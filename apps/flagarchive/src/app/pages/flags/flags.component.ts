import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css',
})
export class FlagsComponent {}
