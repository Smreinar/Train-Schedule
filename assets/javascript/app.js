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



});