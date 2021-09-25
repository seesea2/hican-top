<template>
  <div>
    <div id="nav">
      <router-link to="/">BusArrival</router-link>
      &#9775;
      <!-- <router-link to="/busArrival">BusArrival</router-link> | -->
      <router-link to="/dictionary">Dictionary</router-link>
      &#9775;
      <router-link to="/podcast">Podcast</router-link>
    </div>
    <router-view />

    <footer class="container-fluid text-center pt-4">
      <br class="w-100" style="width: 100" />
      <h6 class="font-weight-bold">
        We <span style="font-size: 150%; color: red"> &#10084; </span> SG
      </h6>
    </footer>
  </div>
</template>

<style>
/* html,
body {
  height: 100%;
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
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
</style>
