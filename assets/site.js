
  var firebaseConfig = {
    apiKey: "AIzaSyASc-HLDAP3_4nc4ZpSwgr-YYQYTSt-MT8",
    authDomain: "fir-1-f21a4.firebaseapp.com",
    databaseURL: "https://fir-1-f21a4.firebaseio.com",
    projectId: "fir-1-f21a4",
    storageBucket: "",
    messagingSenderId: "119976707166",
    appId: "1:119976707166:web:8bd9f630b29a4fbf94e0cf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  var currentTime = moment();

  database.ref().on("child_added" , function(childSnap) {


  });
  