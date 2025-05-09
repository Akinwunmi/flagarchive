import { ChangeDetectionStrategy, Component, input, model, OnInit } from '@angular/core';

import { RangePipe } from '../../pipes';
import { IconComponent } from '../icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RangePipe],
  selector: 'flag-year-picker',
  styleUrls: ['./year-picker.component.css'],
  templateUrl: './year-picker.component.html',
})
export class YearPickerComponent implements OnInit {
  initial = input(0);
  max = input(0);
  min = input(0);
  rangeSize = input(9);

  selected = model(0);

  activeRange!: [number, number];

  ngOnInit() {
    const difference = this.max() - this.selected();
    const multiplier = Math.floor(difference / this.rangeSize());
    const range = this.rangeSize() * multiplier;
    const minValue = this.max() - this.rangeSize() + 1 - range;
    this.activeRange = [minValue < this.min() ? this.min() : minValue, this.max() - range];
  }

  goToEnd() {
    this.activeRange = [this.max() - this.rangeSize() + 1, this.max()];
  }

  goToStart() {
    this.activeRange = [this.min(), this.min() + this.rangeSize() - 1];
  }

  next() {
    const maxValue = this.activeRange[1] + this.rangeSize();
    const start = this.activeRange[1] + 1;
    const end = maxValue > this.max() ? this.max() : maxValue;
    this.activeRange = [start, end];
  }

  previous() {
    const minValue = this.activeRange[0] - this.rangeSize();
    const start = minValue < this.min() ? this.min() : minValue;
    const end = this.activeRange[0] - 1;
    this.activeRange = [start, end];
  }

  reset() {
    this.goToEnd();
    this.selected.set(this.initial());
  }

  setYear(year: number) {
    this.selected.set(year);
  }
}
