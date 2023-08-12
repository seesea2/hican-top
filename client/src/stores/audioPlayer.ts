import { ref } from "vue";
import { defineStore } from "pinia";

export const useAudioPlayerStore = defineStore("audioPlayerStore", () => {
  let bShow = ref(false);
  let src = ref("");
  let type = ref("");

  function play(item: { url: string; type: string }) {
    src.value = item.url;
    type.value = item.type;
    // console.log(item);
    bShow.value = true;
  }

  function reset() {
    bShow.value = false;
    src.value = "";
    type.value = "";
  }

  return { bShow, src, type, play, reset };
});
