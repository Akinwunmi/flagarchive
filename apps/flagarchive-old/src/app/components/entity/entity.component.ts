import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { FlagCategory } from '@flagarchive/advanced-search';
import {
  Entity,
  EntityFlag,
  EntityFullRange,
  EntityRange,
} from '@flagarchive/entities';
import {
  FlagImageComponent,
  IconComponent,
  PillComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, FlagImageComponent, PillComponent, TranslatePipe],
  selector: 'app-entity',
  styleUrl: './entity.component.css',
  templateUrl: './entity.component.html',
})
export class EntityComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  entity = input.required<Entity>();
  card = input(true);
  range = input<EntityFullRange | EntityRange>();

  activeFlagCategory = this.#advancedSearchStore.flagCategory;

  altParentId = computed(
    () => this.range()?.altParentId ?? this.entity().altParentId
  );
  reverseUrl = computed(
    () =>
      (this.range() as EntityFullRange)?.reverseUrl ??
      this.#getActiveFlagReverseUrl(this.entity().flags)
  );
  name = computed(() => this.range()?.name ?? this.entity().name);
  url = computed(
    () =>
      (this.range() as EntityFullRange)?.url ??
      this.#getActiveFlagUrl(this.entity().flags)
  );

  isReversed = false;

  setAltParentId(id?: string) {
    return id?.split('-').pop() || '';
  }

  toggleReversed(event: Event) {
    event.stopPropagation();
    this.isReversed = !this.isReversed;
  }

  #getActiveFlagReverseUrl(flags?: Record<FlagCategory, EntityFlag>) {
    return flags?.[this.activeFlagCategory()]?.reverseUrl;
  }

  #getActiveFlagUrl(flags?: Record<FlagCategory, EntityFlag>) {
    return flags?.[this.activeFlagCategory()]?.url;
  }
}
