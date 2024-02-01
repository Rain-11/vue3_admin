import { defineStore } from "pinia";

const SettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      whetherToFold: false,
      refresh: true,
    };
  },
});

export default SettingStore;
