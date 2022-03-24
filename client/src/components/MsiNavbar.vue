<template>
  <div class="px-3 bg-dark text-white">
    <nav class="navbar">
      <div class="col">
        <router-link to="/act-cal" class="mx-1">
          <img
            src="../assets/svg/calendar-event.svg"
            class="p-1 rounded bg-gray"
          />
        </router-link>
        <!-- &#9775; -->
        <router-link to="/act-table" class="mx-1">
          <img src="../assets/svg/table.svg" class="m-0 p-1 rounded bg-gray" />
        </router-link>
        <router-link to="/activities" class="mx-1">
          <img
            src="../assets/svg/card-heading.svg"
            class="p-1 rounded bg-gray"
          />
        </router-link>
      </div>
      <div class="col-auto">
        <div class="btn-group btn text-white">
          <!-- <img
            src="../assets/svg/person.svg"
            class="dropdown-toggle btn btn-sm"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person dropdown-toggle"
            viewBox="0 0 16 16"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
          </svg>
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
          if (resp.data.err) {
            this.changePwdMsg = resp.data.err;
            return;
          }

          this.changePwdMsg = "Completed.";
          setTimeout(() => {
            toggleModal();
          }, 3000);
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
