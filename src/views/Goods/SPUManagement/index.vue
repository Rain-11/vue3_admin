<script setup lang="ts" name="SPUManagement">
import { deleteBySpuId, getListSpuS, getSkuBySpuId } from "@/api/Goods/SPU";
import { SPUData, Record, SkuFormData } from "@/api/Goods/SPU/type";
import classificationStore from "@/store/modules/classification";
import { ElMessage } from "element-plus";
import { reactive, ref, watch } from "vue";
import SkuForm from "./SkuForm/index.vue";
import SpuForm from "./SpuForm/index.vue";

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
  spuForm.value.addInit(classStore.thirdLevelClassificationID as number);
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

function clickScenes() {
  sceneSwitch.value = 0;
}

const skuForm = ref();

function addSku(row: Record) {
  sceneSwitch.value = 2;
  skuForm.value.initialization(
    classStore.firstLevelClassificationID as number,
    classStore.secondaryClassificationID as number,
    row,
  );
}
const skuVie = ref<SkuFormData[]>([]);
const dialogVisible = ref(false);
async function viewSku(row: Record) {
  const result = await getSkuBySpuId(row.id as number);
  if (!result.ok) {
    ElMessage.error({
      message: "获取SKU失败",
      showClose: true,
    });
  } else {
    skuVie.value = result.data;
    dialogVisible.value = true;
  }
}

async function deleteSkuById(row: Record) {
  const result = await deleteBySpuId(row.id as number);
  if (result.ok) {
    ElMessage.success({
      message: "删除成功",
      showClose: true,
    });
    let page = spuList.records.length > 1 ? current.value : current.value - 1;
    getListSpu(page);
  } else {
    ElMessage.error({
      message: "删除失败",
      showClose: true,
    });
  }
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
              @click="addSku(row)"
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
              @click="viewSku(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              @click="deleteSkuById(row)"
            ></el-button>
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
    <SkuForm
      v-show="sceneSwitch === 2"
      @clickScenes="clickScenes"
      ref="skuForm"
    />
  </el-card>
  <el-dialog v-model="dialogVisible" title="Sku列表">
    <el-table :data="skuVie" border>
      <el-table-column property="skuName" label="名字" width="150" />
      <el-table-column property="price" label="价格" width="200" />
      <el-table-column property="weight" label="重量" />
      <el-table-column label="图片">
        <template #default="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt="默认图片"
            style="width: 100px; height;: 100px"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style scoped></style>
