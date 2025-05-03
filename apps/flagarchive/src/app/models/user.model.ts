export interface Credentials {
  email: string;
  password: string;
}

export interface CurrentUser {
  email: string;
  username: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  avatar?: string;
  id?: string;
}
