<template>
  <div>
    <div
      class="modal fade"
      id="activityDetailsModal"
      aria-hidden="true"
      aria-labelledby="activityDetailsModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div v-if="curActivity.id" class="modal-content">
          <div class="modal-header bg-myblue">
            <h5 class="modal-title text-white" id="activityDetailsModalLabel">
              {{ curActivity.title }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
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
              class="btn btn-primary btn-sm"
              @click="toggleModal('editActivityModalToggle')"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <ActivityEditComp :curActivity="curActivity"></ActivityEditComp>
  </div>
</template>


<script>
// import axios from "axios";
// import { loginId } from "../common/msiLogin";
// import router from "../router";
import toggleModal from "../common/modal";
import ActivityEditComp from "./ActivityEdit.vue";

export default {
  name: "ActivityDetailsComp",
  components: { ActivityEditComp },
  props: ["curActivity"],
  data() {
    return {
      act: undefined,
    };
  },
  mounted() {
    this.act = this.curActivity;
  },
  methods: {
    toggleModal(modal) {
      return toggleModal(modal);
    },
    Delete() {},
  },
};
</script>
