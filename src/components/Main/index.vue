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
      <component :is="Component" v-if="flag" />
    </router-view>
  </div>
</template>

<style scoped lang="scss"></style>
