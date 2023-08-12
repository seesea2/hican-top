<script setup lang="ts">
import AudioPlayer from './AudioPlayer.vue';

function toTop() {
  try {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  } catch (e) {
    console.log(e);
  }
  return;
}
</script>


<template>
  <div class="container-fluid fixed-bottom bg-mygray small py-0">
    <div class="row">
      <footer class="text-center col">
        <span @click="toTop()" data-bs-toggle="tooltip" data-bs-placement="top" title="Scroll to top">
          We
          <span style="font-size: 150%; color: red">&#10084;</span>
          SG
        </span>
      </footer>

      <AudioPlayer class="col-auto" />
    </div>
  </div>
</template>


<style scoped>
span:hover {
  cursor: pointer;
}
</style>
