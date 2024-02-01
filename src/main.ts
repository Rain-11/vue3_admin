import { createApp } from "vue";
import "virtual:svg-icons-register";
import App from "./App.vue";
import components from "@/components/index";
import "@/styles/index.scss";
import request from "./utils/request";
import router from "./routers";
import pinia from "@/store";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "element-plus/dist/index.css";
import "@/routers/authentication.ts";

const app = createApp(App);
app.config.globalProperties.$http = request;
app.use(pinia);
app.use(router);
app.use(components);
pinia.use(piniaPluginPersistedstate);
app.mount("#app");
