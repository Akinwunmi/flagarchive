import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, arg: string): unknown {
    if (!arg) {
      return value;
    }

    const regex = new RegExp(arg, 'gi');
    return `<p class="highlight">${value.replace(regex, '<span>$&</span>')}</p>`;
  }
}
