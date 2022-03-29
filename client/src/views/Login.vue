<template>
  <div class="container">
    <div
      class="row align-item-center justify-content-center"
      style="height: 80vh"
    >
      <div class="col align-self-center">
        <h2 class="text-center">Please sign in</h2>
        <div
          class="form mx-auto px-5 pt-4 pb-3 bg-mygray"
          style="max-width: 20rem"
        >
          <label class="form-label small">ID:</label>
          <input class="form-control" v-model.trim="id" />
          <label class="form-label small">Password:</label>
          <input class="form-control" type="password" v-model.trim="pwd" />
          <div>
            <button class="form-control btn btn-primary mt-3" @click="Login()">
              Sign in
            </button>
          </div>
        </div>
        <div v-if="errMsg" class="text-center">
          <small class="bg-warning">{{ errMsg }} </small>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import router from "../router";
import { localLogin } from "../common/msiLogin";
import axios from "axios";

document.title = "MSI Login";
let id = "test";
let pwd = "test";
let errMsg = "";

function Login() {
  axios
    .post("/api/msi/login", { id: id, pwd: pwd })
    .then(() => {
      localLogin(id);
      router.push({
        name: "ActivitieCalendar",
      });
    })
    .catch((err) => {
      errMsg = err;
      setTimeout(() => {
        errMsg = "";
      }, 5000);
    });
}
</script>

<style scoped>
small:hover {
  cursor: pointer;
}
</style>