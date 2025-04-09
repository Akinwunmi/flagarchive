import { animate, style, transition, trigger } from '@angular/animations';

export const COLLAPSIBLE_ANIMATION = trigger('collapsibleState', [
  transition(':enter', [
    style({ maxHeight: 0, opacity: 0 }),
    animate('200ms ease-in', style({ maxHeight: '100svh', opacity: 1 })),
  ]),
  transition(':leave', [animate('200ms ease-out', style({ maxHeight: 0, opacity: 0 }))]),
]);
