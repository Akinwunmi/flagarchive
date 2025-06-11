import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  OnDestroy,
  signal,
} from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

import { DropdownDirective } from '../dropdown';
import { IconComponent } from '../icon';
import { YearPickerComponent } from '../year-picker';

import { CURRENT_YEAR } from './year-navigator.constant';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownDirective, IconComponent, YearPickerComponent],
  selector: 'flag-year-navigator',
  styleUrl: './year-navigator.component.css',
  templateUrl: './year-navigator.component.html',
})
export class YearNavigatorComponent implements OnDestroy {
  max = input(CURRENT_YEAR);
  min = input(CURRENT_YEAR);
  showPlayBar = input(true);

  selected = model(CURRENT_YEAR);

  #isPlayingBackward = signal(false);
  #isPlayingForward = signal(false);

  isPlaying = computed(() => this.#isPlayingBackward() || this.#isPlayingForward());
  selectedYear = computed(() => Math.min(this.max(), this.selected()));

  dropdownIsOpen = false;
  currentYear = CURRENT_YEAR;

  #stop$ = new Subject<void>();
  #playSpeed$ = interval(750);

  ngOnDestroy() {
    this.#stop$.next();
    this.#stop$.complete();
  }

  next() {
    this.setSelectedYear(this.selectedYear() + 1);
    this.stop();
  }

  play(backward?: boolean) {
    this.#isPlayingBackward.set(!!backward);
    this.#isPlayingForward.set(!backward);
    this.#playSpeed$.pipe(takeUntil(this.#stop$)).subscribe(() => {
      const maxReached = this.#isPlayingForward() && this.max() === this.selectedYear();
      const minReached = this.#isPlayingBackward() && this.min() === this.selectedYear();
      if (maxReached || minReached) {
        this.stop();
      }
      this.setSelectedYear(
        this.#isPlayingBackward() ? this.selectedYear() - 1 : this.selectedYear() + 1,
      );
    });
  }

  previous() {
    this.setSelectedYear(this.selectedYear() - 1);
    this.stop();
  }

  setDropdownState() {
    this.dropdownIsOpen = true;
    this.stop();
  }

  setSelectedYear(year: number) {
    this.selected.set(year);
    this.dropdownIsOpen = false;
  }

  stop() {
    this.#stop$.next();
    this.#isPlayingBackward.set(false);
    this.#isPlayingForward.set(false);
  }
}
