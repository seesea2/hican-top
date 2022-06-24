<template>
  <div id="nav" class="p-3">
    <router-link to="/">BusArrival</router-link>&#9775;
    <router-link to="/podcast">Podcast</router-link>&#9775;
    <router-link to="/learn">LearnWords</router-link>
  </div>
</template>

<style scoped>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: #42b983;
}
</style>
