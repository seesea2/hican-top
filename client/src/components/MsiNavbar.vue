<template>
  <div id="nav" class="px-3">
    <nav class="navbar">
      <div class="col">
        <router-link
          to="/act-cal"
          class="mx-1"
          data-bs-toggle="tooltip"
          data-bs-placement="Calendar"
          title="Calendar View"
        >
          <img
            src="../assets/svg/calendar-event.svg"
            class="p-1 rounded bg-mygray"
          />
        </router-link>
        <!-- &#9775; -->
        <router-link
          to="/act-table"
          class="mx-1"
          data-bs-toggle="tooltip"
          data-bs-placement="Table"
          title="Table View"
        >
          <img
            src="../assets/svg/table.svg"
            class="m-0 p-1 rounded bg-mygray"
          />
        </router-link>
        <router-link to="/activities" class="mx-1">
          <img
            src="../assets/svg/card-heading.svg"
            class="p-1 rounded bg-mygray"
            data-bs-toggle="tooltip"
            data-bs-placement="Templates"
            title="Templates"
          />
        </router-link>
      </div>
      <div class="col mx-auto">
        <div class="btn-group rounded bg-mygray">
          <img
            src="../assets/Logo_MSI.jpg"
            class="rounded"
            style="width: 4rem"
            type="button"
            id="dropdownMenuMsi"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuMsi">
            <a
              href="https://compass.fsmsi.com.sg/tmtrack/tmtrack.dll?"
              target="_blank"
              class="dropdown-item small"
              >Compass</a
            >
            <a
              href="https://hriqlive.iqdynamics.com.sg/MSIglobalHR/Main/Login.aspx"
              target="_blank"
              class="dropdown-item small"
              >HR</a
            >
            <a
              href="https://sharepoint.msi-global.com.sg/"
              target="_blank"
              class="dropdown-item small"
              >SharePoint</a
            >
            <a
              href="https://msi-global.com.sg/"
              target="_blank"
              class="dropdown-item small"
              >Msi-Global</a
            >
          </ul>
        </div>
      </div>
      <div class="col-auto">
        <div class="btn-group rounded bg-mygray">
          <img
            src="../assets/svg/person.svg"
            class="dropdown-toggle btn btn-sm px-1"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li class="dropdown-item" @click="Logout()">Sign out</li>
            <li class="dropdown-item" @click="toggleModal('changePwdModal')">
              Change Password
            </li>
            <li class="dropdown-item" @click="toggleModal('registerModal')">
              Register User
            </li>
            <!-- <li class="dropdown-item">Others</li> -->
          </ul>
        </div>
      </div>
    </nav>

    <change-pwd></change-pwd>
    <register></register>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import register from "./Register.vue";
import changePwd from "./MsiChangePwd.vue";
import { localLogout, loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";

let id = ref("");

function Logout() {
  id.value = loginId();
  if (id.value) {
    axios
      .post("/api/msi/logout", { id: id.value })
      .then(() => {
        localLogout();
        // console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.push("/login");
      });
  }
}
</script>

<style scoped>
#nav {
  background-color: #3f51b5;
}

.router-link-active img {
  background-color: coral;
}
</style>
