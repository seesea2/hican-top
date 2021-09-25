<template>
  <div class="container-fluid py-2">
    <div class="text-center">
      <h2>Podcasts</h2>
    </div>

    <div v-for="channel in channels" :key="channel.title">
      <ChannelVue :channel="channel" @play-item="onPlayItem"></ChannelVue>
    </div>

    <div>
      <audio
        v-show="audio"
        id="player"
        ref="player"
        controls
        style="position: fixed; top: 20px; right: 50px; width: 20%"
      >
        <source v-if="audio" :src="audio.url" type="audio/ogg" />
        <source v-if="audio" :src="audio.url" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
import ChannelVue from "../components/Channel.vue";

import axios from "axios";

export default {
  name: "Podcast",
  components: { ChannelVue },
  data() {
    return {
      channels: [],
      audio: null,
    };
  },
  created() {
    this.getChannels();
  },
  methods: {
    getChannels() {
      axios
        .get("/api/podcast")
        .then((resp) => {
          this.channels = resp.data;
        })
        .catch((err) => {
          console.log(err);
          this.channels = [];
        });
    },
    onPlayItem(item) {
      try {
        console.log("in onPlayItem", item);
        this.audio = JSON.parse(item);
        var aa = this.$refs.player;
        aa.load();
        aa.play();
      } catch (err) {
        console.log("Play audio failed.");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
