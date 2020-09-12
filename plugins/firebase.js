import * as firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBmQPA8JenS-2hUCJtcvI6u5_lI3uGWhxk",
    authDomain: "batayon-1.firebaseapp.com",
    databaseURL: "https://batayon-1.firebaseio.com",
    projectId: "batayon-1",
    storageBucket: "batayon-1.appspot.com",
    messagingSenderId: "762629306663",
    appId: "1:762629306663:web:d5900d11a4f9d27f285102",
    measurementId: "G-62VNYM1KDG"
  };
  // Initialize Firebase

  //let app = null;
  //app = firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  //firebase.analytics();

  export default firebase