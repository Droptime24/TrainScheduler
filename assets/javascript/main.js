// Database Config
var firebaseConfig = {
   apiKey: "AIzaSyAQlYhQ7MFnQP-fi0WaOlUpwI3F50qZBQ4",
   authDomain: "trainschedule-bb858.firebaseapp.com",
   databaseURL: "https://trainschedule-bb858.firebaseio.com",
   projectId: "trainschedule-bb858",
   storageBucket: "trainschedule-bb858.appspot.com",
   messagingSenderId: "232604700120",
   appId: "1:232604700120:web:3669b5b2637ca551"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$('#input').on("click", function (event) {

   event.preventDefault();

   // add variable to hold input data
   var train = $('#train').val().trim();
   var destination = $('#destination').val().trim();
   var military = $('#military').val().trim();
   var minutes = $('#min').val().trim();

   // create object used to add input data
   var data = {
      train: train,
      destination: destination,
      military: military,
      minutes: minutes,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
   }

   // push object data to database
   database.ref().push(data)
   console.log(data.train)
   console.log(data.destination)
   console.log(data.military)
   console.log(data.minutes)
   alert("ALL ABOARD!")

   // clear inuput data
   $('#train').val("");
   $('#destination').val("");
   $('#military').val("");
   $('#min').val("");
});

database.ref().on("child_added", function (childSnapshot) {
   console.log(childSnapshot.val());
  
   var train = $('#train').childSnapshot.val().name;
   var destination = childSnapshot.val().location;
   var military = childSnapshot.val().time;
   var min = childSnapshot.val().minutes;
  
});
// var newTr = $('<tr>');
// var newTd = $('<td>');
// $('#train').append('')