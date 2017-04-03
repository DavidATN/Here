//Initialize Firebase
var config = {
  apiKey: "AIzaSyB7Y5DCEpGeuz37UwuD0humCAHUOW2uJI8",
  authDomain: "hear-9083d.firebaseapp.com",
  databaseURL: "https://hear-9083d.firebaseio.com",
  storageBucket: "hear-9083d.appspot.com",
  messagingSenderId: "766933243175"
};

firebase.initializeApp(config);

var database = firebase.database();
var userId = 0;
var range = 10;
var chatRooms = [0];
var currentChat = 0;

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
  return firebase.database().ref('/chat_rooms/').once('value').then(function(snapshot) {
    var chatRooms = snapshot.val().chatRooms;
    console.log(chatRooms);
  });
}

//create a hash of a chatRoomId, give a max number of users, a title, and the users id
function createChatRoom(title, userId, maxNumUsers=10, chatRoomId, gpsCoordinate, password="password"){
  firebase.database().ref('/chat_rooms/' +chatRoomId).set({
    gps_coordinates:gpsCoordinate,
    guest_ids:[0],
    maximum_number_users: maxNumUsers,
    messages:[userId,""],
    owner_id:userId,
    maxNumUsers:maxNumUsers,
    password:password,
    title:title
  });
}

function sendMessage(chatRoomId,userId,message){
  firebase.database().ref('/chat_rooms/'+chatRoomId+'/messages').set({
    user_id: userId,
    message: message
  });
}

function setRange(givenRange){
  userRange=givenRange;
}

function geolocation() {
  var startPos;
  var geoOptions = {
     timeout: 2 * 1000
  }

  var geoSuccess = function(position) {
    startPos = position;
    //document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    //document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}
