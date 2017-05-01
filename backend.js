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
var range = 10;
var chatRooms = [0];
var currentChat = 'NB';
var name;
var messagesArray = new Array();
var timer = setInterval(queryFirebase, 200);

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
function createChatRoom(title, name, maxNumUsers=10, chatRoomId, lat, lng, password="password"){
  firebase.database().ref('chat_rooms/' +chatRoomId).set({
    lat:lat,
    lng:lng,
    guest_ids:[name],
    maximum_number_users: maxNumUsers,
    messages:[],
    owner_id:name,
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
  // if (currentChat = 'UWM Union'){
  //   var newPostRef = firebase.database().ref('/chat_rooms'+currentChat+'/guest_ids/');
  //   ref.child(userId).remove();
  // }

  currentChat = switchTo;
  console.log("switching to chat room:" + switchTo);
  // var messageRef = firebase.database().ref('/chat_rooms/'+currentChat+'/messages/');
  // messageRef.on('value', function(snapshot){
  //     messagesArray = snapshot.val();
  // });



  var newPostRef = firebase.database().ref('/chat_rooms'+currentChat+'/guest_ids').push();
  var message = userId
  firebase.database().ref('chat_rooms/' + currentChat + '/guest_ids/' + newPostRef.key).set({
    userId
  });

    console.log("sucessfully switched to:" + currentChat);
}
