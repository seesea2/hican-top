<template>
  <div id="nav">
    <router-link to="/">BusArrival</router-link>
    &#9775;
    <router-link to="/dictionary">Dictionary</router-link>
    &#9775;
    <router-link to="/podcast">Podcast</router-link>
    &#9775;
    <router-link to="/learn">LearnWords</router-link>
  </div>
</template>

<script>
export default {
  name: "NavbarVue",
};
</script>

<style scoped>
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
</style>