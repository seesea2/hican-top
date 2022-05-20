<template>
  <NavbarVue></NavbarVue>

  <div class="container py-3">
    <div class="text-center">
      <h2>Bus Arrival Time</h2>
      <h6>Get bus arrival time by bus stop code.</h6>
      <div class="row justify-content-center mx-0 mt-4">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="input-group">
            <input
              v-model.trim="data.inputCode"
              placeholder="Bus stop code"
              class="form-control"
              v-on:keyup.enter="getBusArrival()"
            />
            <div class="input-group-append">
              <button class="btn btn-primary" @click="getBusArrival()">
                Get
              </button>
            </div>
          </div>
          <div v-if="data.inputNote">{{ data.inputNote }}</div>
        </div>
      </div>

      <div
        v-if="data.bookmarkBusStops && data.bookmarkBusStops.length"
        class="mt-4"
      >
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
            <tr
              v-for="bookmark in data.bookmarkBusStops"
              :key="bookmark.BusStopCode"
            >
              <td>
                <a @click="getBusArrival(bookmark.BusStopCode)" class="btn">{{
                  bookmark.BusStopCode
                }}</a>
              </td>
              <td>
                <a @click="getBusArrival(bookmark.BusStopCode)" class="btn"
                  >{{ bookmark.Description }}@{{ bookmark.RoadName }}</a
                >
              </td>
              <td>
                <a @click="removeBookmark(bookmark.BusStopCode)" class="btn"
                  >X</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <button @click="toggleNearbyBusStops" class="btn btn-primary">
          Toggle Nearby Bus Stops
          <span
            v-if="data.lodingNearbyBusStops"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
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
          <tr
            v-for="nearbyBusStop in data.nearbyBusStops"
            :key="nearbyBusStop.busStop.BusStopCode"
          >
            <td>
              <a
                @click="getBusArrival(nearbyBusStop.busStop.BusStopCode)"
                class="btn"
                >{{ nearbyBusStop.busStop.BusStopCode }}</a
              >
            </td>
            <td>
              <a
                @click="getBusArrival(nearbyBusStop.busStop.BusStopCode)"
                class="btn"
              >
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

<script setup>
import axios from "axios";
import { onBeforeMount } from "vue";

import NavbarVue from "../components/Navbar.vue";
import { getAll, remove } from "../common/busBookmarks";
import router from "../router";
import { reactive } from "vue";

document.title = "Bus Arrival";

let data = reactive({
  inputCode: null,
  inputNote: null,
  lodingNearbyBusStops: false,
  showNearbyBusStops: false,
  nearbyBusStops: null,
  getNearbyNote: null,
  watchId: null,
  bookmarkBusStops: null,
});

onBeforeMount(() => {
  refreshBookmarks();
});

function getBusArrival(inputCode) {
  if (inputCode) {
    data.inputCode = inputCode;
  }
  if (!data.inputCode || !data.inputCode.trim()) {
    data.inputNote = "Please input bus stop code.";
    return;
  }

  data.inputNote = null;
  router.push({
    name: "BusArrivalTime",
    params: { inputCode: data.inputCode.trim() },
  });
}

function refreshBookmarks() {
  data.bookmarkBusStops = getAll();
}

function removeBookmark(busStopCode) {
  if (remove(busStopCode)) {
    data.refreshBookmarks();
  }
}

function toggleNearbyBusStops() {
  if (data.showNearbyBusStops) {
    data.showNearbyBusStops = false;
    if (data.watchId) {
      navigator.geolocation.clearWatch(data.watchId);
      data.watchId = null;
    }
    return;
  }

  data.lodingNearbyBusStops = true;
  if (navigator && navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(
    data.watchId = navigator.geolocation.watchPosition(
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
              data.nearbyBusStops = resp.data;
              data.showNearbyBusStops = true;
            })
            .catch((err) => {
              console.log(err);
            })
            .then((data.lodingNearbyBusStops = false));
        }
      },
      (error) => {
        data.lodingNearbyBusStops = false;
        data.showNearbyBusStops = false;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            data.getNearbyNote = "Request for Geolocation is denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            data.getNearbyNote = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            data.getNearbyNote = "Request to get location timed out.";
            break;
          default:
            // case error.UNKNOWN_ERROR:
            data.getNearbyNote = "An unknown error occurred.";
            break;
        }
      }
    );
  }
}
</script>
