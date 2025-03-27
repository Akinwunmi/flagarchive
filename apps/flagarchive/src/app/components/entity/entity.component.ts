import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Entity } from '@flagarchive/entities';
import { FlagImageComponent, IconComponent } from '@flagarchive/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagImageComponent, IconComponent, RouterLink],
  selector: 'app-entity',
  styleUrl: './entity.component.css',
  templateUrl: './entity.component.html',
})
export class EntityComponent {
  entity = input.required<Entity>();

  isReversed = signal(false);

  handleClickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  toggleReversed(event: Event) {
    this.handleClickEvent(event);
    this.isReversed.update((isReversed) => (isReversed = !isReversed));
  }
}
