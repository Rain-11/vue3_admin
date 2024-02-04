import { Classification } from "@/api/Goods/AttributeManagement/type";
import { RouteRecordRaw } from "vue-router";

export interface UserStore {
  token?: string;
  userRoute: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export interface ClassificationStore {
  firstLevelClassification: Classification[];
  firstLevelClassificationID: undefined | number;
  secondaryClassificationList: Classification[];
  secondaryClassificationID: number | undefined;
  thirdLevelClassificationList: Classification[];
  thirdLevelClassificationID: number | undefined;
}
