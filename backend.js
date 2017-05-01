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
var currentChat = 'UWM Union';
var name = "Shahrukh";
var messagesArray = new Array();
var timer = setInterval(queryFirebase, 200);

//Need Nickname to navigate to lobby screen
function userLogin(userId, name, range = 10) {
  firebase.database().ref('Users/' + userId).set({
    nickname: name,
    chatRooms: 0,
    range : 10
  });
  console.log(userId);
  userId=userId;
  userRange=range;
  name=name;
}

//Once logged in, get the chat rooms
function getChatRooms(func){
  return firebase.database().ref('/chat_rooms/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    func(childKey, childData);
  });
  });
}

//create a hash of a chatRoomId, give a max number of users, a title, and the users id
function createChatRoom(title, userId, maxNumUsers=10, chatRoomId, lat, lng, password="password"){
  firebase.database().ref('chat_rooms/' +chatRoomId).set({
    lat:lat,
    lng:lng,
    guest_ids:[userId],
    maximum_number_users: maxNumUsers,
    messages:[userId,""],
    owner_id:userId,
    maxNumUsers:maxNumUsers,
    password:password,
    title:title
  });
}

function sendMessage(){
  var newPostRef = firebase.database().ref('/chat_rooms'+currentChat+'/messages').push();
  var message = $("#message-text-area").val()
  firebase.database().ref('chat_rooms/' + currentChat + '/messages/' + newPostRef.key).set({
    sender: name,
    message: message
  });

  $("#message-text-area").val('');
}

function setRange(givenRange){
  userRange=givenRange;
}

function add() {
    var listRooms = document.getElementById("chat-rooms");
    var roomCard = document.createElement("div");
    var chatText = prompt("Create new chat room: ");
    roomCard.className = "card";

    chatText = chatText.trim();
//                item.text=chatText;
//                item.appendChild("p");
//                var text = document.createElement("p");
//                text.appendChild(chatText);
//                item.add(text);

    listRooms.appendChild(roomCard);
}


function queryFirebase() {
  var ref = firebase.database().ref('/chat_rooms/'+currentChat+'/messages');
  ref.limitToLast(25).on("child_added", function(childSnapshot, prevChildKey) {
    if (!messagesArray.includes(childSnapshot.key)) {
      publishMessage(childSnapshot.key, childSnapshot.val());
    }
  })
}

function switchRoom(switchTo){
  //todo update the chatroom the user is leaving

  currentChat = switchTo;
  console.log("switching to chat room:" + switchTo);
  messagesArray = new Array;

  var newPostRef = firebase.database().ref('/chat_rooms'+currentChat+'/guest_ids').push();
  var message = userId
  firebase.database().ref('chat_rooms/' + currentChat + '/messages/' + newPostRef.key).set({
    userId
  });

}
