
  var firebaseConfig = {
    apiKey: "AIzaSyBAtwLdLN2_5wLIIbKE6yA4cxksUb3JQDY",
    authDomain: "traintime-d6931.firebaseapp.com",
    databaseURL: "https://traintime-d6931.firebaseio.com",
    projectId: "traintime-d6931",
    storageBucket: "traintime-d6931.appspot.com",
    messagingSenderId: "503452863591",
    appId: "1:503452863591:web:88782129b613056d3ad8c2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  var currentTime = moment();

  database.ref().on("child_added" , function(childSnap) {
    //variables to populate table
      var name = childSnap.val().name;
      var destination = childSnap.val().destination;
      //is this fT neccessary??
      var firstTrain = childSnap.val().firstTrain;
      var frequency = childSnap.val().frequency;
      var min = childSnap.val().min;
      var next = childSnap.val().next;
    
      $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>"+ next + "</td><td>" + min + "</td><tr>")

  });
  
  database.ref().on("value", function(snapshot) {
   
    //does this mean or do anything

  });


  $("#addTrainBtn").on("click", function() {

  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = $("#firstInput").val().trim();
  var frequency = $("#frequencyInput").val().trim();

  if (trainName == "") {
    alert('Enter a train name.');
    return false;
}
if (destination == "") {
    alert('Enter a destination.');
    return false;
}
if (firstTrain == "") {
    alert('Enter a first train time.');
    return false;
}
if (frequency == "") {
    alert('Enter a frequency');
    return false;
}
    // THE MATH!
    //subtracts the first train time back a year to ensure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    return false;


  });