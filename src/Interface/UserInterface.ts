export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface AppData {
  activeUser: User | undefined;
}

export interface UserLoginInterFace {
  username: string;
  password: string;
}


export interface AuthenticationResponse  {
  message : string | null;
  success : boolean,
  error : string | null

}