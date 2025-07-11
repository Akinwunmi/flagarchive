import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlagCategory } from '@flagarchive/advanced-search';
import { Flag, FlagImageComponent, FlagUsageSymbolComponent } from '@flagarchive/entities';
import { HyphenatePipe, IconComponent, TooltipDirective } from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.card]': 'cardView()',
  },
  imports: [
    FlagImageComponent,
    FlagUsageSymbolComponent,
    IconComponent,
    RouterLink,
    TooltipDirective,
    TranslatePipe,
    UpperCasePipe,
  ],
  providers: [HyphenatePipe],
  selector: 'app-flag',
  styleUrl: './flag.component.css',
  templateUrl: './flag.component.html',
})
export class FlagComponent {
  readonly #hyphenate = inject(HyphenatePipe);
  readonly #translate = inject(TranslateService);

  flag = input.required<Flag>();
  cardView = input(true);
  currentPage = input<string>();

  isReversed = signal(false);

  flagImageSrc = computed(() => this.#setFlagImageSrc());

  selectedSrc = linkedSignal(() => this.flagImageSrc());

  basePath = '/flags';

  handleClickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  selectSrc(event: Event, src?: string) {
    this.handleClickEvent(event);
    this.selectedSrc.set(src ?? this.flagImageSrc());
  }

  setCategoriesTooltip(categories: FlagCategory[]): string {
    const translations = categories.map((category) => {
      return this.#translate.instant(`flag-categories.${this.#hyphenate.transform(category)}`);
    });
    return translations.join(', ');
  }

  toggleReversed(event: Event) {
    this.handleClickEvent(event);
    this.isReversed.update((isReversed) => (isReversed = !isReversed));
  }

  #setFlagImageSrc(): string | undefined {
    return this.isReversed() ? this.flag().reverse_src : this.flag().src;
  }
}
