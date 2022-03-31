<template>
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
          <button @click="ChangePassword()" class="btn btn-primary" :disabled="disableSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import toggleModal from "../common/modal";
import { loginId } from "../common/msiLogin";


let id = ref("")
let oldPwd = ref("")
let newPwd1 = ref("")
let newPwd2 = ref("")
let changePwdMsg = ref("")
let disableSubmit = ref(false)

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

  disableSubmit.value = true;
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
        disableSubmit.value = false;
        return;
      }

      changePwdMsg.value = "Completed.";
      setTimeout(() => {
        toggleModal();
        disableSubmit.value = false;
      }, 2000);
    })
    .catch((err) => {
      changePwdMsg.value = err;
      disableSubmit.value = false;
    });
}

</script>