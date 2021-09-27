<template>
  <div class="container">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/VZNrkYYiwDk"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "VideoVue",
  mounted() {
    document.title = "Video";
  },
};
</script>
