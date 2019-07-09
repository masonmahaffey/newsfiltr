/*
 Template Name: Canvab - Bootstrap 4 Admin Dashboard & Frontend
 Author: Themesbrand
 File: Dashboard Init
*/

//Stacked bar chart

new Chartist.Bar('#stacked-bar-chart', {
  labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6','Q7', 'Q8', 'Q9', 'Q10'],
  series: [
    [800000, 1200000, 1400000, 1300000, 1520000, 1200000, 1400000, 1300000, 1520000, 1400000],
    [200000, 400000, 500000, 300000, 452000, 500000, 400000, 500000, 452000, 500000],
    [160000, 290000, 410000, 600000, 588000, 160000, 290000, 600000, 588000, 410000]
  ]
}, {
  stackBars: true,
  axisY: {
    labelInterpolationFnc: function(value) {
      return (value / 1000) + 'k';
    }
  },
  plugins: [
    Chartist.plugins.tooltip()
  ]
}).on('draw', function(data) {
  if(data.type === 'bar') {
    data.element.attr({
      style: 'stroke-width: 30px'
    });
  }
});


//Simple pie chart

var data = {
  series: [5, 3, 4]
};

var sum = function(a, b) { return a + b };

new Chartist.Pie('#simple-pie', data, {
  labelInterpolationFnc: function(value) {
    return Math.round(value / data.series.reduce(sum) * 100) + '%';
  }
});

$(function() {
    $(".knob").knob();
});
