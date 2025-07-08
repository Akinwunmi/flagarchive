import { Injectable, signal } from '@angular/core';

import { Device } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ResizeObserverService {
  device = signal<Device>('desktop');

  #observer?: ResizeObserver;

  observe() {
    this.unobserve();
    this.#observer = new ResizeObserver(() => {
      if (window.innerWidth <= 480) {
        this.device.set('mobile');
        return;
      }

      if (window.innerWidth <= 800) {
        this.device.set('tablet');
        return;
      }

      this.device.set('desktop');
    });
    this.#observer.observe(document.body);
  }

  unobserve() {
    this.#observer?.unobserve(document.body);
    this.#observer?.disconnect();
  }
}
