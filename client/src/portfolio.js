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
  banner(buisnesses);

  // priceTrendData = getPriceTrend(sampleShares);


  getData(getDatesCont);
  // console.log('x',cheese);


  };

  var banner = function(companies){
    var scroll = document.getElementById("scroll")
    for (company of companies){
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
    for(index of share.shares['0'][1].dates) {
      // console.log(index.Close);
      x.push(parseInt(index.Close))
    }
    return x
    // console.log(x);
  }

  // var pastDaysCont = function(share) {
  //   x = []
  //   for(index of share) {
  //     x.push(index.close)
  //   }
  //   return x
  //   // console.log(x);
  // }

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



  // var getPriceTrend = function(shares) {
  //   y=[]
  //     for(share of shares) {
  //       // console.log(share);
  //       var data = {
  //         name: share.name,
  //         data: pastDays(share)
  //       }
  //       // console.log(data);
  //       y.push(data)
  //     }
  //     return y
  //   }



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
      var url = "http://localhost:3000/market"
       var request = new XMLHttpRequest();
       request.open("Get", url);
       request.onload = function() {
         if(request.status === 200 ) {
           var result = JSON.parse(request.responseText);
           callback(result)
         }
       }
     request.send(null);
     }

     var getDatesCont = function(data) {
       y = []
      //  console.log(data[0].shares[0]);
       x = data[0].shares
       console.log('x', x);
       for(entry of data) {
        //  console.log(entry.shares['0'][1].dates);
         var data2 = {
           name: entry.shares['0'][0].name.name,
           data: pastDays(entry)
         }
         // console.log(data);
         y.push(data2)
       }
      //  console.log('y',y);
       var container3 = document.getElementById("portfolio-lineChart");
       new LineChart(y, container3);
      //  return y

       }
