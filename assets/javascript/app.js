// Making use of document ready
$(document).ready(function () {
    // Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAFPvnzuMOWSneIzVLqfzeWIffSzhPNX6E",
        authDomain: "train-schedule-bootstrap.firebaseapp.com",
        databaseURL: "https://train-schedule-bootstrap.firebaseio.com",
        projectId: "train-schedule-bootstrap",
        storageBucket: "train-schedule-bootstrap.appspot.com",
        messagingSenderId: "347803051260",
        appId: "1:347803051260:web:7a29e5d1a98a0584dd6379"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Firebase.Database stored as a variable
    var database = firebase.database();


    //Add To Board Table
    $("#submit").on("click", function() {
        event.preventDefault();

        //holding varibles from user
        var Tname = $("#trainName").val().trim();
        var Tdest = $("#trainDestin").val().trim();
        var Ttime = moment($("#trainStart").val().trim(), 'HH:mm').format("X");
        var Tfreq = $("#trainFrequency").val().trim();

        //new user/train info 
        var newTrain = {
            name: Tname,
            destination: Tdest,
            frequency: Tfreq,
            arrival: Ttime,
        };

        //pushes new values 
        database.ref().push(newTrain);

        //log newTrain info 
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.arrival);

        //clears text box after
        $("#trainName").val("");
        $("#trainDestin").val("");
        $("#trainStart").val("");
         $("#trainFrequency").val("");

    });

    //returning database input
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        var startTime = moment(childSnapshot.val().arrival, "X").subtract(1, "years");
        console.log(startTime + " start Time")
        var diffTime = moment().diff(moment(startTime), "minutes");
        console.log(diffTime + "  Time differce ")

        var tRem = diffTime % childSnapshot.val().frequency;
        console.log(tRem + " Time Remaining");

        var tMin = childSnapshot.val().frequency - tRem;
        console.log(tMin + "min left");

        var nextT = moment().add(tMin, "minutes");
        console.log(nextT + "next Train");

        $("#name").append("<div><span class='member'>" + childSnapshot.val().name);
        $("#destination").append("<div><span class='member'>" + childSnapshot.val().destination);
        $("#frequency").append("<div><span class='member'>" + childSnapshot.val().frequency);
        $("#arrival").append("<div><span class='member'>" + nextT.format("HH:mm"));
        $("#MinsAway").append("<div><span class='member'>" + tMin);
         
    });

});