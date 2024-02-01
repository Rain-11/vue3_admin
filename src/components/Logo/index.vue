<script setup lang="ts" name="Logo">
import setting from "@/setting.ts";
</script>

<template>
  <div class="logo">
    <SvgIcon svgName="logo" style="margin-right: 15px"></SvgIcon>
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $logo_height;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: aliceblue;
  }
}
</style>
