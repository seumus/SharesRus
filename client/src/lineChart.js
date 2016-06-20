var LineChart = function(data, container){

    var chart = new Highcharts.Chart({
      chart: {
        renderTo: container
      },
      title: {
        text: "Share Information"
      },
      series: data,
      xAxis: {categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]},
    });

}

module.exports = LineChart;
