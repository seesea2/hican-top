<template>
  <div
    class="modal fade"
    id="editActivityModal"
    data-bs-backdrop="static"
    aria-hidden="true"
    aria-labelledby="editActivityModalLabel"
  >
    <div class="modal-dialog modal-fullscreen px-0">
      <div class="modal-content">
        <div class="modal-header bg-myblue">
          <h5
            v-if="data.curActivity && data.curActivity.id"
            class="modal-title text-white"
            id="editActivityModalLabel"
          >
            Edit
          </h5>
          <h5 v-else class="modal-title text-white" id="editActivityModalLabel">
            Create
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            @click="toggleModal()"
          ></button>
        </div>
        <div class="modal-body" v-if="data.curActivity">
          <form id="activity-form">
            <div v-if="props.activity['type'] == 'Template'">
              <div>
                Group1:
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="data.curActivity['group1']"
                    name="group1"
                    id="group1_1"
                    value="Deployment"
                  />
                  <label class="form-check-label" for="group1_1"
                    >Deployment</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="data.curActivity['group1']"
                    name="group1"
                    id="group1_2"
                    value="Non-Deployment"
                  />
                  <label class="form-check-label" for="group1_2"
                    >Non-Deployment</label
                  >
                </div>
              </div>

              <div>
                Group2:
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="data.curActivity['group2']"
                    name="group2"
                    id="group2_1"
                    value="ABT"
                  />
                  <label class="form-check-label" for="group2_1">ABT</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="data.curActivity['group2']"
                    name="group2"
                    id="group2_2"
                    value="CBT"
                  />
                  <label class="form-check-label" for="group2_2">CBT</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="data.curActivity['group2']"
                    name="group2"
                    id="group2_3"
                    value="Bus"
                  />
                  <label class="form-check-label" for="group2_3">Bus</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="data.curActivity['group2']"
                    name="group2"
                    id="group2_4"
                    value="Rail"
                  />
                  <label class="form-check-label" for="group2_4">Rail</label>
                </div>
              </div>
            </div>

            <div v-else>
              <label id="create-type">Type: </label>
              <div class="ms-3 form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="type"
                  id="type1"
                  v-model="data.curActivity.type"
                  value="Activity"
                />
                <label class="form-check-label" for="type1">Activity</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="type"
                  id="type2"
                  v-model="data.curActivity.type"
                  value="Issue"
                />
                <label class="form-check-label" for="type2">Issue</label>
              </div>
            </div>

            <div class="form-group mt-3">
              <div class="row">
                <div class="col">
                  <label>Title:</label>
                  <input
                    class="form-control"
                    v-model.trim="data.curActivity.title"
                  />
                </div>
                <div class="col">
                  <label>Affected Systems:</label>
                  <input
                    class="form-control"
                    v-model.trim="data.curActivity.affectedSystems"
                  />
                </div>
              </div>
              <div
                v-if="props.activity['type'] != 'Template'"
                class="row mt-2 py-2"
              >
                <div class="col">
                  <label>Start Datetime:</label>
                  <div class="form-control">
                    <input
                      type="date"
                      class="border-0"
                      v-model.trim="data.startDateStr"
                    />
                    <select
                      class="ms-4 border-0 bg-white"
                      v-model.trim="data.startHour"
                    >
                      <option v-for="hour in data.hours" :key="hour">
                        {{ hour }}
                      </option>
                    </select>
                    :
                    <select
                      class="border-0 bg-white"
                      v-model.trim="data.startMinute"
                    >
                      <option v-for="minute in data.minutes" :key="minute">
                        {{ minute }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <label>End Datetime:</label>
                  <div class="form-control">
                    <input
                      type="date"
                      class="border-0"
                      v-model.trim="data.endDateStr"
                    />
                    <select
                      class="ms-4 border-0 bg-white"
                      v-model.trim="data.endHour"
                    >
                      <option
                        v-for="hour in data.hours"
                        :value="hour"
                        :key="hour"
                      >
                        {{ hour }}
                      </option>
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
                      >
                        {{ minute }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <div class="row mt-2">
                <div class="col">
                  <label>Stakeholders:</label>
                  <input
                    class="form-control"
                    v-model.trim="data.curActivity.stakeholders"
                  />
                </div>
                <div class="col">
                  <label>Implementation Teams:</label>
                  <input
                    class="form-control"
                    v-model.trim="data.curActivity.teams"
                  />
                </div>
                <div class="col">
                  <label>Contact Persons:</label>
                  <input
                    class="form-control"
                    v-model.trim="data.curActivity.contactPersons"
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col">
                  <label>Impact:</label>
                  <textarea
                    class="form-control"
                    v-model.trim="data.curActivity.impact"
                  ></textarea>
                </div>
                <div class="col">
                  <label>No Impact:</label>
                  <textarea
                    class="form-control"
                    v-model.trim="data.curActivity.noImpact"
                  ></textarea>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col">
                  <label>Risk & Mitigation:</label>
                  <textarea
                    class="form-control"
                    v-model.trim="data.curActivity.riskAndMitigation"
                  ></textarea>
                </div>
                <div class="col">
                  <label>Remarks:</label>
                  <textarea
                    class="form-control"
                    v-model.trim="data.curActivity.remarks"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>

          <div
            id="templateOptionsBtn"
            class="btn btn-secondary mt-3"
            @click="toggleTemplateOptions()"
          >
            Template Options
          </div>
          <div v-show="data.showTemplateOptions" name="template-options">
            <div class="mt-3" id="template-option-top">
              Group1:
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group1"
                  id="group1_0"
                  value="All"
                />
                <label class="form-check-label" for="group1_0">All</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group1"
                  id="group1_1"
                  value="Deployment"
                />
                <label class="form-check-label" for="group1_1"
                  >Deployment</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group1"
                  id="group1_2"
                  value="Non-Deployment"
                />
                <label class="form-check-label" for="group1_2"
                  >Non-Deployment</label
                >
              </div>
            </div>

            <div>
              Group2:
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group2"
                  id="group2_0"
                  value="All"
                />
                <label class="form-check-label" for="group2_0">All</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group2"
                  id="group2_1"
                  value="ABT"
                />
                <label class="form-check-label" for="group2_1">ABT</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group2"
                  id="group2_2"
                  value="CBT"
                />
                <label class="form-check-label" for="group2_2">CBT</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group2"
                  id="group2_3"
                  value="Bus"
                />
                <label class="form-check-label" for="group2_3">Bus</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="data.group2"
                  id="group2_4"
                  value="Rail"
                />
                <label class="form-check-label" for="group2_4">Rail</label>
              </div>
            </div>

            <table
              id="templateTable"
              ref="templateTable"
              class="table caption-top table-striped table-hover"
            >
              <thead class="text-center">
                <tr>
                  <th scope="col" style="width: 5%">#</th>
                  <th scope="col" style="width: 30%">Title</th>
                  <th scope="col" style="width: 30%">AffectedSystems</th>
                  <th scope="col" style="width: 20%">Impact</th>
                  <th scope="col" style="width: 15%">Stakeholders</th>
                  <th scope="col" style="width: 5%">Use</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(template, ind) in data.templates">
                  <tr
                    v-if="filterTemplate(template)"
                    class="small"
                    :key="template.id"
                  >
                    <td>{{ ind + 1 }}</td>
                    <td>{{ template.title }}</td>
                    <td v-html="template.affectedSystems"></td>
                    <td>{{ template.stakeholders }}</td>
                    <td>{{ template.impact }}</td>
                    <td>
                      <div class="btn btn-small" @click="useTemplate(template)">
                        &#9917;
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <div v-if="data.submitMsg" class="text-center">
            <small class="bg-warning">{{ data.submitMsg }}</small>
          </div>
          <button
            class="btn btn-primary"
            @click="Submit()"
            :disabled="disableSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { watch, reactive, defineProps, defineEmits, toRaw, ref } from "vue";

// import { useTemplates } from '../stores/ActivityStore'
import dateToLocaleStr from "../common/date";
import toggleModal from "../common/modal";

let props = defineProps(["activity"]);
// console.log('props.activity in edit act root:', props.activity)
let emit = defineEmits(["edit"]);
let disableSubmit = ref(false);

// const templates = useTemplates()
// console.log(templates.curTemplate)
// templates.curTemplate.id = "old"
// templates.curTemplate.group2 = 'lol'
// console.log('templates.curTemplate', templates.curTemplate)

let data = reactive({
  curActivity: { type: "Activity" },
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
  templates: [],
  group1: "All",
  group2: "All",
});
// console.log("yc1:", data.group1);

for (let i = 0; i < 24; ++i) {
  if (i < 10) {
    data.hours.push("0" + i);
  } else {
    data.hours.push(i.toString());
  }
}
data.minutes = ["00", "15", "30", "45"];

watch(props.activity, () => {
  console.log("props.activity in watch", props.activity);
  initData();
});

function initData() {
  // console.log('props.activity in initData', props.activity)
  if (props.activity.id) {
    for (let key in props.activity) {
      // console.log('props.activity[key]', props.activity[key])
      data.curActivity[key] = props.activity[key];
    }
  } else {
    for (let key in data.curActivity) {
      data.curActivity[key] = null;
    }
    if (props.activity["type"] == "Template") {
      data.curActivity["type"] = props.activity["type"];
      data.curActivity["group1"] = "Deployment";
      data.curActivity["group2"] = "ABT";
    } else {
      data.curActivity["type"] = "Activity";
    }
  }
  // console.log('init data.curActivity:', data.curActivity)

  if (props.activity.startDatetime) {
    data.startDateStr = dateToLocaleStr(
      new Date(props.activity.startDatetime)
    ).split("T")[0];
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
    data.startHour = "00";
    data.startMinute = "00";
  }
  if (!["00", "15", "30", "45"].includes(data.startMinute)) {
    data.startMinute = "00";
  }

  if (props.activity.endDatetime) {
    data.endDateStr = dateToLocaleStr(
      new Date(props.activity.endDatetime)
    ).split("T")[0];
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
    data.endHour = "00";
    data.endMinute = "00";
  }
  if (!["00", "15", "30", "45"].includes(data.endMinute)) {
    data.endMinute = "00";
  }

  console.log("in edit | data.curActivity:", data.curActivity);
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

  console.log("submit act:", data.curActivity);

  disableSubmit.value = true;
  // for existing Act with ID, to update using PUT
  if (data.curActivity.id) {
    axios
      .put("/api/msi/activities", data.curActivity)
      .then(() => {
        // console.log(resp.data);
        // data.activities.push(data);
        data.submitMsg = "Edit successfully.";
        emit("edit", toRaw(data.curActivity));
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
    // console.log("submit template:", data.curActivity);
    axios
      .post("/api/msi/activities", data.curActivity)
      .then((resp) => {
        data.curActivity.id = resp.data.id;

        data.submitMsg = "Add successfully.";
        emit("edit", toRaw(data.curActivity));
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
  // refresh templates
  if (data.curActivity.type == "Template") {
    data.templates.length = 0;
  }
}

function getTemplates() {
  data.templates.length = 0;
  axios
    .get("/api/msi/activities/templates")
    .then((resp) => {
      for (let item of resp.data) {
        data.templates.push(item);
      }
      console.log(data.templates);
    })
    .catch((err) => {
      console.log(err);
    });
}

function useTemplate(template) {
  console.log("yc useTemplate:", template);
  for (let key in template) {
    if (["id", "type", "group1", "group2"].includes(key)) {
      continue;
    }
    data.curActivity[key] = template[key];
  }
  console.log("log useTemplate data.curActivity", data.curActivity);
  data.showTemplateOptions = false;
  document.getElementById("activity-form").scrollIntoView();
  // document.getElementById('create-type').scrollIntoView();
}

function toggleTemplateOptions() {
  data.showTemplateOptions = !data.showTemplateOptions;
  if (data.showTemplateOptions) {
    if (!data.templates.length) {
      getTemplates();
    }

    // document.getElementById('template-option-top').scrollIntoView();
    // document.getElementById('template-option-top').scrollTop();
    let elm = document.getElementById("templateOptionsBtn");
    console.log(elm);
    elm.scrollIntoView();
    // window.scrollTo(0, elm.getBoundingClientRect().y)
    // window.scrollTo(0, elm.offsetTop)
  }
}

function filterTemplate(template) {
  if (
    (data.group1 == "All" || data.group1 == template["group1"]) &&
    (data.group2 == "All" || data.group2 == template["group2"])
  ) {
    return true;
  }
  return false;
}
</script>
