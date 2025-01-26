import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
  standalone: true
})
export class RangePipe implements PipeTransform {

  public transform(range: [number, number]): number[] {
    if (!range) {
      return [];
    }

    return Array(range[1] - range[0] + 1).fill(0).map((_, i) => {
      return range[0] + i;
    });
  }

}
