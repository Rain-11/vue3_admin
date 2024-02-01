import { type App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const components = import.meta.glob("./**/*.vue");
export default function install(app: App) {
  for (const [key, value] of Object.entries(components)) {
    const svgArr = key.split("/");
    const svgName = svgArr[1];
    app.component(svgName, value);
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
