import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  value = signal<string | number>('');
}
