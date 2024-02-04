<template>
  <el-form label-width="80px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="SKU名称" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU名称" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item label="内存">
          <el-select placeholder="请选择" style="width: 200px">
            <el-option label="内存" value="内存"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select placeholder="请选择" style="width: 200px">
            <el-option label="内存" value="内存">内存</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select placeholder="请选择" style="width: 200px">
            <el-option label="内存" value="内存"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item label="内存">
          <el-select placeholder="请选择" style="width: 200px">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select placeholder="请选择" style="width: 200px">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select placeholder="请选择" style="width: 200px">
            <el-option></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="SKU名称">
      <el-table border>
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column label="图片"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="SKU名称">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="SkuForm"></script>

<style scoped></style>
