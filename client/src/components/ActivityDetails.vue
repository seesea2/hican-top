<template>
  <div
    class="modal fade"
    id="activityDetailsModal"
    aria-hidden="true"
    aria-labelledby="activityDetailsModalLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div v-if="props.curActivity.id" class="modal-content">
        <div class="modal-header bg-myblue">
          <h5
            class="modal-title text-white"
            id="activityDetailsModalLabel"
          >{{ props.curActivity.title }}</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            @click="toggleModal()"
          ></button>
        </div>
        <div class="modal-body" v-if="props.curActivity">
          <div class="card-text small">
            <b>Start:</b>
            {{ new Date(props.curActivity.startDatetime).toLocaleString() }}
          </div>
          <div class="card-text small">
            <b>End:</b>
            {{ new Date(props.curActivity.endDatetime).toLocaleString() }}
          </div>
          <div class="card-text mt-1 small">
            <b>Affected Systems:</b>
            {{ props.curActivity.affectedSystems }}
          </div>
          <hr />
          <div class="card-text mt-1 small">
            <b>Impact:</b>
            <div
              v-if="props.curActivity.impact"
              v-html="
                props.curActivity.impact
                  .replace(/\r\n/g, '<br>')
                  .replace(/\n/g, '<br>')
              "
              class="mx-3"
            ></div>
          </div>
          <div class="card-text mt-1 small">
            <b>NoImpact:</b>
            <div
              v-if="props.curActivity.noImpact"
              v-html="
                props.curActivity.noImpact
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
              v-if="props.curActivity.remarks"
              v-html="
                props.curActivity.remarks
                  .replace(/\r\n/g, '<br>')
                  .replace(/\n/g, '<br>')
              "
              class="mx-3"
            ></div>
          </div>
          <div class="card-text mt-1 small">
            <b>Contact Persons:</b>
            <span v-html="props.curActivity.contactPersons"></span>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary btn-sm"
            @click="toggleModal('editActivityModalToggle')"
          >Edit</button>
        </div>
      </div>
    </div>
  </div>

  <ActivityEditComp :curActivity="props.curActivity"></ActivityEditComp>
</template>


<script setup>
// import axios from "axios";
// import { loginId } from "../common/msiLogin";
// import router from "../router";
import { defineProps } from 'vue'

import ActivityEditComp from "./ActivityEdit.vue";
import toggleModal from "../common/modal";

let props = defineProps(["curActivity"])

</script>
