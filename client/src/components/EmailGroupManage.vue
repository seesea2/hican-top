<template>
  <div class="mt-3" name="emails">
    <div>
      <button
        v-if="!data.showingGroupInputs"
        class="btn btn-primary btn-sm"
        @click="showGroupInputs()"
      >
        New Email Group
      </button>
      <button
        v-if="!data.showingViewGroups"
        class="btn btn-primary btn-sm mx-1"
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
            v-model.trim="data.curGroup.group"
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
              <td>
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
          <div v-if="data.msg" class="my-2">
            <label class="bg-info px-1">{{ data.msg }}</label>
          </div>
          <button
            class="btn btn-success btn-sm"
            @click="confirmEmailGroup()"
            :disable="data.disableSubmit"
          >
            Confirm
          </button>
          <button
            class="btn btn-success btn-sm mx-1"
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
                  class="btn btn-light btn-sm"
                  @click="editEmailGroup(group)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-light btn-sm mx-1"
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
            class="btn btn-success btn-sm"
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
  curGroup: {
    group: null,
    emails: [],
    orgGroup: null,
    orgEmails: [],
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

function confirmEmailGroup() {
  // console.log("in Submit:", data.curActivity);
  if (!data.curGroup.group) {
    data.msg = "Please input group name.";
    return;
  }

  data.msg = "";
  data.curGroup.emails.length = 0;
  for (let item of data.allEmails) {
    // console.log("data.allEmails before submit", item.email, item.checked);
    if (item.checked) {
      data.curGroup.emails.push(item.email);
    }
  }
  // console.log("submit group:", data.group);

  data.disableSubmit = true;
  axios
    .post("/api/msi/emails/group", data.curGroup)
    .then((resp) => {
      // console.log(resp.data);
      if (resp.data.err) {
        data.msg = resp.data.err;
        data.disableSubmit = false;
        return;
      }
      data.msg = resp.data.msg;

      setTimeout(() => {
        data.disableSubmit = false;
        data.msg = null;
        showViewGroups();
      }, 2000);
    })
    .catch((e) => {
      data.msg = e;
      console.log(e);
      data.disableSubmit = false;
    });
}

function showGroupInputs() {
  data.curGroup.orgGroup = null;
  data.curGroup.orgEmails = [];
  data.curGroup.group = null;
  data.curGroup.emails = [];
  data.msg = null;

  data.allEmails.length = 0;
  axios
    .get("/api/msi/emails")
    .then((resp) => {
      // console.log(resp.data);
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
      // console.log(resp.data);
      data.allGroups.length = 0;
      data.allGroups = resp.data;

      data.showingGroupInputs = false;
      data.showingViewGroups = true;
    })
    .catch((e) => {
      console.log(e);
    });
}

function editEmailGroup(groupObj) {
  showGroupInputs();

  data.curGroup.orgGroup = groupObj.group;
  data.curGroup.group = groupObj.group;
  axios
    .get("/api/msi/emails/groups?group=" + groupObj.group)
    .then((resp) => {
      // console.log(resp.data);
      data.curGroup.orgEmails.length = 0;
      for (let obj of resp.data) {
        data.curGroup.orgEmails.push(obj.email);
      }

      // console.log("data.curGroup.orgGroup:", data.curGroup.orgGroup);
      for (let emailObj of data.allEmails) {
        if (data.curGroup.orgEmails.includes(emailObj.email)) {
          emailObj.checked = true;
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function deleteEmailGroup(groupObj) {
  // console.log(groupObj);
  data.disableSubmit = true;
  axios
    .delete("/api/msi/emails/groups/" + groupObj.group)
    .then((resp) => {
      // console.log(resp);
      if (resp.data.err) {
        data.msg = resp.data.err;
        data.disableSubmit = false;
        return;
      }

      data.msg = "Successful.";
      data.disableSubmit = false;
      showViewGroups();
      setTimeout(() => {
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
