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

	var Market = __webpack_require__(1);
	var Portfolio = __webpack_require__(2);
	var Stock = __webpack_require__(3);
	var sampleShares = __webpack_require__(4);
	
	
	window.onload = function(){
	  var market = new Market();
	
	  for(share of sampleShares){
	    market.addStock(new Stock(share));
	
	  }
	  console.log(market);
	  market.sendStock();
	
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Market = function() {
	  this.shares = []
	}
	
	Market.prototype = {
	  addStock: function(share){
	    this.shares.push(share);
	  },
	  sendStock: function() {
	    var url = "http://localhost:3000/market";
	    var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function() {
	      if (request.status === 200) {
	      }
	    };
	    request.send(JSON.stringify(this.shares));
	  }
	}
	
	module.exports = Market;


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	var Portfolio = function() {
	  this.shares = []
	}
	
	
	
	Portfolio.prototype = {
	  addStock: function(share){
	    this.shares.push(share);
	  }
	};
	
	
	
	
	module.exports = Portfolio;
	


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Stock = function(params) {
	  this.name = params.name;
	  this.epic = params.epic;
	  this.price = params.price;
	  this.quantity = params.quantity;
	  this.buyPrice = params.buyPrice;
	  this.pastCloseOfDayPrices = params.pastCloseOfDayPrices;
	  this.buyDate = params.buyDate;
	};
	
	module.exports = Stock;


/***/ },
/* 4 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map