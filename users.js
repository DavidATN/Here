function publishUsers(childKey, childData) {
  if (childKey == currentChat) {
    console.log('Adding users');
    var e = $("#userList");
    for (var i=0; i < childData.guest_ids.length; i++) {
      var m = "<li><span class='chat-img pull-left'><img src='http://rs253.pbsrc.com/albums/hh44/Gavener_Purl/poptart1red1.gif~c200' alt='User Avatar' class='img-circle'></span><div class='chat-body clearfix'><div class='header_sec'><strong class='primary-font'>Jack Sparrow</strong><strong class='pull-right'></strong></div></div></li>";
      $(m).appendTo(e[0]);
    }
  }
}

getChatRooms(publishUsers);
