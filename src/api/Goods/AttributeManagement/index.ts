import { ResponseData } from "./../../type";
import request from "@/utils/request";
import {
  ObtainClassificationData,
  AttributeListData,
  ProductAttributes,
} from "./type";

enum ClassificationApi {
  OBTAIN_PRIMARY_CLASSIFICATION = "/brand/admin/product/getCategory1",
  OBTAIN_SECONDARY_CLASSIFICATION = "/brand/admin/product/getCategory2/",
  OBTAIN_THREE_LEVEL_CLASSIFICATION = "/brand/admin/product/getCategory3/",
  ATTRIBUTE_LIST = "/brand/admin/product/attrInfoList/",
  ADD_ATTRIBUTE_URL = "/brand/admin/product/saveAttrInfo",
  DELETE_ATTRIBUTE = "/brand/admin/product/deleteAttr/",
}

export function acquisitionClassification() {
  return request.get<any, ObtainClassificationData>(
    ClassificationApi.OBTAIN_PRIMARY_CLASSIFICATION,
  );
}

export function obtainSecondaryClassification(category1Id: number) {
  return request.get<any, ObtainClassificationData>(
    ClassificationApi.OBTAIN_SECONDARY_CLASSIFICATION + `${category1Id}`,
  );
}
export function obtainThreeLevelClassification(category2Id: number) {
  return request.get<any, ObtainClassificationData>(
    ClassificationApi.OBTAIN_THREE_LEVEL_CLASSIFICATION + `${category2Id}`,
  );
}

export function getPropertyList(c1Id: number, c2Id: number, c3Id: number) {
  return request.get<any, AttributeListData>(
    ClassificationApi.ATTRIBUTE_LIST + `${c1Id}/${c2Id}/${c3Id}`,
  );
}

export function saveAttributesAdd(data: ProductAttributes) {
  return request.post<any, ResponseData<any>>(
    ClassificationApi.ADD_ATTRIBUTE_URL,
    data,
  );
}

export function deleteAttributeById(id: number) {
  return request.delete<any, ResponseData<any>>(
    ClassificationApi.DELETE_ATTRIBUTE + `${id}`,
  );
}
