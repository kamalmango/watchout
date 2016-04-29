// start slingin' some d3 here.

var svg = d3.select('body').append('svg')
  .attr('width', '100%')
  .attr('height', '800');

var createCircle = function(d) {
  var r = d / 2;

  svg.append('circle')
    .attr('cx', getRandNum(1, 800))
    .attr('cy', getRandNum(1, 800))
    .attr('r', r)
    .style('fill', 'purple');
};

var populateMap = function(num) {
  for (var i = 0; i < num; i++) {
    createCircle(getRandNum(10, 50));
  }
};

var getRandNum = function(min, max) {
  return Math.random() * (max - min) + min;
};