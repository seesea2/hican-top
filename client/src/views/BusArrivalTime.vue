<script setup lang="ts">
import axios from "axios";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";

import { get, add, BusStop } from "../common/busBookmarks.js";

class BusArrival {
  "odata.metadata": string = '';
  BusStopCode: string = '';
  Services: Service[] = [];
}

interface Service {
  ServiceNo: string;
  Operator: string;
  NextBus: NextBusData;
  NextBus2: NextBusData;
  NextBus3: NextBusData;
}

interface NextBusData {
  // OriginCode: string;
  // DestinationCode: string;
  EstimatedArrival: string;
  // Latitude: string;
  // Longitude: string;
  // VisitNumber: string;
  Load: string;
  // Feature: FeatureType;
  // Type: VehicleType;
}

document.title = "Bus Arrival";

let data = ref({
  inputCode: '',
  // busArrival: null,
  // busStop: null,
  loading: false,
  loadingNote: '',
  // bookmark: null,
});

let busArrival: Ref<BusArrival> = ref(new BusArrival);
let busStop: Ref<BusStop> = ref(new BusStop);
let bookmark: Ref<BusStop> = ref(new BusStop)

const route = useRoute();
if (typeof route.params.inputCode == 'string') {
  data.value.inputCode = route.params.inputCode;
}
refresh();

function refresh() {
  data.value.loading = true;
  data.value.loadingNote = "";
  axios
    .get("/api/lta/bus/busArrival/" + data.value.inputCode)
    .then((resp) => {
      busStop.value = resp.data.busStop;
      busArrival.value = resp.data.busArrival;

      bookmark.value = get(data.value.inputCode);
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        data.value.loadingNote = err.response.data.message;
        return;
      }
      data.value.loadingNote = err;
    })
    .finally(() => {
      data.value.loading = false;
    });
}

function getLoadColour(bus: NextBusData) {
  if (!bus || bus.Load == "SEA") {
    return;
  } else if (bus.Load == "SDA") {
    return "bg-info";
  } else if (bus.Load == "LSD") {
    return "bg-warning";
  }
  return;
}
function calculateArrivalTime(bus: NextBusData) {
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
  if (add(busStop.value)) {
    bookmark.value = get(data.value.inputCode);
    // console.log("this.bookmark after add", this.bookmark);
  }
}
</script>


<template>
  <div class="container text-center py-3">
    <div>
      <h3 v-if="busStop">{{ busStop.Description }}</h3>
      <h5>Bus Stop: {{ data.inputCode }}</h5>

      <div v-if="data.loading" class="my-3">
        <div class="spinner-border" style="width: 10rem; height: 10rem" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="data.loadingNote">{{ data.loadingNote }}</div>
    </div>

    <table v-if="busArrival.BusStopCode" class="table mt-3">
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
      <button v-if="!data.loadingNote" @click="refresh()" class="btn btn-primary">
        Refresh
      </button>
      <button v-if="!data.loadingNote && !bookmark" @click="addBookmark()" class="btn btn-primary">
        BookmarkBusStop
      </button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back</button>
    </div>
  </div>
</template>

