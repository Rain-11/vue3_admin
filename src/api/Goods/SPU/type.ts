import { ResponseData } from "@/api/type.ts";

export interface SpuResponseData extends ResponseData<SPUData> {}

export interface SPUData {
  records: Record[];
  total: number | undefined;
  size?: number;
  current?: number;
  searchCount: boolean;
  pages?: number | undefined;
}

export interface Record {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number;
  tmId: number;
  spuSaleAttrList: null;
  spuImageList: null;
  spuPosterList?: null;
}

export interface BrandType {
  id: number;
  createTime?: string;
  updateTime?: string;
  tmName: string;
  logoUrl: string;
}
export interface ObtainAllBrandResponseTypes
  extends ResponseData<BrandType[]> {}

export interface ImageSpu {
  id?: number;
  spuId?: number;
  imgName: string;
  imgUrl: string;
}

export interface ImageSpuResponse extends ResponseData<ImageSpu[]> {}

export interface AttributeValueType {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}

export interface SalesAttributesType {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: AttributeValueType[];
  flag?: boolean;
  newSaleAttrValue?: string;
}

export interface SalesAttributesTypeResponse
  extends ResponseData<SalesAttributesType[]> {}

export interface BaseSaleAttr {
  id: number;
  name: string;
}
export interface BaseSaleAttrResponse extends ResponseData<BaseSaleAttr[]> {}
export interface SpuFormDataType {
  category3Id: number | undefined;
  id: number | undefined;
  spuName: string;
  description: string;
  tmId: number | undefined;
  spuImageList: ImageSpu[];
  spuSaleAttrList: SalesAttributesType[];
}
