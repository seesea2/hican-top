<template>
  <div
    class="modal fade"
    id="registerModal"
    tabindex="-1"
    aria-labelledby="registerModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-myblue">
          <h5 class="modal-title text-white" id="registerModalLabel">
            New User
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
                class="form-control"
                placeholder="old password"
                v-model="user.id"
                required
              />
              <label for="floatingInput" class="small">ID</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                placeholder="new password"
                v-model="user.pwd"
                required
              />
              <label for="floatingInput" class="small">Password</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                placeholder="confirm new password"
                v-model="user.email"
              />
              <label for="floatingInput" class="small">Email</label>
            </div>
            <div class="mt-2 input-group">
              <label class="input-group-text">Team:</label>
              <select class="form-select" v-model="user.team">
                <option value="DMT">DMT</option>
                <option value="Infra">Infra</option>
                <option value="Security">Security</option>
                <option value="SMT">SMT</option>
              </select>
            </div>
          </div>
          <div class="text-center mt-3">
            <label v-if="msg" class="bg-info px-2">
              {{ msg }}
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
          <button @click="register()" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toggleModal from "../common/modal";

export default {
  name: "RegisterComp",
  data() {
    return {
      user: {
        id: "",
        pwd: "",
        email: "",
        team: "DMT",
      },
      msg: "",
    };
  },
  methods: {
    register() {
      if (!this.user.id || !this.user.pwd) {
        this.msg = "ID and Password are required.";
        return;
      }
      if (!this.user.email) {
        let rslt = confirm(
          "Register without email?\n\nEmail can be used for password reset.</b>"
        );
        if (!rslt) {
          return;
        }
      }

      this.msg = "";
      axios
        .post("/api/msi/user", { user: this.user })
        .then((resp) => {
          if (resp.data.err) {
            this.msg = resp.data.err;
            return;
          }
          this.msg = resp.data.msg;

          setTimeout(() => {
            this.msg = "";
            toggleModal();
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleModal(modalId) {
      return toggleModal(modalId);
    },
  },
};
</script>
