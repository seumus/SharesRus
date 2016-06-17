var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var sampleShares = require('./data.json');


window.onload = function(){
  var portfolio = new Portfolio();
  for(share of sampleShares){
    portfolio.addStock(new Stock(share));
  }
};
