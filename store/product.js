import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
export const state = () => ({
  products: [],
  product: {image: ''},
  loading: false
})

export const mutations = {
  SET_PRODUCTS(state, data) {
    state.products = data.reverse();
  },
  SET_PRODUCT(state, data) {
    state.product = data;
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
        firebase.database().ref('products').push(payload)
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
    }else{ //if payload has image
      return new Promise((resolve, reject) => {
        let date = new Date();
        let imageUrl;
        let key;
        payload.time = date.toLocaleDateString();
        firebase.database().ref('products').push(payload)
        .then((data) => {
          key = data.key;
          console.log(key, 'key')
          return data.key;
        })
        .then(key =>{
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          console.log(ext, 'ext')
          return firebase.storage().ref('products/' + key + ext).put(payload.image);
        })
        .then(fileInfo => {
          console.log(fileInfo.metadata, 'fileInfo.metadata')
          imageUrl = fileInfo.metadata.fullPath;
          firebase.database().ref('products').child(key).update({image: imageUrl})
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

    async ACT_PRODUCT({commit}){
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
      firebase.database().ref('products').on('value',(data)=>{
      let modifiedData = [];
        let rawData = data.val();
        if(rawData !== null ){
          Object.keys(rawData).forEach(key =>{
            modifiedData.push({
              id: key,
              name: rawData[key].name,
              price: rawData[key].price,
              image: rawData[key].image,
              detail: rawData[key].detail,
              time: rawData[key].time,
            })
          });
          commit('SET_PRODUCTS', modifiedData)
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
    },
    
    async ACT_UPDATE({commit}, payload) {
      return new Promise((resolve, reject) => {
      
      //firebase.database().ref('expences').push(payload)
      firebase.database().ref('products').child(payload.id).update(payload)
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

  async ACT_SINGLE_PRODUCT({commit}, id) {
    commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
      firebase.database().ref('products').child(id).on('value', (data) => {
          let product = data.val();
          commit('SET_PRODUCT', product);
          commit('SET_LOADING', false)
      }, (err) => {
          commit('SET_LOADING', false)
          resolve({
            error: err,
            message: 'Something went wrong, Login again',
            success: false
          });
        });
    });
  },


}