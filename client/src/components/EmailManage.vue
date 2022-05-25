<template>
  <div class="mt-3" name="emails">
    <!-- for add email -->
    <div>
      <button
        v-if="!data.showingInputs"
        class="btn btn-primary btn-sm"
        @click="showInputs()"
      >
        New Email
      </button>
      <button
        v-if="!data.showingEmails"
        class="btn btn-primary btn-sm mx-1"
        @click="showEmails()"
      >
        View Emails
      </button>
    </div>

    <div v-if="data.showingInputs" class="mt-2">
      <div class="form row">
        <div class="form-floating col-md-3 col-sm-12">
          <input
            class="form-control"
            placeholder="email"
            v-model.trim="data.curEmail.email"
            required
          />
          <label for="floatingInput" class="small">Email</label>
        </div>
        <div class="form-floating col-md-3 col-sm-12">
          <input
            class="form-control"
            placeholder="name"
            v-model.trim="data.curEmail.name"
          />
          <label for="floatingInput" class="small">Name</label>
        </div>
        <div class="form-floating col-md-3 col-sm-12">
          <input
            class="form-control"
            placeholder="company"
            v-model.trim="data.curEmail.company"
          />
          <label for="floatingInput" class="small">Company</label>
        </div>
        <div class="form-floating col-md-3 col-sm-12">
          <input
            class="form-control"
            placeholder="team"
            v-model.trim="data.curEmail.team"
          />
          <label for="floatingInput" class="small">Team</label>
        </div>

        <div class="mt-2">
          <label v-if="data.allGroups.length" class="me-2">
            Add to groups:
          </label>
          <div
            v-for="group in data.allGroups"
            class="form-check form-check-inline"
            :key="group.group"
          >
            <input
              class="form-check-input"
              v-model="group.checked"
              type="checkbox"
              value=""
            />
            <label class="form-check-label">{{ group.group }}</label>
          </div>
        </div>

        <div class="text-center mt-2">
          <div v-if="data.msg" class="my-2">
            <label class="bg-info px-1">{{ data.msg }}</label>
          </div>
          <button
            class="btn btn-success btn-sm"
            @click="confirmEmail()"
            :disabled="data.disableSubmit"
          >
            Confirm
          </button>
          <button
            class="btn btn-success btn-sm mx-1"
            @click="data.showingInputs = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- view emails -->
    <div v-if="data.showingEmails" class="mt-2">
      <table class="table caption-top">
        <thead class="text-center">
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Name</th>
            <th>Company</th>
            <th>Team</th>
            <th>Ops</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(email, ind) in data.allEmails" :key="ind">
            <td>{{ ind + 1 }}</td>
            <td>{{ email.email }}</td>
            <td>{{ email.name }}</td>
            <td>{{ email.company }}</td>
            <td>{{ email.team }}</td>
            <td>
              <button class="btn btn-light btn-sm" @click="editEmail(email)">
                Edit
              </button>
              <button
                class="btn btn-light btn-sm mx-1"
                @click="deleteEmail(email)"
                :disabled="data.disableSubmit"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center">
        <div v-if="data.msg" class="my-2">
          <label class="bg-info px-1">{{ data.msg }}</label>
        </div>
        <button
          class="btn btn-success btn-sm mx-1"
          @click="data.showingEmails = false"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";

let data = reactive({
  curEmail: {},
  allGroups: [],
  showingInputs: false,
  allEmails: [],
  showingEmails: false,
  disableSubmit: false,
  msg: "",
});

function showInputs() {
  data.curEmail.orgEmail = null;
  data.curEmail.orgGroups = [];
  data.curEmail.email = null;
  data.curEmail.groups = [];
  data.msg = null;

  data.allGroups.length = 0;
  axios
    .get("/api/msi/emails/groups")
    .then((resp) => {
      data.allGroups = resp.data;
      data.showingEmails = false;
      data.showingInputs = true;
    })
    .catch((e) => {
      console.log(e);
    });
}

function showEmails() {
  data.msg = null;
  axios
    .get("/api/msi/emails")
    .then((resp) => {
      data.allEmails.length = 0;
      data.allEmails = resp.data;
      data.showingInputs = false;
      data.showingEmails = true;
    })
    .catch((e) => {
      console.log("showEmails:", e);
    });
}

function confirmEmail() {
  // console.log(data.curEmail);
  if (!data.curEmail.email) {
    data.msg = "Please input email.";
    return;
  }

  data.msg = "";
  data.curEmail.groups.length = 0;
  for (let group of data.allGroups) {
    // console.log("group before submit:", group);
    if (group.checked) {
      data.curEmail.groups.push(group.group);
    }
  }

  // console.log("add email: ", data.curEmail);
  data.disableSubmit = true;
  axios
    .post("/api/msi/emails", data.curEmail)
    .then((resp) => {
      // console.log(resp);
      if (resp.data.err) {
        data.msg = resp.data.err;
        data.disableSubmit = false;
        return;
      }
      data.msg = resp.data.msg;

      setTimeout(() => {
        data.disableSubmit = false;
        data.msg = null;
        showEmails();
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      data.msg = err;
      data.disableSubmit = false;
    });
}

function editEmail(emailObj) {
  showInputs();

  data.curEmail.orgEmail = emailObj.email;
  data.curEmail.email = emailObj.email;
  data.curEmail.name = emailObj.name;
  data.curEmail.company = emailObj.company;
  data.curEmail.team = emailObj.team;
  data.curEmail.role = emailObj.role;

  axios
    .get("/api/msi/emails/groups?email=" + emailObj.email)
    .then((resp) => {
      // console.log(resp.data);
      data.curEmail.orgGroups.length = 0;
      for (let obj of resp.data) {
        data.curEmail.orgGroups.push(obj.group);
      }

      for (let groupObj of data.allGroups) {
        if (data.curEmail.orgGroups.includes(groupObj.group)) {
          groupObj.checked = true;
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function deleteEmail(emailObj) {
  data.disableSubmit = true;
  axios
    .delete("/api/msi/emails/" + emailObj.email)
    .then((resp) => {
      // console.log(resp);
      if (resp.data.err) {
        data.msg = resp.data.err;
        data.disableSubmit = false;
        return;
      }

      data.msg = "Successful.";
      data.disableSubmit = false;
      showEmails();
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
