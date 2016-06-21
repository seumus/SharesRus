/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// var BarChart= require("./chart.js");
	var LineChart= __webpack_require__(2);
	
	var Market = __webpack_require__(3);
	var Portfolio = __webpack_require__(5);
	var Stock = __webpack_require__(4);
	var Dates = __webpack_require__(9);
	
	var companies = __webpack_require__(6);
	var sampleShares = __webpack_require__(7);
	var buisnesses = __webpack_require__(8)
	
	
	
	
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
	
	        var dateObj = new Dates({dates:result})
	        dateObj.save();
	        dates = dates.reverse();
	
	        new LineChart(priceTrendData2, container3, dates);
	
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
	
	  var tr2 = document.createElement("tr");
	  var td8 = document.createElement("td");
	  var td9 = document.createElement("td");
	  var td10 = document.createElement("td");
	  var td11 = document.createElement("td");
	  var td12 = document.createElement("td");
	  var td13 = document.createElement("td");
	  var td14 = document.createElement("td");
	
	    td8.innerText =  company.price;
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
	  button.innerText = "Follow";
	  button.id = "buy-button";
	  infoBox.appendChild(button);
	
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
	        console.log("THIS",result);
	        var stock = new Stock({name:result})
	
	        console.log(stock);
	        stock.save();
	
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


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	var LineChart = function(data, container, date){
	
	    var chart = new Highcharts.Chart({
	      chart: {
	        renderTo: container
	      },
	      title: {
	        text: "Share Information"
	      },
	      series: data,
	      xAxis: {categories: date},
	    });
	
	}
	
	module.exports = LineChart;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Stock = __webpack_require__(4);
	
	var Market = function() {
	  this.shares = []
	}
	
	Market.prototype = {
	  addStock: function(share){
	    this.shares.push(share);
	  },
	  populateShares: function(shares) {
	    for(share of shares ) {
	      var newShare = new Stock(share);
	     this.shares.push(newShare);
	    }
	    
	  },
	
	  getShares: function() {
	    var url = "http://localhost:3000/market"
	     var request = new XMLHttpRequest();
	     request.open("Get", url);
	     request.onload = function() {
	       if(request.status === 200 ) {
	         var result = JSON.parse(request.responseText);
	         this.populateShares(result);
	       }
	     }.bind(this);
	   request.send(null);
	   }
	}
	
	module.exports = Market;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Stock = function(params) {
	  this.name = params.name;
	  // this.epic = params.epic;
	  // this.price = params.price;
	  // this.quantity = params.quantity;
	  // this.buyPrice = params.buyPrice;
	  // this.pastCloseOfDayPrices = params.pastCloseOfDayPrices;
	  // this.buyDate = params.buyDate;
	};
	
	
	
	Stock.prototype = {
	  save: function(){
	    var url = 'http://localhost:3000/market';
	    var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function(){
	      if(request.status === 200){
	      }
	    }
	    request.send(JSON.stringify(this));
	  }
	}
	module.exports = Stock;


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	var Portfolio = function() {
	  this.shares = []
	}
	
	
	
	Portfolio.prototype = {
	  addStock: function(share){
	    this.shares.push(share);
	  },
	  save: function(){
	    var url = 'http://localhost:3000/shares';
	    var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function(){
	      if(request.status === 200){
	      }
	    }
	    request.send(JSON.stringify(this));
	  }
	};
	
	
	
	
	module.exports = Portfolio;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = [
	{
	"Symbol": "MMM",
	"Name": "3M Company",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ABT",
	"Name": "Abbott Laboratories",
	"Sector": "Health Care"
	},
	{
	"Symbol": "ABBV",
	"Name": "AbbVie",
	"Sector": "Health Care"
	},
	{
	"Symbol": "ACN",
	"Name": "Accenture plc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ATVI",
	"Name": "Activision Blizzard",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "AYI",
	"Name": "Acuity Brands Inc",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ADBE",
	"Name": "Adobe Systems Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "AAP",
	"Name": "Advance Auto Parts",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "AES",
	"Name": "AES Corp",
	"Sector": "Utilities"
	},
	{
	"Symbol": "AET",
	"Name": "Aetna Inc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "AMG",
	"Name": "Affiliated Managers Group Inc",
	"Sector": "Financials"
	},
	{
	"Symbol": "AFL",
	"Name": "AFLAC Inc",
	"Sector": "Financials"
	},
	{
	"Symbol": "A",
	"Name": "Agilent Technologies Inc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "GAS",
	"Name": "AGL Resources Inc.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "APD",
	"Name": "Air Products & Chemicals Inc",
	"Sector": "Materials"
	},
	{
	"Symbol": "AKAM",
	"Name": "Akamai Technologies Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ALK",
	"Name": "Alaska Air Group Inc",
	"Sector": "Industrials"
	},
	{
	"Symbol": "AA",
	"Name": "Alcoa Inc",
	"Sector": "Materials"
	},
	{
	"Symbol": "ALXN",
	"Name": "Alexion Pharmaceuticals",
	"Sector": "Health Care"
	},
	{
	"Symbol": "ALLE",
	"Name": "Allegion",
	"Sector": "Industrials"
	},
	{
	"Symbol": "AGN",
	"Name": "Allergan plc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "ADS",
	"Name": "Alliance Data Systems",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ALL",
	"Name": "Allstate Corp",
	"Sector": "Financials"
	},
	{
	"Symbol": "GOOGL",
	"Name": "Alphabet Inc Class A",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "GOOG",
	"Name": "Alphabet Inc Class C",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "MO",
	"Name": "Altria Group Inc",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "AMZN",
	"Name": "Amazon.com Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "AEE",
	"Name": "Ameren Corp",
	"Sector": "Utilities"
	},
	{
	"Symbol": "AAL",
	"Name": "American Airlines Group",
	"Sector": "Industrials"
	},
	{
	"Symbol": "AEP",
	"Name": "American Electric Power",
	"Sector": "Utilities"
	},
	{
	"Symbol": "AXP",
	"Name": "American Express Co",
	"Sector": "Financials"
	},
	{
	"Symbol": "AIG",
	"Name": "American International Group, Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "AMT",
	"Name": "American Tower Corp A",
	"Sector": "Financials"
	},
	{
	"Symbol": "AWK",
	"Name": "American Water Works Company Inc",
	"Sector": "Utilities"
	},
	{
	"Symbol": "AMP",
	"Name": "Ameriprise Financial",
	"Sector": "Financials"
	},
	{
	"Symbol": "ABC",
	"Name": "AmerisourceBergen Corp",
	"Sector": "Health Care"
	},
	{
	"Symbol": "AME",
	"Name": "Ametek",
	"Sector": "Industrials"
	},
	{
	"Symbol": "AMGN",
	"Name": "Amgen Inc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "APH",
	"Name": "Amphenol Corp A",
	"Sector": "Industrials"
	},
	{
	"Symbol": "APC",
	"Name": "Anadarko Petroleum Corp",
	"Sector": "Energy"
	},
	{
	"Symbol": "ADI",
	"Name": "Analog Devices, Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ANTM",
	"Name": "Anthem Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "AON",
	"Name": "Aon plc",
	"Sector": "Financials"
	},
	{
	"Symbol": "APA",
	"Name": "Apache Corporation",
	"Sector": "Energy"
	},
	{
	"Symbol": "AIV",
	"Name": "Apartment Investment & Mgmt",
	"Sector": "Financials"
	},
	{
	"Symbol": "AAPL",
	"Name": "Apple Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "AMAT",
	"Name": "Applied Materials Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ADM",
	"Name": "Archer-Daniels-Midland Co",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "AJG",
	"Name": "Arthur J. Gallagher & Co.",
	"Sector": "Financials"
	},
	{
	"Symbol": "AIZ",
	"Name": "Assurant Inc",
	"Sector": "Financials"
	},
	{
	"Symbol": "T",
	"Name": "AT&T Inc",
	"Sector": "Telecommunications Services"
	},
	{
	"Symbol": "ADSK",
	"Name": "Autodesk Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ADP",
	"Name": "Automatic Data Processing",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "AN",
	"Name": "AutoNation Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "AZO",
	"Name": "AutoZone Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "AVGO",
	"Name": "Avago Technologies",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "AVB",
	"Name": "AvalonBay Communities, Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "AVY",
	"Name": "Avery Dennison Corp",
	"Sector": "Materials"
	},
	{
	"Symbol": "BHI",
	"Name": "Baker Hughes Inc",
	"Sector": "Energy"
	},
	{
	"Symbol": "BLL",
	"Name": "Ball Corp",
	"Sector": "Materials"
	},
	{
	"Symbol": "BAC",
	"Name": "Bank of America Corp",
	"Sector": "Financials"
	},
	{
	"Symbol": "BCR",
	"Name": "Bard (C.R.) Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "BAX",
	"Name": "Baxter International Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "BBT",
	"Name": "BB&T Corporation",
	"Sector": "Financials"
	},
	{
	"Symbol": "BDX",
	"Name": "Becton Dickinson",
	"Sector": "Health Care"
	},
	{
	"Symbol": "BBBY",
	"Name": "Bed Bath & Beyond",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "BRK-B",
	"Name": "Berkshire Hathaway",
	"Sector": "Financials"
	},
	{
	"Symbol": "BBY",
	"Name": "Best Buy Co. Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "BIIB",
	"Name": "BIOGEN IDEC Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "BLK",
	"Name": "BlackRock",
	"Sector": "Financials"
	},
	{
	"Symbol": "HRB",
	"Name": "Block H&R",
	"Sector": "Financials"
	},
	{
	"Symbol": "BA",
	"Name": "Boeing Company",
	"Sector": "Industrials"
	},
	{
	"Symbol": "BWA",
	"Name": "BorgWarner",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "BXP",
	"Name": "Boston Properties",
	"Sector": "Financials"
	},
	{
	"Symbol": "BSX",
	"Name": "Boston Scientific",
	"Sector": "Health Care"
	},
	{
	"Symbol": "BMY",
	"Name": "Bristol-Myers Squibb",
	"Sector": "Health Care"
	},
	{
	"Symbol": "BF-B",
	"Name": "Brown-Forman Corporation",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "CHRW",
	"Name": "C. H. Robinson Worldwide",
	"Sector": "Industrials"
	},
	{
	"Symbol": "CA",
	"Name": "CA, Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "CVC",
	"Name": "Cablevision Systems Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "COG",
	"Name": "Cabot Oil & Gas",
	"Sector": "Energy"
	},
	{
	"Symbol": "CPB",
	"Name": "Campbell Soup",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "COF",
	"Name": "Capital One Financial",
	"Sector": "Financials"
	},
	{
	"Symbol": "CAH",
	"Name": "Cardinal Health Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "KMX",
	"Name": "Carmax Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "CCL",
	"Name": "Carnival Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "CAT",
	"Name": "Caterpillar Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "CBG",
	"Name": "CBRE Group",
	"Sector": "Financials"
	},
	{
	"Symbol": "CBS",
	"Name": "CBS Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "CELG",
	"Name": "Celgene Corp.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "CNC",
	"Name": "Centene Corporation",
	"Sector": "Health Care"
	},
	{
	"Symbol": "CNP",
	"Name": "CenterPoint Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "CTL",
	"Name": "CenturyLink Inc",
	"Sector": "Telecommunications Services"
	},
	{
	"Symbol": "CERN",
	"Name": "Cerner",
	"Sector": "Health Care"
	},
	{
	"Symbol": "CF",
	"Name": "CF Industries Holdings Inc",
	"Sector": "Materials"
	},
	{
	"Symbol": "SCHW",
	"Name": "Charles Schwab Corporation",
	"Sector": "Financials"
	},
	{
	"Symbol": "CHK",
	"Name": "Chesapeake Energy",
	"Sector": "Energy"
	},
	{
	"Symbol": "CVX",
	"Name": "Chevron Corp.",
	"Sector": "Energy"
	},
	{
	"Symbol": "CMG",
	"Name": "Chipotle Mexican Grill",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "CB",
	"Name": "Chubb Limited",
	"Sector": "Financials"
	},
	{
	"Symbol": "CHD",
	"Name": "Church & Dwight",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "CI",
	"Name": "CIGNA Corp.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "XEC",
	"Name": "Cimarex Energy",
	"Sector": "Energy"
	},
	{
	"Symbol": "CINF",
	"Name": "Cincinnati Financial",
	"Sector": "Financials"
	},
	{
	"Symbol": "CTAS",
	"Name": "Cintas Corporation",
	"Sector": "Industrials"
	},
	{
	"Symbol": "CSCO",
	"Name": "Cisco Systems",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "C",
	"Name": "Citigroup Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "CFG",
	"Name": "Citizens Financial Group",
	"Sector": "Financials"
	},
	{
	"Symbol": "CTXS",
	"Name": "Citrix Systems",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "CME",
	"Name": "CME Group Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "CMS",
	"Name": "CMS Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "COH",
	"Name": "Coach Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "CTSH",
	"Name": "Cognizant Technology Solutions",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "CL",
	"Name": "Colgate-Palmolive",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "CPGX",
	"Name": "Columbia Pipeline Group Inc",
	"Sector": "Energy"
	},
	{
	"Symbol": "CMCSA",
	"Name": "Comcast A Corp",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "CMA",
	"Name": "Comerica Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "CAG",
	"Name": "ConAgra Foods Inc.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "CXO",
	"Name": "Concho Resources",
	"Sector": "Energy"
	},
	{
	"Symbol": "COP",
	"Name": "ConocoPhillips",
	"Sector": "Energy"
	},
	{
	"Symbol": "ED",
	"Name": "Consolidated Edison",
	"Sector": "Utilities"
	},
	{
	"Symbol": "STZ",
	"Name": "Constellation Brands",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "GLW",
	"Name": "Corning Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "COST",
	"Name": "Costco Co.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "CCI",
	"Name": "Crown Castle International Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "CSRA",
	"Name": "CSRA Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "CSX",
	"Name": "CSX Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "CMI",
	"Name": "Cummins Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "CVS",
	"Name": "CVS Health",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "DHI",
	"Name": "D. R. Horton",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "DHR",
	"Name": "Danaher Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "DRI",
	"Name": "Darden Restaurants",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "DVA",
	"Name": "DaVita Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "DE",
	"Name": "Deere & Co.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "DLPH",
	"Name": "Delphi Automotive",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "DAL",
	"Name": "Delta Air Lines",
	"Sector": "Industrials"
	},
	{
	"Symbol": "XRAY",
	"Name": "Dentsply Sirona",
	"Sector": "Health Care"
	},
	{
	"Symbol": "DVN",
	"Name": "Devon Energy Corp.",
	"Sector": "Energy"
	},
	{
	"Symbol": "DO",
	"Name": "Diamond Offshore Drilling",
	"Sector": "Energy"
	},
	{
	"Symbol": "DLR",
	"Name": "Digital Realty Trust",
	"Sector": "Financials"
	},
	{
	"Symbol": "DFS",
	"Name": "Discover Financial Services",
	"Sector": "Financials"
	},
	{
	"Symbol": "DISCA",
	"Name": "Discovery Communications-A",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "DISCK",
	"Name": "Discovery Communications-C",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "DG",
	"Name": "Dollar General",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "DLTR",
	"Name": "Dollar Tree",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "D",
	"Name": "Dominion Resources",
	"Sector": "Utilities"
	},
	{
	"Symbol": "DOV",
	"Name": "Dover Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "DOW",
	"Name": "Dow Chemical",
	"Sector": "Materials"
	},
	{
	"Symbol": "DPS",
	"Name": "Dr Pepper Snapple Group",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "DTE",
	"Name": "DTE Energy Co.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "DD",
	"Name": "Du Pont (E.I.)",
	"Sector": "Materials"
	},
	{
	"Symbol": "DUK",
	"Name": "Duke Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "DNB",
	"Name": "Dun & Bradstreet",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ETFC",
	"Name": "E*Trade",
	"Sector": "Financials"
	},
	{
	"Symbol": "EMN",
	"Name": "Eastman Chemical",
	"Sector": "Materials"
	},
	{
	"Symbol": "ETN",
	"Name": "Eaton Corporation",
	"Sector": "Industrials"
	},
	{
	"Symbol": "EBAY",
	"Name": "eBay Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ECL",
	"Name": "Ecolab Inc.",
	"Sector": "Materials"
	},
	{
	"Symbol": "EIX",
	"Name": "Edison Int'l",
	"Sector": "Utilities"
	},
	{
	"Symbol": "EW",
	"Name": "Edwards Lifesciences",
	"Sector": "Health Care"
	},
	{
	"Symbol": "EA",
	"Name": "Electronic Arts",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "EMC",
	"Name": "EMC Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "EMR",
	"Name": "Emerson Electric Company",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ENDP",
	"Name": "Endo International",
	"Sector": "Health Care"
	},
	{
	"Symbol": "ETR",
	"Name": "Entergy Corp.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "EOG",
	"Name": "EOG Resources",
	"Sector": "Energy"
	},
	{
	"Symbol": "EQT",
	"Name": "EQT Corporation",
	"Sector": "Energy"
	},
	{
	"Symbol": "EFX",
	"Name": "Equifax Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "EQIX",
	"Name": "Equinix",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "EQR",
	"Name": "Equity Residential",
	"Sector": "Financials"
	},
	{
	"Symbol": "ESS",
	"Name": "Essex Property Trust Inc",
	"Sector": "Financials"
	},
	{
	"Symbol": "EL",
	"Name": "Estee Lauder Cos.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "ES",
	"Name": "Eversource Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "EXC",
	"Name": "Exelon Corp.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "EXPE",
	"Name": "Expedia Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "EXPD",
	"Name": "Expeditors Int'l",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ESRX",
	"Name": "Express Scripts",
	"Sector": "Health Care"
	},
	{
	"Symbol": "EXR",
	"Name": "Extra Space Storage",
	"Sector": "Financials"
	},
	{
	"Symbol": "XOM",
	"Name": "Exxon Mobil Corp.",
	"Sector": "Energy"
	},
	{
	"Symbol": "FFIV",
	"Name": "F5 Networks",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "FB",
	"Name": "Facebook",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "FAST",
	"Name": "Fastenal Co",
	"Sector": "Industrials"
	},
	{
	"Symbol": "FRT",
	"Name": "Federal Realty Investment Trust",
	"Sector": "Financials"
	},
	{
	"Symbol": "FDX",
	"Name": "FedEx Corporation",
	"Sector": "Industrials"
	},
	{
	"Symbol": "FIS",
	"Name": "Fidelity National Information Services",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "FITB",
	"Name": "Fifth Third Bancorp",
	"Sector": "Financials"
	},
	{
	"Symbol": "FSLR",
	"Name": "First Solar Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "FE",
	"Name": "FirstEnergy Corp",
	"Sector": "Utilities"
	},
	{
	"Symbol": "FISV",
	"Name": "Fiserv Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "FLIR",
	"Name": "FLIR Systems",
	"Sector": "Industrials"
	},
	{
	"Symbol": "FLS",
	"Name": "Flowserve Corporation",
	"Sector": "Industrials"
	},
	{
	"Symbol": "FLR",
	"Name": "Fluor Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "FMC",
	"Name": "FMC Corporation",
	"Sector": "Materials"
	},
	{
	"Symbol": "FTI",
	"Name": "FMC Technologies Inc.",
	"Sector": "Energy"
	},
	{
	"Symbol": "FL",
	"Name": "Foot Locker Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "F",
	"Name": "Ford Motor",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "BEN",
	"Name": "Franklin Resources",
	"Sector": "Financials"
	},
	{
	"Symbol": "FCX",
	"Name": "Freeport-McMoran Cp & Gld",
	"Sector": "Materials"
	},
	{
	"Symbol": "FTR",
	"Name": "Frontier Communications",
	"Sector": "Telecommunications Services"
	},
	{
	"Symbol": "GPS",
	"Name": "Gap (The)",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "GRMN",
	"Name": "Garmin Ltd.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "GD",
	"Name": "General Dynamics",
	"Sector": "Industrials"
	},
	{
	"Symbol": "GE",
	"Name": "General Electric",
	"Sector": "Industrials"
	},
	{
	"Symbol": "GGP",
	"Name": "General Growth Properties Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "GIS",
	"Name": "General Mills",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "GM",
	"Name": "General Motors",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "GPC",
	"Name": "Genuine Parts",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "GILD",
	"Name": "Gilead Sciences",
	"Sector": "Health Care"
	},
	{
	"Symbol": "GPN",
	"Name": "Global Payments Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "GS",
	"Name": "Goldman Sachs Group",
	"Sector": "Financials"
	},
	{
	"Symbol": "GT",
	"Name": "Goodyear Tire & Rubber",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "GWW",
	"Name": "Grainger (W.W.) Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "HAL",
	"Name": "Halliburton Co.",
	"Sector": "Energy"
	},
	{
	"Symbol": "HBI",
	"Name": "Hanesbrands Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "HOG",
	"Name": "Harley-Davidson",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "HAR",
	"Name": "Harman Int'l Industries",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "HRS",
	"Name": "Harris Corporation",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "HIG",
	"Name": "Hartford Financial Svc.Gp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "HAS",
	"Name": "Hasbro Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "HCA",
	"Name": "HCA Holdings",
	"Sector": "Health Care"
	},
	{
	"Symbol": "HCP",
	"Name": "HCP Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "HP",
	"Name": "Helmerich & Payne",
	"Sector": "Energy"
	},
	{
	"Symbol": "HSIC",
	"Name": "Henry Schein",
	"Sector": "Health Care"
	},
	{
	"Symbol": "HES",
	"Name": "Hess Corporation",
	"Sector": "Energy"
	},
	{
	"Symbol": "HPE",
	"Name": "Hewlett Packard Enterprise",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "HOLX",
	"Name": "Hologic",
	"Sector": "Health Care"
	},
	{
	"Symbol": "HD",
	"Name": "Home Depot",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "HON",
	"Name": "Honeywell Int'l Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "HRL",
	"Name": "Hormel Foods Corp.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "HST",
	"Name": "Host Hotels & Resorts",
	"Sector": "Financials"
	},
	{
	"Symbol": "HPQ",
	"Name": "HP Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "HUM",
	"Name": "Humana Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "HBAN",
	"Name": "Huntington Bancshares",
	"Sector": "Financials"
	},
	{
	"Symbol": "ITW",
	"Name": "Illinois Tool Works",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ILMN",
	"Name": "Illumina Inc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "IR",
	"Name": "Ingersoll-Rand PLC",
	"Sector": "Industrials"
	},
	{
	"Symbol": "INTC",
	"Name": "Intel Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ICE",
	"Name": "Intercontinental Exchange",
	"Sector": "Financials"
	},
	{
	"Symbol": "IBM",
	"Name": "International Bus. Machines",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "IP",
	"Name": "International Paper",
	"Sector": "Materials"
	},
	{
	"Symbol": "IPG",
	"Name": "Interpublic Group",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "IFF",
	"Name": "Intl Flavors & Fragrances",
	"Sector": "Materials"
	},
	{
	"Symbol": "INTU",
	"Name": "Intuit Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ISRG",
	"Name": "Intuitive Surgical Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "IVZ",
	"Name": "Invesco Ltd.",
	"Sector": "Financials"
	},
	{
	"Symbol": "IRM",
	"Name": "Iron Mountain Incorporated",
	"Sector": "Industrials"
	},
	{
	"Symbol": "JBHT",
	"Name": "J. B. Hunt Transport Services",
	"Sector": "Industrials"
	},
	{
	"Symbol": "JEC",
	"Name": "Jacobs Engineering Group",
	"Sector": "Industrials"
	},
	{
	"Symbol": "JNJ",
	"Name": "Johnson & Johnson",
	"Sector": "Health Care"
	},
	{
	"Symbol": "JCI",
	"Name": "Johnson Controls",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "JPM",
	"Name": "JPMorgan Chase & Co.",
	"Sector": "Financials"
	},
	{
	"Symbol": "JNPR",
	"Name": "Juniper Networks",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "KSU",
	"Name": "Kansas City Southern",
	"Sector": "Industrials"
	},
	{
	"Symbol": "K",
	"Name": "Kellogg Co.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "KEY",
	"Name": "KeyCorp",
	"Sector": "Financials"
	},
	{
	"Symbol": "KMB",
	"Name": "Kimberly-Clark",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "KIM",
	"Name": "Kimco Realty",
	"Sector": "Financials"
	},
	{
	"Symbol": "KMI",
	"Name": "Kinder Morgan",
	"Sector": "Energy"
	},
	{
	"Symbol": "KLAC",
	"Name": "KLA-Tencor Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "KSS",
	"Name": "Kohl's Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "KHC",
	"Name": "Kraft Heinz Co",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "KR",
	"Name": "Kroger Co.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "LB",
	"Name": "L Brands Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "LLL",
	"Name": "L-3 Communications Holdings",
	"Sector": "Industrials"
	},
	{
	"Symbol": "LH",
	"Name": "Laboratory Corp. of America Holding",
	"Sector": "Health Care"
	},
	{
	"Symbol": "LRCX",
	"Name": "Lam Research",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "LM",
	"Name": "Legg Mason",
	"Sector": "Financials"
	},
	{
	"Symbol": "LEG",
	"Name": "Leggett & Platt",
	"Sector": "Industrials"
	},
	{
	"Symbol": "LEN",
	"Name": "Lennar Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "LUK",
	"Name": "Leucadia National Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "LVLT",
	"Name": "Level 3 Communications",
	"Sector": "Telecommunications Services"
	},
	{
	"Symbol": "LLY",
	"Name": "Lilly (Eli) & Co.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "LNC",
	"Name": "Lincoln National",
	"Sector": "Financials"
	},
	{
	"Symbol": "LLTC",
	"Name": "Linear Technology Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "LKQ",
	"Name": "LKQ Corporation",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "LMT",
	"Name": "Lockheed Martin Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "L",
	"Name": "Loews Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "LOW",
	"Name": "Lowe's Cos.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "LYB",
	"Name": "LyondellBasell",
	"Sector": "Materials"
	},
	{
	"Symbol": "MTB",
	"Name": "M&T Bank Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "MAC",
	"Name": "Macerich",
	"Sector": "Financials"
	},
	{
	"Symbol": "M",
	"Name": "Macy's Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "MNK",
	"Name": "Mallinckrodt Plc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "MRO",
	"Name": "Marathon Oil Corp.",
	"Sector": "Energy"
	},
	{
	"Symbol": "MPC",
	"Name": "Marathon Petroleum",
	"Sector": "Energy"
	},
	{
	"Symbol": "MAR",
	"Name": "Marriott Int'l.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "MMC",
	"Name": "Marsh & McLennan",
	"Sector": "Financials"
	},
	{
	"Symbol": "MLM",
	"Name": "Martin Marietta Materials",
	"Sector": "Materials"
	},
	{
	"Symbol": "MAS",
	"Name": "Masco Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "MA",
	"Name": "Mastercard Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "MAT",
	"Name": "Mattel Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "MKC",
	"Name": "McCormick & Co.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "MCD",
	"Name": "McDonald's Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "MCK",
	"Name": "McKesson Corp.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "MJN",
	"Name": "Mead Johnson",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "MDT",
	"Name": "Medtronic plc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "MRK",
	"Name": "Merck & Co.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "MET",
	"Name": "MetLife Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "KORS",
	"Name": "Michael Kors Holdings",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "MCHP",
	"Name": "Microchip Technology",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "MU",
	"Name": "Micron Technology",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "MSFT",
	"Name": "Microsoft Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "MHK",
	"Name": "Mohawk Industries",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TAP",
	"Name": "Molson Coors Brewing Company",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "MDLZ",
	"Name": "Mondelez International",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "MON",
	"Name": "Monsanto Co.",
	"Sector": "Materials"
	},
	{
	"Symbol": "MNST",
	"Name": "Monster Beverage",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "MCO",
	"Name": "Moody's Corp",
	"Sector": "Financials"
	},
	{
	"Symbol": "MS",
	"Name": "Morgan Stanley",
	"Sector": "Financials"
	},
	{
	"Symbol": "MSI",
	"Name": "Motorola Solutions Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "MUR",
	"Name": "Murphy Oil",
	"Sector": "Energy"
	},
	{
	"Symbol": "MYL",
	"Name": "Mylan N.V.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "NDAQ",
	"Name": "NASDAQ OMX Group",
	"Sector": "Financials"
	},
	{
	"Symbol": "NOV",
	"Name": "National Oilwell Varco Inc.",
	"Sector": "Energy"
	},
	{
	"Symbol": "NAVI",
	"Name": "Navient",
	"Sector": "Financials"
	},
	{
	"Symbol": "NTAP",
	"Name": "NetApp",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "NFLX",
	"Name": "Netflix Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "NWL",
	"Name": "Newell Rubbermaid Co.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "NFX",
	"Name": "Newfield Exploration Co",
	"Sector": "Energy"
	},
	{
	"Symbol": "NEM",
	"Name": "Newmont Mining Corp. (Hldg. Co.)",
	"Sector": "Materials"
	},
	{
	"Symbol": "NWSA",
	"Name": "News Corp. Class A",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "NWS",
	"Name": "News Corp. Class B",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "NEE",
	"Name": "NextEra Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "NLSN",
	"Name": "Nielsen Holdings",
	"Sector": "Industrials"
	},
	{
	"Symbol": "NKE",
	"Name": "Nike",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "NI",
	"Name": "NiSource Inc.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "NBL",
	"Name": "Noble Energy Inc",
	"Sector": "Energy"
	},
	{
	"Symbol": "JWN",
	"Name": "Nordstrom",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "NSC",
	"Name": "Norfolk Southern Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "NTRS",
	"Name": "Northern Trust Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "NOC",
	"Name": "Northrop Grumman Corp.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "NRG",
	"Name": "NRG Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "NUE",
	"Name": "Nucor Corp.",
	"Sector": "Materials"
	},
	{
	"Symbol": "NVDA",
	"Name": "Nvidia Corporation",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "ORLY",
	"Name": "O'Reilly Automotive",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "OXY",
	"Name": "Occidental Petroleum",
	"Sector": "Energy"
	},
	{
	"Symbol": "OMC",
	"Name": "Omnicom Group",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "OKE",
	"Name": "ONEOK",
	"Sector": "Energy"
	},
	{
	"Symbol": "ORCL",
	"Name": "Oracle Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "OI",
	"Name": "Owens-Illinois Inc",
	"Sector": "Materials"
	},
	{
	"Symbol": "PCAR",
	"Name": "PACCAR Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "PH",
	"Name": "Parker-Hannifin",
	"Sector": "Industrials"
	},
	{
	"Symbol": "PDCO",
	"Name": "Patterson Companies",
	"Sector": "Health Care"
	},
	{
	"Symbol": "PAYX",
	"Name": "Paychex Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "PYPL",
	"Name": "PayPal",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "PNR",
	"Name": "Pentair Ltd.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "PBCT",
	"Name": "People's United Financial",
	"Sector": "Financials"
	},
	{
	"Symbol": "PEP",
	"Name": "PepsiCo Inc.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "PKI",
	"Name": "PerkinElmer",
	"Sector": "Health Care"
	},
	{
	"Symbol": "PRGO",
	"Name": "Perrigo",
	"Sector": "Health Care"
	},
	{
	"Symbol": "PFE",
	"Name": "Pfizer Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "PCG",
	"Name": "PG&E Corp.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "PM",
	"Name": "Philip Morris International",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "PSX",
	"Name": "Phillips 66",
	"Sector": "Energy"
	},
	{
	"Symbol": "PNW",
	"Name": "Pinnacle West Capital",
	"Sector": "Utilities"
	},
	{
	"Symbol": "PXD",
	"Name": "Pioneer Natural Resources",
	"Sector": "Energy"
	},
	{
	"Symbol": "PBI",
	"Name": "Pitney-Bowes",
	"Sector": "Industrials"
	},
	{
	"Symbol": "PNC",
	"Name": "PNC Financial Services",
	"Sector": "Financials"
	},
	{
	"Symbol": "RL",
	"Name": "Polo Ralph Lauren Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "PPG",
	"Name": "PPG Industries",
	"Sector": "Materials"
	},
	{
	"Symbol": "PPL",
	"Name": "PPL Corp.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "PX",
	"Name": "Praxair Inc.",
	"Sector": "Materials"
	},
	{
	"Symbol": "PCLN",
	"Name": "Priceline.com Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "PFG",
	"Name": "Principal Financial Group",
	"Sector": "Financials"
	},
	{
	"Symbol": "PG",
	"Name": "Procter & Gamble",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "PGR",
	"Name": "Progressive Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "PLD",
	"Name": "Prologis",
	"Sector": "Financials"
	},
	{
	"Symbol": "PRU",
	"Name": "Prudential Financial",
	"Sector": "Financials"
	},
	{
	"Symbol": "PEG",
	"Name": "Public Serv. Enterprise Inc.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "PSA",
	"Name": "Public Storage",
	"Sector": "Financials"
	},
	{
	"Symbol": "PHM",
	"Name": "Pulte Homes Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "PVH",
	"Name": "PVH Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "QRVO",
	"Name": "Qorvo",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "QCOM",
	"Name": "QUALCOMM Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "PWR",
	"Name": "Quanta Services Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "DGX",
	"Name": "Quest Diagnostics",
	"Sector": "Health Care"
	},
	{
	"Symbol": "RRC",
	"Name": "Range Resources Corp.",
	"Sector": "Energy"
	},
	{
	"Symbol": "RTN",
	"Name": "Raytheon Co.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "O",
	"Name": "Realty Income Corporation",
	"Sector": "Financials"
	},
	{
	"Symbol": "RHT",
	"Name": "Red Hat Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "REGN",
	"Name": "Regeneron",
	"Sector": "Health Care"
	},
	{
	"Symbol": "RF",
	"Name": "Regions Financial Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "RSG",
	"Name": "Republic Services Inc",
	"Sector": "Industrials"
	},
	{
	"Symbol": "RAI",
	"Name": "Reynolds American Inc.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "RHI",
	"Name": "Robert Half International",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ROK",
	"Name": "Rockwell Automation Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "COL",
	"Name": "Rockwell Collins",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ROP",
	"Name": "Roper Industries",
	"Sector": "Industrials"
	},
	{
	"Symbol": "ROST",
	"Name": "Ross Stores",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "RCL",
	"Name": "Royal Caribbean Cruises Ltd",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "R",
	"Name": "Ryder System",
	"Sector": "Industrials"
	},
	{
	"Symbol": "SPGI",
	"Name": "S&P Global, Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "CRM",
	"Name": "Salesforce.com",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "SCG",
	"Name": "SCANA Corp",
	"Sector": "Utilities"
	},
	{
	"Symbol": "SLB",
	"Name": "Schlumberger Ltd.",
	"Sector": "Energy"
	},
	{
	"Symbol": "SNI",
	"Name": "Scripps Networks Interactive Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "STX",
	"Name": "Seagate Technology",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "SEE",
	"Name": "Sealed Air Corp.(New)",
	"Sector": "Materials"
	},
	{
	"Symbol": "SRE",
	"Name": "Sempra Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "SHW",
	"Name": "Sherwin-Williams",
	"Sector": "Materials"
	},
	{
	"Symbol": "SIG",
	"Name": "Signet Jewelers",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "SPG",
	"Name": "Simon Property Group Inc",
	"Sector": "Financials"
	},
	{
	"Symbol": "SWKS",
	"Name": "Skyworks Solutions",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "SLG",
	"Name": "SL Green Realty",
	"Sector": "Financials"
	},
	{
	"Symbol": "SJM",
	"Name": "Smucker (J.M.)",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "SNA",
	"Name": "Snap-On Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "SO",
	"Name": "Southern Co.",
	"Sector": "Utilities"
	},
	{
	"Symbol": "LUV",
	"Name": "Southwest Airlines",
	"Sector": "Industrials"
	},
	{
	"Symbol": "SWN",
	"Name": "Southwestern Energy",
	"Sector": "Energy"
	},
	{
	"Symbol": "SE",
	"Name": "Spectra Energy Corp.",
	"Sector": "Energy"
	},
	{
	"Symbol": "STJ",
	"Name": "St Jude Medical",
	"Sector": "Health Care"
	},
	{
	"Symbol": "SWK",
	"Name": "Stanley Black & Decker",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "SPLS",
	"Name": "Staples Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "SBUX",
	"Name": "Starbucks Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "HOT",
	"Name": "Starwood Hotels & Resorts",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "STT",
	"Name": "State Street Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "SRCL",
	"Name": "Stericycle Inc",
	"Sector": "Industrials"
	},
	{
	"Symbol": "SYK",
	"Name": "Stryker Corp.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "STI",
	"Name": "SunTrust Banks",
	"Sector": "Financials"
	},
	{
	"Symbol": "SYMC",
	"Name": "Symantec Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "SYF",
	"Name": "Synchrony Financial",
	"Sector": "Financials"
	},
	{
	"Symbol": "SYY",
	"Name": "Sysco Corp.",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "TROW",
	"Name": "T. Rowe Price Group",
	"Sector": "Financials"
	},
	{
	"Symbol": "TGT",
	"Name": "Target Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TEL",
	"Name": "TE Connectivity Ltd.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "TE",
	"Name": "TECO Energy",
	"Sector": "Utilities"
	},
	{
	"Symbol": "TGNA",
	"Name": "Tegna",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TDC",
	"Name": "Teradata Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "TSO",
	"Name": "Tesoro Petroleum Co.",
	"Sector": "Energy"
	},
	{
	"Symbol": "TXN",
	"Name": "Texas Instruments",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "TXT",
	"Name": "Textron Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "BK",
	"Name": "The Bank of New York Mellon Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "CLX",
	"Name": "The Clorox Company",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "KO",
	"Name": "The Coca Cola Company",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "HSY",
	"Name": "The Hershey Company",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "MOS",
	"Name": "The Mosaic Company",
	"Sector": "Materials"
	},
	{
	"Symbol": "TRV",
	"Name": "The Travelers Companies Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "DIS",
	"Name": "The Walt Disney Company",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TMO",
	"Name": "Thermo Fisher Scientific",
	"Sector": "Health Care"
	},
	{
	"Symbol": "TIF",
	"Name": "Tiffany & Co.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TWX",
	"Name": "Time Warner Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TJX",
	"Name": "TJX Companies Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TMK",
	"Name": "Torchmark Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "TSS",
	"Name": "Total System Services",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "TSCO",
	"Name": "Tractor Supply Company",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TDG",
	"Name": "TransDigm Group",
	"Sector": "Industrials"
	},
	{
	"Symbol": "RIG",
	"Name": "Transocean",
	"Sector": "Energy"
	},
	{
	"Symbol": "TRIP",
	"Name": "TripAdvisor",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "FOXA",
	"Name": "Twenty-First Century Fox Class A",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "FOX",
	"Name": "Twenty-First Century Fox Class B",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "TYC",
	"Name": "Tyco International",
	"Sector": "Industrials"
	},
	{
	"Symbol": "TSN",
	"Name": "Tyson Foods",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "USB",
	"Name": "U.S. Bancorp",
	"Sector": "Financials"
	},
	{
	"Symbol": "UDR",
	"Name": "UDR Inc",
	"Sector": "Financials"
	},
	{
	"Symbol": "ULTA",
	"Name": "Ulta Salon Cosmetics & Fragrance Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "UA",
	"Name": "Under Armour",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "UNP",
	"Name": "Union Pacific",
	"Sector": "Industrials"
	},
	{
	"Symbol": "UAL",
	"Name": "United Continental Holdings",
	"Sector": "Industrials"
	},
	{
	"Symbol": "UNH",
	"Name": "United Health Group Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "UPS",
	"Name": "United Parcel Service",
	"Sector": "Industrials"
	},
	{
	"Symbol": "URI",
	"Name": "United Rentals, Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "UTX",
	"Name": "United Technologies",
	"Sector": "Industrials"
	},
	{
	"Symbol": "UHS",
	"Name": "Universal Health Services, Inc.",
	"Sector": "Health Care"
	},
	{
	"Symbol": "UNM",
	"Name": "Unum Group",
	"Sector": "Financials"
	},
	{
	"Symbol": "URBN",
	"Name": "Urban Outfitters",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "VFC",
	"Name": "V.F. Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "VLO",
	"Name": "Valero Energy",
	"Sector": "Energy"
	},
	{
	"Symbol": "VAR",
	"Name": "Varian Medical Systems",
	"Sector": "Health Care"
	},
	{
	"Symbol": "VTR",
	"Name": "Ventas Inc",
	"Sector": "Financials"
	},
	{
	"Symbol": "VRSN",
	"Name": "Verisign Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "VRSK",
	"Name": "Verisk Analytics",
	"Sector": "Industrials"
	},
	{
	"Symbol": "VZ",
	"Name": "Verizon Communications",
	"Sector": "Telecommunications Services"
	},
	{
	"Symbol": "VRTX",
	"Name": "Vertex Pharmaceuticals Inc",
	"Sector": "Health Care"
	},
	{
	"Symbol": "VIAB",
	"Name": "Viacom Inc.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "V",
	"Name": "Visa Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "VNO",
	"Name": "Vornado Realty Trust",
	"Sector": "Financials"
	},
	{
	"Symbol": "VMC",
	"Name": "Vulcan Materials",
	"Sector": "Materials"
	},
	{
	"Symbol": "WMT",
	"Name": "Wal-Mart Stores",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "WBA",
	"Name": "Walgreens Boots Alliance",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "WM",
	"Name": "Waste Management Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "WAT",
	"Name": "Waters Corporation",
	"Sector": "Health Care"
	},
	{
	"Symbol": "WFC",
	"Name": "Wells Fargo",
	"Sector": "Financials"
	},
	{
	"Symbol": "HCN",
	"Name": "Welltower Inc.",
	"Sector": "Financials"
	},
	{
	"Symbol": "WDC",
	"Name": "Western Digital",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "WU",
	"Name": "Western Union Co",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "WRK",
	"Name": "Westrock Co",
	"Sector": "Materials"
	},
	{
	"Symbol": "WY",
	"Name": "Weyerhaeuser Corp.",
	"Sector": "Financials"
	},
	{
	"Symbol": "WHR",
	"Name": "Whirlpool Corp.",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "WFM",
	"Name": "Whole Foods Market",
	"Sector": "Consumer Staples"
	},
	{
	"Symbol": "WMB",
	"Name": "Williams Cos.",
	"Sector": "Energy"
	},
	{
	"Symbol": "WLTW",
	"Name": "Willis Towers Watson",
	"Sector": "Financials"
	},
	{
	"Symbol": "WEC",
	"Name": "Wisconsin Energy Corporation",
	"Sector": "Utilities"
	},
	{
	"Symbol": "WYN",
	"Name": "Wyndham Worldwide",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "WYNN",
	"Name": "Wynn Resorts Ltd",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "XEL",
	"Name": "Xcel Energy Inc",
	"Sector": "Utilities"
	},
	{
	"Symbol": "XRX",
	"Name": "Xerox Corp.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "XLNX",
	"Name": "Xilinx Inc",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "XL",
	"Name": "XL Capital",
	"Sector": "Financials"
	},
	{
	"Symbol": "XYL",
	"Name": "Xylem Inc.",
	"Sector": "Industrials"
	},
	{
	"Symbol": "YHOO",
	"Name": "Yahoo Inc.",
	"Sector": "Information Technology"
	},
	{
	"Symbol": "YUM",
	"Name": "Yum! Brands Inc",
	"Sector": "Consumer Discretionary"
	},
	{
	"Symbol": "ZBH",
	"Name": "Zimmer Biomet Holdings",
	"Sector": "Health Care"
	},
	{
	"Symbol": "ZION",
	"Name": "Zions Bancorp",
	"Sector": "Financials"
	},
	{
	"Symbol": "ZTS",
	"Name": "Zoetis",
	"Sector": "Health Care"
	}
	]

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = [
	   {
	     "name": "Fusionex",
	     "epic":"FXI",
	     "price": 120.00,
	     "quantity": 2000,
	     "buyPrice": 80.00,
	     "pastCloseOfDayPrices": [92.00, 89.00, 103.00, 125.00, 108.00, 98.00, 110.00],
	     "buyDate":"2014-11-15"
	   },
	   {
	     "name": "Empiric Student Prop",
	     "epic":"ESP",
	     "price": 112.00,
	     "quantity": 3500,
	     "buyPrice": 100.00,
	     "pastCloseOfDayPrices": [90.00, 78.50, 82.50, 110.00, 109.00, 109.00, 110.50],
	     "buyDate":"2013-10-23"
	   },
	   {
	     "name": "Worldpay",
	     "epic":"WGP",
	     "price": 301.00,
	     "quantity": 1000,
	     "buyPrice": 209.40,
	     "pastCloseOfDayPrices": [232.60, 220.00, 222.00, 221.60, 240.00, 238.00, 235.40],
	     "buyDate":"2015-12-22"
	   },
	   {
	     "name": "Pets At Home",
	     "epic":"PETS",
	     "price": 247.40,
	     "quantity": 2500,
	     "buyPrice": 250.50,
	     "pastCloseOfDayPrices": [230.00, 232.30, 235.90, 236.60, 237.00, 240.00, 242.70],
	     "buyDate":"2014-08-23"
	   },
	   {
	     "name": "Cyprotex",
	     "epic":"CRX",
	     "price": 87.00,
	     "quantity": 5000,
	     "buyPrice": 90.00,
	     "pastCloseOfDayPrices": [92.00, 91.00, 91.50, 92.10, 92.70, 91.00, 88.70],
	     "buyDate":"2015-01-11"
	   },
	   {
	     "name": "Robinson",
	     "epic":"RBN",
	     "price": 202.00,
	     "quantity": 5000,
	     "buyPrice": 80.50,
	     "pastCloseOfDayPrices": [201.00, 200.50, 200.00, 202.30, 202.40, 202.10, 203.00],
	     "buyDate":"2014-04-10"
	   },
	   {
	     "name": "Softcat",
	     "epic":"SCT",
	     "price": 322.90,
	     "quantity": 2000,
	     "buyPrice": 420.00,
	     "pastCloseOfDayPrices": [324.40, 325.10, 323.90, 323.40, 323.10, 323.00, 322.20],
	     "buyDate":"2015-02-18"
	   },
	   {
	     "name": "Royal Bank of Scotland Group",
	     "epic":"RBS",
	     "price": 233.00,
	     "quantity": 8000,
	     "buyPrice": 790.00,
	     "pastCloseOfDayPrices": [228.00, 229.10, 228.10, 229.70, 230.90, 231.10, 231.40],
	     "buyDate":"2016-01-15"
	   },
	   {
	     "name": "NCC",
	     "epic":"NCC",
	     "price": 279.00,
	     "quantity": 2000,
	     "buyPrice": 500.00,
	     "pastCloseOfDayPrices": [279.10, 285.00, 285.20, 286.00, 286.00, 285.20, 280.00],
	     "buyDate":"2014-11-15"
	   },
	   {
	     "name": "Stadium",
	     "epic":"SDM",
	     "price": 116.90,
	     "quantity": 5000,
	     "buyPrice": 9.00,
	     "pastCloseOfDayPrices": [115.00, 115.00, 115.50, 115.90, 116.30, 116.40, 116.80],
	     "buyDate":"2014-04-04"
	   }
	 ]


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = [
	    {
	      "name": "Fusionex",
	      "epic":"FXI",
	      "price": 120.00,
	      "quantity": 2000,
	      "buyPrice": 80.00,
	      "pastCloseOfDayPrices": [92.00, 89.00, 103.00, 125.00, 108.00, 98.00, 110.00],
	      "buyDate":"2014-11-15"
	    },
	    {
	      "name": "Empiric Student Prop",
	      "epic":"ESP",
	      "price": 112.00,
	      "quantity": 3500,
	      "buyPrice": 100.00,
	      "pastCloseOfDayPrices": [90.00, 78.50, 82.50, 110.00, 109.00, 109.00, 110.50],
	      "buyDate":"2013-10-23"
	    },
	    {
	      "name": "Worldpay",
	      "epic":"WGP",
	      "price": 301.00,
	      "quantity": 1000,
	      "buyPrice": 209.40,
	      "pastCloseOfDayPrices": [232.60, 220.00, 222.00, 221.60, 240.00, 238.00, 235.40],
	      "buyDate":"2015-12-22"
	    },
	    {
	      "name": "Pets At Home",
	      "epic":"PETS",
	      "price": 247.40,
	      "quantity": 2500,
	      "buyPrice": 250.50,
	      "pastCloseOfDayPrices": [230.00, 232.30, 235.90, 236.60, 237.00, 240.00, 242.70],
	      "buyDate":"2014-08-23"
	    },
	    {
	      "name": "Cyprotex",
	      "epic":"CRX",
	      "price": 87.00,
	      "quantity": 5000,
	      "buyPrice": 90.00,
	      "pastCloseOfDayPrices": [92.00, 91.00, 91.50, 92.10, 92.70, 91.00, 88.70],
	      "buyDate":"2015-01-11"
	    },
	    {
	      "name": "Robinson",
	      "epic":"RBN",
	      "price": 202.00,
	      "quantity": 5000,
	      "buyPrice": 80.50,
	      "pastCloseOfDayPrices": [201.00, 200.50, 200.00, 202.30, 202.40, 202.10, 203.00],
	      "buyDate":"2014-04-10"
	    },
	    {
	      "name": "Softcat",
	      "epic":"SCT",
	      "price": 322.90,
	      "quantity": 2000,
	      "buyPrice": 420.00,
	      "pastCloseOfDayPrices": [324.40, 325.10, 323.90, 323.40, 323.10, 323.00, 322.20],
	      "buyDate":"2015-02-18"
	    },
	    {
	      "name": "Royal Bank of Scotland Group",
	      "epic":"RBS",
	      "price": 233.00,
	      "quantity": 8000,
	      "buyPrice": 790.00,
	      "pastCloseOfDayPrices": [228.00, 229.10, 228.10, 229.70, 230.90, 231.10, 231.40],
	      "buyDate":"2016-01-15"
	    },
	    {
	      "name": "NCC",
	      "epic":"NCC",
	      "price": 279.00,
	      "quantity": 2000,
	      "buyPrice": 500.00,
	      "pastCloseOfDayPrices": [279.10, 285.00, 285.20, 286.00, 286.00, 285.20, 280.00],
	      "buyDate":"2014-11-15"
	    },
	    {
	      "name": "Stadium",
	      "epic":"SDM",
	      "price": 116.90,
	      "quantity": 5000,
	      "buyPrice": 9.00,
	      "pastCloseOfDayPrices": [115.00, 115.00, 115.50, 115.90, 116.30, 116.40, 116.80],
	      "buyDate":"2014-04-04"
	    }
	  ]

/***/ },
/* 9 */
/***/ function(module, exports) {

	var Dates = function(params) {
	  this.dates = params.dates;
	  // this.epic = params.epic;
	  // this.price = params.price;
	  // this.quantity = params.quantity;
	  // this.buyPrice = params.buyPrice;
	  // this.pastCloseOfDayPrices = params.pastCloseOfDayPrices;
	  // this.buyDate = params.buyDate;
	};
	
	
	
	Dates.prototype = {
	  save: function(){
	    var url = 'http://localhost:3000/market';
	    var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function(){
	      if(request.status === 200){
	      }
	    }
	    request.send(JSON.stringify(this));
	  }
	}
	module.exports = Dates;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map