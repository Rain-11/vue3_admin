import { ResponseData } from "@/api/type.ts";
import request from "@/utils/request";
import { SkuResponse } from "./type";
import { SkuInfoResponse } from "../SPU/type";

enum Api {
  GET_SKU_LIST = "/brand/admin/product/list/",
  MERCHANT_PRODUCTS = "/brand/admin/product/onSale/",
  DELISTING_PRODUCTS = "/brand/admin/product/cancelSale/",
  PRODUCT_DETAILS = "/brand/admin/product/getSkuInfo/",
  DELETE_SKU = "/brand/admin/product/deleteSku/",
}

export function getSkuList(page: number, limit: number) {
  return request.get<any, SkuResponse>(Api.GET_SKU_LIST + `${page}/${limit}`);
}

export function listingProduct(skuId: number) {
  return request.get<any, ResponseData<any>>(
    Api.MERCHANT_PRODUCTS + `${skuId}`,
  );
}
export function removeFromShelves(skuId: number) {
  return request.get<any, ResponseData<any>>(
    Api.DELISTING_PRODUCTS + `${skuId}`,
  );
}
export function getInfo(skuId: number) {
  return request.get<any, SkuInfoResponse>(Api.PRODUCT_DETAILS + `${skuId}`);
}

export function deleteSku(skuId: number) {
  return request.delete<any, ResponseData<any>>(Api.DELETE_SKU + `${skuId}`);
}
