import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslateModule],
  selector: 'app-footer',
  styleUrl: './app-footer.component.css',
  templateUrl: './app-footer.component.html',
})
export class AppFooterComponent {
  currentYear = new Date().getFullYear();
}
