import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenate',
})
export class HyphenatePipe implements PipeTransform {
  public transform(value: string): string {
    return value.replace(/_/g, '-');
  }
}
