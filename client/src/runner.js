var companies = require('./data2.json');
var http = require('http');
// var sampleData = [
//     {
//       "name": "Fusionex",
//       "epic":"FXI",
//       "price": 120.00,
//       "quantity": 2000,
//       "buyPrice": 80.00,
//       "pastCloseOfDayPrices": [92.00, 89.00, 103.00, 125.00, 108.00, 98.00, 110.00],
//       "buyDate":"2014-11-15"
//     },
//     {
//       "name": "Empiric Student Prop",
//       "epic":"ESP",
//       "price": 112.00,
//       "quantity": 3500,
//       "buyPrice": 100.00,
//       "pastCloseOfDayPrices": [90.00, 78.50, 82.50, 110.00, 109.00, 109.00, 110.50],
//       "buyDate":"2013-10-23"
//     },
//     {
//       "name": "Worldpay",
//       "epic":"WGP",
//       "price": 301.00,
//       "quantity": 1000,
//       "buyPrice": 209.40,
//       "pastCloseOfDayPrices": [232.60, 220.00, 222.00, 221.60, 240.00, 238.00, 235.40],
//       "buyDate":"2015-12-22"
//     },
//     {
//       "name": "Pets At Home",
//       "epic":"PETS",
//       "price": 247.40,
//       "quantity": 2500,
//       "buyPrice": 250.50,
//       "pastCloseOfDayPrices": [230.00, 232.30, 235.90, 236.60, 237.00, 240.00, 242.70],
//       "buyDate":"2014-08-23"
//     },
//     {
//       "name": "Cyprotex",
//       "epic":"CRX",
//       "price": 87.00,
//       "quantity": 5000,
//       "buyPrice": 90.00,
//       "pastCloseOfDayPrices": [92.00, 91.00, 91.50, 92.10, 92.70, 91.00, 88.70],
//       "buyDate":"2015-01-11"
//     },
//     {
//       "name": "Robinson",
//       "epic":"RBN",
//       "price": 202.00,
//       "quantity": 5000,
//       "buyPrice": 80.50,
//       "pastCloseOfDayPrices": [201.00, 200.50, 200.00, 202.30, 202.40, 202.10, 203.00],
//       "buyDate":"2014-04-10"
//     },
//     {
//       "name": "Softcat",
//       "epic":"SCT",
//       "price": 322.90,
//       "quantity": 2000,
//       "buyPrice": 420.00,
//       "pastCloseOfDayPrices": [324.40, 325.10, 323.90, 323.40, 323.10, 323.00, 322.20],
//       "buyDate":"2015-02-18"
//     },
//     {
//       "name": "Royal Bank of Scotland Group",
//       "epic":"RBS",
//       "price": 233.00,
//       "quantity": 8000,
//       "buyPrice": 790.00,
//       "pastCloseOfDayPrices": [228.00, 229.10, 228.10, 229.70, 230.90, 231.10, 231.40],
//       "buyDate":"2016-01-15"
//     },
//     {
//       "name": "NCC",
//       "epic":"NCC",
//       "price": 279.00,
//       "quantity": 2000,
//       "buyPrice": 500.00,
//       "pastCloseOfDayPrices": [279.10, 285.00, 285.20, 286.00, 286.00, 285.20, 280.00],
//       "buyDate":"2014-11-15"
//     },
//     {
//       "name": "Stadium",
//       "epic":"SDM",
//       "price": 116.90,
//       "quantity": 5000,
//       "buyPrice": 9.00,
//       "pastCloseOfDayPrices": [115.00, 115.00, 115.50, 115.90, 116.30, 116.40, 116.80],
//       "buyDate":"2014-04-04"
//     }
//   ]

var postData = function(data) {
  url = "http://localhost:3000/market"
  var request = new XMLHttpRequest();

  request.open("Post", url);
  request.onload = function() {
    if(request.status === 200 ) {

    }
  }
  request.send(data);
}


var saveData = function(companies) {
  for (var i = 0; i < companies.length; i++) {
    symbol = companies[i].symbol
    var request = new XMLHttpRequest();
    var url = "http://finance.yahoo.com/webservice/v1/symbols/"+symbol+"/quote?format=json&view=detail";
      request.open("GET", url);
      request.onload = function() {
        if( request.status === 200 ) {
          var result = JSON.parse(request.responseText);
          var result = result.list.resources[0].resource.fields;
          postData(result);
          // console.log(result);
        }
      }
  }

}

// var dataSave = function() {
//   for (var i = 0; i < companies.length; i++) {
//     symbol = companies[i].Symbol
//     http.get({
//
//         host: "http://finance.yahoo.com/webservice/v1/symbols/"+symbol+"/quote?format=json&view=detail",
//         path: '/market'
//     }, function(response) {
//         // Continuously update stream with data
//         var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {
//             // Data reception is done, do whatever with it!
//             var parsed = JSON.parse(body);
//             var url = "mongodb://localhost:27017/shares";
//             MongoClient.connect(url, function(err, db) {
//             var collection = db.collection('market');
//             collection.insert(parsed);
//             db.close();
//           });
//         });
//     });
//
// }
// }
// dataSave();
// saveData(companies);
