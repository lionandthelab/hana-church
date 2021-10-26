/* eslint-disable @typescript-eslint/no-unused-vars */
export const state = () => ({
  title: '123',
})

export const mutations = {
  setTitle(state, text) {
    state.title = text
  },
}
