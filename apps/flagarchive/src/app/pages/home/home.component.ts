import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
