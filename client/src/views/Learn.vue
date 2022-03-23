<template>
  <div>
    <NavbarVue></NavbarVue>
    <div class="container py-2">
      <div class="text-center">
        <h2>Learn Words</h2>
      </div>
      <div class="row justify-content-end">
        <div class="col-auto">
          <div v-if="!bLogin" class="input-group">
            <input
              v-model="user"
              placeholder="user"
              class="form-control"
              v-on:keyup.enter="login"
            />
            <div class="input-group-append">
              <button
                @click="login"
                class="col-auto btn btn-outline-primary btn-small"
              >
                Sign in
              </button>
            </div>
          </div>
          <div v-if="bLogin">
            <span class="small"> Learnt:{{ learntCount }} </span>
            <button
              @click="logout"
              class="col-auto p-1 ms-2 btn btn-outline-primary btn-small small"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div class="text-center">
        <span
          v-if="loading"
          class="spinner-border text-primary"
          role="status"
          style="width: 5rem; height: 5rem"
          aria-hidden="true"
          center
        >
        </span>
      </div>

      <div class="w-100" center>
        <div v-if="bLogin" class="small">
          <div>Note:</div>
          <ul>
            <li>click word or dictionary to see definitions;</li>
            <li>click x to hide the word for your account.</li>
          </ul>
        </div>
        <div class="row" v-for="(word, ind) in words" :key="word">
          <div class="col-auto">
            {{ ind + 1 }}:
            <a target="_blank" :href="'/dictionary/' + word"> {{ word }} </a>
          </div>
          <div class="col-auto align-self-end ml-auto">
            <span class="ms-2"> [ </span>
            <a
              class="btn p-0 btn-small"
              target="_blank"
              :href="
                'https://dictionary.cambridge.org/dictionary/english/' + word
              "
            >
              Cambridge
            </a>
            <a
              class="btn p-0 ms-1 btn-small"
              target="_blank"
              :href="
                'https://www.collinsdictionary.com/dictionary/english/' + word
              "
            >
              Collins
            </a>
            <a
              class="btn p-0 ms-1 btn-small"
              target="_blank"
              :href="'https://www.lexico.com/en/definition/' + word"
            >
              Oxford
            </a>
            <a
              class="btn p-0 ms-1 btn-small"
              target="_blank"
              :href="'https://dict.cn/' + word"
            >
              Dict
            </a>
            <span> ] </span>
            <button
              v-if="bLogin"
              class="btn btn-outline-info border-0 ms-2"
              @click="hideWord(word)"
            >
              x
            </button>
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-primary my-2" @click="getWords">
            Refresh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import router from "../router";
import { addParam, getParam } from "../common/localStorage";
import NavbarVue from "../components/Navbar.vue";

const localStorageName = "LearnEn";

export default {
  name: "Learn",
  components: { NavbarVue },
  data() {
    return {
      bLogin: false,
      learntCount: 0,
      user: "",
      words: [],
      loading: true,
    };
  },
  created() {
    // check if need to re-route
    // console.log("in created");
    this.bLogin = getParam(localStorageName, "bLogin");
    if (!this.bLogin) {
      return;
    }

    const route = useRoute();
    this.user = route.params.user;
    if (this.user) {
      this.user = this.user.trim().toLowerCase();
    }

    // exception: login but no user.
    let user = getParam(localStorageName, "user");
    if (!this.user && !user) {
      this.bLogin = false;
      addParam(localStorageName, "bLogin", false);
      return;
    }

    // route for last login user
    if (!this.user) {
      this.user = user;
      router.push({ name: "Learn", params: { user: user } });
      return;
    }
    // route for different user
    if (user != this.user) {
      addParam(localStorageName, "user", this.user);
      router.push({ name: "Learn", params: { user: this.user } });
      return;
    }

    // url same as last login user.
  },
  mounted() {
    // console.log("in mounted");
    document.title = "Learn Words";
    // console.log(this.user, this.bLogin);
    this.getWords();
    // if (this.bLogin) {
    //   axios.get("/api/learn/" + this.user + "/count").then((resp) => {
    //     this.learntCount = resp.data.count;
    //   });
    // }
  },
  methods: {
    logout() {
      this.bLogin = false;
      addParam(localStorageName, "bLogin", false);
      router.push({ name: "Learn" });
    },
    login() {
      if (!this.user || !this.user.trim()) {
        return;
      }

      // console.log("in login");
      this.user = this.user.trim().toLowerCase();
      this.bLogin = true;
      addParam(localStorageName, "user", this.user);
      addParam(localStorageName, "bLogin", true);
      axios.get("/api/user/" + this.user); //create account if not
      router.push({ name: "Learn", params: { user: this.user } });
      axios.get("/api/learn/" + this.user + "/count").then((resp) => {
        this.learntCount = resp.data.count;
      });
    },
    getWords() {
      // console.log("in getWords");
      let url = "/api/learn/";
      if (this.user) {
        url += this.user;
      }
      this.loading = true;
      axios
        .get(url)
        .then((resp) => {
          this.words = resp.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.words = [];
          this.loading = false;
        });

      // console.log(this.bLogin);
      if (this.bLogin) {
        axios.get(url + "/count").then((resp) => {
          this.learntCount = resp.data.count;
        });
      }
    },
    hideWord(word) {
      // console.log(word, this.user);
      if (!this.user) {
        return;
      }

      axios
        .get(`/api/learn/${this.user}?word=${word}`)
        .then(() => {
          this.words = this.words.filter((w) => w != word);
          this.learntCount += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
