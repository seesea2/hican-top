<template>
  <div
    id="audioarea"
    style="position: fixed; bottom: 20px; right: 50px"
    class="d-none"
  >
    <div class="row">
      <audio id="audioplayer" controls class="col-auto m-0 p-0 bg-dark"></audio>
      <span class="col-auto m-0 p-0 bg-dark">
        <button @click="close()" class="btn btn-black m-0 rounded-0 text-light">
          X
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "audioplayer",
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