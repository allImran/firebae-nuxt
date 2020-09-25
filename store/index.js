export const state = () => ({
  userId: null
})

export const mutations = {
  SET_USER_TO_LOCAL(state, data) {
    localStorage.setItem("UID", data);
  },
  // SET_USER(state) {

  // 	var x = window.localStorage.getItem("mytime");
  //   state.userId = x
  // },
  REMOVE_USER(state, data) {
  	localStorage.removeItem("UID");
  	state.userId = null
  }
}