var makeCall = function(url, method, callBack) {
  var request = new XMLHttpRequest();
  request.open(method, url);
}

function() {
    var url = "http://localhost:3000/countries";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if (request.status === 200) {
      }
    };
    request.send(JSON.stringify(this));
  }