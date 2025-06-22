import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FlagCategory } from '@flagarchive/advanced-search';

import { USAGE_SYMBOL_INDICES } from '../../constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-usage-symbol',
  styleUrl: './flag-usage-symbol.component.css',
  templateUrl: './flag-usage-symbol.component.html',
})
export class FlagUsageSymbolComponent {
  categories = input.required<FlagCategory[]>();

  circles = computed<number[]>(() => this.#setIndices());

  getCircleX(index: number): number {
    const positions = [4, 12, 20];
    return positions[index % positions.length];
  }

  #setIndices() {
    return Object.entries(USAGE_SYMBOL_INDICES)
      .filter(([category]) => this.categories().includes(category as FlagCategory))
      .flatMap(([, indices]) => indices);
  }
}
