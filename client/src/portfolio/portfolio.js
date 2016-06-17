
var Portfolio = function() {
  this.shares = []
}



Portfolio.prototype = {
  addStock: function(share){
    this.shares.push(share);
  }
};

module.exports = Portfolio;

