export interface CurrentUser {
  email: string;
  username: string;
}

export interface Profile {
  avatar_url: string;
  full_name: string;
  username: string;
  website: string;
  id?: string;
}
