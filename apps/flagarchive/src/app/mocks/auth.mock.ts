import { signal } from '@angular/core';

import { CurrentUser } from '../models';

export class MockAuthService {
  auth = {
    onAuthStateChange: () => ({
      data: {},
    }),
  };
  currentUser = signal<CurrentUser | null>({
    email: '',
    username: '',
  });
}
