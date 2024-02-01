import Request from "@/utils/request.ts";
import { PagingData } from "./type";

enum BrandApi {
  OBTAIN_BRAND_COLLECTION = "/admin/product/baseTrademark",
}

export function brandAcquisitionList(page: number, limit: number) {
  return Request.get<any, PagingData>(
    BrandApi.OBTAIN_BRAND_COLLECTION + `/${page}/${limit}`,
  );
}
