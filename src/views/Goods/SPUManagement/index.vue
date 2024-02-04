<script setup lang="ts" name="SPUManagement">
import { getListSpuS } from "@/api/Goods/SPU";
import { SPUData, Record } from "@/api/Goods/SPU/type";
import classificationStore from "@/store/modules/classification";
import { ElMessage } from "element-plus";
import { reactive, ref, watch } from "vue";
import SpuForm from "./SpuForm/index.vue";
import SkuForm from "./SkuForm/index.vue";
let current = ref(1);
let limit = ref(3);
//获取SPU列表数据
const classStore = classificationStore();
let spuList = reactive<SPUData>({
  records: [],
  searchCount: false,
  total: undefined,
});
async function getListSpu(pager = 1) {
  current.value = pager;
  const result = await getListSpuS(
    current.value as number,
    limit.value as number,
    classStore.thirdLevelClassificationID as number,
  );

  Object.assign(spuList, result.data);
  current.value = result.data.current as number;
  limit.value = result.data.size as number;
  if (result.ok) {
    ElMessage({
      type: "success",
      message: "获取成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "获取失败",
    });
  }
}
watch(
  () => classStore.thirdLevelClassificationID,
  () => {
    if (!classStore.thirdLevelClassificationID) return;
    getListSpu();
  },
);

function sizeChange() {
  getListSpu();
}

//控制场景切换
let sceneSwitch = ref(0);
function switchingScenes() {
  sceneSwitch.value = 1;
  spuForm.value.addInit(classStore.thirdLevelClassificationID);
}
function displayList(isAdd: boolean) {
  sceneSwitch.value = 0;
  if (isAdd) {
    getListSpu();
  } else {
    getListSpu(current.value);
  }
}
let spuForm = ref();
function updateSPU(row: Record) {
  sceneSwitch.value = 1;
  spuForm.value.initializeData(row);
}
</script>

<template>
  <CascadeSelector></CascadeSelector>
  <el-card style="margin-top: 10px">
    <div v-show="sceneSwitch === 0">
      <el-button
        type="primary"
        icon="Plus"
        style="margin-bottom: 10px"
        :disabled="classStore.thirdLevelClassificationID === undefined"
        @click="switchingScenes"
      >
        添加SPU
      </el-button>
      <el-table border :data="spuList.records">
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="SPU名称"
          width="180"
          align="center"
          prop="spuName"
        ></el-table-column>
        <el-table-column
          label="SPU描述"
          align="center"
          prop="description"
        ></el-table-column>
        <el-table-column label="SPU操作" width="250" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="Plus"
              size="small"
              @click="sceneSwitch = 2"
            ></el-button>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateSPU(row)"
            ></el-button>

            <el-button
              type="primary"
              icon="View"
              size="small"
              @click="sceneSwitch = 1"
            ></el-button>
            <el-button type="danger" icon="Delete" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        v-model:current-page="current"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="spuList.total"
        @current-change="getListSpu"
        @size-change="sizeChange"
      />
    </div>
    <SpuForm
      v-show="sceneSwitch === 1"
      @changingScene="displayList"
      ref="spuForm"
    />
    <SkuForm v-show="sceneSwitch === 2" />
  </el-card>
</template>

<style scoped></style>
