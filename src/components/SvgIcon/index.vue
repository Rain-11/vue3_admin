<script setup lang="ts" name="SvgIcon">
import { withDefaults } from "vue";

interface Props {
  prefix?: string;
  svgName?: string;
  color?: string;
  width?: string;
  height?: string;
}

withDefaults(defineProps<Props>(), {
  prefix: "#icon-",
  color: "",
  width: "16px",
  height: "16px",
});
</script>

<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + svgName" :fill="color"></use>
  </svg>
</template>

<style scoped></style>
