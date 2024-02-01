<script setup lang="ts" name="Main">
import SettingStore from "@/store/modules/Setting";
import { ref, watch, nextTick } from "vue";

const settingStore = SettingStore();
let flag = ref(true);
watch(
  () => settingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active {
  transition: all 2s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 1;
}
</style>
