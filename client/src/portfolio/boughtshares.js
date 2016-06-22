var BoughtShares = function(params) {
  this.name = params.name;
  this.price = params.price;
  this.quantity = params.quantity;

};


BoughtShares.prototype = {
  save: function(){
    var url = 'http://localhost:3000/boughtshares';
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
      }
    }
    request.send(JSON.stringify(this));
  }
}
module.exports = BoughtShares;
