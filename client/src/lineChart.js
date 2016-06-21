var LineChart = function(data, container, date){

    var chart = new Highcharts.Chart({
      chart: {
        renderTo: container, 
        backgroundColor: "#de7070"
      },
      title: {
        text: "Share Information"
      },
      series: data,
      xAxis: {categories: date},
    });

}

module.exports = LineChart;
