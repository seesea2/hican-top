<script setup lang="ts">
import axios from "axios";

import NavbarVue from "../components/Navbar.vue";
import { BusStop, getAll, remove } from "../common/busBookmarks";
import router from "../router";
import { ref, type Ref } from "vue";

document.title = "Bus Arrival";

interface NearbyBusStop { dist: number; busStop: BusStop }

let data = ref({
  inputCode: '',
  inputNote: '',
  loadingNearbyBusStops: false,
  showNearbyBusStops: false,
  // nearbyBusStops: null,
  getNearbyNote: '',
  watchId: 0,
  // bookmarkBusStops: [],
});

let nearbyBusStops: Ref<NearbyBusStop[]> = ref([])
let bookmarkBusStops: Ref<BusStop[]> = ref([])

refreshBookmarks();

function getBusArrival(inputCode: string) {
  if (inputCode) {
    data.value.inputCode = inputCode.trim();
  }
  if (!data.value.inputCode) {
    data.value.inputNote = "Please input bus stop code.";
    return;
  }

  data.value.inputNote = '';
  data.value.showNearbyBusStops = false;
  if (data.value.watchId) {
    navigator.geolocation.clearWatch(data.value.watchId);
    data.value.watchId = 0;
  }
  router.push({
    name: "BusArrivalTime",
    params: { inputCode: data.value.inputCode },
  });
}

function refreshBookmarks() {
  bookmarkBusStops.value = getAll();
}

function removeBookmark(busStopCode: string) {
  if (remove(busStopCode)) {
    refreshBookmarks();
  }
}

function toggleNearbyBusStops() {
  if (data.value.showNearbyBusStops) {
    data.value.showNearbyBusStops = false;
    if (data.value.watchId) {
      navigator.geolocation.clearWatch(data.value.watchId);
      data.value.watchId = 0;
    }
    return;
  }

  data.value.loadingNearbyBusStops = true;
  if (navigator && navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(
    data.value.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (pos && pos.coords) {
          // console.log(pos.coords);
          axios
            .get("/api/lta/bus/nearbyBusStops", {
              params: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              },
            })
            .then((resp) => {
              // console.log("resp.data", resp.data);
              nearbyBusStops.value = resp.data;
              data.value.showNearbyBusStops = true;
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              data.value.loadingNearbyBusStops = false
            });
        }
      },
      (error) => {
        data.value.loadingNearbyBusStops = false;
        data.value.showNearbyBusStops = false;
        if (data.value.watchId) {
          navigator.geolocation.clearWatch(data.value.watchId);
          data.value.watchId = 0;
        }

        switch (error.code) {
          case error.PERMISSION_DENIED:
            data.value.getNearbyNote = "Request for Geolocation is denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            data.value.getNearbyNote = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            data.value.getNearbyNote = "Request to get location timed out.";
            break;
          default:
            // case error.UNKNOWN_ERROR:
            data.value.getNearbyNote = "An unknown error occurred.";
            break;
        }
      }
    );
  }
}
</script>


<template>
  <NavbarVue></NavbarVue>

  <div class="container py-3">
    <div class="text-center">
      <h2>Bus Arrival Time</h2>
      <h6>Get bus arrival time by bus stop code.</h6>
      <div class="row justify-content-center mx-0 mt-4">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="input-group">
            <input v-model.trim="data.inputCode" placeholder="Bus stop code" class="form-control"
              v-on:keyup.enter="getBusArrival(data.inputCode)" />
            <div class="input-group-append">
              <button class="btn btn-primary" @click="getBusArrival(data.inputCode)">
                Get
              </button>
            </div>
          </div>
          <div v-if="data.inputNote">{{ data.inputNote }}</div>
        </div>
      </div>

      <div v-if="bookmarkBusStops && bookmarkBusStops.length" class="mt-4">
        <h3>Bus Stop Bookmark</h3>
        <table class="table table-sm mt-2">
          <thead class="thead-dark">
            <tr>
              <th scope="col">BusStop</th>
              <th scope="col">Name</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bookmark in bookmarkBusStops" :key="bookmark.BusStopCode">
              <td>
                <a @click="getBusArrival(bookmark.BusStopCode)" class="btn">{{
                  bookmark.BusStopCode
                }}</a>
              </td>
              <td>
                <a @click="getBusArrival(bookmark.BusStopCode)" class="btn">{{ bookmark.Description }}@{{
                  bookmark.RoadName
                }}</a>
              </td>
              <td>
                <a @click="removeBookmark(bookmark.BusStopCode)" class="btn">X</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <button @click="toggleNearbyBusStops()" class="btn btn-primary">
          Toggle Nearby Bus Stops
          <span v-if="data.loadingNearbyBusStops" class="spinner-border spinner-border-sm" role="status"
            aria-hidden="true">
            <span class="visually-hidden">Loading...</span>
          </span>
        </button>
        <div>{{ data.getNearbyNote }}</div>
      </div>
      <table v-if="data.showNearbyBusStops" class="table table-sm mt-2">
        <thead class="thead-dark">
          <tr>
            <th scope="col">BusStop</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nearbyBusStop in nearbyBusStops" :key="nearbyBusStop.busStop.BusStopCode">
            <td>
              <a @click="getBusArrival(nearbyBusStop.busStop.BusStopCode)" class="btn">{{
                nearbyBusStop.busStop.BusStopCode
              }}</a>
            </td>
            <td>
              <a @click="getBusArrival(nearbyBusStop.busStop.BusStopCode)" class="btn">
                {{ nearbyBusStop.busStop.Description }}@{{
                  nearbyBusStop.busStop.RoadName
                }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

