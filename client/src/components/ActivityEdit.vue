<template>
  <div class="modal fade" id="editActivityModalToggle" data-bs-backdrop="static" aria-hidden="true"
    aria-labelledby="editActivityModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-myblue">
          <h5 v-if="data.curActivity && data.curActivity.id" class="modal-title text-white"
            id="editActivityModalToggleLabel">Edit</h5>
          <h5 v-else class="modal-title text-white" id="editActivityModalToggleLabel">Create
          </h5>
          <button type="button" class="btn-close btn-close-white" aria-label="Close" @click="toggleModal()"></button>
        </div>
        <form class="modal-body" v-if="data.curActivity">
          <div v-if="props.activity['type'] == 'Template'">
            <div>
              Group1:
              <!-- <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="Group1" id="Group1_0" value="All" checked>
                <label class="form-check-label" for="Group1_0">All</label>
              </div> -->
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="data.curActivity['Group1']" name="Group1"
                  id="Group1_1" value="Deployment">
                <label class="form-check-label" for="Group1_1">Deployment</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="data.curActivity['Group1']" name="Group1"
                  id="Group1_2" value="Non-Deployment">
                <label class="form-check-label" for="Group1_2">Non-Deployment</label>
              </div>
            </div>

            <div>
              Group2:
              <!-- <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="Group2" id="Group2_0" value="All" checked>
                <label class="form-check-label" for="Group2_0">All</label>
              </div> -->
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="data.curActivity['Group2']" name="Group2"
                  id="Group2_1" value="ABT">
                <label class="form-check-label" for="Group2_1">ABT</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="data.curActivity['Group2']" name="Group2"
                  id="Group2_2" value="CBT">
                <label class="form-check-label" for="Group2_2">CBT</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="data.curActivity['Group2']" name="Group2"
                  id="Group2_3" value="Bus">
                <label class="form-check-label" for="Group2_3">Bus</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="data.curActivity['Group2']" name="Group2"
                  id="Group2_4" value="Rail">
                <label class="form-check-label" for="Group2_4">Rail</label>
              </div>
            </div>
          </div>

          <div v-else>
            <label>Type: </label>
            <div class="ms-3 form-check form-check-inline">
              <input class="form-check-input" type="radio" name="type" id="type1" v-model="data.curActivity.type"
                value="Activity">
              <label class="form-check-label" for="type1">Activity</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="type" id="type2" v-model="data.curActivity.type"
                value="Issue">
              <label class="form-check-label" for="type2">Issue</label>
            </div>
          </div>

          <div class="form-group mt-3">
            <div class="row">
              <div class="col">
                <label>Title:</label>
                <input class="form-control" v-model.trim="data.curActivity.title" />
              </div>
              <div class="col">
                <label>Affected Systems:</label>
                <input class="form-control" v-model.trim="data.curActivity.affectedSystems" />
              </div>
            </div>
            <div v-if="props.activity['type'] != 'Template'" class="row mt-2 py-2">
              <div class="col">
                <label>Start Datetime:</label>
                <div class="form-control">
                  <input type="date" class="border-0" v-model.trim="data.startDateStr" />
                  <select class="ms-4 border-0 bg-white" v-model.trim="data.startHour">
                    <option v-for="hour in data.hours" :key="hour">{{ hour }}</option>
                  </select>
                  :
                  <select class="border-0 bg-white" v-model.trim="data.startMinute">
                    <option v-for="minute in data.minutes" :key="minute">{{ minute }}</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <label>End Datetime:</label>
                <div class="form-control">
                  <input type="date" class="border-0" v-model.trim="data.endDateStr" />
                  <select class="ms-4 border-0 bg-white" v-model.trim="data.endHour">
                    <option v-for="hour in data.hours" :value="hour" :key="hour">{{ hour }}</option>
                  </select>
                  :
                  <select class="border-0 bg-white" v-model.trim="data.endMinute">
                    <option v-for="minute in data.minutes" :value="minute" :key="minute">{{ minute }}</option>
                  </select>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <div class="row mt-2">
              <div class="col">
                <label>Stakeholders:</label>
                <input class="form-control" v-model.trim="data.curActivity.stakeholders" />
              </div>
              <div class="col">
                <label>Implementation Teams:</label>
                <input class="form-control" v-model.trim="data.curActivity.teams" />
              </div>
              <div class="col">
                <label>Contact Persons:</label>
                <input class="form-control" v-model.trim="data.curActivity.contactPersons" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label>Impact:</label>
                <textarea class="form-control" v-model.trim="data.curActivity.impact"></textarea>
              </div>
              <div class="col">
                <label>No Impact:</label>
                <textarea class="form-control" v-model.trim="data.curActivity.noImpact"></textarea>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label>Risk & Mitigation:</label>
                <textarea class="form-control" v-model.trim="data.curActivity.riskAndMitigation"></textarea>
              </div>
              <div class="col">
                <label>Remarks:</label>
                <textarea class="form-control" v-model.trim="data.curActivity.remarks"></textarea>
              </div>
            </div>
          </div>

        </form>

        <div class="modal-footer">
          <div v-if="data.submitMsg" class="text-center">
            <small class="bg-warning">{{ data.submitMsg }}</small>
          </div>
          <button class="btn btn-primary" @click="Submit()" :disabled="disableSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { watch, reactive, defineProps, defineEmits, ref } from "vue";

import dateToLocaleStr from "../common/date";
import toggleModal from "../common/modal";

let props = defineProps(["activity"])
// console.log('props.activity in edit act root:', props.activity)
let emit = defineEmits(['edit'])
let disableSubmit = ref(false)

let data = reactive({
  curActivity: {},
  startDateStr: dateToLocaleStr(new Date()).split("T")[0],
  startHour: "00",
  startMinute: "00",
  endDateStr: dateToLocaleStr(new Date()).split("T")[0],
  endHour: "00",
  endMinute: "00",
  hours: [],
  minutes: [],
  submitMsg: "",
  showTemplateOptions: false,
})

for (let i = 0; i < 24; ++i) {
  if (i < 10) {
    data.hours.push("0" + i);
  } else {
    data.hours.push(i.toString());
  }
}
data.minutes = ['00', '15', '30', '45']

watch(props.activity, () => {
  console.log('props.activity in watch', props.activity)
  initData();
})

function initData() {
  console.log('props.activity in initData', props.activity)
  if (props.activity.id) {
    for (let key in props.activity) {
      // console.log('props.activity[key]', props.activity[key])
      data.curActivity[key] = props.activity[key]
    }
  } else {
    for (let key in data.curActivity) {
      data.curActivity[key] = null;
    }
    if (props.activity['type'] == 'Template') {
      data.curActivity['type'] = props.activity['type']
      data.curActivity['Group1'] = 'Deployment'
      data.curActivity['Group2'] = 'ABT'
    } else {
      data.curActivity['type'] = "Activity"
    }
  }

  if (props.activity.startDatetime) {
    data.startDateStr = dateToLocaleStr(new Date(props.activity.startDatetime)).split("T")[0];
    data.startHour = new Date(props.activity.startDatetime)
      .getHours()
      .toString()
      .padStart(2, "0");
    data.startMinute = new Date(props.activity.startDatetime)
      .getMinutes()
      .toString()
      .padStart(2, "0");
  } else {
    data.startDateStr = dateToLocaleStr(new Date()).split("T")[0];
    data.startHour = '00'
    data.startMinute = '00'
  }
  if (!['00', '15', '30', '45'].includes(data.startMinute)) {
    data.startMinute = '00'
  }

  if (props.activity.endDatetime) {
    data.endDateStr = dateToLocaleStr(new Date(props.activity.endDatetime)).split("T")[0];
    data.endHour = new Date(props.activity.endDatetime)
      .getHours()
      .toString()
      .padStart(2, "0");
    data.endMinute = new Date(props.activity.endDatetime)
      .getMinutes()
      .toString()
      .padStart(2, "0");
  } else {
    data.endDateStr = dateToLocaleStr(new Date()).split("T")[0];
    data.endHour = '00'
    data.endMinute = '00'
  }
  if (!['00', '15', '30', '45'].includes(data.endMinute)) {
    data.endMinute = '00'
  }

  console.log('in edit | data.curActivity:', data.curActivity)
}

function Submit() {
  // console.log("in Submit:", data.curActivity);
  if (!data.curActivity.title) {
    data.submitMsg = "Title is empty.";
    return;
  }
  data.submitMsg = "";

  // SG locale datetime
  let startDatetime = new Date(data.startDateStr);
  startDatetime.setHours(parseInt(data.startHour));
  startDatetime.setMinutes(parseInt(data.startMinute));
  data.curActivity.startDatetime = startDatetime;
  let endDatetime = new Date(data.endDateStr);
  endDatetime.setHours(parseInt(data.endHour));
  endDatetime.setMinutes(parseInt(data.endMinute));
  data.curActivity.endDatetime = endDatetime;
  // console.log("endDatetime:", endDatetime);

  // console.log("in 2:", data.curActivity);

  disableSubmit.value = true;
  // for existig Act with ID, to update using PUT
  if (data.curActivity.id) {
    axios
      .put("/api/msi/activities", data.curActivity)
      .then(() => {
        // console.log(resp.data);
        // data.activities.push(data);
        data.submitMsg = "Edit successfully.";
        emit('edit', data.curActivity);
        setTimeout(() => {
          data.submitMsg = "";
          toggleModal();
          disableSubmit.value = false;
        }, 2000);
      })
      .catch((err) => {
        data.submitMsg = err;
        console.log("put err:", err);
        disableSubmit.value = false;
      });
  }
  // for new Act, to insert using POST
  else {
    console.log('submit template:', data.curActivity)
    axios
      .post("/api/msi/activities", data.curActivity)
      .then((resp) => {
        data.curActivity.id = resp.data.id;

        data.submitMsg = "Add successfully.";
        emit('edit', data.curActivity);
        setTimeout(() => {
          data.submitMsg = "";
          toggleModal();
          disableSubmit.value = false;
        }, 2000);
        return;
      })
      .catch((err) => {
        data.submitMsg = err;
        console.log("post err:", err);
        disableSubmit.value = false;
      });
  }
}

</script>