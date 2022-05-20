<template>
  <msi-navbar></msi-navbar>

  <div class="container">
    <h4 class="my-4">Activity Templates</h4>

    <div class="mt-3">
      <div>
        <div>
          Group1:
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group1" name="Group1" id="Group1_0" value="All">
            <label class="form-check-label" for="Group1_0">All</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group1" name="Group1" id="Group1_1"
              value="Deployment">
            <label class="form-check-label" for="Group1_1">Deployment</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group1" name="Group1" id="Group1_2"
              value="Non-Deployment">
            <label class="form-check-label" for="Group1_2">Non-Deployment</label>
          </div>
        </div>

        <div>
          Group2:
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group2" name="Group2" id="Group2_0" value="All">
            <label class="form-check-label" for="Group2_0">All</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group2" name="Group2" id="Group2_1" value="ABT">
            <label class="form-check-label" for="Group2_1">ABT</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group2" name="Group2" id="Group2_2" value="CBT">
            <label class="form-check-label" for="Group2_2">CBT</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group2" name="Group2" id="Group2_3" value="Bus">
            <label class="form-check-label" for="Group2_3">Bus</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" v-model="data.group2" name="Group2" id="Group2_4" value="Rail">
            <label class="form-check-label" for="Group2_4">Rail</label>
          </div>
        </div>
      </div>
    </div>

    <div v-if="data.activities.length" class="row">
      <div v-for="activity in data.activities" class="col-sm-12 col-md-3 my-1" :key="activity.id">
        <div
          v-if="(data.group1 == 'All' || data.group1 == activity['Group1']) && (data.group2 == 'All' || data.group2 == activity['Group2'])"
          class="card" role="button" @click="viewActivity(activity)">
          <div class="card-header">{{ activity.title }}</div>
          <div class="card-body">
            <!-- <div class="card-title fw-bold">{{ activity.title }}</div> -->
            <!-- <div class="card-text small">
              <b>Start:</b>
              {{ new Date(activity.startDatetime).toLocaleString() }}
            </div>
            <div class="card-text small">
              <b>End:</b>
              {{ new Date(activity.endDatetime).toLocaleString() }}
            </div> -->
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
      <button class="btn btn-primary" @click="addActivity()">Create Template</button>
    </div>
  </div>

  <activity-details :activity="data.curActivity" @delete="(id) => catchDelete(id)"
    @edit="(newAct) => catchEdit(newAct)">
  </activity-details>
</template>

<script setup>
import axios from "axios";
import { reactive, onBeforeMount } from "vue"

import msiNavbar from "../components/MsiNavbar.vue";
import activityDetails from "../components/ActivityDetails.vue";

import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";

document.title = "Activities";

let data = reactive({
  activities: [],
  curActivity: { id: '' },
  group1: 'All',
  group2: 'All',
});

onBeforeMount(() => {
  if (!loginId()) {
    router.push("/login");
    return
  }
  Refresh();
})

function catchDelete(id) {
  // console.log('catchDelete', id)
  data.activities = data.activities.filter(item => item.id != id)
}

function catchEdit(newAct) {
  if (data.curActivity.id) {
    for (let i in data.activities) {
      if (data.activities[i].id == newAct.id) {
        data.activities[i] = newAct
        break;
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
    .get("/api/msi/activities/templates")
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
  data.curActivity['type'] = 'Template'
  console.log('addActivity:', data.curActivity)
  toggleModal('editActivityModalToggle')
}

function viewActivity(activity) {
  for (let key in activity) {
    data.curActivity[key] = activity[key]
  }
  toggleModal('activityDetailsModal');
}

// function templates() {
//   axios
//     .get("/api/msi/activities/templates")
//     .then((resp) => {
//       data.submitMsg = "Got activitieTemplates.";
//       // emit('edit', data.curActivity);
//       console.log("activitieTemplates:", resp.data)
//     })
//     .catch((err) => {
//       data.submitMsg = err;
//       console.log("activitieTemplates err:", err);
//     });
// }

</script>
