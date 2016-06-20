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
