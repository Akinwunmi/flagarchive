import { animate, state, style, transition, trigger } from '@angular/animations';

export const PANEL_ANIMATION = trigger('panelState', [
  state(
    'closed',
    style({
      marginRight: '-20rem',
    }),
  ),
  state(
    'open',
    style({
      marginRight: 0,
    }),
  ),
  transition('open => closed', [animate('300ms ease-out')]),
  transition('closed => open', [animate('300ms ease-in')]),
]);
