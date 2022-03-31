<template>
  <div
    class="modal fade"
    id="editActivityModalToggle"
    data-bs-backdrop="static"
    aria-hidden="true"
    aria-labelledby="editActivityModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-fullscreen modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-myblue">
          <h5
            v-if="data.curActivity && data.curActivity.id"
            class="modal-title text-white"
            id="editActivityModalToggleLabel"
          >Edit Activity</h5>
          <h5 v-else class="modal-title text-white" id="editActivityModalToggleLabel">Add Activity</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            @click="toggleModal()"
          ></button>
        </div>
        <div class="modal-body" v-if="data.curActivity">
          <div class="form-group mt-5">
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
            <div class="row">
              <div class="col">
                <label>Start Datetime:</label>
                <div class="form-control">
                  <input type="date" class="border-0" v-model.trim="data.startDateStr" />
                  <select class="ms-4 border-0 bg-white" v-model.trim="data.startHour">
                    <option v-for="hour in data.hours" :key="hour">{{ hour }}</option>
                  </select>
                  :
                  <select
                    class="border-0 bg-white"
                    v-model.trim="data.startMinute"
                  >
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
                  <select
                    class="border-0 bg-white"
                    v-model.trim="data.endMinute"
                  >
                    <option
                      v-for="minute in data.minutes"
                      :value="minute"
                      :key="minute"
                    >{{ minute }}</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <label>Contact Persons:</label>
                <input class="form-control" v-model.trim="data.curActivity.contactPersons" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label>Impact:</label>
                <textarea class="form-control" v-model.trim="data.curActivity.impact"></textarea>
              </div>
              <div class="col">
                <label>No Impact:</label>
                <textarea class="form-control" v-model.trim="data.curActivity.noImpact"></textarea>
              </div>
              <div class="col">
                <label>Remarks:</label>
                <textarea class="form-control" v-model.trim="data.curActivity.remarks"></textarea>
              </div>
            </div>
          </div>
          <div v-if="data.submitMsg" class="text-center">
            <small class="bg-warning">{{ data.submitMsg }}</small>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="Submit()">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { watch, reactive, defineProps, defineEmits } from "vue";

import dateToLocaleStr from "../common/date";
import toggleModal from "../common/modal";

let props = defineProps(["activity"])
// console.log('props.activity in edit act root:', props.activity)
let emit = defineEmits(['edit'])

let data = reactive({
  curActivity: {},
  startDateStr: dateToLocaleStr(new Date()).split("T")[0],
  startHour: "00",
  startMinute: "00",
  endHour: "00",
  endMinute: "00",
  endDateStr: dateToLocaleStr(new Date()).split("T")[0],
  hours: [],
  minutes: [],
  submitMsg: "",
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
  // console.log('props.activity in watch', props.activity)
  initData();
})

function initData() {
  // console.log('props.activity in initData', props.activity)
  if (props.activity.id) {
    for (let key in props.activity) {
      // console.log('props.activity[key]', props.activity[key])
      data.curActivity[key] = props.activity[key]
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

  // console.log('in edit | data.curActivity:', data.curActivity)
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
        }, 2000);
      })
      .catch((err) => {
        data.submitMsg = err;
        console.log("put err:", err);
      });
  }
  // for new Act, to insert using POST
  else {
    axios
      .post("/api/msi/activities", data.curActivity)
      .then((resp) => {
        data.curActivity.id = resp.data.id;

        data.submitMsg = "Add successfully.";
        emit('edit', data.curActivity);
        setTimeout(() => {
          data.submitMsg = "";
          toggleModal();
        }, 2000);
        return;
      })
      .catch((err) => {
        data.submitMsg = err;
        console.log("post err:", err);
      });
  }
}
</script>