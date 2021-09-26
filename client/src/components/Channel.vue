<template>
  <div class="container py-3">
    <div class="row">
      <img
        :src="channel.image"
        style="height: 250px; width: 250px; overflow: hidden"
        class="col-auto"
      />
      <div class="col">
        <h4>{{ channel.title }}</h4>
        <div class="small">
          {{ channel.description }}
        </div>
        <div class="row">
          <div v-for="item in channel.item" :key="item.title" class="col my-1">
            <div class="card btn btn-info btn-sm" @click="play(item)">
              <p>
                <b>{{ new Date(item.pubDate).toLocaleDateString() }}</b>
              </p>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChannelVue",
  props: ["channel"],
  emits: ["playItem"],
  methods: {
    play(item) {
      try {
        // console.log("in onPlayItem", item);
        let audioPlayer = document.getElementById("audioplayer");
        audioPlayer.src = item.url;
        if (audioPlayer.canPlayType(item.type)) {
          audioPlayer.load();
          audioPlayer.play();
          audioPlayer.controls = true;
          let audioarea = document.getElementById("audioarea");
          audioarea.removeAttribute("class", "d-none");
        }
      } catch (err) {
        console.log("Play audio failed.");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
