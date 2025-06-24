import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FlagCategory } from '@flagarchive/advanced-search';
import { FlagImage, FlagImageComponent, FlagUsageSymbolComponent } from '@flagarchive/entities';
import { HyphenatePipe, TooltipDirective } from '@flagarchive/ui';
import { TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagImageComponent, FlagUsageSymbolComponent, TooltipDirective],
  providers: [HyphenatePipe],
  selector: 'app-history-entity',
  styleUrl: './history-entity.component.css',
  templateUrl: './history-entity.component.html',
})
export class HistoryEntityComponent {
  readonly #hyphenate = inject(HyphenatePipe);
  readonly #translate = inject(TranslateService);

  categories = input.required<FlagCategory[]>();
  flag = input.required<FlagImage>();

  setCategoriesTooltip(categories: FlagCategory[]): string {
    const translations = categories.map((category) => {
      return this.#translate.instant(`flag-categories.${this.#hyphenate.transform(category)}`);
    });
    return translations.join(', ');
  }
}
