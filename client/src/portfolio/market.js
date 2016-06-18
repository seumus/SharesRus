var Market = function() {
  this.shares = []
}

Market.prototype = {
  addStock: function(share){
    this.shares.push(share);
  } 
}

module.exports = Market;
