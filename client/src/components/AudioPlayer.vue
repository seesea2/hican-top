<script setup lang="ts">
import { watch } from 'vue';
import { useAudioPlayerStore } from '@/stores/audioPlayer';

const audioPlayerStore = useAudioPlayerStore()

watch(() => audioPlayerStore.src, () => {
  if (!audioPlayerStore.src) return

  let audioPlayer = <HTMLVideoElement>document.getElementById("audioplayer");
  if (!audioPlayer) return;

  audioPlayer.load();
  audioPlayer.play();
})

function close() {
  try {
    let audioplayer = <HTMLVideoElement>document.getElementById("audioplayer");
    if (audioplayer) {
      audioplayer.pause();
    }
    audioPlayerStore.reset()
  } catch (err) {
    console.log("failure", err);
  }
}
</script>


<template>
  <div v-show="audioPlayerStore.bShow">
    <audio id="audioplayer" controls class="d-none">
      <source :src="audioPlayerStore.src" :type="audioPlayerStore.type">
    </audio>
    <button @click="close()" class="btn btn-outline-primary btn-sm">
      close podcast
    </button>
  </div>
</template>

