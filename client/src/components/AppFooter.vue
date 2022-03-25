<template>
  <footer class="text-center fixed-bottom bg-mygray small py-1">
    <!-- <footer class="container-fluid text-center py-4"> -->
    <span
      @click="toTop()"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Scroll to top"
    >
      We
      <span style="font-size: 150%; color: red"> &#10084; </span>
      SG
    </span>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    toTop() {
      try {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } catch (e) {
        console.log(e);
      }
      return;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span:hover {
  cursor: pointer;
}
</style>
