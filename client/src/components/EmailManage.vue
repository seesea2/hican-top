<template>
  <div class="mt-3" name="emails">
    <!-- for add email -->
    <div>
      <button
        v-if="!data.showingInputs"
        class="btn btn-primary"
        @click="showInputs()"
      >
        New Email
      </button>
      <button
        v-if="!data.showingEmails"
        class="btn btn-primary mx-1"
        @click="showEmails()"
      >
        View Emails
      </button>
    </div>

    <div v-if="data.showingInputs" class="mt-2">
      <div class="form row">
        <div class="form-floating col-3">
          <input
            class="form-control"
            placeholder="email"
            v-model.trim="data.curEmail.email"
            required
          />
          <label for="floatingInput" class="small">Email</label>
        </div>
        <div class="form-floating col-3">
          <input
            class="form-control"
            placeholder="name"
            v-model.trim="data.curEmail.name"
          />
          <label for="floatingInput" class="small">Name</label>
        </div>
        <div class="form-floating col-3">
          <input
            class="form-control"
            placeholder="company"
            v-model.trim="data.curEmail.company"
          />
          <label for="floatingInput" class="small">Company</label>
        </div>
        <div class="form-floating col-3">
          <input
            class="form-control"
            placeholder="team"
            v-model.trim="data.curEmail.team"
          />
          <label for="floatingInput" class="small">Team</label>
        </div>

        <div class="mt-2">
          <label class="me-2">Add to groups:</label>
          <div
            v-for="group in data.groups"
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
            class="btn btn-primary"
            @click="addEmail()"
            :disabled="data.disableSubmit"
          >
            Create
          </button>
          <button
            class="btn btn-success mx-1"
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
            <th>Team</th>
            <th>Ops</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(email, ind) in data.allEmails" :key="ind">
            <td>{{ ind + 1 }}</td>
            <td>{{ email.email }}</td>
            <td>{{ email.name }}</td>
            <td>{{ email.team }}</td>
            <td>
              <button class="btn btn-small">Edit</button>
              <button
                class="btn btn-small mx-1"
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
          class="btn btn-success mx-1"
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

// let emit = defineEmits(["edit"]);

let data = reactive({
  curEmail: {},
  groups: [],
  showingInputs: false,
  allEmails: [],
  showingEmails: false,
  disableSubmit: false,
  msg: "",
});

function showInputs() {
  axios.get("/api/msi/emails/groups").then((resp) => {
    data.groups = resp.data;
    console.log(resp.groups);
    data.showingInputs = true;
    data.showingEmails = false;
  });
}

function showEmails() {
  axios
    .get("/api/msi/emails")
    .then((resp) => {
      data.allEmails = resp.data;
      data.showingInputs = false;
      data.showingEmails = true;
    })
    .catch((e) => {
      console.log("showEmails:", e);
    });
}

function addEmail() {
  console.log(data.curEmail);
  if (!data.curEmail.email) {
    data.msg = "Please input email.";
    return;
  }

  data.curEmail.groups = [];
  for (let group of data.groups) {
    // console.log("group before submit:", group);
    if (group.checked) {
      data.curEmail.groups.push(group.group);
    }
  }

  console.log("add email: ", data.curEmail);
  data.disableSubmit = true;
  axios
    .post("/api/msi/emails", data.curEmail)
    .then((resp) => {
      console.log(resp);
      if (resp.data.err) {
        data.msg = resp.data.err;
        data.disableSubmit = false;
        return;
      }

      data.msg = "Successful.";
      setTimeout(() => {
        data.disableSubmit = false;
        data.showingInputs = false;
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      data.msg = err.msg;
      data.disableSubmit = false;
    });
}

function deleteEmail(emailObj) {
  data.disableSubmit = true;
  axios
    .delete("/api/msi/emails/" + emailObj.email)
    .then((resp) => {
      console.log(resp);
      if (resp.data.err) {
        data.msg = resp.data.err;
        data.disableSubmit = false;
        return;
      }

      data.msg = "Successful.";
      showEmails();
      setTimeout(() => {
        data.disableSubmit = false;
        // data.showingEmails = false;
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
