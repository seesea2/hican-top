<template>
  <div>
    <nav class="navbar bg-gray">
      <div class="col ms-2">
        <router-link to="/act-cal" class="btn btn-sm">
          <img src="../assets/svg/calendar-event.svg" />
        </router-link>
        <!-- &#9775; -->
        <router-link to="/act-table" class="btn btn-sm">
          <img src="../assets/svg/table.svg" />
        </router-link>
        <router-link to="/activities" class="btn btn-sm">
          <img src="../assets/svg/card-heading.svg" />
        </router-link>
      </div>
      <div class="col-auto me-4">
        <div class="btn-group">
          <img
            src="../assets/svg/person.svg"
            class="dropdown-toggle btn btn-sm"
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
            <li class="dropdown-item">Others</li>
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
          <div class="modal-header">
            <h5 class="modal-title" id="changePwdModalLabel">
              Change Password
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="toggleModal()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form">
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  placeholder="old password"
                  v-model="oldPwd"
                  required
                />
                <label for="floatingInput">Old Password</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  placeholder="new password"
                  v-model="newPwd1"
                  required
                />
                <label for="floatingInput">New Password</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  placeholder="confirm new password"
                  v-model="newPwd2"
                  required
                />
                <label for="floatingInput">Confirm new Password</label>
              </div>
            </div>
            <div class="text-center mt-3">
              <label v-if="changePwdMsg" class="bg-warning">
                {{ changePwdMsg }}
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="toggleModal()"
            >
              Close
            </button>
            <button @click="ChangePassword()" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import { localLogout, loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";

export default {
  name: "MsiNavbarVue",
  data() {
    return {
      id: "",
      oldPwd: "",
      newPwd1: "",
      newPwd2: "",
      changePwdMsg: "",
    };
  },
  mounted() {
    this.id = loginId();
  },
  methods: {
    Logout() {
      if (this.id) {
        axios
          .post("/api/msi/logout", { id: this.id })
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
    },
    ChangePassword() {
      console.log("in ChangePassword");
      if (!this.oldPwd) {
        this.changePwdMsg = "Old password is required.";
        return;
      }

      if (!this.newPwd1 || this.newPwd1 != this.newPwd2) {
        this.changePwdMsg = "Invalid new password.";
        return;
      }
      this.changePwdMsg = "";

      axios
        .put("/api/msi/user/pwd", {
          id: this.id,
          oldPwd: this.oldPwd,
          newPwd: this.newPwd1,
        })
        .then((resp) => {
          console.log(resp.data);
          setTimeout(()=>{}, 3000)
        })
        .catch((err) => {
          this.changePwdMsg = err;
        });
    },
    toggleModal(id) {
      toggleModal(id);
    },
  },
};
</script>
