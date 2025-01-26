import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import {
  DropdownTriggerDirective,
  IconComponent,
  YearPickerComponent,
} from '@flagarchive/ui';
import { interval, Subject, takeUntil } from 'rxjs';

import { AdvancedSearchStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownTriggerDirective, IconComponent, YearPickerComponent],
  selector: 'app-year-navigator',
  styleUrl: './year-navigator.component.css',
  templateUrl: './year-navigator.component.html',
})
export class YearNavigatorComponent implements OnDestroy {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  max = input(new Date().getFullYear());
  min = input(new Date().getFullYear());

  #isPlayingBackward = signal(false);
  #isPlayingForward = signal(false);

  isPlaying = computed(
    () => this.#isPlayingBackward() || this.#isPlayingForward()
  );

  dropdownIsOpen = false;
  selectedYear = computed(() =>
    Math.min(this.max(), this.#advancedSearchStore.selectedYear())
  );

  #stop$ = new Subject<void>();
  #playSpeed$ = interval(750);

  ngOnDestroy() {
    this.#stop$.next();
    this.#stop$.complete();
  }

  previous() {
    this.setSelectedYear(this.selectedYear() - 1);
    this.stop();
  }

  next() {
    this.setSelectedYear(this.selectedYear() + 1);
    this.stop();
  }

  play(backward?: boolean) {
    this.#isPlayingBackward.set(!!backward);
    this.#isPlayingForward.set(!backward);
    this.#playSpeed$.pipe(takeUntil(this.#stop$)).subscribe(() => {
      const maxReached =
        this.#isPlayingForward() && this.max() === this.selectedYear();
      const minReached =
        this.#isPlayingBackward() && this.min() === this.selectedYear();
      if (maxReached || minReached) {
        this.stop();
      }
      this.setSelectedYear(
        this.#isPlayingBackward()
          ? this.selectedYear() - 1
          : this.selectedYear() + 1
      );
    });
  }

  stop() {
    this.#stop$.next();
    this.#isPlayingBackward.set(false);
    this.#isPlayingForward.set(false);
  }

  setDropdownState() {
    this.dropdownIsOpen = true;
    this.stop();
  }

  setSelectedYear(year: number) {
    this.#advancedSearchStore.updateSelectedYear(year);
    this.dropdownIsOpen = false;
  }
}
