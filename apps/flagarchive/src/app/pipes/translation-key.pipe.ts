import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translationKey',
})
export class TranslationKeyPipe implements PipeTransform {
  public transform(prefix: string, key?: string): string {
    if (!key) {
      return '\u2014';
    }

    return `${prefix}.${key
      .replace(/[ -]/g, '_')
      .replace(/\//g, '.')}`.toUpperCase();
  }
}
