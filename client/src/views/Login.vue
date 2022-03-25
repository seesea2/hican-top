<template>
  <div class="container">
    <div
      class="row align-item-center justify-content-center"
      style="height: 80vh"
    >
      <div class="col align-self-center">
        <h2 class="text-center">Please sign in</h2>
        <div
          class="form mx-auto px-5 pt-4 pb-3 bg-myblue"
          style="max-width: 20rem"
        >
          <label class="form-label small">ID:</label>
          <input class="form-control" v-model="id" />
          <label class="form-label small">Password:</label>
          <input class="form-control" type="password" v-model="pwd" />
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


<script>
import router from "../router";
import { localLogin } from "../common/msiLogin";
import axios from "axios";

export default {
  name: "LoginVue",
  data() {
    return {
      id: "test",
      pwd: "test",
      errMsg: "",
    };
  },
  mounted() {
    document.title = "MSI Login";
  },
  methods: {
    Login() {
      // console.log(this.id, this.pwd);
      axios
        .post("/api/msi/login", { id: this.id, pwd: this.pwd })
        .then(() => {
          // console.log(" login ok", resp.data);
          localLogin(this.id);
          router.push({
            name: "ActivitieCalendar",
          });
        })
        .catch((err) => {
          // console.log(" login failed");
          // console.log("post err:", err);
          this.errMsg = err;
          setTimeout(() => {
            this.errMsg = "";
          }, 5000);
        })
        .finally(() => {
          // console.log(" login ended");
        });
    },
  },
};
</script>

<style scoped>
small:hover {
  cursor: pointer;
}
</style>