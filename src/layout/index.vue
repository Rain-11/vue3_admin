<script setup lang="ts" name="Layout">
import Logo from "@/components/Logo/index.vue";
import SettingStore from "@/store/modules/Setting";
import userStore from "@/store/modules/user.ts";
import { useRoute } from "vue-router";
import { computed } from "vue";
import setting from "@/setting.ts";

const settingStore = SettingStore();
const route = useRoute();
const userData = userStore();
let fold = computed(() => {
  return settingStore.whetherToFold;
});
let showLogo = computed(() => {
  return !setting.isHidden && !settingStore.whetherToFold;
});
</script>

<template>
  <div class="layout_container">
    <div class="menu_container" :class="{ fold }">
      <Logo v-show="showLogo" />
      <el-scrollbar class="menu_scrollbar">
        <el-menu
          :collapse="fold"
          background-color="rgb(90, 90, 92)"
          text-color="white"
          router
          :default-active="route.path"
          :show-timeout="0"
          :hide-timeout="0"
        >
          <MainMenu :menuList="userData.userRoute"></MainMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="container">
      <div class="header_container" :class="{ launch: fold }">
        <TabBar></TabBar>
      </div>
      <div class="main_container" :class="{ launch: fold }">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .menu_container {
    width: $home_menu_width;
    background-color: $home_menu_background_color;
    height: 100%;
    transition: all 0.3s;

    .menu_scrollbar {
      height: calc(100vh - $logo_height);
    }
  }

  .fold {
    width: $home_menu_min_width;
  }

  .container {
    .header_container {
      position: fixed;
      top: 0;
      left: $home_menu_width;
      width: calc(100% - $home_menu_width);
      height: $head_navigation_bar_height;
      transition: all 0.3s;
    }

    .main_container {
      padding: 10px;
      position: absolute;
      top: $head_navigation_bar_height;
      left: $home_menu_width;
      width: calc(100% - $home_menu_width);
      height: calc(100% - $head_navigation_bar_height);
      overflow: auto;
      border-radius: 20px;
      transition: all 0.3s;
    }

    .launch {
      width: calc(100% - $home_menu_min_width);
      left: $home_menu_min_width;
    }
  }
}
</style>
