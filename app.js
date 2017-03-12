
function init() {
  var config = {
    apiKey: "AIzaSyB7Y5DCEpGeuz37UwuD0humCAHUOW2uJI8",
    authDomain: " hear-9083d.firebaseapp.com",
    databaseURL: "https://hear-9083d.firebaseio.com",
  };
  firebase.initializeApp(config);

  var statsDiv = document.getElementById("stats");
  var stat = '';
  for (var property in firebase) {
    stat += property + ': ' + firebase[property]+'; ';
  }
  var statText = document.createTextNode(stat);
  statsDiv.appendChild(statText);
}
