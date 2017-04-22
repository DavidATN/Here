function publishMessages(childData) {
  var e = $("#messages");
  for (var i=0; i < childData.messages.length; i++) {
    $("<p>Name Goes Here</p>").appendTo(e[0]);
    var m = "<div class='chat-body1 clearfix'><p>" + childData.messages[i] + "</p><div class='chat_time pull-right'>09:40PM</div></div>";
    $(m).appendTo(e[0]);
  }
}

getChatRooms(publishMessages);
