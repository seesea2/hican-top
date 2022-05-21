<template>
  <msi-navbar></msi-navbar>

  <div class="container">
    <h4 class="my-4">Ordered by StartDatetime Decreasing</h4>

    Filter:
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        v-model="data.filter"
        id="actFilter_0"
        value="All"
      />
      <label class="form-check-label" for="actFilter_0">All</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        v-model="data.filter"
        id="actFilter_1"
        value="Activity"
      />
      <label class="form-check-label" for="actFilter_1">Activities</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        v-model="data.filter"
        id="actFilter_2"
        value="Issue"
      />
      <label class="form-check-label" for="actFilter_1">Issues</label>
    </div>

    <table class="table caption-top table-striped table-hover">
      <thead class="text-center">
        <tr>
          <th scope="col" style="width: 5%">#</th>
          <th scope="col" style="width: 40%">Title</th>
          <th scope="col" style="width: 20%">Start</th>
          <th scope="col" style="width: 20%">End</th>
          <th scope="col" style="width: 25%">AffectedSystems</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(activity, ind) in data.activities">
          <tr
            v-if="data.filter == 'All' || activity.type == data.filter"
            class="small"
            :key="activity.id"
            @click="viewActivity(activity)"
          >
            <td :class="activity.type == 'Issue' ? 'bg-warning' : 'bg-success'">
              &#9956; {{ ind + 1 }}
            </td>
            <td>{{ activity.title }}</td>
            <td>{{ new Date(activity.startDatetime).toLocaleString() }}</td>
            <td>{{ new Date(activity.endDatetime).toLocaleString() }}</td>
            <td v-html="activity.affectedSystems"></td>
          </tr>
        </template>
      </tbody>
    </table>

    <hr class="border-1 my-3" />
    <div class="text-center">
      <button class="btn btn-primary" @click="addActivity()">Add event</button>
    </div>
  </div>

  <activity-details
    :activity="data.curActivity"
    @delete="(id) => catchDelete(id)"
    @edit="(newAct) => catchEdit(newAct)"
  ></activity-details>
</template>

<script setup>
import axios from "axios";
import { reactive, onBeforeMount } from "vue";

import msiNavbar from "../components/MsiNavbar.vue";
import activityDetails from "../components/ActivityDetails.vue";

import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";

document.title = "Activities Table";

let data = reactive({
  activities: [],
  curActivity: { id: "" },
  filter: "All",
});

onBeforeMount(() => {
  if (!loginId()) {
    router.push("/login");
    return;
  }
  Refresh();
});

function catchDelete(id) {
  // console.log('catchDelete', id)
  data.activities = data.activities.filter((item) => item.id != id);
}

function catchEdit(newAct) {
  // console.log('catchEdit', newAct)
  if (data.curActivity.id) {
    for (let i in data.activities) {
      if (data.activities[i].id == newAct.id) {
        console.log("changed act:", newAct);
        data.activities[i] = newAct;
        break;
      }
    }
  } else {
    console.log("add act:", newAct);
    let newCopy = {};
    for (let key in newAct) {
      newCopy[key] = newAct[key];
    }
    data.activities.push(newCopy);
    data.activities.sort(function (a, b) {
      return new Date(b.startDatetime) - new Date(a.startDatetime);
    });
  }
  console.log("log catchEdit data.activities:", data.activities);
}

function Refresh() {
  axios
    .get("/api/msi/activities")
    .then((resp) => {
      for (let item of resp.data) {
        data.activities.push(item);
      }
      data.activities.sort(function (a, b) {
        return new Date(b.startDatetime) - new Date(a.startDatetime);
      });
    })
    .catch((err) => {
      console.log(err);
      data.activities.length = 0;
    });
}

function addActivity() {
  for (let key in data.curActivity) {
    data.curActivity[key] = null;
  }
  data.curActivity.type = "Activity";
  console.log("actTable -- data.curActivity:", data.curActivity);
  toggleModal("editActivityModal");
}

function viewActivity(activity) {
  for (let key in activity) {
    data.curActivity[key] = activity[key];
  }
  // console.log('in activitytable', data.curActivity)
  toggleModal("activityDetailsModal");
}
</script>
