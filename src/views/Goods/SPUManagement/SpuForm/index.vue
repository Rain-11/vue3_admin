<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuFormDataType.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select
        placeholder="请选择"
        style="width: 240px"
        v-model="spuFormDataType.tmId"
      >
        <el-option
          v-for="item in brandList"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="spuFormDataType.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图标" prop="">
      <el-upload
        v-model:file-list="fileList"
        action="/upload/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        :placeholder="
          filterAttr.length !== 0 ? `还有${filterAttr.length}个属性` : '无'
        "
        style="width: 240px; margin-right: 10px"
        v-model="newSaleAttr"
        :disabled="filterAttr.length === 0"
      >
        <el-option
          v-for="item in filterAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="!newSaleAttr"
        @click="addAttributeValues"
      >
        添加属性值
      </el-button>
      <el-table
        border
        style="margin-top: 10px"
        :data="salesAttributes"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="序号"
          type="index"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120"
          align="center"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #default="{ row, $index }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              placeholder="请输入属性值"
              v-model="row.newSaleAttrValue"
              style="width: 110px"
              @blur="toLook(row)"
              :ref="(vc: any) => (inputE[$index] = vc)"
            ></el-input>
            <el-button
              v-else-if="!row.flag"
              type="primary"
              icon="Plus"
              @click="toEdit(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ $index }">
            <el-button
              type="danger"
              icon="Delete"
              @click="salesAttributes.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="primary" @click="cancel">取消</el-button>
  </el-form>
</template>

<script setup lang="ts" name="SpuForm">
import {
  baseSaleAttrList,
  getAllImages,
  getSkuAttribute,
  obtainAllBrands,
  saveSpu,
} from "@/api/Goods/SPU";
import {
  BaseSaleAttr,
  BrandType,
  ImageSpu,
  ImageSpuResponse,
  Record,
  SalesAttributesType,
  SpuFormDataType,
} from "@/api/Goods/SPU/type";
import { ResponseData } from "@/api/type";
import { ElMessage, UploadProps, UploadUserFile } from "element-plus";
import { nextTick } from "vue";
import { computed, reactive, ref } from "vue";

let emit = defineEmits(["changingScene"]);
function cancel() {
  emit("changingScene");
}
//初始化品牌选择器数据
let brandList = ref<BrandType[]>([]);
async function getBrandList() {
  const result = await obtainAllBrands();
  if (result.ok) {
    brandList.value = result.data;
  }
}
//初始化图片
let imageS = ref<ImageSpu[]>([]);
async function getAllImage(spuId: number) {
  const result: ImageSpuResponse = await getAllImages(spuId);

  if (result.ok) {
    imageS.value = result.data;
  } else {
    ElMessage.error({
      message: "初始化图片失败",
      showClose: true,
    });
  }
}
//初始化销售属性
let salesAttributes = ref<SalesAttributesType[]>([]);
async function initializeSalesAttributes(spuId: number) {
  const result = await getSkuAttribute(spuId);
  if (result.ok) {
    salesAttributes.value = result.data;
  } else {
    ElMessage.error({
      message: "初始化已有销售属性失败",
      showClose: true,
    });
  }
}
//初始化全部销售属性
let salesAttributeList = ref<BaseSaleAttr[]>([]);

async function initializeSalesAttributeList() {
  const result = await baseSaleAttrList();
  if (result.ok) {
    salesAttributeList.value = result.data;
  } else {
    ElMessage.error({
      message: "初始化所有销售属性失败",
      showClose: true,
    });
  }
}
let spuFormDataType = reactive<SpuFormDataType>({
  category3Id: undefined,
  id: undefined,
  spuName: "",
  description: "",
  tmId: undefined,
  spuImageList: [],
  spuSaleAttrList: [],
});
const fileList = ref<UploadUserFile[]>([]);
function initializeData(spu: Record) {
  getBrandList();
  getAllImage(spu.id as number);
  initializeSalesAttributes(spu.id as number);
  initializeSalesAttributeList();
  Object.assign(spuFormDataType, spu);
  spuFormDataType.spuImageList = [];
  fileList.value = imageS.value.map((item) => {
    console.log(item);
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
}

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/git" &&
    rawFile.type !== "image/png"
  ) {
    ElMessage.error("只能上传jpeg|git|png");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("上传文件不能超过 4MB!");
    return false;
  }
  return true;
};
//新添加的销售属性数据
let newSaleAttr = ref("");
function addAttributeValues() {
  let [baseSaleAttrId, saleAttrName] = newSaleAttr.value.split(":");
  salesAttributes.value.push({
    baseSaleAttrId: Number.parseInt(baseSaleAttrId),
    saleAttrName,
    spuSaleAttrValueList: [],
  });
  newSaleAttr.value = "";
}
//过滤已存在的销售属性
let filterAttr = computed(() => {
  return salesAttributeList.value.filter((item) => {
    return salesAttributes.value.every((i) => {
      return i.saleAttrName !== item.name;
    });
  });
});
let inputE = ref<any>([]);
function toEdit(row: SalesAttributesType, index: number) {
  row.flag = true;
  row.newSaleAttrValue = "";
  nextTick(() => {
    inputE.value[index].focus();
  });
}

function toLook(row: SalesAttributesType) {
  let result = {
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: row.newSaleAttrValue as string,
  };
  if (row.newSaleAttrValue?.trim() === "") {
    ElMessage.error({
      message: "属性值不能为空",
      showClose: true,
    });
    return;
  }
  let findR = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == row.newSaleAttrValue;
  });
  if (findR) {
    ElMessage.error({
      message: "属性值不能重复",
      showClose: true,
    });
    return;
  }
  row.spuSaleAttrValueList.push(result);
  row.flag = false;
}

async function save() {
  spuFormDataType.spuSaleAttrList = salesAttributes.value;
  spuFormDataType.spuImageList = fileList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: (item.response as ResponseData<string>).data,
    };
  });
  console.log(spuFormDataType.spuImageList);
  const result = await saveSpu(spuFormDataType);
  if (result.ok) {
    ElMessage.success({
      message: spuFormDataType.id ? "更新成功" : "添加成功",
      showClose: true,
    });
    let isAdd = spuFormDataType.id ? false : true;
    console.log(isAdd);

    emit("changingScene", isAdd);
  } else {
    ElMessage.error({
      message: spuFormDataType.id ? "更新失败" : "添加失败",
      showClose: true,
    });
  }
}

function addInit(c3Id: number) {
  Object.assign(spuFormDataType, {
    category3Id: undefined,
    id: undefined,
    spuName: "",
    description: "",
    tmId: undefined,
    spuImageList: [],
    spuSaleAttrList: [],
  });
  newSaleAttr.value = "";
  initializeSalesAttributeList();
  getBrandList();
  spuFormDataType.category3Id = c3Id;
}
defineExpose({ initializeData, addInit });
</script>

<style scoped lang="scss"></style>
