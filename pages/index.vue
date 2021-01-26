<template>
  <div class="container">
    <div class="row mb-3" :style="{ 'background-color': wallColor }">
      <div class="col-md-12">
        <Clock />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12 text-center">
        <ShowReportButton @show-report-table="showReportTable" />
      </div>
    </div>
    <div v-if="displayReportTable" class="row mb-3">
      <div class="col-md-12">
        <Report />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Clock from '~/components/clock/Clock.vue'
import Report from '~/components/Report/Report.vue'
import ShowReportButton from '~/components/Report/ShowReportButton.vue'
export default {
  components: {
    Clock,
    Report,
    ShowReportButton,
  },
  data() {
    return {
      displayReportTable: false,
    }
  },
  computed: {
    ...mapGetters(['wallColor']),
  },
  methods: {
    showReportTable() {
      this.displayReportTable = true
    },
  },
}
</script>
