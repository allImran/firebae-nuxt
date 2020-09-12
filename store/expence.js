import * as firebase from 'firebase/app';
import 'firebase/database';
export const state = () => ({
  expences: [],
  loading: false,
})

export const mutations = {
  SET_EXPENCE(state, data) {
    state.expences = data;
  },
  SET_LOADING(state, data) {
    state.loading = data
  }
}

export const actions = {
	 ACT_STORE({commit}, payload) {
    let date = new Date();
    payload.time = date.toLocaleDateString();
	 	firebase.database().ref('expences').push(payload)
	 	.then((data) => {
	 		console.log(data);
	 		//commit('SET_EXPENCE', payload)
	 	})
	 	.catch((error)=> {
    		console.log(error)
    	})
    },

    ACT_EXPENCE({commit}){
      commit('SET_LOADING', true)
      let modifiedData = [];
      firebase.database().ref('expences').on('value',(data)=>{
        //console.log(snap.val());
        let rawData = data.val();
        if(rawData !== null ){
          console.log(rawData, 'rawdata')
          Object.keys(rawData).forEach(key =>{
            console.log(key, 'ddf')
            modifiedData.push({
              id: key,
              title: rawData[key].title,
              expence: rawData[key].expence,
              detail: rawData[key].description,
              date: rawData[key].time,
            })
          });
          commit('SET_EXPENCE', modifiedData)
          commit('SET_LOADING', false)
        }
      }, (err) => {
        console.log(err)
      });
      console.log('dispatch end')
      
    }
}