//Initialize Firebase
var config = {
  apiKey: "AIzaSyB7Y5DCEpGeuz37UwuD0humCAHUOW2uJI8",
  authDomain: "hear-9083d.firebaseapp.com",
  databaseURL: "https://hear-9083d.firebaseio.com",
  storageBucket: "hear-9083d.appspot.com",
  messagingSenderId: "766933243175"
};

firebase.initializeApp(config);
//geolocation();
getChatRooms();

var database = firebase.database();
var userId = 0;
var range = 10;
var chatRooms = [0];

//Need Nickname to navigate to lobby screen
function userLogin(userId, name, range = 10) {
  firebase.database().ref('Users/' + userId).set({
    nickname: name,
    chatRooms: 0,
    range : 10
  });
  userId=userId;
  userRange=range;
}

//Once logged in, get the chat rooms
function getChatRooms(){
  return firebase.database().ref('/Messages/').once('value').then(function(snapshot) {
  var chatRooms = snapshot.val().chatRooms;
  console.log(chatRooms);
});
}

//create a hash of a chatRoomId, give a max number of users, a title, and the users id
function createChatRoom(title, userId, maxNumUsers=10, chatRoomID){
  firebase.database().ref('/Chat_rooms/' + chatRoomID).set({
    title: title,
    ownerID: userID,
    maxNumUsers:maxNumUsers,
    messages:["first message"]
  });
}

function setRange(givenRange){
  userRange=givenRange;
}

function geolocation() {
  if (navigator.geolocation) {
  console.log('Geolocation is supported!');
  }
  else {
    console.log('Geolocation is not supported for this Browser/OS.');
  }

  var startPos;
  var nudge = document.getElementById("nudge");

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}
