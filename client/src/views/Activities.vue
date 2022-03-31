<template>
  <msi-navbar></msi-navbar>

  <div class="container">
    <h4 class="my-4">Ordered by StartDatetime Decreasing</h4>
    <div v-if="data.activities.length" class="row">
      <div v-for="activity in data.activities" class="col-sm-12 col-md-3 my-1" :key="activity.id">
        <div class="card" role="button" @click="viewActivity(activity)">
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
import { reactive, onBeforeMount } from 'vue'

import msiNavbar from "../components/MsiNavbar.vue";
import activityDetails from "../components/ActivityDetails.vue";

import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";

document.title = "Activities";

let data = reactive({
  activities: [],
  curActivity: {},
});

onBeforeMount(() => {
  if (!loginId()) {
    router.push("/login");
  }
  Refresh();
})

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

function addActivity() {
  data.curActivity = {};
  toggleModal('editActivityModalToggle')
}

function viewActivity(activity) {
  data.curActivity = activity
  toggleModal('activityDetailsModal');
}
</script>
