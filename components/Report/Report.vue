<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Program Time</th>
          <th scope="col">Event</th>
          <th scope="col">Message</th>
          <th scope="col">Actual Time</th>
          <th scope="col">Display Message</th>
        </tr>
      </thead>
      <tbody v-if="formatedTasks.length > 0">
        <tr v-for="(task, index) in tasks" :key="index">
          <th scope="row">{{ index }}</th>
          <td>
            <span v-for="subtask in task" :key="subtask.id">
              {{ subtask.task }} <br />
            </span>
          </td>
          <td>
            <span v-for="subtask in task" :key="subtask.id">
              {{ subtask.message }} <br />
            </span>
          </td>
          <td>{{ formatDate(task[0].actual_time) }}</td>
          <td>
            {{ index }} -
            <span v-for="subtask in task" :key="subtask.id">
              {{ subtask.message }} <br />
            </span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5">
            There're no tasks scheduled currently. Please press the reports
            button to get new data.
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
    formatedTasks() {
      const tasks = []
      const keys = Object.keys(this.tasks)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        tasks.push(this.tasks[key])
      }
      return tasks
    },
  },
  methods: {
    formatDate(actualdate) {
      const date = new Date(`06/13/2019 ${actualdate}`)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      const seconds = date.getSeconds()
      const ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours || 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      const strTime = `${hours}:${minutes}:${seconds} ${ampm}`
      return strTime
    },
  },
}
</script>
