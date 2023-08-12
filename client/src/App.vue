<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <RouterView />

  <AppFooter />

  <!-- audio player globally available, e.g. for podcast -->
  <!-- <AudioPlayer /> -->
</template>
