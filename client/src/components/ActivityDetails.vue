<template>
  <div
    class="modal fade"
    id="activityDetailsModal"
    aria-hidden="true"
    aria-labelledby="activityDetailsModalLabel"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div v-if="props.activity.id" class="modal-content">
        <div class="modal-header bg-myblue">
          <h5 class="modal-title text-white" id="activityDetailsModalLabel">
            <span v-if="props.activity.type == 'Activity'">Activity: </span>
            <span v-else-if="props.activity.type == 'Issue'">Issue: </span>
            <span v-else-if="props.activity.type == 'Template'"
              >Template:
            </span>
            {{ props.activity.title }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            @click="toggleModal()"
          ></button>
        </div>
        <div class="modal-body" v-if="props.activity">
          <div v-if="props.activity.type != 'Template'">
            <div class="card-text small">
              <b>Start:</b>
              {{ new Date(props.activity.startDatetime).toLocaleString() }}
            </div>
            <div class="card-text small">
              <b>End:</b>
              {{ new Date(props.activity.endDatetime).toLocaleString() }}
            </div>
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
            <b>Stakeholders:</b>
            <span v-if="props.activity.stakeholders" class="mx-2">{{
              props.activity.stakeholders
            }}</span>
          </div>
          <div class="card-text mt-1 small">
            <b>Implementation Teams:</b>
            <span v-if="props.activity.teams" class="mx-2">{{
              props.activity.teams
            }}</span>
          </div>
          <div class="card-text mt-1 small">
            <b>Contact Persons:</b>
            <span v-if="props.activity.contactPersons" class="mx-2">{{
              props.activity.contactPersons
            }}</span>
          </div>
          <hr />
          <div class="card-text mt-1 small">
            <b>Risk & Mitigation:</b>
            <div
              v-if="props.activity.riskAndMitigation"
              v-html="
                props.activity.riskAndMitigation
                  .replace(/\r\n/g, '<br>')
                  .replace(/\n/g, '<br>')
              "
              class="mx-3"
            ></div>
          </div>
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
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-outline-danger btn-sm"
            @click="deleteActivity()"
          >
            Delete
          </button>
          <button
            v-if="props.activity.type != 'Template'"
            class="btn btn-info btn-sm ms-2"
            @click="emailActivity()"
          >
            Email
          </button>
          <button class="btn btn-primary btn-sm ms-2" @click="editActivity()">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>

  <activity-edit
    :activity="data.curActivity"
    @edit="(newAct) => catchEdit(newAct)"
  ></activity-edit>

  <confirm-modal
    modal="activityDetailsModal"
    @confirm="(val) => catchConfirm(val)"
  ></confirm-modal>
</template>

<script setup>
import axios from "axios";
// import { loginId } from "../common/msiLogin";
// import router from "../router";
import { watch, defineProps, defineEmits, reactive } from "vue";

import ActivityEdit from "./ActivityEdit.vue";
import ConfirmModal from "./ConfirmModal.vue";
import toggleModal from "../common/modal";

let props = defineProps(["activity"]);
// console.log('in view details:', props.activity)
let emit = defineEmits(["delete", "edit"]);
let data = reactive({ curActivity: { id: "" } });

watch(props.activity, () => {
  // console.log('activityDetails', props.activity)
  data.curActivity.id = "";
  for (let key in props.activity) {
    data.curActivity[key] = props.activity[key];
  }
});

function editActivity() {
  for (let key in props.activity) {
    data.curActivity[key] = props.activity[key];
  }
  // console.log('editActivity()', data.curActivity)
  toggleModal("editActivityModal");
}

function catchEdit(newAct) {
  emit("edit", newAct);
}

function catchConfirm(val) {
  console.log("catchConfirm val:", val);
  if (val) {
    axios
      .delete("/api/msi/activities/" + props.activity.id)
      .then(() => {
        toggleModal();
        emit("delete", props.activity.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return;
}

function deleteActivity() {
  toggleModal("confirmModal");
  return;
}

function emailActivity() {
  axios
    .post("/api/msi/activities/email", { emails: "", activity: props.activity })
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
