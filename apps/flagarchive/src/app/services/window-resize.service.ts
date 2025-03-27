import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowResizeService {
  windowWidth = signal(window.innerWidth);

  isMobile = computed(() => this.windowWidth() <= 480);
  isTablet = computed(() => this.windowWidth() <= 800);

  constructor() {
    effect(() => {
      const updateWindowWidth = () => this.windowWidth.set(window.innerWidth);
      window.addEventListener('resize', updateWindowWidth);
      return () => window.removeEventListener('resize', updateWindowWidth);
    });
  }
}
