import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyAG3wbx1HCCVTVTF3y8ismL3F3-8s-qPFg",
    authDomain: "slim-teams.firebaseapp.com",
    databaseURL: "https://slim-teams.firebaseio.com",
    projectId: "slim-teams",
    storageBucket: "slim-teams.appspot.com",
    messagingSenderId: "354114410745",
    appId: "1:354114410745:web:8ee1f407fbc237cd3b6a28"
  };
  // Initialize Firebase
  var firebaseAuth = firebase.initializeApp(firebaseConfig);

  export default firebaseAuth;