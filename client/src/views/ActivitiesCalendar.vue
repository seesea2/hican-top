<template>
  <msi-navbar></msi-navbar>

  <div class="container mt-5">
    <FullCalendar id="fullCalendar" :options="data.calendarOptions" />

    <hr class="border-1 my-3" />
    <div class="text-center">
      <button class="btn btn-primary" @click="addActivity()">Add</button>
    </div>
  </div>

  <activity-details
    :activity="data.curActivity"
    @delete="(id) => catchDelete(id)"
    @edit="(newAct) => catchEdit(newAct)"
  ></activity-details>

  <!-- <activity-edit :activity="data.curActivity" @edit="(newAct) => catchEdit(newAct)"></activity-edit> -->
</template>

<script setup>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { onBeforeMount, reactive } from "vue";

import msiNavbar from "../components/MsiNavbar.vue";
import activityDetails from "../components/ActivityDetails.vue";
// import activityEdit from "../components/ActivityEdit.vue";

import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import dateToLocaleStr from "../common/date";
import router from "../router";

document.title = "Activities Calendar";

let data = reactive({
  activities: [],
  curActivity: {},
  calendarOptions: {
    timeZone: "Asia/Singapore",
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: [],
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    dateClick: handleDateClick,
    eventClick: handleEventClick,
    // eventsSet: this.handleEvents,
    // eventColor: 'red',
    // eventBackgroundColor: 'red',
  },
});

onBeforeMount(() => {
  if (!loginId()) {
    router.push("/login");
    return;
  }
  Refresh();
});

function handleEventClick(clickInfo) {
  for (let activity of data.activities) {
    if (clickInfo.event.id == activity.id) {
      for (let key in activity) {
        data.curActivity[key] = activity[key];
      }
      break;
    }
  }
  toggleModal("activityDetailsModal");
}

function handleDateClick(arg) {
  // console.log("in handleDateClick:", arg.date);
  // console.log("in handleDateClick:", arg.date.toISOString());
  // console.log("in handleDateClick:", arg.date.toLocaleString());
  // data.startDateStr = dateToLocaleStr(arg.date).split("T")[0];
  // data.endDateStr = data.startDateStr;

  let actualDate = arg.date.toISOString().split("Z")[0] + "+08:00";

  for (let key in data.curActivity) {
    data.curActivity[key] = null;
  }
  data.curActivity.startDatetime = new Date(actualDate);
  data.curActivity.endDatetime = new Date(actualDate);
  // console.log("in handleDateClick data.curActivity:", data.curActivity);

  toggleModal("editActivityModal");
}

function catchDelete(id) {
  // console.log('catchDelete', id)
  data.activities = data.activities.filter((item) => item.id != id);
  refreshFullCalendar();
}

function refreshFullCalendar() {
  data.calendarOptions.events.length = 0;
  for (let activity of data.activities) {
    // console.log(activity)
    data.calendarOptions.events.push({
      id: activity.id,
      title: activity.title,
      start: dateToLocaleStr(new Date(activity.startDatetime)),
      end: dateToLocaleStr(new Date(activity.endDatetime)),
      color: activity.type == "Issue" ? "red" : "green",
      // backgroundColor: 'red',
      // eventTextColor: 'red',
      // borderColor: 'red',
      // textColor: 'red',
      // color: 'red'
    });
  }

  console.log("refreshFullCalendar, ", data.calendarOptions.events);
}

function catchEdit(newAct) {
  console.log("catchEdit", data.curActivity.id);
  if (data.curActivity.id) {
    for (let i in data.activities) {
      if (data.activities[i].id == newAct.id) {
        data.activities[i] = newAct;
        break;
      }
    }
  } else {
    let newCopy = {};
    for (let key in newAct) {
      newCopy[key] = newAct[key];
    }
    data.activities.push(newCopy);
    // data.activities.push(newAct)
    data.activities.sort(function (a, b) {
      return new Date(b.startDatetime) - new Date(a.startDatetime);
    });
  }
  console.log("catchedit, ", data.activities);
  refreshFullCalendar();
}

function Refresh() {
  axios
    .get("/api/msi/activities")
    .then((resp) => {
      // console.log('resp.data', resp.data)
      for (let item of resp.data) {
        data.activities.push(item);
      }
      // console.log('refresh', data.activities)
      refreshFullCalendar();
    })
    .catch((err) => {
      console.log(err);
      data.activities.length = 0;
      refreshFullCalendar();
    });
}

function addActivity() {
  for (let key in data.curActivity) {
    data.curActivity[key] = null;
  }
  toggleModal("editActivityModal");
}
</script>
