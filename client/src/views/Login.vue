<template>
  <div class="container">
    <div
      class="row align-item-center justify-content-center"
      style="height: 80vh"
    >
      <div class="col align-self-center">
        <div
          class="form mx-auto bg-light px-5 pt-4 pb-3"
          style="max-width: 300px"
        >
          <label class="form-label small">ID:</label>
          <input class="form-control" v-model="id" />
          <label class="form-label small">Password:</label>
          <input class="form-control" type="password" v-model="pwd" />
          <div class="">
            <button
              class="form-control btn btn-primary btn-small mt-3"
              @click="Login()"
            >
              Login
            </button>
            <div class="mt-3">
              <small @click="Register()"> Register </small>
            </div>
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
    Register() {
      // console.log(this.id, this.pwd);
      axios
        .post("/api/msi/register", { id: this.id, pwd: this.pwd })
        .then(() => {
          // console.log(" login ok", resp.data);
          this.Login();
        })
        .catch((err) => {
          // console.log(" Register failed");
          // console.log("post err:", err);
          this.errMsg = err;
          setTimeout(() => {
            this.errMsg = "";
          }, 5000);
        })
        .finally(() => {
          // console.log(" Register ended");
        });
    },
  },
};
</script>

<style scoped>
/* * {
  border-style: solid;
  border-width: 1px;
  border-color: red;
} */
small:hover {
  cursor: pointer;
}
</style>