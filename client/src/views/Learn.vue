<template>
  <NavbarVue></NavbarVue>

  <div class="container py-2">
    <div class="text-center">
      <h2>Learn Words</h2>
    </div>
    <div class="row justify-content-end">
      <div class="col-auto">
        <div v-if="!data.bLogin" class="input-group">
          <input v-model.trim="data.user" placeholder="user" class="form-control" v-on:keyup.enter="login" />
          <div class="input-group-append">
            <button @click="login" class="col-auto btn btn-primary">
              Sign in
            </button>
          </div>
        </div>
        <div v-if="data.bLogin">
          <span class="small">Learnt:{{ data.learntCount }}</span>
          <button @click="logout" class="col-auto p-1 ms-2 btn btn-outline-primary btn-sm">
            Sign out
          </button>
        </div>
      </div>
    </div>

    <div class="text-center">
      <span v-if="data.loading" class="spinner-border text-primary" role="status" style="width: 5rem; height: 5rem"
        aria-hidden="true" center></span>
    </div>

    <div center>
      <div v-if="data.bLogin" class="small">
        <div>Note:</div>
        <ul>
          <li>click dictionary to see definitions;</li>
          <li>click x to hide the word for your account.</li>
        </ul>
      </div>
      <div class="row" v-for="(word, ind) in data.words" :key="word">
        <div class="col-auto">
          {{ ind + 1 }}:
          {{ word }}
        </div>
        <div class="col-auto align-self-end ml-auto">
          <span class="ms-2">[</span>
          <a class="btn p-0 btn-sm" target="_blank" :href="
            'https://dictionary.cambridge.org/dictionary/english/' + word
          ">Cambridge</a>
          <a class="btn p-0 ms-1 btn-sm" target="_blank" :href="
            'https://www.collinsdictionary.com/dictionary/english/' + word
          ">Collins</a>
          <a class="btn p-0 ms-1 btn-sm" target="_blank"
            :href="'https://www.lexico.com/en/definition/' + word">Oxford</a>
          <a class="btn p-0 ms-1 btn-sm" target="_blank" :href="'https://dict.cn/' + word">Dict</a>
          <span>]</span>
          <button v-if="data.bLogin" class="btn btn-outline-info border-0 ms-2" @click="hideWord(word)">
            x
          </button>
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-primary my-2" @click="getWords">Refresh</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";

import router from "../router";
import NavbarVue from "../components/Navbar.vue";
import { addParam, getParam } from "../common/localStorage";
import { reactive, onBeforeMount } from "vue";

document.title = "Learn Words";

const localStorageName = "LearnEn";

let data = reactive({
  bLogin: false,
  learntCount: 0,
  user: "",
  words: [],
  loading: true,
});

onBeforeMount(() => {
  // check if need to re-route
  // console.log("in created");
  data.bLogin = getParam(localStorageName, "bLogin");
  if (!data.bLogin) {
    return;
  }

  const route = useRoute();
  data.user = route.params.user;
  if (data.user) {
    data.user = data.user.toLowerCase();
  }

  // exception: login but no user.
  let user = getParam(localStorageName, "user");
  if (!data.user && !user) {
    data.bLogin = false;
    addParam(localStorageName, "bLogin", false);
    return;
  }

  // route for last login user
  if (!data.user) {
    data.user = user;
    router.push({ name: "Learn", params: { user: user } });
    return;
  }
  // route for different user
  if (user != data.user) {
    addParam(localStorageName, "user", data.user);
    router.push({ name: "Learn", params: { user: data.user } });
    return;
  }
  // url same as last login user.
});

onBeforeMount(() => {
  getWords();
});

function logout() {
  data.bLogin = false;
  addParam(localStorageName, "bLogin", false);
  router.push({ name: "Learn" });
}
function login() {
  if (!data.user) {
    return;
  }

  // console.log("in login");
  data.user = data.user.toLowerCase();
  data.bLogin = true;
  addParam(localStorageName, "user", data.user);
  addParam(localStorageName, "bLogin", true);
  axios.get("/api/user/" + data.user); //create account if not
  router.push({ name: "Learn", params: { user: data.user } });
  axios.get("/api/learn/" + data.user + "/count").then((resp) => {
    data.learntCount = resp.data.count;
  });
}

function getWords() {
  // console.log("in getWords");
  let url = "/api/learn/";
  if (data.user) {
    url += data.user;
  }
  data.loading = true;
  axios
    .get(url)
    .then((resp) => {
      data.words = resp.data;
      data.loading = false;
    })
    .catch((err) => {
      console.log(err);
      data.words.length = 0;
      data.loading = false;
    });

  // console.log(this.bLogin);
  if (data.bLogin) {
    axios.get(url + "/count").then((resp) => {
      data.learntCount = resp.data.count;
    });
  }
}

function hideWord(word) {
  // console.log(word, this.user);
  if (!data.user) {
    return;
  }

  axios
    .get(`/api/learn/${data.user}?word=${word}`)
    .then(() => {
      data.words = data.words.filter((w) => w != word);
      data.learntCount += 1;
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
