<template>
  <div class="container text-center py-3">
    <div>
      <h3 v-if="busStop">{{ busStop.Description }}</h3>
      <h5>Bus Stop: {{ inputCode }}</h5>

      <div v-if="loading" class="my-3">
        <div
          class="spinner-border"
          style="width: 10rem; height: 10rem"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else-if="loadingNote">{{ loadingNote }}</div>
    </div>

    <table v-if="busArrival" class="table mt-3">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">1st Bus</th>
          <th scope="col">2nd Bus</th>
          <th scope="col">3rd Bus</th>
        </tr>
      </thead>
      <tbody v-if="busArrival.Services.length">
        <tr v-for="service in busArrival.Services" :key="service.ServiceNo">
          <th scope="row">{{ service.ServiceNo }}</th>
          <td :class="getLoadColour(service.NextBus)">
            {{ calculateArrivalTime(service.NextBus) }}
          </td>
          <td :class="getLoadColour(service.NextBus2)">
            {{ calculateArrivalTime(service.NextBus2) }}
          </td>
          <td :class="getLoadColour(service.NextBus2)">
            {{ calculateArrivalTime(service.NextBus3) }}
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td v-for="ind in 4" :key="ind">NA</td>
        </tr>
      </tbody>
      <caption>
        <ul class="small">
          <li><label>Seats Available</label></li>
          <li><label class="bg-info">Standing Available</label></li>
          <li><label class="bg-warning">Limited Standing</label></li>
        </ul>
      </caption>
    </table>

    <div class="btn-group mt-3">
      <button v-if="!loadingNote" @click="refresh" class="btn btn-primary">
        Refresh
      </button>
      <button
        v-if="!loadingNote && !bookmark"
        @click="addBookmark"
        class="btn btn-primary"
      >
        BookmarkBusStop
      </button>
      <button class="btn btn-primary" @click="this.$router.go(-1)">Back</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { get, add } from "../common/busBookmarks.js";

export default {
  name: "BusArrivalTime",
  data() {
    return {
      inputCode: null,
      busArrival: null,
      busStop: null,
      loading: null,
      loadingNote: null,
      bookmark: null,
    };
  },
  created() {
    const route = useRoute();
    this.inputCode = route.params.inputCode;
    this.refresh();
  },
  mounted() {
    document.title = "Bus Arrival";
  },
  methods: {
    refresh() {
      this.loading = true;
      this.loadingNote = "";
      axios
        .get("/api/lta/bus/busArrival/" + this.inputCode)
        .then((resp) => {
          this.busStop = resp.data.busStop;
          this.busArrival = resp.data.busArrival;

          this.bookmark = get(this.inputCode);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            this.loadingNote = err.response.data.message;
            return;
          }
          this.loadingNote = err;
        })
        .then(() => {
          this.loading = false;
        });
    },
    getLoadColour(bus) {
      if (!bus || bus.Load == "SEA") {
        return;
      } else if (bus.Load == "SDA") {
        return "bg-info";
      } else if (bus.Load == "LSD") {
        return "bg-warning";
      }
      return;
    },
    calculateArrivalTime(bus) {
      if (!bus || !bus.EstimatedArrival) {
        return "NA";
      }

      const date = new Date(bus.EstimatedArrival);
      if (date.valueOf() - Date.now() < 0) {
        return "Arrived";
      }
      const diffMinutes = (date.valueOf() - Date.now()) / 1000 / 60;
      if (diffMinutes < 1) {
        return "1 min";
      } else {
        return diffMinutes.toFixed(0) + " mins";
      }
    },
    addBookmark() {
      // console.log("to add", this.busStop);
      if (add(this.busStop)) {
        this.bookmark = get(this.inputCode);
        // console.log("this.bookmark after add", this.bookmark);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
