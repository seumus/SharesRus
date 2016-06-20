var Market = require('./portfolio/market.js');
var Portfolio = require('./portfolio/portfolio.js');
var Stock = require('./portfolio/stock.js');
var companies = require('./data.json');
var buisnesses = require('./sample.json')


// var market = new Market();
// market.getShares();



window.onload = function(){
  var sectors = getSectors(companies);
  createSelect(sectors);
  banner(buisnesses);
};

var getSectors = function(companies) {
  var sectorsAll = []
  for( company of companies ) {
    sectorsAll.push(company.Sector);
  } 


  // In this scenario your unique array will run through all of the values in the duplicate array. The elem variable represents the value of the element in the array (mike,james,james,alex), the position is it’s 0-indexed position in the array (0,1,2,3…), and the duplicatesArray.indexOf(elem) value is just the index of the first occurrence of that element in the original array. So, because the element ‘james’ is duplicated, when we loop through all of the elements in the duplicatesArray and push them to the uniqueArray, the first time we hit james, our “pos” value is 1, and our indexOf(elem) is 1 as well, so James gets pushed to the uniqueArray. The second time we hit James, our “pos” value is 2, and our indexOf(elem) is still 1 (because it only finds the first instance of an array element), so the duplicate is not pushed. Therefore, our uniqueArray contains only unique values.

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
    console.log(company)
    console.log(company.pastCloseOfDayPrices[6])
    var price = company.price - company.pastCloseOfDayPrices[6]
    var priceChange = price.toFixed(2);
    var currentPrice = company.price.toFixed(2)
    console.log(priceChange)
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




























