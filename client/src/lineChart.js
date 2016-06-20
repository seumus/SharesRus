var LineChart = function(){

    var chart = new Highcharts.Chart({
      chart: {
        renderTo: container3
      },
      title: {
        text: "Share Information"
      },
      series: data,
      xAxis: {categories: ['categories']},
    });

}

module.exports = LineChart;
