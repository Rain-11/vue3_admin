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
  idAndValue?: string;
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

export interface SkuForm {
  category3Id: number;
  price: number;
  skuAttrValueList: SkuAttrValueList[];
  skuDefaultImg: string;
  skuDesc: string;
  skuName: string;
  skuSaleAttrValueList: SkuSaleAttrValueList[];
  spuId: number;
  tmId: number;
  weight: string;
}

export interface SkuSaleAttrValueList {
  saleAttrId: number;
  saleAttrValueId: number;
}

export interface SkuAttrValueList {
  attrId: number;
  valueId: number;
}
export interface SkuFormResponse extends ResponseData<SkuForm[]> {}
export interface SkuFormData {
  category3Id: number;
  price: number;
  skuAttrValueList: SkuAttrValueList[];
  skuDefaultImg: string;
  skuDesc: string;
  skuName: string;
  skuSaleAttrValueList: SkuSaleAttrValueList[];
  spuId: number;
  tmId: number;
  weight: string;
  isSale?: number;
  id?: number;
}
//商品详情
export interface SkuInfo {
  id: number;
  createTime: string;
  updateTime: string;
  spuId: number;
  price: number;
  skuName: string;
  skuDesc: string;
  weight: string;
  tmId: number;
  category3Id: number;
  skuDefaultImg: string;
  isSale: number;
  skuImageList: SkuImageList[];
  skuAttrValueList: SkuAttrValueList[];
  skuSaleAttrValueList: SkuSaleAttrValueList[];
}

export interface SkuSaleAttrValueList {
  id: number;
  createTime: string;
  updateTime: string;
  skuId: number;
  spuId: number;
  saleAttrValueId: number;
  saleAttrId: number;
  saleAttrName: string;
  saleAttrValueName: string;
}

export interface SkuAttrValueList {
  id: number;
  createTime: string;
  updateTime: string;
  attrId: number;
  valueId: number;
  skuId: number;
  attrName: string;
  valueName: string;
}

interface SkuImageList {
  id: number;
  createTime: string;
  updateTime: string;
  skuId: number;
  imgName: string;
  imgUrl: string;
  spuImgId: number;
  isDefault: string;
}

export interface SkuInfoResponse extends ResponseData<SkuInfo> {}
