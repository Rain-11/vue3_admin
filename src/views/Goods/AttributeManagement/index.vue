<script setup lang="ts" name="AttributeManagement">
import classificationStore from "@/store/modules/classification";
import { ElMessage } from "element-plus";
import { reactive, ref, watch, nextTick } from "vue";
import { ProductAttributes, Attr } from "@/api/Goods/AttributeManagement/type";
import {
  getPropertyList,
  saveAttributesAdd,
  deleteAttributeById,
} from "@/api/Goods/AttributeManagement/index";

//加载一级分类
const classStore = classificationStore();

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
function addAttributes() {
  pageSwitch.value = 1;
  newAttributesAdd.categoryId = classStore.thirdLevelClassificationID as number;
  newAttributesAdd.attrName = "";
  newAttributesAdd.attrValueList = [];
}
let newAttributesAdd = reactive<ProductAttributes>({
  id: undefined,
  attrName: "",
  categoryId: 0,
  categoryLevel: 3,
  attrValueList: [],
});
function addAttributeValues() {
  newAttributesAdd.attrValueList.push({
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    inputArr.value[newAttributesAdd.attrValueList.length - 1].focus();
  });
}
async function save() {
  try {
    const result = await saveAttributesAdd(newAttributesAdd);
    if (result.ok) {
      ElMessage({
        type: "success",
        message: "保存成功",
      });
      pageSwitch.value = 0;
      getProperty();
    } else {
      ElMessage({
        type: "error",
        message: "保存失败",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
let inputArr = ref<any>([]);

function viewMode(row: Attr, index: number) {
  if (row.valueName === "") {
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    newAttributesAdd.attrValueList.splice(index, 1);
    row.flag = false;
    return;
  }
  const replace = newAttributesAdd.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName;
    }
  });
  if (replace) {
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    newAttributesAdd.attrValueList.splice(index, 1);
  }
  row.flag = false;
}
function editingMode(row: Attr, index: number) {
  row.flag = true;
  nextTick(() => {
    inputArr.value[index].focus();
  });
}

function modifyAttribute(row: ProductAttributes) {
  Object.assign(newAttributesAdd, JSON.parse(JSON.stringify(row)));
  pageSwitch.value = 1;
}

async function deleteAttribute(row: ProductAttributes) {
  const result = await deleteAttributeById(row.id as number);
  if (result.ok) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getProperty();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
}
</script>

<template>
  <CascadeSelector></CascadeSelector>
  <template v-if="pageSwitch === 0">
    <el-card style="margin-top: 10px">
      <el-button
        type="primary"
        icon="Plus"
        style="margin-bottom: 10px"
        @click="addAttributes"
        :disabled="classStore.thirdLevelClassificationID === undefined"
      >
        添加属性
      </el-button>
      <el-table border style="width: 100%" :data="attributeList">
        <el-table-column
          label="序号"
          width="80"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          prop="attrName"
          label="属性名称"
          width="180"
          align="center"
        />
        <el-table-column label="属性值名称" align="center">
          <template #default="{ row }">
            <el-tag
              class="ml-2"
              type="success"
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="Edit"
              @click="modifyAttribute(row)"
            ></el-button>
            <el-button
              type="primary"
              icon="Delete"
              @click="deleteAttribute(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </template>
  <template v-if="pageSwitch === 1">
    <el-card>
      <el-form>
        <el-form-item label="属性名称">
          <el-input
            placeholder="请填写属性"
            style="width: 200px"
            v-model="newAttributesAdd.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="newAttributesAdd.attrName === ''"
        @click="addAttributeValues"
      >
        添加属性值
      </el-button>
      <el-button type="primary">取消</el-button>
      <el-table
        style="margin: 10px 0"
        border
        :data="newAttributesAdd.attrValueList"
      >
        <el-table-column
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row, $index }">
            <el-input
              v-if="row.flag"
              placeholder="请输入属性值"
              v-model="row.valueName"
              @blur="viewMode(row, $index)"
              :ref="(vc: any) => (inputArr[$index] = vc)"
            ></el-input>
            <div v-else @click="editingMode(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ $index }">
            <el-button
              type="danger"
              icon="Delete"
              @click="newAttributesAdd.attrValueList.splice($index, 1)"
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="save"
        :disabled="newAttributesAdd.attrValueList.length === 0"
      >
        保存
      </el-button>
      <el-button type="primary" @click="pageSwitch = 0">取消</el-button>
    </el-card>
  </template>
</template>

<style scoped></style>
