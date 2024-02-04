import request from "@/utils/request";
import type { LoginData, LoginResponse, UserInfoResponse } from "./type";
import { LogoutResponse } from "./type";

enum UserApi {
  LOGIN_ADDRESS = "/api/admin/acl/index/login",
  USER_INFORMATION = "/api/admin/acl/index/info",
  LOG_OUT_LOG_IN = "/api/admin/acl/index/logout",
}

export const loginRequest = (data: LoginData) => {
  return request.post<any, LoginResponse>(UserApi.LOGIN_ADDRESS, data);
};

export const userInfoRequest = () => {
  return request.get<any, UserInfoResponse>(UserApi.USER_INFORMATION);
};
export const logOutLogIn = () => {
  return request.post<any, LogoutResponse>(UserApi.LOG_OUT_LOG_IN);
};
