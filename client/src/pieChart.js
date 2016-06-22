var PieChart = function(data, container){

  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: {
          text: "Portfolio Summary"
       },
    series: [{name: "Chart",
              data: data  
        }]
  });

}

module.exports = PieChart;
