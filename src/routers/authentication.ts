import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "./index";
import userStore from "@/store/modules/user";

NProgress.configure({ showSpinner: false });
// to: any, from: any, next: any
router.beforeEach((to, _, next) => {
  const userData = userStore();
  // to and from are both route objects. must call `next`.
  NProgress.start();
  if (userData.token) {
    if (to.path == "/Login") {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (to.path !== "/Login") {
      next({ name: "Login", query: { redirect: to.path } });
    } else {
      next();
    }
  }
});
router.afterEach((to) => {
  document.title = `硅谷甄选-${to.meta.title}`;
  NProgress.done();
});
