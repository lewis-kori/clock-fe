<template>
  <div>
    <button class="btn btn-sm btn-primary" @click="showReports">Reports</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ShowReportButton',
  methods: {
    ...mapActions(['retrieveTasks']),
    showReports() {
      this.retrieveTasks()
      this.$emit('show-report-table')
    },
  },
}
</script>
