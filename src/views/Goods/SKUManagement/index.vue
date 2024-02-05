<script setup lang="ts" name="SKUManagement">
import { onMounted, reactive, ref } from "vue";
import {
  deleteSku,
  getInfo,
  getSkuList,
  listingProduct,
  removeFromShelves,
} from "@/api/Goods/SKU/index";
import { SkuFormData, SkuInfo } from "@/api/Goods/SPU/type";
import { ElMessage } from "element-plus";
const current = ref(1);
const limit = ref(5);

//加载sku列表
const skuList = ref<SkuFormData[]>([]);
const total = ref(0);
async function getSkuS(pager = 1) {
  current.value = pager;
  const result = await getSkuList(current.value, limit.value);
  if (result.ok) {
    skuList.value = result.data.records;
    total.value = result.data.total;
  } else {
    ElMessage.error({
      message: "获取sku列表失败",
      showClose: true,
    });
  }
}
onMounted(() => {
  getSkuS();
});

function limitHandler() {
  getSkuS(current.value);
}

const listingProducts = async (row: SkuFormData) => {
  if (row.isSale === 0) {
    const result = await listingProduct(row.id as number);
    if (result.ok) {
      ElMessage.success({
        message: "上架成功",
        showClose: true,
      });
      getSkuS(current.value);
    } else {
      ElMessage.error({
        message: "上架失败",
        showClose: true,
      });
    }
  } else {
    const result = await removeFromShelves(row.id as number);
    if (result.ok) {
      ElMessage.success({
        message: "下架成功",
        showClose: true,
      });
      getSkuS(current.value);
    } else {
      ElMessage.error({
        message: "下架失败",
        showClose: true,
      });
    }
  }
};

const drawer = ref(false);
const skuInfo = reactive<SkuInfo>({
  id: 0,
  createTime: "",
  updateTime: "",
  spuId: 0,
  price: 0,
  skuName: "",
  skuDesc: "",
  weight: "",
  tmId: 0,
  category3Id: 0,
  skuDefaultImg: "",
  isSale: 0,
  skuImageList: [],
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
});
const viewDetails = async (row: SkuFormData) => {
  drawer.value = true;
  const result = await getInfo(row.id as number);
  if (result.ok) {
    Object.assign(skuInfo, result.data);
  } else {
    ElMessage.error({
      message: "获取商品详情失败",
      showClose: true,
    });
  }
};
const deleteSkuById = async (row: SkuFormData) => {
  const result = await deleteSku(row.id as number);
  if (result.ok) {
    ElMessage.success({
      message: "删除成功",
      showClose: true,
    });
    let pager = skuList.value.length > 0 ? current.value : current.value - 1;
    getSkuS(pager);
  } else {
    ElMessage.error({
      message: "删除失败",
      showClose: true,
    });
  }
};
</script>

<template>
  <el-card>
    <el-table border style="margin-bottom: 10px" :data="skuList">
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column
        label="名称"
        width="400"
        show-overflow-tooltip
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        width="400"
        show-overflow-tooltip
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="200">
        <template #default="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="200" prop="weight"></el-table-column>
      <el-table-column label="价格" width="200" prop="price"></el-table-column>
      <el-table-column label="操作" fixed="right" width="250">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
            @click="listingProducts(row)"
          ></el-button>
          <el-button type="primary" icon="Edit"></el-button>
          <el-button
            type="primary"
            icon="View"
            @click="viewDetails(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="Delete"
            @click="deleteSkuById(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="current"
      v-model:page-size="limit"
      :page-sizes="[5, 10, 15, 20]"
      background
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="getSkuS"
      @size-change="limitHandler"
    />
  </el-card>

  <el-drawer v-model="drawer">
    <template #header>
      <h4>Sku详情</h4>
    </template>
    <template #default>
      <el-row style="margin: 10px 0">
        <el-col :span="6">名称:</el-col>
        <el-col :span="18">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="6">描述:</el-col>
        <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="6">价格:</el-col>
        <el-col :span="18">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="6">平台属性:</el-col>
        <el-col :span="18">
          <el-tag
            v-for="item in skuInfo.skuAttrValueList"
            :key="item.id"
            style="margin: 5px"
          >
            {{ item.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="6">销售属性:</el-col>
        <el-col :span="18">
          <el-tag
            v-for="item in skuInfo.skuSaleAttrValueList"
            :key="item.id"
            style="margin: 5px"
          >
            {{ item.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="6">商品图片:</el-col>
        <el-col :span="18">
          <el-carousel
            v-if="skuInfo.skuImageList.length > 0"
            :interval="4000"
            type="card"
            height="200px"
          >
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img
                :src="item.imgUrl"
                alt=""
                style="width: 200px; height: 200px"
              />
            </el-carousel-item>
          </el-carousel>
          <span v-else>该商品暂无图片</span>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
