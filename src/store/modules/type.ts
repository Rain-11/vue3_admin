import { RouteRecordRaw } from "vue-router";

export interface UserStore {
  token?: string;
  userRoute: RouteRecordRaw[];
  username: string;
  avatar: string;
}
