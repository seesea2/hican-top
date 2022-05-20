import { defineStore } from "pinia";

export const useTemplates = defineStore("templates", {
  state: () => {
    return {
      curTemplate: {
        id: "new",
        group1: "Deployment",
        group2: null,
      },
    };
  },
});

// const store = useTemplates();
// console.log(store.curTemplate);
