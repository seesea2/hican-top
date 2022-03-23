<template>
  <div class="container mt-5">
    <div><b>Title:</b>{{ activity.title }}</div>
    <div class="">
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
</template>

<script>
// import axios from "axios";
import { loginId } from "../common/msiLogin";
import router from "../router";

export default {
  name: "ActivityDetailsVue",
  props: ["activity"],
  data() {
    return {};
  },
  created() {
    if (!loginId()) {
      router.push("/login");
    }
  },
  mounted() {
    document.title = "Activities";
    console.log(this.startDate, this.endDate);
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
    Refresh() {},
    Submit() {},
    Delete() {},
  },
};
</script>
