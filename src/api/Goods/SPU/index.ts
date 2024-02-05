import { ResponseData } from "./../../type";
import request from "@/utils/request";
import {
  BaseSaleAttrResponse,
  ImageSpuResponse,
  ObtainAllBrandResponseTypes,
  SalesAttributesTypeResponse,
  SpuResponseData,
  SpuFormDataType,
  SkuForm,
  SkuFormResponse,
} from "./type";

enum SPUApi {
  GET_SPU_LIST = "/brand/admin/product/",
  OBTAIN_ALL_BRANDS = "/brand/admin/product/baseTrademark/getTrademarkList/",
  GET_IMAGE_THE_CURRENT_SPU = "/brand/admin/product/spuImageList/",
  GET_SKU = "/brand/admin/product/spuSaleAttrList/",
  BASE_SALE_ATTR_LIST = "/brand/admin/product/baseSaleAttrList",
  SAVE_SPU = "/brand/admin/product/saveSpuInfo",
  UPDATE_SPU = "/brand/admin/product/updateSpuInfo",
  ADD_SKU = "/brand/admin/product/saveSkuInfo",
  QUERY_SKU_BASED_ON_SPUID = "/brand/admin/product/findBySpuId/",
  DELETE_SKU_BASED_ON_SPID = "/brand/admin/product/deleteSpu/",
}
export function getListSpuS(current: number, limit: number, c3Id: number) {
  return request.get<any, SpuResponseData>(
    SPUApi.GET_SPU_LIST + `${current}/${limit}` + `?category3Id=${c3Id}`,
  );
}
export function obtainAllBrands() {
  return request.get<any, ObtainAllBrandResponseTypes>(
    SPUApi.OBTAIN_ALL_BRANDS,
  );
}

export function getAllImages(spuId: number) {
  return request.get<any, ImageSpuResponse>(
    SPUApi.GET_IMAGE_THE_CURRENT_SPU + `${spuId}`,
  );
}

export function getSkuAttribute(spuId: number) {
  return request.get<any, SalesAttributesTypeResponse>(
    SPUApi.GET_SKU + `${spuId}`,
  );
}
export function baseSaleAttrList() {
  return request.get<any, BaseSaleAttrResponse>(SPUApi.BASE_SALE_ATTR_LIST);
}

export function saveSpu(data: SpuFormDataType) {
  if (data.id) {
    return request.post<any, ResponseData<any>>(SPUApi.UPDATE_SPU, data);
  } else {
    return request.post<any, ResponseData<any>>(SPUApi.SAVE_SPU, data);
  }
}
export function saveSku(data: SkuForm) {
  return request.post<any, ResponseData<any>>(SPUApi.ADD_SKU, data);
}
export function getSkuBySpuId(spuId: number) {
  return request.get<any, SkuFormResponse>(
    SPUApi.QUERY_SKU_BASED_ON_SPUID + `${spuId}`,
  );
}
export function deleteBySpuId(spuId: number) {
  return request.delete<any, ResponseData<any>>(
    SPUApi.DELETE_SKU_BASED_ON_SPID + `${spuId}`,
  );
}
