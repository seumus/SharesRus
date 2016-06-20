// var data = require("data.json");

var BarChart = function(data, container){

  var chart = new Highcharts.Chart({
    chart: {
      type: 'bar',
      renderTo: container
    },
    title: {
      text: "Share Information"
    },
    series: data,
    xAxis: {categories: ['categories']},
  });

}

module.exports = BarChart;
