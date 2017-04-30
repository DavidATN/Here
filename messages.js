function publishMessages(childKey, childData) {
  if (childKey == currentChat) {
    var messages = childData.messages
    var e = $("#messages");
    for (var property in messages) {
      messagesArray.push(property);
      $("<p>" + childData.messages[property].sender + "</p>").appendTo(e[0]);
      var m = "<div class='chat-body1 clearfix'><p>" + childData.messages[property].message + "</p><div class='chat_time pull-right'>09:40PM</div></div>";
      $(m).appendTo(e[0]);
    }
  }
}

function publishMessage(childKey, childData) {
  var e = $("#messages");
  messagesArray.push(childKey);
  $("<p>" + childData.sender + "</p>").appendTo(e[0]);
  var m = "<div class='chat-body1 clearfix'><p>" + childData.message + "</p><div class='chat_time pull-right'>09:40PM</div></div>";
  $(m).appendTo(e[0]);

  var objDiv = document.getElementById("chat_area");
  objDiv.scrollTop = objDiv.scrollHeight;
}

getChatRooms(publishMessages);
