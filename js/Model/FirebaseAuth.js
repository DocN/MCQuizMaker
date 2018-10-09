
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwRRhP3JJZ6yNEZBtba6W-iFkx9lcpGmM",
    authDomain: "quizcreator-a21b4.firebaseapp.com",
    databaseURL: "https://quizcreator-a21b4.firebaseio.com",
    projectId: "quizcreator-a21b4",
    storageBucket: "quizcreator-a21b4.appspot.com",
    messagingSenderId: "311879722750"
  };
  firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();