<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
//@ts-expect-error 忽略检测
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss"></style>
