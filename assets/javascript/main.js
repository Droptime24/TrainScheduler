// Database Config
var firebaseConfig = {
   apiKey: "AIzaSyAQlYhQ7MFnQP-fi0WaOlUpwI3F50qZBQ4",
   authDomain: "trainschedule-bb858.firebaseapp.com",
   databaseURL: "https://trainschedule-bb858.firebaseio.com",
   projectId: "trainschedule-bb858",
   storageBucket: "trainschedule-bb858.appspot.com",
   messagingSenderId: "232604700120",
   appId: "1:232604700120:web:3669b5b2637ca551"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainInfo = firebase.database();

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
   trainInfo.ref().push(data)
   console.log(data.train)
   console.log(data.destination)
   console.log(data.military)
   console.log(data.minutes)
   console.log(data.dateAdded)
   alert("ALL ABOARD!")

   // clear inuput data
   $('#train').val("");
   $('#destination').val("");
   $('#military').val("");
   $('#min').val("");
});

// get data from my database and put on screen
trainInfo.ref().on("child_added", function (Snapshot) {
   console.log(Snapshot.val());

   // geting data
   var trainName = Snapshot.val().train;
   var endDest = Snapshot.val().destination;
   var milTime = Snapshot.val().military;
   var inMin = Snapshot.val().minutes;

   console.log(trainName)
   console.log(endDest)
   console.log(milTime)
   console.log(inMin)

   // add time calculatins

   // adding data to screen
   var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(endDest),
      $("<td>").text(milTime),
      $("<td>").text(inMin),
   );

   $("#train-table > tBody").append(newRow);

});
