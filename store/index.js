export const state = () => ({
  tasks: [],
  wallColor: '#636363',
  faceColor: '#fffff',
  handColor: '#000',
})

export const mutations = {
  updateTasks(state, payload) {
    state.tasks = payload
  },
  updateWallcolor(state, payload) {
    state.wallColor = payload
  },
  updateFaceColor(state, payload) {
    state.faceColor = payload
  },
  updateHandColor(state, payload) {
    state.handColor = payload
  },
}

export const actions = {
  async createTask({ commit }, payload) {
    try {
      await this.$axios.post('v1/tasks/', payload).then((response) => {
        if (response.status === 201) {
          console.log(`${payload.task} created successfully`)
          if (response.data.task === 'START') {
            commit('updateWallcolor', response.data.color)
          } else if (response.data.task === 'STOP') {
            commit('updateFaceColor', response.data.color)
          } else {
            commit('updateHandColor', response.data.color)
          }
        }
      })
    } catch (e) {
      if (e.response.data.detail) {
        console.log(e.response.data.detail)
      } else {
        console.log(e.response)
      }
    }
  },
  async retrieveTasks({ commit }, payload) {
    try {
      await this.$axios.get('v1/tasks/').then((response) => {
        if (response.status === 200) {
          commit('updateTasks', response.data)
        }
      })
    } catch (e) {
      if (e.response.data.detail) {
        console.log(e.response.data.detail)
      } else {
        console.log(e.response)
      }
    }
  },
  async deleteTasks({ commit }) {
    try {
      await this.$axios.delete('v1/tasks/').then((response) => {
        if (response.status === 204) {
          console.log('Tasks deleted successfully.')
          // empty all tasks
          commit('updateTasks', [])
        }
      })
    } catch (e) {
      if (e.response.data.detail) {
        console.log(e.response.data.detail)
      } else {
        console.log(e.response)
      }
    }
  },
}

export const getters = {
  tasks: (state) => state.tasks,
  wallColor: (state) => state.wallColor,
  faceColor: (state) => state.faceColor,
  handColor: (state) => state.handColor,
}
