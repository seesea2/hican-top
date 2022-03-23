<template>
  <div>
    <router-view />

    <AppFooter></AppFooter>

    <!-- audio player globally available, e.g. for podcaset -->
    <AudioPlayer />
  </div>
</template>

<script>
import AudioPlayer from "./components/AudioPlayer.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: { AudioPlayer, AppFooter },
};
</script>

<style>
html,
body {
  min-height: 100%;
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  padding-bottom: 30px; /* space for footer */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.bg-gray {
  background-color: #f5f5f5;
}

/* for layout debugging */
/* * {
  border-style: solid;
  border-width: 1px;
  border-color: red;
} */
.modal-fullscreen {
  padding-right: 17px;
}
</style>
