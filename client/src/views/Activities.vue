<template>
  <div>
    <MsiNavbarVue></MsiNavbarVue>

    <div class="container mt-5">
      <div v-if="activities.length" class="row">
        <div
          v-for="activity in activities"
          class="col-sm-12 col-md-3 my-1"
          :key="activity.id"
        >
          <div
            class="card"
            role="button"
            @click="ViewDetails(activity, 'activityDetailsModalToggle')"
          >
            <div class="card-header">
              {{ activity.title }}
            </div>
            <div class="card-body">
              <!-- <div class="card-title fw-bold">{{ activity.title }}</div> -->
              <div class="card-text small">
                <b>Start</b>:
                {{ new Date(activity.startDatetime).toLocaleString() }}
              </div>
              <div class="card-text small">
                <b>End</b>:
                {{ new Date(activity.endDatetime).toLocaleString() }}
              </div>
              <p class="card-text small">
                <b>Affected Systems</b> : {{ activity.affectedSystems }}
              </p>
            </div>
            <!-- <button
              class="btn btn-secondary btn-small"
              @click="Delete(activity.id)"
            >
              Delete
            </button> -->
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="activityDetailsModalToggle"
        aria-hidden="true"
        aria-labelledby="activityDetailsModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div v-if="curActivity.id" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="activityDetailsModalToggleLabel">
                {{ curActivity.title }}
              </h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="toggleModal()"
              ></button>
            </div>
            <div class="modal-body" v-if="curActivity">
              <div class="card-text small">
                <b>Start:</b>
                {{ new Date(curActivity.startDatetime).toLocaleString() }}
              </div>
              <div class="card-text small">
                <b>End:</b>
                {{ new Date(curActivity.endDatetime).toLocaleString() }}
              </div>
              <div class="card-text mt-1 small">
                <b>Affected Systems:</b> {{ curActivity.affectedSystems }}
              </div>
              <hr />
              <div class="card-text mt-1 small">
                <b>Impact:</b>
                <div
                  v-if="curActivity.impact"
                  v-html="
                    curActivity.impact
                      .replace(/\r\n/g, '<br>')
                      .replace(/\n/g, '<br>')
                  "
                  class="mx-3"
                ></div>
              </div>
              <div class="card-text mt-1 small">
                <b>NoImpact:</b>
                <div
                  v-if="curActivity.noImpact"
                  v-html="
                    curActivity.noImpact
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
                  v-if="curActivity.remarks"
                  v-html="
                    curActivity.remarks
                      .replace(/\r\n/g, '<br>')
                      .replace(/\n/g, '<br>')
                  "
                  class="mx-3"
                ></div>
              </div>
              <div class="card-text mt-1 small">
                <b>Contact Persons:</b>
                <span v-html="curActivity.contactPersons"></span>
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary btn-sm"
                @click="toggleModal('editActivityModalToggle')"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal to Add/Edit Activity Details -->
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
            <div class="modal-header">
              <h5
                v-if="curActivity && curActivity.id"
                class="modal-title"
                id="editActivityModalToggleLabel"
              >
                Edit Activity
              </h5>
              <h5 v-else class="modal-title" id="editActivityModalToggleLabel">
                Add Activity
              </h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="toggleModal()"
              ></button>
            </div>
            <div class="modal-body" v-if="curActivity">
              <div class="form-group mt-5">
                <div class="row">
                  <div class="col">
                    <label>Title:</label>
                    <input class="form-control" v-model="curActivity.title" />
                  </div>
                  <div class="col">
                    <label>Affected Systems:</label>
                    <input
                      class="form-control"
                      v-model="curActivity.affectedSystems"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Start Datetime:</label>
                    <div class="form-control">
                      <input
                        type="date"
                        class="border-0"
                        v-model="startDateStr"
                      />
                      <select
                        class="ms-4 border-0 bg-white"
                        v-model="startHour"
                      >
                        <option v-for="hour in hours" :key="hour">
                          {{ hour }}
                        </option>
                      </select>
                      :
                      <select class="border-0 bg-white" v-model="startMinute">
                        <option v-for="minute in minutes" :key="minute">
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
                        v-model="endDateStr"
                      />
                      <select class="ms-4 border-0 bg-white" v-model="endHour">
                        <option v-for="hour in hours" :value="hour" :key="hour">
                          {{ hour }}
                        </option>
                      </select>
                      :
                      <select class="border-0 bg-white" v-model="endMinute">
                        <option
                          v-for="minute in minutes"
                          :value="minute"
                          :key="minute"
                        >
                          {{ minute }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <label>Contact Persons:</label>
                    <input
                      class="form-control"
                      v-model="curActivity.contactPersons"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Impact:</label>
                    <textarea
                      class="form-control"
                      v-model="curActivity.impact"
                    ></textarea>
                  </div>
                  <div class="col">
                    <label>No Impact:</label>
                    <textarea
                      class="form-control"
                      v-model="curActivity.noImpact"
                    ></textarea>
                  </div>
                  <div class="col">
                    <label>Remarks:</label>
                    <textarea
                      class="form-control"
                      v-model="curActivity.remarks"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div v-if="submitMsg" class="text-center">
                <small class="bg-warning">{{ submitMsg }}</small>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click="Submit()">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-1 my-3" />
    <div class="text-center">
      <button
        class="btn btn-primary"
        @click="initData() || toggleModal('editActivityModalToggle')"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MsiNavbarVue from "../components/MsiNavbar.vue";
import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";

function dateToLocaleStr(date) {
  return new Date(date.toISOString().split("Z")[0] + "-08:00").toISOString();
}

export default {
  name: "ActivitiesVue",
  components: { MsiNavbarVue },
  data() {
    return {
      activities: [],
      curActivity: {
        title: new String(),
        affectedSystems: new String(),
        impact: new String(),
        noImpact: new String(),
        remarks: new String(),
        contactPersons: new String(),
      },
      startDateStr: dateToLocaleStr(new Date()).split("T")[0],
      startHour: "00",
      startMinute: "00",
      endHour: "00",
      endMinute: "00",
      endDateStr: dateToLocaleStr(new Date()).split("T")[0],
      hours: [],
      minutes: [],
      submitMsg: "",
    };
  },
  created() {
    if (!loginId()) {
      router.push("/login");
    }
  },
  mounted() {
    document.title = "Activities";
    this.Refresh();

    for (let i = 0; i < 24; ++i) {
      if (i < 10) {
        this.hours.push("0" + i);
      } else {
        this.hours.push(i.toString());
      }
    }
    this.minutes.push("00");
    this.minutes.push("15");
    this.minutes.push("30");
    this.minutes.push("45");
  },
  methods: {
    dateToLocaleStr(date) {
      return dateToLocaleStr(date);
    },
    initData() {
      console.log("initData()");
      this.curActivity = {
        title: "",
        affectedSystems: "",
        impact: "",
        noImpact: "",
        remarks: "",
        contactPersons: "",
      };
      this.startDateStr = dateToLocaleStr(new Date()).split("T")[0];
      this.startHour = "00";
      this.startMinute = "00";
      this.endDateStr = dateToLocaleStr(new Date()).split("T")[0];
      this.endHour = "00";
      this.endMinute = "00";
    },
    Refresh(filter) {
      if (filter) {
        if (filter == "Day") {
          console.log("filter", filter);
          this.activities = this.orgActivities;
          this.activities.filter((item) => {
            if (!item.startDate && !item.endDate) {
              console.log("filter 1");
              return false;
            }

            if (
              new Date(item.startDate) >
              new Date().setDate(new Date().getDate() + 1)
            ) {
              console.log("filter 2");
              return false;
            }
            if (
              new Date(item.endDate) <
              new Date().setDate(new Date().getDate() - 1)
            ) {
              console.log("filter 3");
              return false;
            }
            console.log("filter end");
            return true;
          });
        }
        return;
      }

      axios
        .get("/api/msi/activities")
        .then((resp) => {
          this.activities = resp.data;
        })
        .catch((err) => {
          console.log(err);
          this.activities = [];
        });
    },
    Submit() {
      console.log("in Submit:", this.curActivity);
      if (!this.curActivity.title) {
        this.submitMsg = "Title is empty.";
        return;
      }
      this.submitMsg = "";

      // SG locale datetime
      let startDatetime = new Date(this.startDateStr);
      startDatetime.setHours(parseInt(this.startHour));
      startDatetime.setMinutes(parseInt(this.startMinute));
      this.curActivity.startDatetime = startDatetime;
      let endDatetime = new Date(this.endDateStr);
      endDatetime.setHours(parseInt(this.endHour));
      endDatetime.setMinutes(parseInt(this.endMinute));
      this.curActivity.endDatetime = endDatetime;
      // console.log("endDatetime:", endDatetime);

      console.log("in 2:", this.curActivity);

      // for existig Act with ID, to update using PUT
      if (this.curActivity.id) {
        axios
          .put("/api/msi/activities", this.curActivity)
          .then(() => {
            // console.log(resp.data);
            // this.activities.push(data);
            this.submitMsg = "Edit successfully.";
            setTimeout(() => {
              this.submitMsg = "";
              toggleModal();
            }, 3000);

            // update info in class.
            for (let i = 0; i < this.activities.length; ++i) {
              if (this.activities[i].id == this.curActivity.id) {
                for (let key in this.activities[i]) {
                  this.activities[i][key] = this.curActivity[key];
                }
                // console.log("updated info:", this.activities[i]);
                break;
              }
            }
            return true;
          })
          .catch((err) => {
            this.submitMsg = err;
            console.log("put err:", err);
          });
      }
      // for new Act, to insert using POST
      else {
        axios
          .post("/api/msi/activities", this.curActivity)
          .then((resp) => {
            // console.log(resp.data);
            this.curActivity.id = resp.data.id;
            this.activities.push(this.curActivity);

            this.submitMsg = "Add successfully.";
            setTimeout(() => {
              this.submitMsg = "";
              toggleModal();
            }, 3000);
            return;
          })
          .catch((err) => {
            this.submitMsg = err;
            console.log("post err:", err);
          });
      }
    },
    Delete(id) {
      console.log("delete act:", id);
      if (!id) {
        return;
      }

      this.activities = this.activities.filter((item) => item.id != id);
      axios.delete("/api/msi/activities/" + id).catch((err) => {
        console.log(err);
      });
    },
    ViewDetails(activity, modal) {
      this.startDateStr = dateToLocaleStr(
        new Date(activity.startDatetime)
      ).split("T")[0];
      this.startHour = new Date(activity.startDatetime)
        .getHours()
        .toString()
        .padStart(2, "0");
      this.startMinute = new Date(activity.startDatetime)
        .getMinutes()
        .toString()
        .padStart(2, "0");

      this.endDateStr = dateToLocaleStr(new Date(activity.endDatetime)).split(
        "T"
      )[0];
      this.endHour = new Date(activity.endDatetime)
        .getHours()
        .toString()
        .padStart(2, "0");
      this.endMinute = new Date(activity.endDatetime)
        .getMinutes()
        .toString()
        .padStart(2, "0");
      console.log(
        "handleEventClick:",
        this.startDateStr,
        this.startHour,
        this.startMinute
      );

      for (let key in activity) {
        this.curActivity[key] = activity[key];
      }

      this.toggleModal(modal);
      return true;
    },
    toggleModal(id) {
      return toggleModal(id);
    },
  },
};
</script>
