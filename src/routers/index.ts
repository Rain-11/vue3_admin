import { createRouter, createWebHashHistory } from "vue-router";
import { staticRout } from "./StaticRout";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRout],
});

export default router;
