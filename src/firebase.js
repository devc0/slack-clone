  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/database";
  import "firebase/storage";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyARtvedvqlQxiAIQbwnxmKqVpvK7syGOwE",
    authDomain: "otaku-slack.firebaseapp.com",
    databaseURL: "https://otaku-slack.firebaseio.com",
    projectId: "otaku-slack",
    storageBucket: "otaku-slack.appspot.com",
    messagingSenderId: "905057680641",
    appId: "1:905057680641:web:38a2d578dde814c39d6f00"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;