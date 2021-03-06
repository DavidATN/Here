var map;
var markers = [];
var chatRooms =[];

function initMap() {
  map = new google.maps.Map(document.getElementById('map1'), {
    center: {lat: 43.0292059, lng: -87.9093327},
    zoom: 18
  });
    // google.maps.event.trigger(map, 'resize');
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  map.addListener('click', function(event) {
    var loc = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    addMarker(loc);

  });

  setMapOnAll();
    google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
    });

    // for (i = 0; i < markers.length; i++){
    //     markers[i].addListener('click', function() {
    //         console.log('Test');
    //         switchRoom();
    //     });
    // }

}

// Adds a marker to the map and push to the array.
function addMarkerFromFireabase(childKey, childData) {
  chatRooms.push(childKey);
  var lati = childData.lat;
  var long = childData.lng;
  var loc = {lat: lati, lng: long};
  var marker = new google.maps.Marker({
    position: loc,
    map: map
  });

  marker.addListener('click', function() {
          console.log('clicked on existing chat');
          seeIfPasswordExists(childKey);
          //switchRoom(childKey);
    });

  markers.push(location);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });

    title = document.getElementById("ChatRoomTitle").value=""
    document.getElementById("ChatRoomPassword").value=""

    $('#myModal').modal('show');
  //modal.style.display = "block";

  markers.push(location);
    marker.addListener('click', function() {
        console.log('switching to new chat room: '+ document.getElementById("ChatRoomTitle").value);
        //seeIfPasswordExists(document.getElementById("ChatRoomTitle").value);
        switchRoom(document.getElementById("ChatRoomTitle").value);
    });

}




getChatRooms(addMarkerFromFireabase);


                                  // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
//var spansd = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
// spansd.onclick = function() {
//     modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function createChatRoomBut() {
  var curpos = markers[markers.length - 1];
  var chatRoomId = document.getElementById("ChatRoomTitle").value;
  var password = document.getElementById("ChatRoomPassword").value;
  if (password==""){
    password="password";
  }
  var title = document.getElementById("ChatRoomTitle");
  var userId = name;

  createChatRoom(title, userId, maxNumUsers=10, chatRoomId, curpos.lat, curpos.lng, password);
    $('#myModal').modal('hide');
    switchRoom(document.getElementById("ChatRoomTitle").value);
}
