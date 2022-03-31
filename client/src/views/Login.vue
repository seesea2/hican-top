<template>
  <div class="container">
    <div class="row align-item-center justify-content-center" style="height: 80vh">
      <div class="col align-self-center">
        <h2 class="text-center">Please sign in</h2>
        <div class="form mx-auto px-5 pt-4 pb-3 bg-mygray" style="max-width: 20rem">
          <label class="form-label small">ID:</label>
          <input class="form-control" v-model.trim="id" />
          <label class="form-label small">Password:</label>
          <input class="form-control" type="password" v-model.trim="pwd" />
          <div>
            <button class="form-control btn btn-primary mt-3" @click="Login()">Sign in</button>
          </div>
        </div>
        <div v-if="errMsg" class="text-center">
          <small class="bg-warning">{{ errMsg }}</small>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from "axios";

import router from "../router";
import { localLogin } from "../common/msiLogin";

document.title = "MSI Login";

let id = ref("test");
let pwd = ref("test");
let errMsg = ref("");

function Login() {
  // console.log(id, pwd)
  axios
    .post("/api/msi/login", { id: id.value, pwd: pwd.value })
    .then((resp) => {
      // console.log(resp.data)
      if (resp.data.err) {
        errMsg.value = resp.data.err
        setTimeout(() => {
          errMsg.value = "";
        }, 2000);
        return
      }

      localLogin(id.value);
      router.push({
        name: "ActivitieCalendar",
      });
    })
    .catch((err) => {
      // console.log(err)
      errMsg.value = err;
      setTimeout(() => {
        errMsg.value = "";
      }, 2000);
    });
}
</script>

<style scoped>
small:hover {
  cursor: pointer;
}
</style>