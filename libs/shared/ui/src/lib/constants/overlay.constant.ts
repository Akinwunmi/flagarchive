import { ConnectedPosition } from '@angular/cdk/overlay';

const X_START: Pick<ConnectedPosition, 'originX' | 'overlayX'> = {
  originX: 'start',
  overlayX: 'start',
};

const X_END: Pick<ConnectedPosition, 'originX' | 'overlayX'> = {
  originX: 'end',
  overlayX: 'end',
};

const Y_TOP: Pick<ConnectedPosition, 'originY' | 'overlayY'> = {
  originY: 'top',
  overlayY: 'bottom',
};

const Y_BOTTOM: Pick<ConnectedPosition, 'originY' | 'overlayY'> = {
  originY: 'bottom',
  overlayY: 'top',
};

export const CONNECTED_POSITIONS: ConnectedPosition[] = [
  { ...X_START, ...Y_BOTTOM, offsetY: 4 },
  { ...X_END, ...Y_BOTTOM, offsetY: 4 },
  { ...X_START, ...Y_TOP, offsetY: -4 },
  { ...X_END, ...Y_TOP, offsetY: -4 },
];
