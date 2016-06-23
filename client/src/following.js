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

  ftseLoad();

  // priceTrendData = getPriceTrend(sampleShares);



  getData(getDatesCont);
  // console.log('x',cheese);
  forcast();

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
         var td88 = document.createElement("td");
         var td99 = document.createElement("td");
         td99.classList.add("hidden")

         td1.innerText = "Name";
         td2.innerText = "Price";
         td3.innerText = "Day High";
         td4.innerText = "Day Low";
         td5.innerText = "Change";
         td6.innerText = "Change %";
         td7.innerText = "Year Low";
         td88.innerText = "Year High";
         td99.innerText = "Forcast";

         tr1.appendChild(td1);
         tr1.appendChild(td2);
         tr1.appendChild(td3);
         tr1.appendChild(td4);
         tr1.appendChild(td5);
         tr1.appendChild(td6);
         tr1.appendChild(td7);
         tr1.appendChild(td88);
         tr1.appendChild(td99);

         table.appendChild(tr1);

         for(var i = 0; i < data.length; i++ ) {
           var tr2 = document.createElement("tr");
           tr2.id = data[i]._id;
           var td100 = document.createElement('td');
           var td8 = document.createElement("td");
           var td9 = document.createElement("td");
           var td10 = document.createElement("td");
           var td11 = document.createElement("td");
           var td12 = document.createElement("td");
           var td13 = document.createElement("td");
           var td14 = document.createElement("td");
           var td15 = document.createElement("td");
           var td16 = document.createElement("td");
           td16.classList.add("hidden")
           td100.classList.add('delete');


           // var x = 0


             td8.innerText =  data[i].shares["0"][0].name.issuer_name
             td9.innerText =   data[i].shares["0"][0].name.price;
             td10.innerText =  data[i].shares["0"][0].name.day_high;
             td11.innerText =  data[i].shares["0"][0].name.day_low;
             td12.innerText =  data[i].shares["0"][0].name.change;
             td13.innerText =  data[i].shares["0"][0].name.chg_percent;
             td15.innerText =  data[i].shares["0"][0].name.year_high;
             td14.innerText =  data[i].shares["0"][0].name.year_low;
             td100.innerText = "X";





           tr2.appendChild(td8);
           tr2.appendChild(td9);
           tr2.appendChild(td10);
           tr2.appendChild(td11);
           tr2.appendChild(td12);
           tr2.appendChild(td13);
           tr2.appendChild(td14);
           tr2.appendChild(td15);
           tr2.appendChild(td16);
           tr2.appendChild(td100);


           table.appendChild(tr2);
         }



         div.appendChild(table);
         unFollow();
       }



    var forcast = function() {
      var forcastSubmit = document.getElementById('forcastInput')
      forcastSubmit.addEventListener('submit', function(e) {
        e.preventDefault();
       var tr = document.getElementsByTagName('tr');
       var forcast = document.getElementById('forcast');
       var tds = document.getElementsByClassName("hidden");
       for(td of tds) {
        td.style.visibility = "visible";
       }

        for(var i = 1; i < tr.length; i++) {
          // console.log(company);
          var tds = tr[i].childNodes;
          var lastTd = tds[tds.length -2 ];
          var price = parseInt(tds[1].innerText);
          var precent = forcast.value;
          var result = price + (price * (precent/100));
          lastTd.innerText = result;
        }
      })

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

       var unFollow = function() {
         var xElements = document.getElementsByClassName("delete");
         for( x of xElements) {

           x.addEventListener("click", function() {
             var parent = this.parentElement;
             var table = document.getElementsByTagName('table')[0]
             table.removeChild(parent)
             var request = new XMLHttpRequest()
             request.open('delete', 'http://localhost:3000/market')
             request.send(parent.id)
             console.log(parent.id);
           })
         }
       }
