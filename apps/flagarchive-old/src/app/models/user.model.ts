export interface User {
  favorites: string[];
  language?: string;
  name: string;
  roles?: UserRole[];
  surname: string;
}

export enum UserRole {
  Admin = 'admin',
}
