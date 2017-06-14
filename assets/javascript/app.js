//stores our response from ajax call 
var foodTrucks = [];

//google maps variable
var map;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDhOKTWKmEunuZ7nIHZETJ-lwLzRsHVmDE",
  authDomain: "the-jarrod-experience.firebaseapp.com",
  databaseURL: "https://the-jarrod-experience.firebaseio.com",
  projectId: "the-jarrod-experience",
  storageBucket: "the-jarrod-experience.appspot.com",
  messagingSenderId: "31955044813"
};

firebase.initializeApp(config);

//searches for food trucks based on type of food
function callFood(){
    //gets input 
    var food = $("#food-input").val().trim();
    console.log("this is food " + food);
    //api url
    var queryURL = "https://data.sfgov.org/resource/6a9r-agq8.json?$q=" + food;

    $.ajax({
      url: queryURL,
      method: "GET"
  // data:{
  //   "$limit" : 5000,
    // "$app_token" : "dVrLcfTa7uHoJirIBxSAw9eo8" TODO: throws error?
  // }
  }).done(function(response){
    //asigns response to global foodTrucks array
    foodTrucks=response;
    //adds markers to google maps for each food truck
    addTrucks();

//clear input value
$("#food-input").val(' ');
});
} //callFood endtag

$(document).on("click", "#food-search", callFood);


//google maps 

//function initMap() {
 // map = new google.maps.Map(document.getElementById('map'), {
   // zoom: 2,
   // center: new google.maps.LatLng(2.8,-187.3),
    //mapTypeId: 'terrain'
  //});
//}
 var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }



// Loop through the results array and place a marker for each
// set of coordinates.
function addTrucks(){
  //logs our response 
  console.log(foodTrucks);
  for (var i = 0; i < foodTrucks.length; i++) {
    //sets latitude and longitude of each foodTruck to variable latlng
    var latLng = new google.maps.LatLng(foodTrucks[i].latitude, foodTrucks[i].longitude);
    //creates a new marker
    var marker = new google.maps.Marker({
      //sets position as latLng variable
      position: latLng,
      //adds marker to map
      map: map
    });
  }
}
