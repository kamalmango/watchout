// start slingin' some d3 here.
// var asteroids = [];

var svg = d3.select('body').append('svg')
  .attr('width', '100%')
  .attr('height', '800');

var createCircle = function(d, id) {
  var r = d / 2;

  svg.append('circle')
    .attr('class', id)
    .attr('cx', getRandNum(1, 800))
    .attr('cy', getRandNum(1, 800))
    .attr('r', r)
    .style('fill', 'purple');
};

var getRandNum = function(min, max) {
  return Math.random() * (max - min) + min;
};

// var moveAsteroids = function() {
//   asteroids.transition()
//     .attr('cx', getRandNum(1, 800)).attr('cy', getRandNum(1, 800))
//     .duration(1000);
// };

var genRandPos = function(num) {
  var positions = [];
  for (var i = 0; i < num; i++) {
    positions.push( {x: getRandNum(1, 700), y: getRandNum(1, 700)} );
  }
  return positions;
};

var update = function(data) {
  var asteroids = d3.select('svg').selectAll('circle');
  // var asteroidPos = asteroids.data(data, function(d) { return d; });
  //update existing nodes with their mapped data

  asteroids.data(data, function (d) { return d; })
    .transition()
    .attr('cx', getRandNum(1, 700))
    .attr('cy', getRandNum(1, 700))
    .duration(1000);
  
  //create new asteroids
  asteroids.data(data)
   .enter()
     .append('circle')
       .attr('cx', function(d) { return d.x; })
       .attr('cy', function(d) { return d.y; })
       .attr('r', 50) //TODO create variating sizes
       .style('fill', 'purple');
};

setInterval(function() { update(genRandPos(10)); }, 1000);

//[{x: 100 y: 100}, {x: 100 y: 100} ]

/*
[{name: 'dan', val:2}, {name: 'cal', val:5}]
update([{name: 'dan', val:2}, {name: 'jonas', val:5}])

.text(function(){
  return 'my name is' + name;
})

<div> dan 2 </div>
<div> jonas 5 </div>
*/