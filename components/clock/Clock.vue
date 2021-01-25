<template>
  <div :style="{ 'background-color': wallColor }">
    <h1>Lewis Kori</h1>

    <div id="clock" ref="clock">
      <!-- .clockFace -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Clock',
  data() {
    return {
      startTime: new Date('06/13/2019 12:00:00 PM'),
      actualTime: new Date('06/13/2019 10:00:00 AM'),
    }
  },
  computed: {
    ...mapGetters(['wallColor', 'faceColor', 'handColor']),
    clockElements() {
      return this.makeClockElements('b', 'span', 'span', 'i', 'i', 'i')
    },
  },
  mounted() {
    const startTime = this.startTime
    const actualTime = this.actualTime
    this.clockUpdate()
    // clear all tasks in db
    this.deleteTasks()
    setInterval(() => {
      this.clockUpdate()
    }, 1000)
    // start servers
    setInterval(() => {
      this.createTask({
        task: 'START',
        time: startTime.toLocaleTimeString(),
        actual_time: actualTime.toLocaleTimeString(),
      })
    }, 30000)
    // stop servers
    setInterval(() => {
      this.createTask({
        task: 'STOP',
        time: startTime.toLocaleTimeString(),
        actual_time: actualTime.toLocaleTimeString(),
      })
    }, 30000)
    // make Report
    setInterval(() => {
      this.createTask({
        task: 'REPORT',
        time: startTime.toLocaleTimeString(),
        actual_time: actualTime.toLocaleTimeString(),
      })
    }, 30000)
  },
  methods: {
    ...mapActions(['createTask', 'deleteTasks']),
    makeClockElements(tags) {
      const clock = this.$refs.clock
      const result = []
      let tagName = ''
      for (let i = 0; (tagName = arguments[i]); i++) {
        const element = clock.appendChild(document.createElement(tagName))
        if (tagName === 'i') result.push(element)
      }
      return result
    },
    clockUpdate() {
      this.startTime.setSeconds(this.startTime.getSeconds() + 1)
      this.actualTime.setSeconds(this.actualTime.getSeconds() + 1)
      this.clockElements[0].style.transform =
        'rotate(' +
        (this.startTime.getHours() * 30 +
          Math.floor(this.startTime.getMinutes() / 12) * 6) +
        'deg)'
      this.clockElements[1].style.transform =
        'rotate(' + this.startTime.getMinutes() * 6 + 'deg)'
      this.clockElements[2].style.transform =
        'rotate(' + this.startTime.getSeconds() * 6 + 'deg)'
      const clocKFace = this.$refs.clock
      // get rid of console errors when some elements dissapear from dom when makeElement is being executed
      if (clocKFace) {
        clocKFace.style.backgroundColor = this.faceColor
        if (clocKFace.querySelector('i')) {
          clocKFace.querySelector('i').style.backgroundColor = this.handColor
        }
      }
    },
  },
}
</script>
