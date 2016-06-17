var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var sampleShares = require('./data.json');


window.onload = function(){
  var market = new Market();

  for(share of sampleShares){
    market.addStock(new Stock(share));
  }
  console.log(market);
  if (market.shares.length < 11) {
    market.sendStock();
  }

};
