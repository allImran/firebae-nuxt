import * as firebase from 'firebase/app';
import 'firebase/database';
export const state = () => ({
  orders: [],
  order: [],
  user: [],
  loading: false
})

export const mutations = {
  SET_ORDERS(state, data) {
    state.orders = data.reverse();
  },
  SET_ORDER(state, data) {
    state.order = data;
  },
  SET_USER(state, data) {
    state.user = data;
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
  	 	firebase.database().ref('orders').push(payload)
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

    async ACT_ORDER({commit}){
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
      firebase.database().ref('orders').on('value',(data)=>{
      let modifiedData = [];
        let rawData = data.val();
        if(rawData !== null ){
          console.log(rawData, 'rawdata')
          Object.keys(rawData).forEach(key =>{
            console.log(key, 'ddf')
            modifiedData.push({
              id: key,
              title: rawData[key].title,
              userName: rawData[key].userName,
              userId: rawData[key].userId,
              amount: rawData[key].amount,
              paid: rawData[key].paid,
              date: rawData[key].date,
              deadLine: rawData[key].deadLine,
              detail: rawData[key].detail,
            })
          });
          commit('SET_ORDERS', modifiedData)
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

    async ACT_SINGLE_ORDER({commit}, id) {
      commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        let order;
        let user;
        firebase.database().ref('orders').child(id).on('value', (data) => {
          order = data.val();
          //console.log(order, 'order')
          if(order.userId !== undefined){
            firebase.database().ref('users').child(order.userId).on('value', (userdata) => {
              user = userdata.val();
              //order.user = user
              commit('SET_USER', user);
              console.log(order, 'order with user')
               commit('SET_ORDER', order);
               commit('SET_LOADING', false);
            }, (err) =>{
                resolve({
                  error: err,
                  message: 'Something went wrong',
                  success: false
                });
              }) 
          }else{
            commit('SET_LOADING', false);
            resolve({
              error: err,
              message: 'Something went wrong',
              success: false
            });
          }
        }, (err) => {
          resolve({
            error: err,
            message: 'Something went wrong, Login again',
            success: false
          });
        })
        
      });
    },


    async ACT_UPDATE({commit}, payload) {
      return new Promise((resolve, reject) => {
      
      //firebase.database().ref('expences').push(payload)
      firebase.database().ref('orders').child(payload.id).update(payload)
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