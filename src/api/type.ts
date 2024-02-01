export interface LoginData {
  username: string;
  password: string;
}

export interface ResponseData<T> {
  code: number;
  message: string;
  ok: boolean;
  data: T;
}

export interface LoginResponse extends ResponseData<string> {}

interface UserInfo {
  routes: string[];
  buttons: string[];
  roles: string[];
  name: string;
  avatar: string;
}

export interface UserInfoResponse extends ResponseData<UserInfo> {}
export interface LogoutResponse extends ResponseData<string> {}
