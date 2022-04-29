<template>
  <div class="container text-center py-3">
    <div>
      <h3 v-if="data.busStop">{{ data.busStop.Description }}</h3>
      <h5>Bus Stop: {{ data.inputCode }}</h5>

      <div v-if="data.loading" class="my-3">
        <div class="spinner-border" style="width: 10rem; height: 10rem" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else-if="data.loadingNote">{{ data.loadingNote }}</div>
    </div>

    <table v-if="data.busArrival" class="table mt-3">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">1st Bus</th>
          <th scope="col">2nd Bus</th>
          <th scope="col">3rd Bus</th>
        </tr>
      </thead>
      <tbody v-if="data.busArrival.Services.length">
        <tr v-for="service in data.busArrival.Services" :key="service.ServiceNo">
          <th scope="row">{{ service.ServiceNo }}</th>
          <td :class="getLoadColour(service.NextBus)">{{ calculateArrivalTime(service.NextBus) }}</td>
          <td :class="getLoadColour(service.NextBus2)">{{ calculateArrivalTime(service.NextBus2) }}</td>
          <td :class="getLoadColour(service.NextBus2)">{{ calculateArrivalTime(service.NextBus3) }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td v-for="ind in 4" :key="ind">NA</td>
        </tr>
      </tbody>
      <caption>
        <ul class="small">
          <li>
            <label>Seats Available</label>
          </li>
          <li>
            <label class="bg-info">Standing Available</label>
          </li>
          <li>
            <label class="bg-warning">Limited Standing</label>
          </li>
        </ul>
      </caption>
    </table>

    <div class="btn-group mt-3">
      <button v-if="!data.loadingNote" @click="refresh" class="btn btn-primary">Refresh</button>
      <button v-if="!data.loadingNote && !data.bookmark" @click="addBookmark"
        class="btn btn-primary">BookmarkBusStop</button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";

import { get, add } from "../common/busBookmarks.js";

document.title = "Bus Arrival";
let data = reactive({
  inputCode: null,
  busArrival: null,
  busStop: null,
  loading: null,
  loadingNote: null,
  bookmark: null,
});

onBeforeMount(() => {
  const route = useRoute();
  data.inputCode = route.params.inputCode;
  refresh();
})

function refresh() {
  data.loading = true;
  data.loadingNote = "";
  axios
    .get("/api/lta/bus/busArrival/" + data.inputCode)
    .then((resp) => {
      data.busStop = resp.data.busStop;
      data.busArrival = resp.data.busArrival;

      data.bookmark = get(data.inputCode);
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        data.loadingNote = err.response.data.message;
        return;
      }
      data.loadingNote = err;
    })
    .then(() => {
      data.loading = false;
    });
}

function getLoadColour(bus) {
  if (!bus || bus.Load == "SEA") {
    return;
  } else if (bus.Load == "SDA") {
    return "bg-info";
  } else if (bus.Load == "LSD") {
    return "bg-warning";
  }
  return;
}
function calculateArrivalTime(bus) {
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
}
function addBookmark() {
  // console.log("to add", this.busStop);
  if (add(data.busStop)) {
    data.bookmark = get(data.inputCode);
    // console.log("this.bookmark after add", this.bookmark);
  }
}
</script>
