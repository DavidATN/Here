//Initialize Firebase
var config = {
  apiKey: "AIzaSyB7Y5DCEpGeuz37UwuD0humCAHUOW2uJI8",
  authDomain: "hear-9083d.firebaseapp.com",
  databaseURL: "https://hear-9083d.firebaseio.com",
  storageBucket: "hear-9083d.appspot.com",
  messagingSenderId: "766933243175"
};

firebase.initializeApp(config);
geolocation();

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
  return firebase.database().ref('/chatRooms/').once('value').then(function(snapshot) {
  var chatRooms = snapshot.val().chatRooms;
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
