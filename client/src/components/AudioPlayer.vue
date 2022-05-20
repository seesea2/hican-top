<template>
  <div
    id="audioarea"
    style="position: fixed; bottom: 3rem; right: 1rem"
    class="w-100 d-none"
  >
    <div class="container-fluid">
      <div class="row no-gutters justify-content-end">
        <audio
          id="audioplayer"
          controls
          class="col-9 col-sm-auto p-0 m-0"
        ></audio>
        <button @click="close()" class="col-auto btn rounded-0 m-0 text-white">
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
function close() {
  try {
    let audioarea = document.getElementById("audioarea");
    audioarea.setAttribute("class", "d-none");
    let audioplayer = document.getElementById("audioplayer");
    audioplayer.pause();
  } catch (err) {
    console.log("failure", err);
  }
}
</script>

<style scoped>
audio,
button {
  background-color: black;
  color: black;
}
button span:hover {
  color: deepskyblue;
}
</style>
