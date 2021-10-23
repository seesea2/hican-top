<template>
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
          <button
            @click="logout"
            class="col-auto btn btn-outline-primary btn-small"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>

    <div class="w-100" center>
      <div v-if="bLogin" class="text-primary small">
        Note:click x to hide the word for your user account.
      </div>
      <div v-for="(word, ind) in words" :key="word">
        {{ ind + 1 }}: {{ word }}
        <button
          v-if="bLogin"
          class="btn btn-outline-info border-0"
          @click="hideWord(word)"
        >
          x
        </button>
      </div>
      <button class="btn btn-primary w-100 my-2" @click="getWords">
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import router from "../router";
import { addParam, getParam } from "../common/localStorage";

const localStorageName = "LearnEn";

export default {
  name: "Learn",
  data() {
    return {
      bLogin: false,
      user: "",
      words: [],
    };
  },
  created() {
    const route = useRoute();
    this.user = route.params.user;
    if (this.user) {
      let user = getParam(localStorageName, "user");
      if (user != this.user) {
        this.bLogin = false;
        addParam(localStorageName, "user", this.user);
        addParam(localStorageName, "bLogin", false);
      } else {
        this.bLogin = getParam(localStorageName, "bLogin");
      }
    } else {
      this.bLogin = false;
    }
    this.getWords();
  },
  mounted() {
    document.title = "Learn Words";
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

      this.user = this.user.trim();
      this.bLogin = true;
      addParam(localStorageName, "user", this.user);
      addParam(localStorageName, "bLogin", true);
      axios.get("/api/user/" + this.user); //create account if not
      router.push({ name: "Learn", params: { user: this.user } });
    },
    getWords() {
      let url = "/api/learn/";
      if (this.user) {
        url += this.user;
      }
      axios
        .get(url)
        .then((resp) => {
          this.words = resp.data;
        })
        .catch((err) => {
          console.log(err);
          this.words = [];
        });
    },
    hideWord(word) {
      if (!this.user) {
        return;
      }

      axios
        .get(`/api/learn/${this.user}?word=${word}`)
        .then(() => {
          this.words = this.words.filter((w) => w != word);
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
