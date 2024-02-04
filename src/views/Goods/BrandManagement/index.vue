<script setup lang="ts" name="BrandManagement">
import {
  addModifyBrands,
  brandAcquisitionList,
  deleteBrandInformation,
} from "@/api/Goods/BrandManagement";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { Paging, Records } from "@/api/Goods/BrandManagement/type";
import type { UploadProps } from "element-plus";

let current = ref(1);
let limit = ref(3);
let brandList = ref<Paging>();

/* 获取品牌列表 */
const obtainBrandList = async (pager = 1) => {
  try {
    current.value = pager;
    const result = await brandAcquisitionList(current.value, limit.value);
    if (result.ok) {
      brandList.value = result.data;
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
};

onMounted(() => {
  obtainBrandList();
});
const sizeChange = () => {
  obtainBrandList();
};

//对话框组件控制
let dialogFormVisible = ref(false);
const brandForm = ref();
//收集添加品牌的信息
let brandInformation = reactive<Records>({
  tmName: "",
  logoUrl: "",
  id: undefined,
});
const addBrandBtn = () => {
  dialogFormVisible.value = true;
  brandForm.value.clearValidate("logoUrl");
  brandForm.value.clearValidate("tmName");
  brandInformation.tmName = "";
  brandInformation.logoUrl = "";
};
//上传成功的回调
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  brandForm.value.clearValidate("logoUrl");
  brandInformation.logoUrl = response.data;
};
//上传之前回调
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/gif"
  ) {
    ElMessage.error("头像只能是jpg或png或gif格式 ! ! ! ");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("图片大小不能超过4MB ! ! !");
    return false;
  }
  return true;
};
const saveBrandInformation = async () => {
  await brandForm.value.validate();
  const result = await addModifyBrands(brandInformation);
  if (result.ok) {
    dialogFormVisible.value = false;
    ElMessage({
      type: "success",
      message: brandInformation.id ? "修改成功" : "添加成功",
    });
    await obtainBrandList(brandInformation.id ? current.value : 1);
  } else {
    ElMessage({
      type: "error",
      message: brandInformation.id ? "修改失败" : "添加失败",
    });
  }
};

//修改品牌数据
const modifyBrandData = async (row: Records) => {
  dialogFormVisible.value = true;
  brandForm.value.clearValidate("logoUrl");
  brandForm.value.clearValidate("tmName");
  brandInformation.id = row.id;
  brandInformation.logoUrl = row.logoUrl;
  brandInformation.tmName = row.tmName;
};

const rules = {
  tmName: [
    { required: true, trigger: "blur", min: 2, message: "品牌名称最小长度为2" },
  ],
  logoUrl: [
    {
      required: true,
      validator(_: any, value: any, callback: any) {
        if (value) {
          callback();
        } else {
          callback(new Error("请上传logo"));
        }
      },
    },
  ],
};

//删除品牌
const deleteBrand = async (row: Records) => {
  const responseData = await deleteBrandInformation(row.id as number);
  if (responseData.ok) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    await obtainBrandList(
      (brandList.value?.records.length as number) > 1
        ? current.value
        : current.value - 1,
    );
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
</script>

<template>
  <el-card class="box-card">
    <el-button
      icon="Plus"
      type="primary"
      style="margin-bottom: 10px"
      @click="addBrandBtn"
    >
      添加品牌
    </el-button>
    <el-table border style="width: 100%" :data="brandList?.records">
      <el-table-column label="序号" width="80" prop="id" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="address" label="品牌LOGO">
        <template #default="{ row }">
          <img
            :src="row.logoUrl"
            alt="品牌logo"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="modifyBrandData(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="Delete"
            size="small"
            @click="deleteBrand(row)"
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
      :total="brandList?.total"
      @current-change="obtainBrandList"
      @size-change="sizeChange"
    />
  </el-card>
  <el-dialog
    v-model="dialogFormVisible"
    :title="brandInformation.id ? '修改品牌' : '添加品牌'"
  >
    <el-form
      status-icon
      :rules="rules"
      ref="brandForm"
      :model="brandInformation"
    >
      <el-form-item label="品牌名称" :label-width="80" prop="tmName">
        <el-input
          placeholder="请输入品牌名称"
          v-model="brandInformation.tmName"
        />
      </el-form-item>
      <el-form-item label="品牌LOGO" :label-width="80" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/upload/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="brandInformation.logoUrl"
            :src="brandInformation.logoUrl"
            class="avatar"
            alt="logo"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveBrandInformation">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
