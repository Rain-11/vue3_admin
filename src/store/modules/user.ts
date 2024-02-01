import { defineStore } from "pinia";
import { loginRequest, logOutLogIn, userInfoRequest } from "@/api";
import { LoginData } from "@/api/type.ts";
import { UserStore } from "@/store/modules/type.ts";

const userStore = defineStore("userStore", {
  state(): UserStore {
    return {
      token: "",
      userRoute: [],
      username: "",
      avatar: "",
    };
  },
  persist: {
    key: "userData",
    paths: ["token", "userRoute", "username", "avatar"],
  },
  actions: {
    async loginActions(data: LoginData) {
      try {
        const result = await loginRequest(data);
        if (result.code == 200) {
          this.token = result.data;
          return "ok";
        }
        console.log(result);
        return Promise.reject(result.data);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async getLoginInfo() {
      try {
        const result = await userInfoRequest();
        if (result.code == 200) {
          this.username = result.data.name;
          this.avatar = result.data.avatar;
        } else {
          return Promise.reject("获取用户信息失败");
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async logOutLogInAction() {
      try {
        const result = await logOutLogIn();
        if (result.ok) {
          this.token = "";
          this.avatar = "";
          this.username = "";
          this.userRoute = [];
        }
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    },
  },
  getters: {},
});

export default userStore;
