<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择分类名称"
          style="width: 240px"
          v-model="classStore.firstLevelClassificationID"
          @change="obtainSecondaryClassificationList"
          :disabled="pageSwitch === 1"
        >
          <el-option
            v-for="item in classStore.firstLevelClassification"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="pageSwitch === 1"
          placeholder="请选择分类名称"
          style="width: 240px"
          v-model="classStore.secondaryClassificationID"
          @change="obtainThreeLevelClassification"
        >
          <el-option
            v-for="item in classStore.secondaryClassificationList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="pageSwitch === 1"
          placeholder="请选择分类名称"
          style="width: 240px"
          v-model="classStore.thirdLevelClassificationID"
        >
          <el-option
            v-for="item in classStore.thirdLevelClassificationList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts" name="CascadeSelector">
import classificationStore from "@/store/modules/classification";
import { ElMessage } from "element-plus";
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import { ProductAttributes } from "@/api/Goods/AttributeManagement/type";
import { getPropertyList } from "@/api/Goods/AttributeManagement/index";

//加载一级分类
const classStore = classificationStore();
//路由切换时清空级联选择器内容
onBeforeUnmount(() => {
  classStore.$reset();
});
const acquisitionClassification = async () => {
  try {
    await classStore.acquisitionClassification();
  } catch (error) {
    console.log("一级分类error", error);
    ElMessage({
      type: "error",
      message: "获取一级分类失败",
    });
  }
};
onMounted(() => {
  acquisitionClassification();
});

//获取二级分类列表
const obtainSecondaryClassificationList = async () => {
  try {
    classStore.secondaryClassificationID = undefined;
    classStore.thirdLevelClassificationID = undefined;
    classStore.thirdLevelClassificationList = [];
    await classStore.obtainSecondaryClassification();
  } catch (error) {
    console.log("二级分类error", error);
    ElMessage({
      type: "error",
      message: "获取二级分类失败",
    });
  }
};
async function obtainThreeLevelClassification() {
  try {
    classStore.thirdLevelClassificationID = undefined;
    await classStore.obtainThreeLevelClassification();
  } catch (error) {
    console.log("三级分类error", error);
    ElMessage({
      type: "error",
      message: "获取三级分类失败",
    });
  }
}
//加载属性列表
const attributeList = ref<ProductAttributes[]>([]);
async function getProperty() {
  try {
    const result = await getPropertyList(
      classStore.firstLevelClassificationID as number,
      classStore.secondaryClassificationID as number,
      classStore.thirdLevelClassificationID as number,
    );
    if (result.ok) {
      attributeList.value = result.data;
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: "获取属性列表失败",
    });
  }
}
watch(
  () => classStore.thirdLevelClassificationID,
  () => {
    attributeList.value = [];
    if (classStore.thirdLevelClassificationID) {
      getProperty();
    }
  },
);
// 添加属性
let pageSwitch = ref(0);
</script>

<style scoped></style>
