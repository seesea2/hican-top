<template>
  <div class="mt-3" name="emails">
    <button
      v-if="!data.showGroupInputs"
      class="btn btn-primary"
      @click="data.showGroupInputs = !data.showGroupInputs"
    >
      New Email Group
    </button>
    <div v-if="data.showGroupInputs" class="mt-2">
      <div class="form">
        <div class="form-floating">
          <input
            class="form-control col-auto"
            placeholder="group name"
            v-model.trim="data.group.group"
            required
          />
          <label for="floatingInput" class="small">Group name</label>
        </div>

        <table class="table caption-top">
          <thead class="text-center">
            <tr>
              <td>#</td>
              <td>Email</td>
              <td>Name</td>
              <td>Team</td>
              <td>Include</td>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(email, ind) in data.allEmails" :key="email.email">
              <td>{{ ind + 1 }}</td>
              <td>{{ email.email }}</td>
              <td>{{ email.name }}</td>
              <td>{{ email.team }}</td>
              <td class="">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="email.checked"
                    value=""
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-center mt-2">
          <button class="btn btn-primary" @click="addEmailGroup()">
            Create
          </button>
          <button
            class="btn btn-success mx-1"
            @click="data.showGroupInputs = !data.showGroupInputs"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";

// let emit = defineEmits(["edit"]);

let data = reactive({
  disableSubmit: false,
  group: {
    group: null,
    emails: [],
  },
  msg: null,
  allEmails: [],
});
// console.log("yc1:", data.group1);

// watch(props.activity, () => {
//   console.log("props.activity in watch", props.activity);
//   initData();
// });

function addEmailGroup() {
  // console.log("in Submit:", data.curActivity);
  if (!data.group.group) {
    data.msg = "Please input group name.";
    return;
  }

  data.msg = "";

  data.group.emails.length = 0;
  for (let item of data.allEmails) {
    console.log("data.allEmails before submit", item.email, item.checked);
    if (item.checked) {
      data.group.emails.push(item.email);
    }
  }
  console.log("submit group:", data.group);

  data.disableSubmit = true;
  axios
    .post("/api/msi/emails/group", data.group)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((e) => {
      console.log(e);
    });
}

function getEmails() {
  axios.get("/api/msi/emails").then((resp) => {
    console.log(resp.data);
    data.allEmails.length = 0;
    data.allEmails = resp.data;
  });
}
getEmails();
</script>
