export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('controller/getControllers')
  }
}