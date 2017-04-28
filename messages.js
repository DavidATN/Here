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

getChatRooms(publishMessages);
