// var BarChart= require("./chart.js");
var LineChart= require("./lineChart.js");
var PieChart= require("./pieChart.js");

var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var Dates = require('./portfolio/dates.js');

var companies = require('./data3.json');
var sampleShares = require('./data2.json');
var buisnesses = require('./sample.json')


window.onload = function(){


  getBoughtData(createTable);




  // banner(buisnesses);

  // getData(createTable);
  ftseLoad();


  // priceTrendData = getPriceTrend(sampleShares);



  getBoughtData(makePie);
  // console.log('x',cheese);
  // forcast();



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

    var getBoughtData = function(callback) {
      var url = "http://localhost:3000/boughtshares"
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
      // console.log(data);
      var div = document.getElementById("bought-table");
      var table = document.createElement('table');
      var tr1 = document.createElement('tr');

      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");
      var td4 = document.createElement("td");
      var td5 = document.createElement("td");
      var td6 = document.createElement("td");
      // var td7 = document.createElement("td");
      // var td88 = document.createElement("td");
      // var td99 = document.createElement("td");
      // td99.classList.add("hidden")

      td1.innerText = "Name";
      td2.innerText = "Price";
      td3.innerText = "Quantity";
      td4.innerText = "Total";
      td5.innerText = "Buy";
      td6.innerText = "Sell";
      // td6.innerText = "Change %";
      // td7.innerText = "Year Low";
      // td88.innerText = "Year High";
      // td99.innerText = "Forcast";

      tr1.appendChild(td1);
      tr1.appendChild(td2);
      tr1.appendChild(td3);
      tr1.appendChild(td4);
      tr1.appendChild(td5);
      tr1.appendChild(td6);
      // tr1.appendChild(td7);
      // tr1.appendChild(td88);
      // tr1.appendChild(td99);

      table.appendChild(tr1);
      
      var totalPrice = 0;
      var totalQuantity = 0;
      var totalTotal = 0;

      for(var i = 0; i < data.length; i++ ) {
        // console.log(data);
        var tr2 = document.createElement("tr");
        tr2.id = data[i]._id;
        var td100 = document.createElement('td');
        var td200 = document.createElement('td');
        var td201 = document.createElement('td');
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");
        var td10 = document.createElement("td");
        var td11 = document.createElement("td");

        // var td12 = document.createElement("td");
        // var td13 = document.createElement("td");
        // var td14 = document.createElement("td");
        // var td15 = document.createElement("td");
        // var td16 = document.createElement("td");
        // td16.classList.add("hidden")

        td100.classList.add('delete');



        // var x = 0



          td8.innerText =  data[i].name;
          td9.innerText =   data[i].price;
          td10.innerText =  data[i].quantity;
          td11.innerText =  (data[i].quantity * data[i].price);
          totalPrice += parseInt(data[i].price);
          totalQuantity += parseInt(data[i].quantity);
          totalTotal += (data[i].quantity * data[i].price);
          // td12.innerText =  comapany.shares["0"][0].name.change;
          // td13.innerText =  comapany.shares["0"][0].name.chg_percent;
          // td15.innerText =  comapany.shares["0"][0].name.year_high;
          // td14.innerText =  comapany.shares["0"][0].name.year_low;
          td100.innerText = "Sell All";
          td200.contentEditable = true
          td201.contentEditable = true
          td200.innerText = 0
          td201.innerText = 0

          // td100.addEventListener('click', function() {
          //   getBoughtData(makePie);
          // })






        tr2.appendChild(td8);
        tr2.appendChild(td9);
        tr2.appendChild(td10);
        tr2.appendChild(td11);
        tr2.appendChild(td200)
        tr2.appendChild(td201)
        tr2.appendChild(td100);

        // tr2.appendChild(td12);
        // tr2.appendChild(td13);
        // tr2.appendChild(td14);
        // tr2.appendChild(td15);
        // tr2.appendChild(td16);


        table.appendChild(tr2);
      }

      console.log("total price",totalPrice,"totalTotal",totalTotal,"totalQuantity",totalQuantity);
      var trTotals = document.createElement('tr');
      var tdTotals1 = document.createElement('td');
      var tdTotals2 = document.createElement('td');
      var tdTotals3 = document.createElement('td');
      var tdTotals4 = document.createElement('td');
      tdTotals1.innerText = "Total";
      tdTotals2.innerText = totalPrice / totalQuantity;
      tdTotals3.innerText = totalQuantity;
      tdTotals4.innerText = totalTotal;
      trTotals.appendChild(tdTotals1);
      trTotals.appendChild(tdTotals2);
      trTotals.appendChild(tdTotals3);
      trTotals.appendChild(tdTotals4);
      table.appendChild(trTotals);

      var updateButton = document.getElementById('updateButton')
      updateButton.value = 'Update'
      updateButton.addEventListener('click', function() {
        var rows = document.getElementsByTagName('tr');
        var tdTotalsU2 = totalPrice;
        var tdTotalsU3 = 0;
        var tdTotalsU4 = 0;
        for(var i = 1; i < rows.length - 1; i++ ){
          var kids = rows[i].childNodes;
          console.log("cheese",kids);
          kids[2].innerText = parseInt(kids[2].innerText) + parseInt(kids[4].innerText) - parseInt(kids[5].innerText)
          kids[4].innerText = 0
          kids[5].innerText = 0
          kids[3].innerText = parseInt(kids[1].innerText) * parseInt(kids[2].innerText);
          var request = new XMLHttpRequest();
          request.open("Put","http://localhost:3000/boughtshares");
          request.setRequestHeader('Content-Type','application/json');
          request.send(JSON.stringify({name:kids[0].innerText, quantity:kids[2].innerText}));
         
          tdTotalsU3 += parseInt(kids[1].innerText) * parseInt(kids[2].innerText);
          tdTotalsU4 +=  parseInt(kids[2].innerText) + parseInt(kids[4].innerText) - parseInt(kids[5].innerText);
        }
        var lastRow = document.getElementsByTagName("tr");
        lastRow = lastRow[lastRow.length - 1 ]
        var lastTd = lastRow.childNodes;
        lastTd[1].innerText = totalPrice / tdTotalsU4;
        lastTd[2].innerText = tdTotalsU4;
        lastTd[3].innerText = tdTotalsU3;
        getBoughtData(makePie);
      })
      div.appendChild(table);
      unFollow();
    }


  //   var forcast = function() {
  //     var forcastSubmit = document.getElementById('forcastInput')
  //     forcastSubmit.addEventListener('submit', function(e) {
  //       e.preventDefault();
  //      var tr = document.getElementsByTagName('tr');
  //      var forcast = document.getElementById('forcast');
  //      var tds = document.getElementsByClassName("hidden");
  //      for(td of tds) {
  //       td.style.visibility = "visible";
  //      }
  //
  //       for(var i = 1; i < tr.length; i++) {
  //         // console.log(company);
  //         var tds = tr[i].childNodes;
  //
  //         var lastTd = tds[tds.length - 2 ];
  //         var price = parseInt(tds[1].innerText);
  //         var precent = forcast.value;
  //         var result = price + (price * (precent/100));
  //         lastTd.innerText = result;
  //       }
  //     })
  //
  // }

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

    //  var getDatesCont = function(data) {
    //    y = []
    //   //  console.log(data[0].shares[0]);
    //    x = data[0].shares
    //    console.log('x', x);
    //    for(entry of data) {
    //     //  console.log(entry.shares['0'][1].dates);
    //      var data2 = {
    //        name: entry.shares['0'][0].name.name,
    //        data: pastDays(entry)
    //      }
    //      // console.log(data);
    //      y.push(data2)
    //    }
    //   //  console.log('y',y);
    //    var container3 = document.getElementById("portfolio-lineChart");
    //    new LineChart(y, container3);
    //   //  return y
     //
    //    }

       var makePie = function(data) {
         var x = []

         for(entry of data) {
          //  console.log(entry);
           var data2 = {
             name: entry.name,
             y: parseInt(entry.quantity)
           }
           x.push(data2)
         }

         var container4 = document.getElementById("portfolio-pieChart");
         console.log('x', x);
         new PieChart(x, container4)
       }


       var unFollow = function() {
         var xElements = document.getElementsByClassName("delete");
         for( x of xElements) {

           x.addEventListener("click", function() {
             var parent = this.parentElement;
             var table = document.getElementsByTagName('table')[0]
             table.removeChild(parent)
             var request = new XMLHttpRequest()
             request.open('delete', 'http://localhost:3000/boughtshares')
             request.send(parent.id)
             console.log(parent.id);
             getBoughtData(makePie);
           })
         }
       }

       var sellAmount = function() {

       }
