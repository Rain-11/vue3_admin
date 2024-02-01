<script setup lang="ts" name="TabBar">
import SettingStore from "@/store/modules/Setting";
import userStore from "@/store/modules/user";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const setting = SettingStore();
let isFold = computed(() => {
  return setting.whetherToFold ? "Expand" : "Fold";
});
let fold = () => {
  setting.whetherToFold = !setting.whetherToFold;
};
const route = useRoute();
let isRefresh = () => {
  setting.refresh = !setting.refresh;
};

let fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const userData = userStore();
onMounted(() => {
  userData.getLoginInfo().catch((error) => {
    ElMessage({
      type: "error",
      message: error.message,
    });
  });
});
const router = useRouter();
let logOutLogIn = async () => {
  await userData.logOutLogInAction();
  localStorage.removeItem("userData");
  router.push({ path: "/Login", query: { redirect: route.path } });
};
</script>

<template>
  <div class="tab_bar">
    <div class="left">
      <el-icon @click="fold">
        <component :is="isFold"></component>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight" class="breadcrumbs">
        <el-breadcrumb-item
          v-for="(item, index) in route.matched"
          :key="index"
          v-show="item.meta.title"
          :to="{ path: item.path }"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-row class="tab_btn">
        <el-button icon="Refresh" circle @click="isRefresh" />
        <el-button icon="FullScreen" circle @click="fullScreen" />
        <el-button icon="Tools" circle />
      </el-row>
      <img :src="userData.avatar" alt="user" />
      <el-dropdown>
        <span class="el-dropdown-link" style="color: aliceblue">
          {{ userData.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOutLogIn">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab_bar {
  background: linear-gradient(to right, rgb(212, 189, 193), rgb(90, 90, 92));
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    font-size: 20px;

    .breadcrumbs {
      margin-left: 0.5rem;
    }
  }

  .right {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .tab_btn {
      margin-right: 0.5rem;
    }

    img {
      width: 32px;
      height: 32px;
      margin-right: 0.6rem;
      border-radius: 16px;
    }
  }
}
</style>
