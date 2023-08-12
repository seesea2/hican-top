<script setup lang="ts">
import { useRoute } from "vue-router";
import axios from "axios";

import router from "../router";
import NavbarVue from "../components/Navbar.vue";
import { onBeforeMount, ref, type Ref } from "vue";
import { useVocabularyUserStore } from "@/stores/vocabularyUser";

document.title = "Learn Words";

const vocabularyUserStore = useVocabularyUserStore()

let data: Ref<{ learntCount: number, words: string[], loading: boolean }> = ref({
  learntCount: 0,
  words: [],
  loading: true,
});

let urlUser = ref('')
let inputUser = ref('')

onBeforeMount(() => {
  // check if need to re-route
  if (!vocabularyUserStore.profile.bLogin) {
    router.push({ name: "LearnEn" });
    return;
  }

  const route = useRoute();
  if (typeof route.params.user == 'string') {
    urlUser.value = route.params.user.toLowerCase();
  }

  // exception: login, but no username in url and localstorage.
  if (!urlUser.value && !vocabularyUserStore.profile.user) {
    vocabularyUserStore.logout()
    return;
  }

  // route for last login user
  if (!urlUser.value) {
    router.push({ name: "LearnEn", params: { user: vocabularyUserStore.profile.user } });
    return;
  }

  // route for different user
  if (vocabularyUserStore.profile.user != urlUser.value) {
    vocabularyUserStore.logout()
    router.push({ name: "LearnEn" });
    return;
  }

  // url same as last login user.
});

onBeforeMount(() => {
  getWords();
});

function logout() {
  vocabularyUserStore.logout()
  router.push({ name: "LearnEn" });
}

function login() {
  if (!inputUser.value) {
    return;
  }

  // console.log("in login");
  inputUser.value = inputUser.value.toLowerCase();
  vocabularyUserStore.login(inputUser.value)
  axios.get("/api/user/" + inputUser.value); //create account if not
  router.push({ name: "LearnEn", params: { user: inputUser.value } });
  axios.get("/api/learn/" + inputUser.value + "/count").then((resp) => {
    data.value.learntCount = resp.data.count;
  });
}

function getWords() {
  // console.log("in getWords");
  let url = "/api/learn/";
  if (vocabularyUserStore.profile.bLogin) {
    url += vocabularyUserStore.profile.user;
  }
  data.value.loading = true;
  axios
    .get(url)
    .then((resp) => {
      data.value.words = resp.data;
      data.value.loading = false;
    })
    .catch((err) => {
      console.log(err);
      data.value.words.length = 0;
      data.value.loading = false;
    });

  if (vocabularyUserStore.profile.bLogin) {
    axios.get(url + "/count").then((resp) => {
      data.value.learntCount = resp.data.count;
    });
  }
}

function hideWord(word: string) {
  // console.log(word, this.user);
  if (!vocabularyUserStore.profile.bLogin) {
    return;
  }

  axios
    .get(`/api/learn/${vocabularyUserStore.profile.user}?word=${word}`)
    .then(() => {
      data.value.words = data.value.words.filter((w) => w != word);
      data.value.learntCount += 1;
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>


<template>
  <NavbarVue></NavbarVue>

  <div class="container pt-2 pb-5">
    <div class="text-center">
      <h2>Learn Words</h2>
    </div>
    <div class="row justify-content-end">
      <div class="col-auto">
        <div v-if="!vocabularyUserStore.profile.bLogin" class="input-group">
          <input v-model.trim="inputUser" placeholder="user" class="form-control" v-on:keyup.enter="login" />
          <div class="input-group-append">
            <button @click="login()" class="col-auto btn btn-primary">
              Sign in
            </button>
          </div>
        </div>
        <div v-else>
          <span class="small">Learnt:{{ data.learntCount }}</span>
          <button @click="logout()" class="col-auto p-1 ms-2 btn btn-outline-primary btn-sm">
            Sign out
          </button>
        </div>
      </div>
    </div>

    <div class="text-center">
      <span v-if="data.loading" class="spinner-border text-primary" role="status" style="width: 5rem; height: 5rem"
        aria-hidden="true" center>
        <span class="visually-hidden">Loading...</span>
      </span>
    </div>

    <div center>
      <div v-if="vocabularyUserStore.profile.bLogin" class="small">
        <div>Note:</div>
        <ul>
          <li>click dictionary to see definitions.</li>
          <li>click x to hide the word for your account.</li>
        </ul>
      </div>
      <div class="row" v-for="(word, ind) in data.words" :key="word">
        <div class="col-auto">
          {{ ind + 1 }}: <b>{{ word }}</b>
        </div>
        <div class="col-auto align-self-end ml-auto">
          <span class="ms-2">[</span>
          <a class="btn p-0 btn-sm" target="_blank" :href="'https://dictionary.cambridge.org/dictionary/english/' + word
            ">Cambridge</a>
          <a class="btn p-0 ms-1 btn-sm" target="_blank" :href="'https://www.collinsdictionary.com/dictionary/english/' + word
            ">Collins</a>
          <a class="btn p-0 ms-1 btn-sm" target="_blank" :href="'https://www.lexico.com/en/definition/' + word">Oxford</a>
          <a class="btn p-0 ms-1 btn-sm" target="_blank" :href="'https://dict.cn/' + word">Dict</a>
          <span>]</span>
          <button v-if="vocabularyUserStore.profile.bLogin" class="btn btn-outline-info border-0 ms-2"
            @click="hideWord(word)">
            x
          </button>
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-primary my-2" @click="getWords()">Refresh</button>
      </div>
    </div>
  </div>
</template>

