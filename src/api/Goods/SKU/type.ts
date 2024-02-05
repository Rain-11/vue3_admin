import { ResponseData } from "@/api/type.ts";
import { SkuFormData } from "../SPU/type";

export interface SkuData {
  records: SkuFormData[];
  total: number;
}

export interface SkuResponse extends ResponseData<SkuData> {}
