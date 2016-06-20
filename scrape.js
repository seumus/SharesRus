var request = require('request');
var cheerio = require('cheerio');

request('http://www.morningstar.co.uk/uk/equities/indexstockprices.aspx?index=FTSE_100', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('span.grid-view').each(function(i, element){
      var a = $(this).prev();
      console.log(a.text());
    });
  }
});


// request('https://news.ycombinator.com', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     $('span.comhead').each(function(i, element){
//       var a = $(this).prev();
//       console.log(a.text());
//     });
//   }
// });
