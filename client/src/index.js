// var BarChart= require("./chart.js");
var LineChart= require("./lineChart.js");

var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var Dates = require('./portfolio/dates.js');
var BoughtShares = require('./portfolio/boughtshares.js');

var companies = require('./data3.json');
var sampleShares = require('./data2.json');
var buisnesses = require('./sample.json')


var databaseStuff = []

window.onload = function(){
  // banner(buisnesses);
  var sectors = getSectors(companies);
  createSelect(sectors);
  ftseLoad();


  changeInPriceData = getChangeInPriceData(sampleShares);
  currentPriceData = getCurrentPriceData(sampleShares);
  priceTrendData = getPriceTrend(sampleShares);

  // console.log(data);
  // var container1 = document.getElementById("barChart1");
  // var container2 = document.getElementById("barChart2");
  var container3 = document.getElementById("lineChart");

  // new BarChart(changeInPriceData, container1);
  // new BarChart(currentPriceData, container2);

 getSearch();


};

var ftseLoad = function(){
var url = 'https://spreadsheets.google.com/feeds/list/0AhySzEddwIC1dEtpWF9hQUhCWURZNEViUmpUeVgwdGc/1/public/basic?alt=json'

var request = new XMLHttpRequest();
request.open("Get", url);
    request.onload = function() {
      if(request.status === 200) {
      console.log("got the data")
      var jsonString = request.responseText
      var info = JSON.parse(jsonString)
      var companies = info.feed.entry
      banner(companies)
      }
    }
    request.send(null);
}

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

  var c = company.content.$t
  var com = c.split(" ")
  var priceChange = com[com.length-1]
  var span1 = document.createElement('span')
  var span2 = document.createElement('span')
  var span3 = document.createElement('span')
  span1.innerText = " --- "
    if (priceChange > 0){
    span2.classList.add("plus")
    span2.innerText = c
    span3.innerHTML = "&#9786;"
    }
    if (priceChange < 0){
    span2.classList.add("minus")
    span2.innerText =  c
    span3.innerHTML = "&#9785;"
    }
  scroll.appendChild(span1)
  scroll.appendChild(span3)
  scroll.appendChild(span2)
  }
}

var selectOnChange = function() {
  console.log(this.value);
  var div = document.getElementById("company-list-container");
  var ul = document.createElement('ul');
  if(div.childNodes[0]) {
    var child = div.childNodes[0];
    console.log("child",child)
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
        clearBio();
      });
      li.innerText = company.Name;
      li.id = company.Symbol;
      ul.appendChild(li);
    }
  }
  div.appendChild(ul);
}

var liOnClick = function(that) {
  databaseStuff = []
  var symbol = that.id || that;

  var request = new XMLHttpRequest();
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+symbol+"%22%20and%20startDate%20%3D%20%222015-06-20%22%20and%20endDate%20%3D%20%222016-06-20%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    request.open("GET", url);
    request.onload = function() {
      if( request.status === 200 ) {
        // console.log("HI");
        var result = JSON.parse(request.responseText);
        var result = result.query.results.quote;
        // console.log("THIS ONE",result[0]);
        var container3 = document.getElementById("lineChart");
        var priceTrendData2 = getPriceTrendCont(result)
        var dates = getDates(result)
        var button = document.getElementById('follow-button')
        var button4 = document.getElementById('buy-button')

        var dateObj = new Dates({dates:result})
        databaseStuff.push(dateObj)
        dataAll = new Portfolio()
        dataAll.addStock(databaseStuff)
        button.addEventListener("click", function() {
          dataAll.save();
          databaseStuff = []
          console.log("HEREEEEE",dataAll);
        })
        button4.addEventListener("click", function() {

          var input = document.getElementById('buyInput')
          console.log(input.value);
          var cheese = new BoughtShares({name: databaseStuff[0].name.name, price: databaseStuff[0].name.price, quantity: input.value})
          console.log(cheese);
          cheese.save();
        })

        // dateObj.save();
        dates = dates.reverse();
        new LineChart(priceTrendData2, container3, dates);

      }
    }
    request.send(null);
}

var getEverything = function(that) {
  databaseStuff = []
  var symbol = that.id || that;


    var url = "http://finance.yahoo.com/webservice/v1/symbols/"+symbol+"/quote?format=json&view=detail"

    var request = new XMLHttpRequest();
    request.open("Get", url);
    request.onload = function() {
      if(request.status === 200) {
        var result = JSON.parse(request.responseText);
        var result = result.list.resources[0].resource.fields;
        console.log("THIS",result);
        var stock = new Stock({name:result})
        var button2 = document.getElementById('follow-button')
        console.log(stock);

        databaseStuff.push(stock)

        // button2.addEventListener("click", function() {
        //   stock.save();
        // })
        // stock.save();


        displayInfo(result);

      }
    }
    request.send(null);
}



var displayInfo = function(company) {
  var infoBox = document.getElementById("company-description")
  infoBox.innerText = company.name

  var table = document.createElement("table");
  var tr1 = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");
  var td7 = document.createElement("td");
  td1.innerText = "Price";
  td2.innerText = "Day High";
  td3.innerText = "Day Low";
  td4.innerText = "Change";
  td5.innerText = "Change Percent";
  td6.innerText = "Year High";
  td7.innerText = "Year Low";

  tr1.appendChild(td1);
  tr1.appendChild(td2);
  tr1.appendChild(td3);
  tr1.appendChild(td4);
  tr1.appendChild(td5);
  tr1.appendChild(td6);
  tr1.appendChild(td7);

  table.appendChild(tr1);

  var tr2 = document.createElement("tr");
  var td8 = document.createElement("td");
  var td9 = document.createElement("td");
  var td10 = document.createElement("td");
  var td11 = document.createElement("td");
  var td12 = document.createElement("td");
  var td13 = document.createElement("td");
  var td14 = document.createElement("td");

    td8.innerText = company.price;
    td9.innerText =  company.day_high;
    td10.innerText = company.day_low;
    td11.innerText = company.change;
    td12.innerText =  company.chg_percent;
    td13.innerText =  company.year_high;
    td14.innerText =  company.year_low;

  tr2.appendChild(td8);
  tr2.appendChild(td9);
  tr2.appendChild(td10);
  tr2.appendChild(td11);
  tr2.appendChild(td12);
  tr2.appendChild(td13);
  tr2.appendChild(td14);

  table.appendChild(tr2);
  infoBox.appendChild(table);

  var button = document.createElement('button');
  var button2 = document.createElement('button');
  var input = document.createElement('input');
  input.id = "buyInput"
  input.type = 'number'
  input.value = 1

  button.innerText = "Follow";
  button2.innerText = "Buy"
  button.id = "follow-button";
  button2.id = "buy-button";

  infoBox.appendChild(button);
  infoBox.appendChild(input);
  infoBox.appendChild(button2);


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
               liOnClick(name);
               getEverything(name);
    });
  }

  var clearBio = function() {
    var bio = document.getElementById('bio')
    bio.style.visibility = "hidden"
    console.log("something", bio)
  }
