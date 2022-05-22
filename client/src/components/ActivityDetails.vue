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
            class="btn btn-success btn-sm mx-1"
            @click="showEmailOptions()"
          >
            Email
          </button>
          <button class="btn btn-success btn-sm mx-1" @click="editActivity()">
            Edit
          </button>
          <button class="btn btn-success btn-sm mx-1" @click="toggleModal()">
            Close
          </button>
        </div>

        <div v-if="data.bShowingEmails" class="container">
          <div>Select recipients or Input (separator ";").</div>
          <div class="row">
            <div
              v-for="group in data.allGroups"
              :key="group.group"
              class="col-sm-12 col-md-3"
            >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input mx-1"
                  type="checkbox"
                  value=""
                  :groupName="group.group"
                  @input="catchCheckboxChange"
                />
                <label>{{ group.group }}</label>
              </div>
            </div>
          </div>

          <textarea class="form-control mt-2" @input="catchTextArea"></textarea>

          <div class="text-center my-3">
            <button class="btn btn-success btn-small">Send</button>
            <button
              class="btn btn-success btn-small mx-1"
              @click="data.bShowingEmails = false"
            >
              Close
            </button>
          </div>

          <div v-if="data.toRecipients.length || data.manualToEmails">
            <hr class="my-3" />
            <div>
              to:
              <p class="ms-2">
                <label
                  v-for="recipient in data.toRecipients"
                  class="mx-1"
                  :key="recipient.email"
                >
                  {{ recipient.email }};
                </label>
                <label class="mx-1">{{ data.manualToEmails }}</label>
              </p>
            </div>
          </div>
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
let data = reactive({
  curActivity: { id: "" },
  bShowingEmails: false,
  allGroups: [],
  toRecipients: [],
  toGroups: [],
  manualToEmails: "",
});

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

function showEmailOptions() {
  data.bShowingEmails = true;
  data.manualToEmails = "";
  data.toRecipients.length = 0;
  data.toGroups.length = 0;

  data.allGroups.length = 0;
  axios
    .get("/api/msi/emails/groups")
    .then((resp) => {
      data.allGroups = resp.data;
    })
    .catch((err) => {
      console.log(err);
    });

  // axios
  //   .post("/api/msi/activities/email", { emails: "", activity: props.activity })
  //   .then((resp) => {
  //     console.log(resp.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

function catchCheckboxChange(boxValue) {
  let groupName = boxValue.target.attributes.groupName.value;
  let checked = boxValue.target.checked;

  console.log(groupName, checked);

  if (checked) {
    data.toGroups.push(groupName);
    axios
      .get("/api/msi/emails/groups?group=" + groupName)
      .then((resp) => {
        for (let item of resp.data) {
          data.toRecipients.push({ email: item.email, group: groupName });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    data.toGroups = data.toGroups.filter((item) => item != groupName);
    data.toRecipients = data.toRecipients.filter(
      (item) => item.group != groupName
    );
    console.log("nil");
  }
}

function catchTextArea(val) {
  if (!val.target.value) {
    return;
  }

  console.log("catchTextArea:", val.target.value);
  // modify format of emails, e.g.
  // remove multiple spaces, change space and ',' to ';'
  // insert space after ';'
  data.manualToEmails = val.target.value.trim();
  data.manualToEmails = data.manualToEmails.replace(/\s+/g, " ");
  data.manualToEmails = data.manualToEmails.replace(/; /g, ";");
  data.manualToEmails = data.manualToEmails.replace(/, /g, ",");
  data.manualToEmails = data.manualToEmails.replace(/ ,/g, " ");
  data.manualToEmails = data.manualToEmails.replace(/ /g, ";");
  data.manualToEmails = data.manualToEmails.replace(/,/g, ";");
  data.manualToEmails = data.manualToEmails.replace(/;/g, "; ");
  data.manualToEmails = data.manualToEmails.trim();
}
</script>
