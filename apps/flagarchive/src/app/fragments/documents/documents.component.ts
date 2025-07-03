import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [RouterLink, TranslatePipe],
  selector: 'app-documents',
  styleUrl: './documents.component.css',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent {}
