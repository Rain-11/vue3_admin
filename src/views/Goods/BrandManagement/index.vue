<script setup lang="ts" name="BrandManagement">
import { brandAcquisitionList } from "@/api/Goods/BrandManagement";
import { ref } from "vue";
import { Records } from "@/api/Goods/BrandManagement/type";
import { ElMessage } from "element-plus";
let current = ref(1);
let limit = ref(3);
let brandList = ref<Records[]>();
/* 获取品牌列表 */
async function obtainBrandList() {
  try {
    const result = await brandAcquisitionList(current.value, limit.value);
    if (result.ok) {
      brandList.value = result.data.records;
      return;
    }
    ElMessage({
      type: "error",
      message: result.message,
    });
  } catch (error) {
    ElMessage({
      type: "error",
      message: "读取品牌列表失败",
    });
  }
}
obtainBrandList();
</script>

<template>
  <el-card class="box-card">
    <el-button icon="Plus" type="primary" style="margin-bottom: 10px">
      添加品牌
    </el-button>
    <el-table border style="width: 100%">
      <el-table-column label="序号" width="80" type="index" />
      <el-table-column prop="name" label="品牌名称" />
      <el-table-column prop="address" label="品牌LOGO" />
      <el-table-column prop="address" label="品牌操作" />
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      v-model:current-page="current"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout=" prev, pager, next, jumper,->,total, sizes,"
      :total="400"
    />
  </el-card>
</template>

<style scoped></style>
