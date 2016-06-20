var BarChart= require("./chart.js");
var LineChart= require("./lineChart.js");

var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var companies = require('./data3.json');
var sampleShares = require('./data2.json');




window.onload = function(){
  var sectors = getSectors(companies);
  createSelect(sectors);

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

var getSectors = function(companies) {
  var sectorsAll = []
  for( company of companies ) {
    sectorsAll.push(company.Sector);
  }



var sectors = sectorsAll.filter(function(elem, pos) {
    return sectorsAll.indexOf(elem) == pos;
  });
  return sectors;
}

var createSelect = function(sectors) {
   var div = document.getElementById("select-container");
   var select = document.createElement('select');
   select.onchange = selectOnChange;

   for(sector of sectors) {
    var option = document.createElement('option');
    option.value = sector;
    option.innerText = sector;
    select.appendChild(option);
   }
   div.appendChild(select);
}



var selectOnChange = function() {
  console.log(this.value);
  var div = document.getElementById("company-list-container");
  var ul = document.createElement('ul');
  if(div.childNodes[0]) {
    var child = div.childNodes[0];
    div.removeChild(child);
  }
  for(company of companies) {
    if(company.Sector === this.value) {
      var li = document.createElement("li");
      li.style.cursor = "pointer";
      li.onclick = liOnClick;
      li.innerText = company.Name;
      li.id = company.Symbol;
      ul.appendChild(li);
    }
  }
  div.appendChild(ul);
}

var liOnClick = function() {
  var symbol = this.id;

  var request = new XMLHttpRequest();
  var url = "http://finance.yahoo.com/webservice/v1/symbols/"+symbol+"/quote?format=json&view=detail";
    request.open("GET", url);
    request.onload = function() {
      if( request.status === 200 ) {
        console.log("HI");
        var result = JSON.parse(request.responseText);
        var result = result.list.resources[0].resource.fields;
        console.log(result);
      }
    }
    request.send(null);
}

// var topTen = function(companies) {
//   var dataSave = []
//   var i = 0
//   // while (i < 10) {
//     symbol = companies[i].Symbol
//     // console.log(symbol);
//     var request = new XMLHttpRequest();
//     var url = "http://finance.yahoo.com/webservice/v1/symbols/"+symbol+"/quote?format=json&view=detail";
//
//       request.open("GET", url);
//       request.onload = function() {
//
//         if( request.status === 200 ) {
//           var result = JSON.parse(request.responseText);
//           var result = result.list.resources[0].resource.fields;
//           console.log("result",result);
//           // postData(result);
//           dataSave.push(result)
//
//
//         }
//        }
//
//        request.send(null);
//       i ++
//     // }
//     console.log("array",dataSave);
//     // console.log(dataSave);
//   }



  // console.log(market);



var getChangeInPriceData = function(shares) {
  y = []
  for (share of shares) {
    var data = {name: share.name, data: [share.price - share.buyPrice]}
    y.push(data)
  }
  // console.log(y);
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
  // console.log(y);
  return y
}

var pastDays = function(share) {
  x = []
  for(index of share.pastCloseOfDayPrices) {
    x.push(index)
  }
  return x
  // console.log(x);
}

var getPriceTrend = function(shares) {
  y=[]
    for(share of shares) {
      console.log(share);
      var data = {
        name: share.name,
        data: pastDays(share)
      }
      console.log(data);
      y.push(data)
    }
    return y
  }
