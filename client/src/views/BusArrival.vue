<template>
  <div>
    <NavbarVue></NavbarVue>

    <div class="container py-3">
      <div class="text-center">
        <h2>Bus Arrival Time</h2>
        <h6>Get bus arrival time by bus stop code.</h6>
        <div class="row justify-content-center mx-0 mt-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="input-group">
              <input
                v-model.trim="inputCode"
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
            <div v-if="inputNote">
              {{ inputNote }}
            </div>
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
              <tr
                v-for="bookmark in bookmarkBusStops"
                :key="bookmark.BusStopCode"
              >
                <td>
                  <a @click="getBusArrival(bookmark.BusStopCode)" class="btn">
                    {{ bookmark.BusStopCode }}
                  </a>
                </td>
                <td>
                  <a @click="getBusArrival(bookmark.BusStopCode)" class="btn">
                    {{ bookmark.Description }}@{{ bookmark.RoadName }}
                  </a>
                </td>
                <td>
                  <a @click="removeBookmark(bookmark.BusStopCode)" class="btn">
                    X
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4">
          <button @click="toggleNearbyBusStops" class="btn btn-primary">
            Toggle Nearby Bus Stops
            <span
              v-if="lodingNearbyBusStops"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
          <div>{{ getNearbyNote }}</div>
        </div>
        <table v-if="showNearbyBusStops" class="table table-sm mt-2">
          <thead class="thead-dark">
            <tr>
              <th scope="col">BusStop</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="nearbyBusStop in nearbyBusStops"
              :key="nearbyBusStop.busStop.BusStopCode"
            >
              <td>
                <a
                  @click="getBusArrival(nearbyBusStop.busStop.BusStopCode)"
                  class="btn"
                >
                  {{ nearbyBusStop.busStop.BusStopCode }}
                </a>
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
  </div>
</template>

<script>
import axios from "axios";
import { getAll, remove } from "../common/busBookmarks";
import NavbarVue from "../components/Navbar.vue";
import router from "../router";

export default {
  name: "BusArrival",
  components: { NavbarVue },
  data() {
    return {
      inputCode: null,
      inputNote: null,
      lodingNearbyBusStops: false,
      showNearbyBusStops: false,
      nearbyBusStops: null,
      getNearbyNote: null,
      watchId: null,
      bookmarkBusStops: null,
    };
  },
  created() {
    this.refreshBookmarks();
  },
  mounted() {
    document.title = "Bus Arrival";
  },
  methods: {
    getBusArrival(inputCode) {
      if (inputCode) {
        this.inputCode = inputCode;
      }
      // console.log("inputCode:", this.inputCode);
      if (!this.inputCode || !this.inputCode.trim()) {
        this.inputNote = "Please input bus stop code.";
        return;
      }

      this.inputNote = null;
      router.push({
        name: "BusArrivalTime",
        params: { inputCode: this.inputCode.trim() },
      });
    },
    refreshBookmarks() {
      this.bookmarkBusStops = getAll();
    },
    removeBookmark(busStopCode) {
      if (remove(busStopCode)) {
        this.refreshBookmarks();
      }
    },
    toggleNearbyBusStops() {
      if (this.showNearbyBusStops) {
        this.showNearbyBusStops = false;
        if (this.watchId) {
          navigator.geolocation.clearWatch(this.watchId);
          this.watchId = null;
        }
        return;
      }

      this.lodingNearbyBusStops = true;
      if (navigator && navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(
        this.watchId = navigator.geolocation.watchPosition(
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
                  this.nearbyBusStops = resp.data;
                  this.showNearbyBusStops = true;
                })
                .catch((err) => {
                  console.log(err);
                })
                .then((this.lodingNearbyBusStops = false));
            }
          },
          (error) => {
            this.lodingNearbyBusStops = false;
            this.showNearbyBusStops = false;

            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.getNearbyNote = "Request for Geolocation is denied.";
                break;
              case error.POSITION_UNAVAILABLE:
                this.getNearbyNote = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                this.getNearbyNote = "Request to get location timed out.";
                break;
              default:
                // case error.UNKNOWN_ERROR:
                this.getNearbyNote = "An unknown error occurred.";
                break;
            }
          }
        );
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
