var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');


var market = new Market();
market.getShares();



window.onload = function(){
    console.log(market);
};



