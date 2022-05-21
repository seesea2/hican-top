<template>
  <msi-navbar></msi-navbar>

  <div class="container">
    <h4 class="my-4">Email Address Management</h4>

    <email-manage></email-manage>

    <hr class="border-1 my-3" />

    <email-group-manage></email-group-manage>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";

import msiNavbar from "../components/MsiNavbar.vue";
import EmailManage from "../components/EmailManage.vue";
import EmailGroupManage from "../components/EmailGroupManage.vue";

import { loginId } from "../common/msiLogin";
import router from "../router";

document.title = "Email Management";

// let data = reactive({
//   curEmail: {},
//   groups: [],
//   email: [],
//   showEmailInputs: false,
//   msg: "",
// });

onBeforeMount(() => {
  if (!loginId()) {
    router.push("/login");
    return;
  }
});
</script>
