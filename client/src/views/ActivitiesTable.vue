<template>
  <msi-navbar></msi-navbar>

  <div class="container">
    <h4 class="my-4">Ordered by StartDatetime Decreasing</h4>

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
        <tr
          v-for="(activity, ind) in data.activities"
          class="small"
          :key="activity.id"
          @click="viewActivity(activity)"
        >
          <td>{{ ind + 1 }}</td>
          <td>{{ activity.title }}</td>
          <td>{{ new Date(activity.startDatetime).toLocaleString() }}</td>
          <td>{{ new Date(activity.endDatetime).toLocaleString() }}</td>
          <td v-html="activity.affectedSystems"></td>
        </tr>
      </tbody>
    </table>

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
  curActivity: {}
});

onBeforeMount(() => {
  if (!loginId()) {
    router.push("/login");
    return
  }
  Refresh();
})

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

function catchDelete(id) {
  // console.log('catchDelete', id)
  data.activities = data.activities.filter(item => item.id != id)
}

function catchEdit(newAct) {
  if (data.curActivity.id) {
    for (let i = 0; i < data.activities.length; ++i) {
      if (data.activities[i].id == newAct.id) {
        data.activities[i] = newAct
      }
    }
  }
  else {
    data.activities.push(newAct)
    data.activities.sort(function (a, b) {
      return new Date(b.startDatetime) - new Date(a.startDatetime);
    });
  }
}

function addActivity() {
  data.curActivity = {};
  toggleModal('editActivityModalToggle')
}

function viewActivity(activity) {
  data.curActivity = activity
  toggleModal('activityDetailsModal');
}

</script>
