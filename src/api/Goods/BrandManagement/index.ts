import Request from "@/utils/request.ts";
import { PagingData, Records } from "./type";
import { ResponseData } from "@/api/type.ts";

enum BrandApi {
  OBTAIN_BRAND_COLLECTION = "/brand/admin/product/baseTrademark/",
  ADD_BRAND_ADDRESS = "/brand/admin/product/baseTrademark/save",
  UPDATE_BRAND_ADDRESS = "/brand/admin/product/baseTrademark/update",
  DELETE_BRAND = "/brand/admin/product/baseTrademark/remove/",
}

export function brandAcquisitionList(page: number, limit: number) {
  return Request.get<any, PagingData>(
    BrandApi.OBTAIN_BRAND_COLLECTION + `${page}/${limit}`,
  );
}

export function addModifyBrands(data: Records) {
  if (data.id) {
    return Request.put<any, ResponseData<any>>(
      BrandApi.UPDATE_BRAND_ADDRESS,
      data,
    );
  } else {
    return Request.post<any, ResponseData<any>>(
      BrandApi.ADD_BRAND_ADDRESS,
      data,
    );
  }
}

export function deleteBrandInformation(id: number) {
  return Request.delete<any, ResponseData<any>>(
    BrandApi.DELETE_BRAND + `${id}`,
  );
}
