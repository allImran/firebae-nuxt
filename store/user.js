import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
export const state = () => ({
  users: [],
  loading: false
})

export const mutations = {
  SET_USER(state, data) {
    state.users = data.reverse();
  },
  SET_LOADING(state, data) {
    state.loading = data;
  },

}

export const actions = {

	async ACT_STORE({commit}, payload) {
    if(payload.image == null){
      return new Promise((resolve, reject) => {
        let date = new Date();
        payload.time = date.toLocaleDateString();
        firebase.database().ref('users').push(payload)
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
    }else{
      return new Promise((resolve, reject) => {
        let date = new Date();
        let imageUrl;
        let key;
        payload.time = date.toLocaleDateString();
        firebase.database().ref('users').push(payload)
        .then((data) => {
          key = data.key;
          console.log(key, 'key')
          return data.key;
        })
        .then(key =>{
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          console.log(ext, 'ext')
          return firebase.storage().ref('users/' + key + '.' + ext).put(payload.image);
        })
        .then(fileInfo => {
          console.log(fileInfo.metadata, 'fileInfo.metadata')
          imageUrl = fileInfo.metadata.fullPath;
          firebase.database().ref('users').child(key).update({image: imageUrl})
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
    }//end of else
    

    },

    async ACT_USER({commit}){
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
      firebase.database().ref('users').on('value',(data)=>{
      let modifiedData = [];
        let rawData = data.val();
        if(rawData !== null ){
          Object.keys(rawData).forEach(key =>{
            modifiedData.push({
              id: key,
              name: rawData[key].name,
              mobile: rawData[key].mobile,
              fbId: rawData[key].fbId,
              address: rawData[key].address,
              description: rawData[key].description,
              time: rawData[key].time,
            })
          });
          commit('SET_USER', modifiedData)
          commit('SET_LOADING', false)
          resolve({
            success: true
          });
        }else{
          commit('SET_LOADING', false)
        }
      }, (err) => {
        commit('SET_LOADING', false)
        resolve({
          error: err,
          success: false
        });
      });
      });
    }
}