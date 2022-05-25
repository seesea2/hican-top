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
            class="btn-close btn-close-white"
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
                v-model.trim="data.user.id"
                required
              />
              <label for="floatingInput" class="small">ID</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                placeholder="new password"
                v-model.trim="data.user.pwd"
                required
              />
              <label for="floatingInput" class="small">Password</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                placeholder="confirm new password"
                v-model.trim="data.user.email"
              />
              <label for="floatingInput" class="small">Email</label>
            </div>
            <div class="mt-2 input-group">
              <label class="input-group-text">Team:</label>
              <select class="form-select" v-model.trim="data.user.team">
                <option value="DMT">DMT</option>
                <option value="Infra">Infra</option>
                <option value="Security">Security</option>
                <option value="SMT">SMT</option>
              </select>
            </div>
          </div>
          <div class="text-center mt-3">
            <label v-if="data.msg" class="bg-info px-2">{{ data.msg }}</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="toggleModal()"
          >
            Close
          </button>
          <button
            @click="register()"
            class="btn btn-primary btn-sm"
            :disabled="disableSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import toggleModal from "../common/modal";

let data = reactive({
  user: {
    id: "",
    pwd: "",
    email: "",
    team: "DMT",
  },
  msg: "",
});

let disableSubmit = ref(false);

function register() {
  if (!data.user.id || !data.user.pwd) {
    data.msg = "ID and Password are required.";
    return;
  }
  if (!data.user.email) {
    let rslt = confirm(
      "Register without email?\n\nEmail can be used for password reset.</b>"
    );
    if (!rslt) {
      return;
    }
  }

  disableSubmit.value = true;
  data.msg = "";
  axios
    .post("/api/msi/user", { user: data.user })
    .then((resp) => {
      if (resp.data.err) {
        data.msg = resp.data.err;
        return;
      }
      data.msg = resp.data.msg;

      setTimeout(() => {
        data.msg = "";
        toggleModal();
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      disableSubmit.value = false;
    });
}
</script>
