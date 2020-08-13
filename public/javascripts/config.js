var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyB2quSIJ-ptFzaNkPvzCgbfOsnMLypfmy4",
  authDomain: "awesomeml-f5f43.firebaseapp.com",
  databaseURL: "https://awesomeml-f5f43.firebaseio.com",
  projectId: "awesomeml-f5f43",
  storageBucket: "awesomeml-f5f43.appspot.com",
  messagingSenderId: "431178309079"
};

firebase.initializeApp(config);

module.exports =  { firebase }
