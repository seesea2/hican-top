<template>
  <div
    class="modal fade"
    id="activityDetailsModal"
    aria-hidden="true"
    aria-labelledby="activityDetailsModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div v-if="props.activity.id" class="modal-content">
        <div class="modal-header bg-myblue">
          <h5
            class="modal-title text-white"
            id="activityDetailsModalLabel"
          >{{ props.activity.title }}</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            @click="toggleModal()"
          ></button>
        </div>
        <div class="modal-body" v-if="props.activity">
          <div class="card-text small">
            <b>Start:</b>
            {{ new Date(props.activity.startDatetime).toLocaleString() }}
          </div>
          <div class="card-text small">
            <b>End:</b>
            {{ new Date(props.activity.endDatetime).toLocaleString() }}
          </div>
          <div class="card-text mt-1 small">
            <b>Affected Systems:</b>
            {{ props.activity.affectedSystems }}
          </div>
          <hr />
          <div class="card-text mt-1 small">
            <b>Impact:</b>
            <div
              v-if="props.activity.impact"
              v-html="
                props.activity.impact
                  .replace(/\r\n/g, '<br>')
                  .replace(/\n/g, '<br>')
              "
              class="mx-3"
            ></div>
          </div>
          <div class="card-text mt-1 small">
            <b>NoImpact:</b>
            <div
              v-if="props.activity.noImpact"
              v-html="
                props.activity.noImpact
                  .replace(/\r\n/g, '<br>')
                  .replace(/\n/g, '<br>')
              "
              class="mx-3"
            ></div>
          </div>
          <hr />
          <div class="card-text mt-1 small">
            <b>Remarks:</b>
            <div
              v-if="props.activity.remarks"
              v-html="
                props.activity.remarks
                  .replace(/\r\n/g, '<br>')
                  .replace(/\n/g, '<br>')
              "
              class="mx-3"
            ></div>
          </div>
          <div class="card-text mt-1 small">
            <b>Contact Persons:</b>
            <span v-html="props.activity.contactPersons"></span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" @click="deleteActivity()">Delete</button>
          <button class="btn btn-primary btn-sm ms-2" @click="editActivity()">Edit</button>
        </div>
      </div>
    </div>
  </div>

  <activity-edit :activity="data.curActivity" @edit="newAct => catchEdit(newAct)"></activity-edit>
</template>


<script setup>
import axios from "axios";
// import { loginId } from "../common/msiLogin";
// import router from "../router";
import { defineProps, defineEmits, reactive } from 'vue'

import ActivityEdit from "./ActivityEdit.vue";
import toggleModal from "../common/modal";

let props = defineProps(["activity"])
// console.log('in view details:', props.activity)
let emit = defineEmits(['delete', 'edit'])
let data = reactive({ curActivity: {} })


function editActivity() {
  for (let key in props.activity) {
    data.curActivity[key] = props.activity[key];
  }
  // console.log('editActivity()', data.curActivity)
  toggleModal('editActivityModalToggle')
}

function catchEdit(newAct) {
  emit('edit', newAct)
}

function deleteActivity() {
  let rslt = confirm('Sure to delete the record?')
  if (!rslt) {
    return
  }

  axios.delete("/api/msi/activities/" + props.activity.id).then(() => {
    toggleModal();
    emit('delete', props.activity.id)
  }).catch((err) => {
    console.log(err);
  });
}
</script>
