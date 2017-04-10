//Initialize Firebase
var config = {
  apiKey: "AIzaSyB7Y5DCEpGeuz37UwuD0humCAHUOW2uJI8",
  authDomain: "hear-9083d.firebaseapp.com",
  databaseURL: "https://hear-9083d.firebaseio.com",
  storageBucket: "hear-9083d.appspot.com",
  messagingSenderId: "766933243175"
};
var firebase;
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
function getChatRooms(addMarkerFunc){
  return firebase.database().ref('/chat_rooms/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childData);
    var lati = childData.lat;
    var long = childData.lng;
    var loc = {lat: lati, lng: long};
    addMarkerFunc(loc);
    // ...
  });
  });
}

//create a hash of a chatRoomId, give a max number of users, a title, and the users id
function createChatRoom(title, userId, maxNumUsers=10, chatRoomId, lat, lng, password="password"){
  firebase.database().ref('chat_rooms/' +chatRoomId).set({
    lat:lat,
    lng:lng,
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
