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
   }

   // push object data to database
   trainInfo.ref().push(data)
   console.log(data.train)
   console.log(data.destination)
   console.log(data.military)
   console.log(data.minutes)
   // console.log(data.dateAdded)
   alert("Schedule Updated")

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
   var destination = Snapshot.val().destination;
   var inMin = Snapshot.val().minutes;
   var milTime = Snapshot.val().military;

   // first train arives
   var firstTrain = moment(milTime).subtract(1, "years");
   console.log(firstTrain);

   // time now
   var now = moment();
   console.log(moment(now).format("hh:mm a"));

   // time difference
   var timeAdjust = moment().diff(moment(firstTrain), "minutes");
   console.log(timeAdjust);

   // Time apart (remainder)
   var timeDiff = timeAdjust % inMin;
   console.log(timeDiff);

   // Minute Until Train
   var ariveAt = inMin - timeDiff;
   console.log(ariveAt);

   // Next Train
   var nextArival = moment().add(ariveAt, "minutes");
   console.log(moment(nextArival).format("hh:mm a"));

   // adding data to screen
   var newRow = $(`<tr class="text-primary">`).append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(`Every ${inMin} Minutes`),
      $("<td>").text(moment(nextArival).format("hh:mm a")),
      $("<td>").text(ariveAt),
   );

   $("tBody").append(newRow);
   
}, function (errorObject) {
   console.log("Errors handled: " + errorObject.code);
});
