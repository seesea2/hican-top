<template>
  <div>
    <NavbarVue></NavbarVue>

    <div class="container py-2">
      <div class="text-center">
        <h2>Podcasts</h2>
      </div>

      <div v-for="channel in channels" :key="channel.title">
        <ChannelVue :channel="channel"></ChannelVue>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChannelVue from "../components/Channel.vue";
import NavbarVue from "../components/Navbar.vue";

import axios from "axios";
import { onBeforeMount } from "@vue/runtime-core";

document.title = "Podcast";

let channels = [];

onBeforeMount(() => {
  axios
    .get("/api/podcast")
    .then((resp) => {
      // channels = resp.data;
      for (let item in resp.data) {
        channels.push(item);
      }
      console.log(channels);
    })
    .catch((err) => {
      console.log(err);
      channels = [];
    });
});
</script>
