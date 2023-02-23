export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface AppData {
  activeUser: User | undefined;
}

export interface UserAuthentication {
  username: string;
  password: string;
}
