
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDsG_cgCMM3LQ_HVEYzl6ekypeW8RhobmU",
    authDomain: "my-awe-3b724.firebaseapp.com",
    databaseURL: "https://my-awe-3b724.firebaseio.com",
    projectId: "my-awe-3b724",
    storageBucket: "my-awe-3b724.appspot.com",
    messagingSenderId: "655595083565"
  };
  firebase.initializeApp(config);
var firebase;
firebase.initializeApp(config);

var database = firebase.database();
var range = 10;
var chatRooms = [];
var currentChat = 'UWM Union';
var name;
var messagesArray = new Array();
var timer = setInterval(queryFirebase, 200);
var chatRoomPass = "password";
var switchingTo = "";

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


function seeIfPasswordExists(switchTo){

  switchingTo = switchTo;

  firebase.database().ref('/chat_rooms/'+switchTo).once('value').then(function(snapshot){
      console.log("the switching to" + snapshot.val().password);
      var chatRoomPass=snapshot.val().password;

      if (snapshot.val().password == "password"){
        console.log("we got here!" + snapshot.val().password);
        switchRoom(switchTo);
      }
      else{
        console.log("Didn't get here" + snapshot.val().password);
        $('#passwordModal').modal('show');
      }
    });
}

function checkThePassword(){
  console.log("checkingthepassword!!!!");

  var givenPassword = document.getElementById("GuestChatRoomPassword").value;

  firebase.database().ref('/chat_rooms/'+switchingTo).once('value').then(function(snapshot){
      console.log("the switching to" + snapshot.val().password);
      var chatRoomPass=snapshot.val().password;

      if (snapshot.val().password == givenPassword){
        console.log("theyMatched" + givenPassword);
        switchRoom(switchingTo);
        $('#passwordModal').modal('hide');
      }
    });

  }

// Get the modal
var passwordModal = document.getElementById('passwordModal');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == passwordModal) {
    passwordModal.style.display = "none";
  }
}











function switchRoom(switchTo){
  clearInterval(timer);
  console.log("switching to " + switchTo);
  currentChat = switchTo;
  messagesArray = new Array;
  $("#messages").empty();
  $("#userList").empty();
  getChatRooms(publishUsers);
  timer = setInterval(queryFirebase, 200);
}
