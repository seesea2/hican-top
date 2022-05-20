<template>
  <div
    class="modal fade"
    id="confirmModal"
    data-bs-backdrop="static"
    aria-hidden="true"
    aria-labelledby="confirmModalLabel"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-myblue">
          <h5 class="modal-title text-white" id="confirmModalLabel">
            Confirmation
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            @click="toggleModal()"
          ></button>
        </div>
        <div class="modal-body">
          <b>Operation with risk; please confirm.</b>
        </div>

        <div class="modal-footer">
          <button class="btn btn-warning" @click="confirmation(true)">
            Yes
          </button>
          <button class="btn btn-success" @click="confirmation(false)">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import toggleModal from "../common/modal";

let props = defineProps(["modal"]);

let emit = defineEmits(["confirm"]);

function confirmation(selection) {
  console.log("emit confirm");
  emit("confirm", selection);
  toggleModal(props.modal);
}
</script>
