import {
  acquisitionClassification,
  obtainSecondaryClassification,
} from "@/api/Goods/AttributeManagement";
import { defineStore } from "pinia";
import { ClassificationStore } from "./type";

const classificationStore = defineStore("ClassificationStore", {
  state(): ClassificationStore {
    return {
      firstLevelClassification: [],
      firstLevelClassificationID: undefined,
      secondaryClassificationList: [],
      secondaryClassificationID: undefined,
      thirdLevelClassificationList: [],
      thirdLevelClassificationID: undefined,
    };
  },
  actions: {
    async acquisitionClassification() {
      try {
        const result = await acquisitionClassification();
        if (result.ok) {
          this.firstLevelClassification = result.data;
          return "ok";
        } else {
          return Promise.reject("获取一级分类失败");
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async obtainSecondaryClassification() {
      if (this.firstLevelClassificationID) {
        try {
          const result = await obtainSecondaryClassification(
            this.firstLevelClassificationID as number,
          );
          if (result.ok) {
            this.secondaryClassificationList = result.data;
            return "ok";
          } else {
            return Promise.reject("获取二级分类失败");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }
    },
    async obtainThreeLevelClassification() {
      if (this.secondaryClassificationID) {
        try {
          const result = await obtainSecondaryClassification(
            this.secondaryClassificationID as number,
          );
          if (result.ok) {
            this.thirdLevelClassificationList = result.data;
            return "ok";
          } else {
            return Promise.reject("获取三级分类失败");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }
    },
  },
});

export default classificationStore;
