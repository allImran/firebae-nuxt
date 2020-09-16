import * as firebase from 'firebase/app';
import 'firebase/database';
export const state = () => ({
  expences: [],
  loading: false
})

export const mutations = {
  SET_EXPENCE(state, data) {
    state.expences = data.reverse();
  },
  SET_LOADING(state, data) {
    state.loading = data;
  },

}

export const actions = {

	async ACT_STORE({commit}, payload) {

    return new Promise((resolve, reject) => {
      //let date = new Date();
      //payload.time = date.toLocaleDateString();
  	 	firebase.database().ref('expences').push(payload)
  	 	.then((data) => {
  	 		console.log(data);
        resolve({
          success: true
        });
  	 	})
  	 	.catch((error)=> {
    		console.log(error)
        resolve({
          success: false
        });
    	})
    });
  },

    async ACT_EXPENCE({commit}){
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
      firebase.database().ref('expences').on('value',(data)=>{
      let modifiedData = [];
        let rawData = data.val();
        if(rawData !== null ){
          console.log(rawData, 'rawdata')
          Object.keys(rawData).forEach(key =>{
            console.log(key, 'ddf')
            modifiedData.push({
              id: key,
              title: rawData[key].title,
              expence: rawData[key].expence,
              description: rawData[key].description,
              time: rawData[key].time,
            })
          });
          commit('SET_EXPENCE', modifiedData)
          commit('SET_LOADING', false)
          resolve({
            success: true
          });
        }else{
          commit('SET_LOADING', false);
        }
      }, (err) => {
        commit('SET_LOADING', false)
        resolve({
          error: err,
          success: false
        });
      });
      });
    },


    async ACT_UPDATE({commit}, payload) {
      return new Promise((resolve, reject) => {
      
      //firebase.database().ref('expences').push(payload)
      firebase.database().ref('expences').child(payload.id).update(payload)
      .then((data) => {
        console.log(data);
        resolve({
          success: true
        });
      })
      .catch((error)=> {
        console.log(error)
        resolve({
          success: false
        });
      })
    });
  },




}