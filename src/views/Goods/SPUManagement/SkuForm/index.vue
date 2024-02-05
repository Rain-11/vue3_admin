<template>
  <el-form label-width="80px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuForm.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="skuForm.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="重量(克)"
        type="number"
        v-model="skuForm.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="SKU描述"
        type="textarea"
        v-model="skuForm.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item
          :label="item.attrName"
          v-for="item in productAttributes"
          :key="item.id"
        >
          <el-select
            placeholder="请选择"
            style="width: 200px"
            v-model="item.idAndValue"
          >
            <el-option
              :label="e.valueName"
              :value="`${item.id}:${e.id}`"
              v-for="e in item.attrValueList"
              :key="e.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item
          :label="item.saleAttrName"
          v-for="item in skuAttributeS"
          :key="item.id"
        >
          <el-select
            placeholder="请选择"
            style="width: 200px"
            v-model="item.idAndValue"
          >
            <el-option
              v-for="e in item.spuSaleAttrValueList"
              :key="e.id"
              :label="e.saleAttrValueName"
              :value="`${item.id}:${e.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="SKU名称">
      <el-table border :data="imageS" ref="skuTab">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <img
              :src="row.imgUrl"
              alt="sku默认图片"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="setDefaultImage(row)">
              设为默认图片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-button type="primary" @click="addSku">保存</el-button>
    <el-button type="primary" @click="cancel">取消</el-button>
  </el-form>
</template>

<script setup lang="ts" name="SkuForm">
import {
  ImageSpu,
  Record,
  SalesAttributesType,
  SkuAttrValueList,
  SkuForm,
  SkuSaleAttrValueList,
} from "@/api/Goods/SPU/type.ts";
import { getPropertyList } from "@/api/Goods/AttributeManagement";
import { reactive, ref } from "vue";
import { ProductAttributes } from "@/api/Goods/AttributeManagement/type.ts";
import { ElMessage, ElTable } from "element-plus";
import { getAllImages, getSkuAttribute, saveSku } from "@/api/Goods/SPU";

const emit = defineEmits(["clickScenes"]);

function cancel() {
  emit("clickScenes");
}

let productAttributes = ref<ProductAttributes[]>([]);

async function obtainRecord(c1Id: number, c2Id: number, c3Id: number) {
  const result = await getPropertyList(c1Id, c2Id, c3Id);
  if (result.ok) {
    productAttributes.value = result.data;
  } else {
    ElMessage.error({
      message: "获取平台属性出错",
    });
  }
}

const skuAttributeS = ref<SalesAttributesType[]>([]);

async function getSalesAttributes(spuId: number) {
  const skuAttribute = await getSkuAttribute(spuId);
  if (skuAttribute.ok) {
    skuAttributeS.value = skuAttribute.data;
  } else {
    ElMessage.error({
      message: "获取销售属性出错",
    });
  }
}

const imageS = ref<ImageSpu[]>([]);

async function initializeImage(spuId: number) {
  const result = await getAllImages(spuId);
  if (result.ok) {
    imageS.value = result.data;
  } else {
    ElMessage.error({
      message: "获取sku名称出错",
    });
  }
}
const skuForm = reactive<SkuForm>({
  category3Id: 0,
  price: 0,
  skuAttrValueList: [],
  skuDefaultImg: "",
  skuDesc: "",
  skuName: "",
  skuSaleAttrValueList: [],
  spuId: 0,
  tmId: 0,
  weight: "",
});
async function initialization(c1Id: number, c2Id: number, spu: Record) {
  skuForm.category3Id = spu.category3Id;
  skuForm.spuId = spu.id as number;
  skuForm.tmId = spu.tmId;
  await obtainRecord(c1Id, c2Id, spu.category3Id);
  await getSalesAttributes(spu.id as number);
  await initializeImage(spu.id as number);
}
const skuTab = ref<InstanceType<typeof ElTable>>();
function setDefaultImage(row: ImageSpu) {
  skuTab.value?.clearSelection();
  skuTab.value?.toggleRowSelection(row, true);
  skuForm.skuDefaultImg = row.imgUrl;
}

async function addSku() {
  skuForm.skuAttrValueList = productAttributes.value.reduce((pre, next) => {
    if (next.idAndValue) {
      let [attrId, valueId] = next.idAndValue.split(":");
      pre.push({
        attrId: Number.parseInt(attrId),
        valueId: Number.parseInt(valueId),
      });
    }
    return pre;
  }, [] as SkuAttrValueList[]);
  skuForm.skuSaleAttrValueList = skuAttributeS.value.reduce((pre, next) => {
    if (next.idAndValue) {
      let [saleAttrId, saleAttrValueId] = next.idAndValue.split(":");
      pre.push({
        saleAttrId: Number.parseInt(saleAttrId),
        saleAttrValueId: Number.parseInt(saleAttrValueId),
      });
    }
    return pre;
  }, [] as SkuSaleAttrValueList[]);
  const result = await saveSku(skuForm);
  if (result.ok) {
    ElMessage.success({
      message: "添加成功",
      showClose: true,
    });
    emit("clickScenes");
  } else {
    ElMessage.error({
      message: "添加失败",
      showClose: true,
    });
  }
}

defineExpose({ initialization });
</script>

<style scoped></style>
