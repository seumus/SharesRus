var BarChart= require("./chart.js");
var LineChart= require("./lineChart.js");

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
  changeInPriceData = getChangeInPriceData(sampleShares);
  currentPriceData = getCurrentPriceData(sampleShares);
  priceTrendData = getPriceTrend(sampleShares);

  // console.log(data);
  var container1 = document.getElementById("barChart1");
  var container2 = document.getElementById("barChart2");
  var container3 = document.getElementById("lineChart");

  new BarChart(changeInPriceData, container1);
  new BarChart(currentPriceData, container2);
  new LineChart(priceTrendData, container3);

};

var getChangeInPriceData = function(shares) {
  y = []
  for (share of shares) {
    var data = {name: share.name, data: [share.price - share.buyPrice]}
    y.push(data)
  }
  console.log(y);
  return y
}

var getCurrentPriceData = function(shares) {
  y = []
  for (share of shares) {
    var data = {
      name: share.name,
      data: [share.price]
    }
    y.push(data)
  }
  console.log(y);
  return y
}

var getPriceTrend = function(shares) {
  y=[]
  for(share of shares) {
    var data = {
      name: share.name,
      data: [share.price]
    }
    y.push(data)
  }
  return y
  }
}
