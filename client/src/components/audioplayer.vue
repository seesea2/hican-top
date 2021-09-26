<template>
  <div
    id="audioarea"
    style="position: fixed; bottom: 0px; right: 10px"
    class="w-100 d-none"
  >
    <div class="container-fluid">
      <div class="row justify-content-end">
        <audio id="audioplayer" controls class="col-auto p-0 m-0"></audio>
        <button @click="close()" class="col-auto btn rounded-0 m-0 text-white">
          <span>X</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  methods: {
    close() {
      try {
        let audioarea = document.getElementById("audioarea");
        audioarea.setAttribute("class", "d-none");
        let audioplayer = document.getElementById("audioplayer");
        audioplayer.pause();
      } catch (err) {
        console.log("failure", err);
      }
    },
  },
};
</script>

<style scoped>
/* * {
    border-style: solid;
    border-width: 1px;
    border-color: red;
  } */

audio,
button {
  background-color: black;
  color: black;
}
button span:hover {
  color: deepskyblue;
}
</style>