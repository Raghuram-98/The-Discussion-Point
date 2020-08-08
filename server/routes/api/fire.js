var firebase = require('firebase')

var config = {
    apiKey: "AIzaSyD8dYeP7_oWVrViK6YaBtNC_9AN73Chb6o",
    authDomain: "testapi-18006.firebaseapp.com",
    databaseURL: "https://testapi-18006.firebaseio.com",
    projectId: "testapi-18006",
    storageBucket: "testapi-18006.appspot.com",
    messagingSenderId: "590519993392",
    appId: "1:590519993392:web:c42aad57215cfed5f319f5"
  };

var fire = firebase.initializeApp(config);
module.exports = fire