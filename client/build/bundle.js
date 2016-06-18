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
	
	
	
	window.onload = function(){
	  var market = new Market();
	  market.getStock(market.addStock)
	
	  console.log(market);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map