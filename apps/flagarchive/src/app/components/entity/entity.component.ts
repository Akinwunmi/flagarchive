import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { IconComponent, PillComponent } from '@flagarchive/ui';
import { TranslateModule } from '@ngx-translate/core';

import {
  Entity,
  EntityFlag,
  EntityFullRange,
  EntityRange,
  FlagCategory,
} from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStore } from '../../state';
import { FlagImageComponent } from '../flag-image/flag-image.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    FlagImageComponent,
    PillComponent,
    TranslateModule,
    TranslationKeyPipe,
  ],
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
  translationKey = computed(
    () => this.range()?.translationKey ?? this.entity().translationKey
  );
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
