var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');



window.onload = function(){
  var market = new Market();
  market.getStock(market.addStock)

  console.log(market);

};


