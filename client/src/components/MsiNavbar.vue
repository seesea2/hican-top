<template>
  <div id="nav" class="px-3">
    <nav class="navbar">
      <div class="col">
        <router-link to="/act-cal" class="mx-1">
          <img src="../assets/svg/calendar-event.svg" class="p-1 rounded bg-mygray" />
        </router-link>
        <!-- &#9775; -->
        <router-link to="/act-table" class="mx-1">
          <img src="../assets/svg/table.svg" class="m-0 p-1 rounded bg-mygray" />
        </router-link>
        <router-link to="/activities" class="mx-1">
          <img src="../assets/svg/card-heading.svg" class="p-1 rounded bg-mygray" />
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
            >Compass</a>
            <a
              href="https://hriqlive.iqdynamics.com.sg/MSIglobalHR/Main/Login.aspx"
              target="_blank"
              class="dropdown-item small"
            >HR</a>
            <a
              href="https://sharepoint.msi-global.com.sg/"
              target="_blank"
              class="dropdown-item small"
            >SharePoint</a>
            <a
              href="https://msi-global.com.sg/"
              target="_blank"
              class="dropdown-item small"
            >Msi-Global</a>
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
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li class="dropdown-item" @click="Logout()">Sign out</li>
            <li class="dropdown-item" @click="toggleModal('changePwdModal')">Change Password</li>
            <li class="dropdown-item" @click="toggleModal('registerModal')">Register User</li>
            <!-- <li class="dropdown-item">Others</li> -->
          </ul>
        </div>
      </div>
    </nav>

    <div
      class="modal fade"
      id="changePwdModal"
      tabindex="-1"
      aria-labelledby="changePwdModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-myblue">
            <h5 class="modal-title text-white" id="changePwdModalLabel">Change Password</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="toggleModal()"></button>
          </div>
          <div class="modal-body">
            <div class="form">
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  placeholder="old password"
                  v-model.trim="oldPwd"
                  required
                />
                <label for="floatingInput">Old Password</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  placeholder="new password"
                  v-model.trim="newPwd1"
                  required
                />
                <label for="floatingInput">New Password</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  placeholder="confirm new password"
                  v-model.trim="newPwd2"
                  required
                />
                <label for="floatingInput">Confirm new Password</label>
              </div>
            </div>
            <div class="text-center mt-3">
              <label v-if="changePwdMsg" class="bg-warning">{{ changePwdMsg }}</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="toggleModal()">Close</button>
            <button @click="ChangePassword()" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <RegisterComp></RegisterComp>
  </div>
</template>

<script setup>
import axios from "axios";

import router from "../router";
import RegisterComp from "./Register.vue";
import { localLogout, loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import { ref } from "vue";

let id = ref("")
let oldPwd = ref("")
let newPwd1 = ref("")
let newPwd2 = ref("")
let changePwdMsg = ref("")

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
        changePwdMsg.value = err;
      })
      .finally(() => {
        router.push("/login");
      });
  }
}

function ChangePassword() {
  // console.log("in ChangePassword");
  if (!oldPwd.value) {
    changePwdMsg.value = "Old password is required.";
    return;
  }

  if (!newPwd1.value || newPwd1.value != newPwd2.value) {
    changePwdMsg.value = "Invalid new password.";
    return;
  }

  id.value = loginId();
  changePwdMsg.value = "";
  axios
    .put("/api/msi/user/pwd", {
      id: id.value,
      oldPwd: oldPwd.value,
      newPwd: newPwd1.value,
    })
    .then((resp) => {
      console.log(resp.data);
      if (resp.data.err) {
        changePwdMsg.value = resp.data.err;
        return;
      }

      changePwdMsg.value = "Completed.";
      setTimeout(() => {
        toggleModal();
      }, 3000);
    })
    .catch((err) => {
      changePwdMsg.value = err;
    });
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