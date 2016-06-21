
var Portfolio = function() {
  this.shares = []
}



Portfolio.prototype = {
  addStock: function(share){
    this.shares.push(share);
  },
  save: function(){
    var url = 'http://localhost:3000/shares';
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
      }
    }
    request.send(JSON.stringify(this));
  }
};




module.exports = Portfolio;
