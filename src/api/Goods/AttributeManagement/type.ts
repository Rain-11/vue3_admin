import { ResponseData } from "@/api/type";

export interface Classification {
  id: number;
  name: string;
  category1Id: number;
  category2Id: number;
}

export interface ObtainClassificationData
  extends ResponseData<Classification[]> {}

export interface Attr {
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}

export interface ProductAttributes {
  id?: number;
  attrName: string;
  categoryId: number;
  categoryLevel: number;
  attrValueList: Attr[];
  idAndValue: string;
}

export interface AttributeListData extends ResponseData<ProductAttributes[]> {}
