<template>
  <MsiNavbarVue></MsiNavbarVue>

  <div class="container">
    <h4 class="my-4">Ordered by StartDatetime Decreasing</h4>
    <div v-if="data.activities.length" class="row">
      <div v-for="activity in data.activities" class="col-sm-12 col-md-3 my-1" :key="activity.id">
        <div class="card" role="button" @click="ViewDetails(activity, 'activityDetailsModal')">
          <div class="card-header">{{ activity.title }}</div>
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
              <b>Affected Systems:</b>
              {{ activity.affectedSystems }}
            </div>
            <div class="card-text small">
              <b>Contact Persons:</b>
              {{ activity.contactPersons }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-1 my-3" />
    <div class="text-center">
      <button
        class="btn btn-primary"
        @click="initData() || toggleModal('editActivityModalToggle')"
      >Add</button>
    </div>
  </div>

  <ActivityDetailsComp :curActivity="data.curActivity"></ActivityDetailsComp>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, onMounted } from 'vue'

import MsiNavbarVue from "../components/MsiNavbar.vue";
import ActivityDetailsComp from "../components/ActivityDetails.vue";

import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";
import { reactive } from "vue";

document.title = "Activities";

function dateToLocaleStr(date) {
  return new Date(date.toISOString().split("Z")[0] + "-08:00").toISOString();
}

let data = reactive({
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
});

onBeforeMount(() => {
  if (!loginId()) {
    router.push("/login");
  }
})

onMounted(() => {
  Refresh();

  for (let i = 0; i < 24; ++i) {
    if (i < 10) {
      data.hours.push("0" + i);
    } else {
      data.hours.push(i.toString());
    }
  }
  data.minutes.push("00");
  data.minutes.push("15");
  data.minutes.push("30");
  data.minutes.push("45");
})


function initData() {
  console.log("initData()");
  data.curActivity = {
    title: "",
    affectedSystems: "",
    impact: "",
    noImpact: "",
    remarks: "",
    contactPersons: "",
  };
  data.startDateStr = dateToLocaleStr(new Date()).split("T")[0];
  data.startHour = "00";
  data.startMinute = "00";
  data.endDateStr = dateToLocaleStr(new Date()).split("T")[0];
  data.endHour = "00";
  data.endMinute = "00";
}
function Refresh() {
  axios
    .get("/api/msi/activities")
    .then((resp) => {
      data.activities = resp.data;
      data.activities.sort(function (a, b) {
        return new Date(b.startDatetime) - new Date(a.startDatetime);
      });
    })
    .catch((err) => {
      console.log(err);
      data.activities = [];
    });
}

// function Delete(id) {
//   console.log("delete act:", id);
//   if (!id) {
//     return;
//   }

//   data.activities = data.activities.filter((item) => item.id != id);
//   axios.delete("/api/msi/activities/" + id).catch((err) => {
//     console.log(err);
//   });
// }

function ViewDetails(activity, modal) {
  data.startDateStr = dateToLocaleStr(
    new Date(activity.startDatetime)
  ).split("T")[0];
  data.startHour = new Date(activity.startDatetime)
    .getHours()
    .toString()
    .padStart(2, "0");
  data.startMinute = new Date(activity.startDatetime)
    .getMinutes()
    .toString()
    .padStart(2, "0");

  data.endDateStr = dateToLocaleStr(new Date(activity.endDatetime)).split(
    "T"
  )[0];
  data.endHour = new Date(activity.endDatetime)
    .getHours()
    .toString()
    .padStart(2, "0");
  data.endMinute = new Date(activity.endDatetime)
    .getMinutes()
    .toString()
    .padStart(2, "0");
  console.log(
    "handleEventClick:",
    data.startDateStr,
    data.startHour,
    data.startMinute
  );

  for (let key in activity) {
    data.curActivity[key] = activity[key];
  }

  toggleModal(modal);
  return true;
}
</script>
