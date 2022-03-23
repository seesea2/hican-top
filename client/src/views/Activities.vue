<template>
  <div>
    <MsiNavbarVue></MsiNavbarVue>

    <!-- <div class="btn" @click="Refresh('Day')">The day</div>
    <div class="btn" @click="Refresh('Week')">The week</div>
    <div class="btn" @click="Refresh('Month')">The month</div> -->

    <div class="container mt-5">
      <!-- <FullCalendar :options="calendarOptions" /> -->
      <div v-if="activities.length" class="row">
        <div
          v-for="activity in activities"
          class="col-sm-12 col-md-3"
          :key="activity.id"
        >
          <div
            class="card"
            role="button"
            @click="
              ViewDetails(activity) && toggleModal('activityDetailsModalToggle')
            "
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
                class="btn btn-primary"
                @click="toggleModal('editActivityModalToggle')"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Act Details -->
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
                v-if="curActivity"
                class="modal-title"
                id="editActivityModalToggleLabel"
              >
                Edit Activity
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
                        class="col-auto border-0"
                        v-model="startDate"
                      />
                      <select
                        class="col-auto border-0 bg-white"
                        v-model="startHour"
                      >
                        <option v-for="hour in hours" :key="hour">
                          {{ hour }}
                        </option>
                      </select>
                      :
                      <select
                        class="col-auto border-0 bg-white"
                        v-model="startMinute"
                      >
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
                        class="col-auto border-0"
                        v-model="endDate"
                      />
                      <select class="border-0 bg-white" v-model="endHour">
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
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                @click="Submit() && toggleModal()"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr class="border-1 my-3" />
      <div
        class="btn btn-primary btn-small"
        @click="toggleModal('editActivityModalToggle')"
      >
        Add
      </div>
    </div>
  </div>
</template>

<script>
// import "@fullcalendar/core/vdom"; // solves problem with Vite
// import FullCalendar from "@fullcalendar/vue3";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";
import MsiNavbarVue from "../components/MsiNavbar.vue";
import { loginId } from "../common/msiLogin";
import toggleModal from "../common/modal";
import router from "../router";

export default {
  name: "ActivitiesVue",
  // components: {
  //   FullCalendar,
  // },
  components: { MsiNavbarVue },
  data() {
    let today = new Date();
    let dateString = today.getFullYear();
    if (today.getMonth() + 1 < 10) {
      dateString += "-0" + (today.getMonth() + 1);
    } else {
      dateString += "-" + (today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dateString += "-0" + today.getDate();
    } else {
      dateString += "-" + today.getDate();
    }

    // print("dateString", dateString);
    return {
      orgActivities: [],
      activities: [],
      curActivity: {},
      title: "",
      affectedSystems: "",
      startDate: dateString,
      startHour: "00",
      startMinute: "00",
      endHour: "00",
      endMinute: "00",
      endDate: dateString,
      impact: "",
      noImpact: "",
      remarks: "",
      contactPersons: "",
      hours: [],
      minutes: [],
      submitMsg: "",
      // calendarOptions: {
      //   plugins: [dayGridPlugin, interactionPlugin],
      //   initialView: "dayGridMonth",
      //   headerToolbar: {
      //     left: "prev,next today",
      //     center: "title",
      //     right: "dayGridMonth,timeGridWeek,timeGridDay",
      //   },
      //   initialEvents: [
      //     {
      //       id: 1,
      //       title: "All-day event",
      //       start: new Date().toISOString().replace(/T.*$/, ""),
      //     },
      //     {
      //       id: 2,
      //       title: "TCC App Ver.01.08.01 upgrade",
      //       start: new Date().toISOString().replace(/T.*$/, "") + "T13:00:00",
      //     },
      //   ],
      //   editable: true,
      //   selectable: true,
      //   selectMirror: true,
      //   dayMaxEvents: true,
      //   weekends: true,
      // },
    };
  },
  created() {
    if (!loginId()) {
      router.push("/login");
    }
  },
  mounted() {
    document.title = "Activities";
    // console.log(this.startDate, this.endDate);
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
    toggleModal(id) {
      return toggleModal(id);
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
          // console.log(typeof resp.data);
          this.activities = resp.data;
          this.orgActivities = resp.data;
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
        return false;
      }

      // console.log("in a:", this.curActivity);
      let startDatetime = new Date(this.startDate);
      startDatetime.setHours(parseInt(this.startHour));
      startDatetime.setMinutes(parseInt(this.startMinute));
      // console.log(startDatetime);
      // console.log(startDatetime.toISOString());
      this.curActivity.startDatetime = startDatetime;

      let endDatetime = new Date(this.endDate);
      endDatetime.setHours(parseInt(this.endHour));
      endDatetime.setMinutes(parseInt(this.endMinute));
      this.curActivity.endDatetime = endDatetime;
      // console.log("endDatetime:", endDatetime);

      console.log("in 2:", this.curActivity);
      // let data = {
      //   title: this.curActivity.title,
      //   affectedSystems: this.curActivity.affectedSystems,
      //   startDatetime: startDatetime,
      //   endDatetime: endDatetime,
      //   impact: this.curActivity.impact,
      //   noImpact: this.curActivity.noImpact,
      //   remarks: this.curActivity.remarks,
      //   contactPersons: this.curActivity.contactPersons,
      // };
      // console.log(data);

      // existig act, to update using PUT
      console.log("in 3:", this.curActivity.id);
      if (this.curActivity.id) {
        axios
          .put("/api/msi/activities", this.curActivity)
          .then((resp) => {
            console.log(resp.data);
            // data.id = resp.data.id;
            // this.activities.push(data);
            this.submitMsg = "Edit successfully.";
            setTimeout(() => {
              this.submitMsg = "";
            }, 3000);
            return true;
          })
          .catch((err) => {
            console.log("post err:", err);
            return false;
          });
      }
      // new act, to insert using POST
      else {
        axios
          .post("/api/msi/activities", this.curActivity)
          .then((resp) => {
            // console.log(resp.data.id);
            this.curActivity.id = resp.data.id;
            this.activities.push(this.curActivity);
            this.submitMsg = "Add successfully.";
            setTimeout(() => {
              this.submitMsg = "";
            }, 3000);
            return true;
          })
          .catch((err) => {
            console.log("post err:", err);
            return false;
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
    ViewDetails(activity) {
      // console.log(activity.id);
      this.curActivity = activity;

      // let activityDetailsModal = new bootstrap.Modal(
      //   document.getElementById("myModal"),
      //   options
      // );
      // activityDetailsModal.show();
      return true;
    },
  },
};
</script>
