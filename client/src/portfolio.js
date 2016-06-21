// var BarChart= require("./chart.js");
var LineChart= require("./lineChart.js");

var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var Dates = require('./portfolio/dates.js');

var companies = require('./data3.json');
var sampleShares = require('./data2.json');
var buisnesses = require('./sample.json')


window.onload = function(){

  getData(createTable);




  banner(buisnesses);
  var container3 = document.getElementById("portfolio-lineChart");
  priceTrendData = getPriceTrend(sampleShares);
  // new BarChart(changeInPriceData, container1);
  // new BarChart(currentPriceData, container2);
  new LineChart(priceTrendData, container3);

  };

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
      var span3 = document.createElement('span')
      span1.innerText = " --- "
      if (priceChange > 0){
        span2.classList.add("plus")
        span2.innerText = currentPrice + " / "  + company.name + " / " + "+" +priceChange
        span3.innerHTML = "&#9786;"
      }
      if (priceChange < 0){
        span2.classList.add("minus")
        span2.innerText =  company.name + " / "  +  currentPrice + " / " + priceChange
        span3.innerHTML = "&#9785;"
      }
      scroll.appendChild(span1)
      scroll.appendChild(span3)
      scroll.appendChild(span2)
    }
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




    var getData = function(callback) {
      console.log("hi");
        var url = "http://localhost:3000/market";
        var request = new XMLHttpRequest();
        request.open("Get", url);
        request.onload = function() {
          if(request.status === 200 ){
            var result = JSON.parse(request.responseText);
            callback(result);
          } else {
            console.log("sad")
          }
        }
       
        request.send(null);
    }

    var createTable = function(data) {
      console.log(data);
      var div = document.getElementById("following-table");
      var table = document.createElement('table');
      var tr1 = document.createElement('tr');

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
      td5.innerText = "Change Precent";
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

      for(comapany of data) {
        var tr2 = document.createElement("tr");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");
        var td10 = document.createElement("td");
        var td11 = document.createElement("td");
        var td12 = document.createElement("td");
        var td13 = document.createElement("td");
        var td14 = document.createElement("td");
        var td15 = document.createElement("td");

          td8.innerText =  comapany.name[0].name.issuer_name
          td9.innerText =   comapany.name[0].name.price;
          td10.innerText =  comapany.name[0].name.day_high;
          td11.innerText =  comapany.name[0].name.day_low;
          td12.innerText =  comapany.name[0].name.change;
          td13.innerText =  comapany.name[0].name.chg_percent;
          td14.innerText =  comapany.name[0].name.year_high;
          td14.innerText =  comapany.name[0].name.year_low;

        tr2.appendChild(td8);
        tr2.appendChild(td9);
        tr2.appendChild(td10);
        tr2.appendChild(td11);
        tr2.appendChild(td12);
        tr2.appendChild(td13);
        tr2.appendChild(td14);
        tr2.appendChild(td15);

        table.appendChild(tr2);
      }

      div.appendChild(table);
    }















