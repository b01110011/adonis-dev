export const state = () => ({
  controllers: [],
  methods: [],
})

export const mutations = {
  setControllers(state, entities) {
    state.controllers = entities
  },
  setMethods(state, entities) {
    state.methods = entities
  },
}

export const actions = {
  async getControllers({ commit }) {
    const { controllers, methods } = await this.$axios.$get('/api/controllers')
    commit('setControllers', controllers)
    commit('setMethods', methods)
  }
}