export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, data) {
    state.user =data;
  }
}