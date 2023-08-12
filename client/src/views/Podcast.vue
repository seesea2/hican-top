<script setup lang="ts">
import ChannelVue from "../components/Channel.vue";
import NavbarVue from "../components/Navbar.vue";

import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { type Channel } from "@/common/podcast";


document.title = "Podcast";

let data = ref<{ channels: Channel[] }>({
  channels: [],
});

onBeforeMount(() => {
  axios
    .get("/api/podcast")
    .then((resp) => {
      for (let item of resp.data) {
        data.value.channels.push(item);
      }
    })
    .catch((err) => {
      data.value.channels.length = 0;
      console.log("err", err);
    });
});
</script>


<template>
  <NavbarVue></NavbarVue>

  <div class="container pt-3 pb-5">
    <div class="text-center">
      <h2>Podcasts</h2>
    </div>

    <div v-for="channel in data.channels" :key="channel.title">
      <ChannelVue :channel="channel"></ChannelVue>
    </div>
  </div>
</template>

