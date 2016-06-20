var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var companies = require('./data.json');




window.onload = function(){
  var sectors = getSectors(companies);
  createSelect(sectors);
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
