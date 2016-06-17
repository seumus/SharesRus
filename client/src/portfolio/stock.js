var Stock = function(params) {
  this.name = params.name;
  this.epic = params.epic;
  this.price = params.price;
  this.quantity = params.quantity;
  this.buyPrice = params.buyPrice;
  this.pastCloseOfDayPrices = params.pastCloseOfDayPrices;
  this.buyDate = params.buyDate;
};

module.exports = Stock;
