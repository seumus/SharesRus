var Stock = function(params) {
  this.name = params.name;
  // this.epic = params.epic;
  // this.price = params.price;
  // this.quantity = params.quantity;
  // this.buyPrice = params.buyPrice;
  // this.pastCloseOfDayPrices = params.pastCloseOfDayPrices;
  // this.buyDate = params.buyDate;
};



Stock.prototype = {
  save: function(){
    var url = 'http://localhost:3000/market';
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
module.exports = Stock;
