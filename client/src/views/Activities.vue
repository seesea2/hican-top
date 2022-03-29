<template>
  <div>
    <MsiNavbarVue></MsiNavbarVue>

    <div class="container">
      <h4 class="my-4">Ordered by StartDatetime Decreasing</h4>
      <div v-if="activities.length" class="row">
        <div
          v-for="activity in activities"
          class="col-sm-12 col-md-3 my-1"
          :key="activity.id"
        >
          <div
            class="card"
            role="button"
            @click="ViewDetails(activity, 'activityDetailsModal')"
          >
            <div class="card-header">
              {{ activity.title }}
            </div>
            <div class="card-body">
              <!-- <div class="card-title fw-bold">{{ activity.title }}</div> -->
              <div class="card-text small">
                <b>Start:</b>
                {{ new Date(activity.startDatetime).toLocaleString() }}
              </div>
              <div class="card-text small">
                <b>End:</b>
                {{ new Date(activity.endDatetime).toLocaleString() }}
              </div>
              <div class="card-text small">
                <b>Affected Systems:</b> {{ activity.affectedSystems }}
              </div>
              <div class="card-text small">
                <b>Contact Persons:</b> {{ activity.contactPersons }}
              </div>
            </div>
            <!-- <button
              class="btn btn-secondary btn-small"
              @click="Delete(activity.id)"
            >
              Delete
            </button> -->
          </div>
        </div>
      </div>

      <!-- Modal to Add/Edit Activity Details -->

      <hr class="border-1 my-3" />
      <div class="text-center">
        <button
          class="btn btn-primary"
          @click="initData() || toggleModal('editActivityModalToggle')"
        >
          Add
        </button>
      </div>
    </div>

    <ActivityDetailsComp :curActivity="curActivity"></ActivityDetailsComp>
    <!-- <ActivityEditComp :propsActivity="curActivity"></ActivityEditComp> -->
  </div>
</template>

<script>
import axios from "axios";
import MsiNavbarVue from "../components/MsiNavbar.vue";
import ActivityDetailsComp from "../components/ActivityDetails.vue";

import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";

function dateToLocaleStr(date) {
  return new Date(date.toISOString().split("Z")[0] + "-08:00").toISOString();
}

export default {
  name: "ActivitiesVue",
  components: { MsiNavbarVue, ActivityDetailsComp },
  data() {
    return {
      activities: [],
      curActivity: {
        title: new String(),
        affectedSystems: new String(),
        impact: new String(),
        noImpact: new String(),
        remarks: new String(),
        contactPersons: new String(),
      },
      startDateStr: dateToLocaleStr(new Date()).split("T")[0],
      startHour: "00",
      startMinute: "00",
      endHour: "00",
      endMinute: "00",
      endDateStr: dateToLocaleStr(new Date()).split("T")[0],
      hours: [],
      minutes: [],
      submitMsg: "",
    };
  },
  created() {
    if (!loginId()) {
      router.push("/login");
    }
  },
  mounted() {
    document.title = "Activities";
    this.Refresh();

    for (let i = 0; i < 24; ++i) {
      if (i < 10) {
        this.hours.push("0" + i);
      } else {
        this.hours.push(i.toString());
      }
    }
    this.minutes.push("00");
    this.minutes.push("15");
    this.minutes.push("30");
    this.minutes.push("45");
  },
  methods: {
    dateToLocaleStr(date) {
      return dateToLocaleStr(date);
    },
    initData() {
      console.log("initData()");
      this.curActivity = {
        title: "",
        affectedSystems: "",
        impact: "",
        noImpact: "",
        remarks: "",
        contactPersons: "",
      };
      this.startDateStr = dateToLocaleStr(new Date()).split("T")[0];
      this.startHour = "00";
      this.startMinute = "00";
      this.endDateStr = dateToLocaleStr(new Date()).split("T")[0];
      this.endHour = "00";
      this.endMinute = "00";
    },
    Refresh() {
      axios
        .get("/api/msi/activities")
        .then((resp) => {
          this.activities = resp.data;
          this.activities.sort(function (a, b) {
            return new Date(b.startDatetime) - new Date(a.startDatetime);
          });
        })
        .catch((err) => {
          console.log(err);
          this.activities = [];
        });
    },

    Delete(id) {
      console.log("delete act:", id);
      if (!id) {
        return;
      }

      this.activities = this.activities.filter((item) => item.id != id);
      axios.delete("/api/msi/activities/" + id).catch((err) => {
        console.log(err);
      });
    },
    ViewDetails(activity, modal) {
      this.startDateStr = dateToLocaleStr(
        new Date(activity.startDatetime)
      ).split("T")[0];
      this.startHour = new Date(activity.startDatetime)
        .getHours()
        .toString()
        .padStart(2, "0");
      this.startMinute = new Date(activity.startDatetime)
        .getMinutes()
        .toString()
        .padStart(2, "0");

      this.endDateStr = dateToLocaleStr(new Date(activity.endDatetime)).split(
        "T"
      )[0];
      this.endHour = new Date(activity.endDatetime)
        .getHours()
        .toString()
        .padStart(2, "0");
      this.endMinute = new Date(activity.endDatetime)
        .getMinutes()
        .toString()
        .padStart(2, "0");
      console.log(
        "handleEventClick:",
        this.startDateStr,
        this.startHour,
        this.startMinute
      );

      for (let key in activity) {
        this.curActivity[key] = activity[key];
      }

      this.toggleModal(modal);
      return true;
    },
    toggleModal(id) {
      return toggleModal(id);
    },
  },
};
</script>
