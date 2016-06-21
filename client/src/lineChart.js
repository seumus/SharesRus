var LineChart = function(data, container, date){

    var chart = new Highcharts.Chart({
      chart: {
        renderTo: container,
        backgroundColor: '#8bcad9',
        lineColor: '#ffffff'
      },
      title: {
        text: "Share Information"
      },
      series: data,
      xAxis: {categories: date},
    });

}

module.exports = LineChart;
