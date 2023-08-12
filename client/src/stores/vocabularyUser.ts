import { ref } from "vue";
import { defineStore } from "pinia";

export const useVocabularyUserStore = defineStore("vocabularyUserStore", () => {
  let profile = ref({ bLogin: false, user: "" });

  const vocabularyUserString = localStorage.getItem("LearnEn");
  if (vocabularyUserString) {
    profile.value = JSON.parse(vocabularyUserString);
  }

  function login(username: string) {
    profile.value.bLogin = true;
    profile.value.user = username;
    localStorage.setItem("LearnEn", JSON.stringify(profile.value));
  }

  function logout() {
    profile.value.bLogin = false;
    localStorage.setItem("LearnEn", JSON.stringify(profile.value));
  }

  return { profile, login, logout };
});
