/* eslint-disable @typescript-eslint/no-unused-vars */
export const state = () => ({
  title: 'Loading...',
})

export const mutations = {
  setTitle(state, text) {
    state.title = text
  },
}
