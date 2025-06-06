import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  model,
  viewChildren,
} from '@angular/core';

import { TabComponent } from '../tab';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkPortalOutlet],
  selector: 'flag-tab-group',
  styleUrls: ['../tab/tab.component.css', './tab-group.component.css'],
  templateUrl: './tab-group.component.html',
})
export class TabGroupComponent {
  active = model(0);

  tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tab');
  tabComponents = contentChildren(TabComponent);

  tabs = computed(() =>
    this.tabComponents().map((tab, index) => {
      tab.active = index === this.active();
      return tab;
    }),
  );

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        this.selectTab(this.active() === this.tabs().length - 1 ? 0 : this.active() + 1);
        break;
      case 'ArrowLeft':
        this.selectTab(this.active() === 0 ? this.tabs().length - 1 : this.active() - 1);
        break;
      case 'Home':
        event.preventDefault();
        this.selectTab(0);
        break;
      case 'End':
        event.preventDefault();
        this.selectTab(this.tabs().length - 1);
        break;
    }
  }

  selectTab(index: number) {
    this.active.set(index);
    this.tabButtons()[index]?.nativeElement?.focus();
  }
}
