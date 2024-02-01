<script setup lang="ts" name="MainMenu">
import { RouteRecordRaw } from "vue-router";

defineProps<{
  menuList: RouteRecordRaw[];
}>();
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.meta?.hidden">
      <el-menu-item v-if="!item.children" :index="item.path">
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <template #title>
          <span v-text="item.meta?.title"></span>
        </template>
      </el-menu-item>
      <el-menu-item
        v-if="item.children && item.children.length == 1"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon"></component>
        </el-icon>
        <template #title>
          <span v-text="item.children[0].meta?.title"></span>
        </template>
      </el-menu-item>
      <el-sub-menu
        v-if="item.children && (item.children.length as number) > 1"
        :index="item.path"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span v-text="item.meta?.title"></span>
        </template>
        <MainMenu :menuList="item.children"></MainMenu>
      </el-sub-menu>
    </template>
  </template>
</template>

<style scoped lang="scss"></style>
