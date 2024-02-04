import { ResponseData } from "./../../type";
import request from "@/utils/request";
import {
  BaseSaleAttrResponse,
  ImageSpuResponse,
  ObtainAllBrandResponseTypes,
  SalesAttributesTypeResponse,
  SpuResponseData,
  SpuFormDataType,
} from "./type";

enum SPUApi {
  GET_SPU_LIST = "/brand/admin/product/",
  OBTAIN_ALL_BRANDS = "/brand/admin/product/baseTrademark/getTrademarkList/",
  GET_IMAGE_THE_CURRENT_SPU = "/brand/admin/product/spuImageList/",
  GET_SKU = "/brand/admin/product/spuSaleAttrList/",
  BASE_SALE_ATTR_LIST = "/brand/admin/product/baseSaleAttrList",
  SAVE_SPU = "/brand/admin/product/saveSpuInfo",
  UPDATE_SPU = "/brand/admin/product/updateSpuInfo",
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
