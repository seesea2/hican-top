<template>
  <div class="container py-3">
    <div class="row justify-content-center text-center">
      <div class="col-12 col-md-6 col-lg-4">
        <img src="../assets/PBO_black.png" alt="Oxofrd Logo" />
        <div class="input-group py-3">
          <input
            v-model="word"
            placeholder="input word"
            class="form-control"
            v-on:keyup.enter="search"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" @click="search">
              <label class="small">Search</label>
            </button>
          </div>
        </div>
        <p>{{ note }}</p>
      </div>
    </div>

    <div v-if="results.length">
      <h3>Definitions:</h3>
      <div v-for="result in results" :key="result.id">
        <div
          v-for="lexicalEntry in result.lexicalEntries"
          :key="lexicalEntry.text"
        >
          <div
            class="card mt-4"
            v-for="(entry, index) in lexicalEntry.entries"
            :key="index"
          >
            <div class="card-body">
              <h5 class="card-title">
                <label>{{ lexicalEntry.lexicalCategory.text }}</label>
                <label
                  class="px-2"
                  v-if="entry.pronunciations && entry.pronunciations.length"
                >
                  | Pronunciation:
                  <i>[ {{ entry.pronunciations[0].phoneticSpelling }} ]</i>
                  <a
                    class="btn btn-small"
                    @click="playAudio(entry.pronunciations[0].audioFile)"
                  >
                    <span style="font-size: 150%"> &#9836; </span>
                  </a>
                </label>
              </h5>
              <ol class="list-group list-group-numbered">
                <li
                  class="list-group-item d-flex"
                  v-for="sense in entry.senses"
                  :key="sense.id"
                >
                  <div
                    class="px-1"
                    v-for="(definition, ind) in sense.definitions"
                    :key="ind"
                  >
                    {{ definition }}
                    <div
                      class="small"
                      v-if="sense.examples && sense.examples.length"
                    >
                      <ul class="list-group">
                        Examples:
                        <li
                          v-for="(example, ind) in sense.examples"
                          :key="ind"
                          class="mx-4"
                        >
                          {{ example.text }}
                        </li>
                      </ul>
                    </div>

                    <div
                      v-if="sense.subsenses && sense.subsenses.length"
                      class="mt-2 small"
                    >
                      <ul class="list-group">
                        Sub Definition:
                        <i
                          v-for="(subsense, ind) in sense.subsenses"
                          :key="ind"
                        >
                          <li
                            class="mx-4"
                            v-for="def in subsense.definitions"
                            :key="def"
                          >
                            {{ def }}
                          </li>
                        </i>
                      </ul>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- <ul class="list-group">
        <li class="list-group-item" v-for="definition of definitions">
          meaning</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dictionary",
  data() {
    return {
      word: null,
      note: null,
      results: [],
    };
  },
  methods: {
    search() {
      if (!this.word || !this.word.trim()) {
        this.note = "Please input a word.";
        return;
      }
      this.note = "Loading...";
      this.results = [];

      axios
        .get("/api/dictionary/oxford/" + this.word)
        .then((resp) => {
          if (resp.data && resp.data.results) {
            this.results = resp.data.results;
          }
        })
        .catch(() => {
          // console.log(err);
        })
        .then(() => {
          this.note = null;
        });
    },
    playAudio(file) {
      let audio = new Audio(file);
      audio.play();
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
