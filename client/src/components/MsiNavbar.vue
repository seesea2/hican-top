<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="col">
      <router-link to="/act-cal">ActivitiesCalendar</router-link>
      &#9775;
      <router-link to="/activities">Activities</router-link>
    </div>
    <div class="col-auto">
      <button class="btn btn-sm text-white" @click="Logout()">Logout</button>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import router from "../router";
import { localLogout, loginId } from "../common/msiLogin";

export default {
  name: "MsiNavbarVue",
  methods: {
    Logout() {
      let id = loginId();
      if (id) {
        axios
          .post("/api/msi/logout", { id: id })
          .then((resp) => {
            localLogout();
            console.log(resp.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            router.push("/login");
          });
      }
    },
  },
};
</script>
