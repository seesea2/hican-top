<template>
  <div class="mt-3" name="emails">
    <div>
      <button
        v-if="!data.showingGroupInputs"
        class="btn btn-primary"
        @click="showGroupInputs()"
      >
        New Email Group
      </button>
      <button
        v-if="!data.showingViewGroups"
        class="btn btn-primary mx-1"
        @click="showViewGroups()"
      >
        View Email Groups
      </button>
    </div>

    <!-- for add email group -->
    <div v-if="data.showingGroupInputs" class="mt-2">
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
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Team</th>
              <th>Include</th>
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
          <button
            class="btn btn-primary"
            @click="addEmailGroup()"
            :disable="data.disableSubmit"
          >
            Create
          </button>
          <button
            class="btn btn-success mx-1"
            @click="data.showingGroupInputs = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- for view/edit email group -->
    <div v-if="data.showingViewGroups" class="mt-2">
      <div class="form">
        <table class="table caption-top">
          <thead class="text-center">
            <tr>
              <th>#</th>
              <th>Group</th>
              <th>Ops</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(group, ind) in data.allGroups" :key="ind">
              <td>{{ ind + 1 }}</td>
              <td>{{ group.group }}</td>
              <td>
                <button
                  class="btn btn-small mx-1"
                  @click="deleteEmailGroup(group)"
                  :disabled="data.disableSubmit"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-center mt-2">
          <button
            class="btn btn-success"
            @click="data.showingViewGroups = false"
          >
            Close
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
  showingGroupInputs: false,
  allGroups: [],
  showingViewGroups: false,
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
    })
    .finally(() => {
      data.disableSubmit = false;
    });
}

function showGroupInputs() {
  axios
    .get("/api/msi/emails")
    .then((resp) => {
      console.log(resp.data);
      data.allEmails.length = 0;
      data.allEmails = resp.data;

      data.showingViewGroups = false;
      data.showingGroupInputs = true;
    })
    .catch((e) => {
      console.log(e);
    });
}

function showViewGroups() {
  axios
    .get("/api/msi/emails/groups")
    .then((resp) => {
      console.log(resp.data);
      data.allGroups.length = 0;
      data.allGroups = resp.data;

      data.showingGroupInputs = false;
      data.showingViewGroups = true;
    })
    .catch((e) => {
      console.log(e);
    });
}
function deleteEmailGroup(groupObj) {
  console.log(groupObj);
  data.disableSubmit = true;
  axios
    .delete("/api/msi/emails/groups/" + groupObj.group)
    .then((resp) => {
      console.log(resp);
      if (resp.data.err) {
        data.msg = resp.data.err;
        data.disableSubmit = false;
        return;
      }

      data.msg = "Successful.";
      showViewGroups();
      setTimeout(() => {
        data.disableSubmit = false;
        data.msg = "";
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      data.msg = err.msg;
      data.disableSubmit = false;
    });
}
</script>
