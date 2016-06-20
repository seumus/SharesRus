var Stock = require('./stock.js');

var Market = function() {
  this.shares = []
}

Market.prototype = {
  addStock: function(share){
    this.shares.push(share);
  },
  populateShares: function(shares) {
    for(share of shares ) {
      var newShare = new Stock(share);
     this.shares.push(newShare);
    }
    
  },

  getShares: function() {
    var url = "http://localhost:3000/market"
     var request = new XMLHttpRequest();
     request.open("Get", url);
     request.onload = function() {
       if(request.status === 200 ) {
         var result = JSON.parse(request.responseText);
         this.populateShares(result);
       }
     }.bind(this);
   request.send(null);
   }
}

module.exports = Market;
