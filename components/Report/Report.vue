<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Program Time</th>
          <th scope="col">Event</th>
          <th scope="col">Message</th>
          <th scope="col">Actual Time</th>
        </tr>
      </thead>
      <tbody v-if="tasks.length > 0">
        <tr v-for="task in tasks" :key="task.id">
          <th scope="row">{{ task.time }}</th>
          <td>{{ task.task }}</td>
          <td>
            {{ task.message }}
          </td>
          <td>{{ formatDate(task.actual_time) }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4">
            There're no tasks scheduled currently. Please press the reports
            button to get new data. {{ tasks }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['tasks']),
  },
  methods: {
    formatDate(actualdate) {
      const date = new Date(`06/13/2019 ${actualdate}`)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      const ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours || 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      const strTime = `${hours}:${minutes} ${ampm}`
      return strTime
    },
  },
}
</script>
