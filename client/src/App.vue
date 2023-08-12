<script setup lang="ts">
import { RouterView } from 'vue-router'
import AudioPlayer from "./components/AudioPlayer.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <RouterView />

  <AppFooter />

  <!-- audio player globally available, e.g. for podcast -->
  <!-- <AudioPlayer /> -->
</template>
