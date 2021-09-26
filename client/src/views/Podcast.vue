<template>
  <div class="container-fluid py-2">
    <div class="text-center">
      <h2>Podcasts</h2>
    </div>

    <div v-for="channel in channels" :key="channel.title">
      <ChannelVue :channel="channel"></ChannelVue>
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
