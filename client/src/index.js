// var BarChart= require("./chart.js");
var LineChart= require("./lineChart.js");

var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');

var companies = require('./data3.json');
var sampleShares = require('./data2.json');
var buisnesses = require('./sample.json')




window.onload = function(){
  banner(buisnesses);
  var sectors = getSectors(companies);
  createSelect(sectors);


  changeInPriceData = getChangeInPriceData(sampleShares);
  currentPriceData = getCurrentPriceData(sampleShares);
  priceTrendData = getPriceTrend(sampleShares);

  // console.log(data);
  // var container1 = document.getElementById("barChart1");
  // var container2 = document.getElementById("barChart2");
  var container3 = document.getElementById("lineChart");

  // new BarChart(changeInPriceData, container1);
  // new BarChart(currentPriceData, container2);
  new LineChart(priceTrendData, container3);
 
 getSearch();



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

var banner = function(companies){
  var scroll = document.getElementById("scroll")
  for (company of companies){
    // console.log(company)
    // console.log(company.pastCloseOfDayPrices[6])
    var price = company.price - company.pastCloseOfDayPrices[6]
    var priceChange = price.toFixed(2);
    var currentPrice = company.price.toFixed(2)
    // console.log(priceChange)
    var span1 = document.createElement('span')
    var span2 = document.createElement('span')
    span1.innerText = " --- "
    span2.innerText = currentPrice + " - " + company.name + " - " + priceChange
    if (priceChange > 0){
      span2.classList.add("plus")
    }
    if (priceChange < 0){
      span2.classList.add("minus")
    }
    scroll.appendChild(span1)
    scroll.appendChild(span2)
  }
}

var selectOnChange = function() {
  // console.log(this.value);
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
      li.addEventListener("click", function() {
        var that = this;
        liOnClick(that);
        getEverything(that);
      });
      li.innerText = company.Name;
      li.id = company.Symbol;
      ul.appendChild(li);
    }
  }
  div.appendChild(ul);
}

var liOnClick = function(that) {
  
  var symbol = that.id || that;

  var request = new XMLHttpRequest();
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+symbol+"%22%20and%20startDate%20%3D%20%222015-06-20%22%20and%20endDate%20%3D%20%222016-06-20%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    request.open("GET", url);
    request.onload = function() {
      if( request.status === 200 ) {
        // console.log("HI");
        var result = JSON.parse(request.responseText);
        var result = result.query.results.quote;
        // console.log("THIS ONE",result);
        var container3 = document.getElementById("lineChart");
        var priceTrendData2 = getPriceTrendCont(result)
        var dates = getDates(result)
        dates = dates.reverse();
        new LineChart(priceTrendData2, container3, dates);

      }
    }
    request.send(null);
}


var displayInfo = function(company) {
  var infoBox = document.getElementById("company-description")
  infoBox.innerText = company.name
  var p1 = document.createElement("p1");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");
  var p4 = document.createElement("p");
  var p5 = document.createElement("p");
  var p6 = document.createElement("p");
  var p7 = document.createElement("p");
  p1.innerText = "Price: £" + company.price;
  p2.innerText = "Day High: £" + company.day_high;
  p3.innerText = "Day Low: £" + company.day_low;
  p4.innerText = "Change: £" + company.change;
  p5.innerText = "Change Percent: %" + company.chg_percent;
  p6.innerText = "Year High: £" + company.year_high;
  p7.innerText = "Year Low: £" + company.year_low;
  infoBox.appendChild(p1);
  infoBox.appendChild(p2);
  infoBox.appendChild(p3);
  infoBox.appendChild(p4);
  infoBox.appendChild(p5);
  infoBox.appendChild(p6);
  infoBox.appendChild(p7);
  console.log(company);
}




var getEverything = function(that) {
  var symbol = that.id || that;


    var url = "http://finance.yahoo.com/webservice/v1/symbols/"+symbol+"/quote?format=json&view=detail"

    var request = new XMLHttpRequest();
    request.open("Get", url);
    request.onload = function() {
      if(request.status === 200) {
        var result = JSON.parse(request.responseText);
        var result = result.list.resources[0].resource.fields;
        displayInfo(result);
        
      }
    }
    request.send(null);
}





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

var pastDaysCont = function(share) {
  x = []
  for(index of share) {
    x.push(index.close)
  }
  return x
  // console.log(x);
}

var getPriceTrendCont = function(shares) {
  var y=[]
  var close = []
  for(share of shares) {
    close.push(parseInt(share.Close))
    }
    // console.log(close);
      // console.log(share);
      var data = {
        name: 'share',
        data: close
      }
      // console.log(data);
      y.push(data)
      // console.log("y",y);
      return y
    }



var getPriceTrend = function(shares) {
  y=[]
    for(share of shares) {
      // console.log(share);
      var data = {
        name: share.name,
        data: pastDays(share)
      }
      // console.log(data);
      y.push(data)
    }
    return y
  }



  var getDates = function(shares) {
    y = []
    for(share of shares) {
      y.push(share.Date)
    }
    return y
  }

  var getSearch = function() {
    var form = document.getElementById("search");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      var input = document.getElementsByTagName("input")[0];
      var name = input.value;
      for(company of companies) {
        if(company.Name === name ){
          
          liOnClick(company.Symbol);
          getEverything(company.Symbol);
        }
      }
    });
  }

















