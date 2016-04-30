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

var updateAsteroids = function(data) {
  var asteroids = d3.select('svg').selectAll('circle.asteroid');
  // var asteroidPos = asteroids.data(data, function(d) { return d; });
  //update existing nodes with their mapped data

  asteroids.data(data)
    .transition()
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .duration(1000);
  
  //create new asteroids
  asteroids.data(data)
   .enter()
     .append('circle')
     //add asteroid class
      .attr('class', 'asteroid')
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', '50') //TODO create variating sizes
      .style('fill', 'purple');
};

//var player = d3.select('svg').selectAll('circle.player');
var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this)
    .transition()
    .attr('cx', x)
    .attr('cy', y)
    .duration(0);
};

var drag = d3.behavior.drag()
  .on('drag', dragmove);

var updatePlayer = function(data) {

  var player = d3.select('svg').selectAll('circle.player');

  //create new player
  player.data(data)
    .enter()
      .append('circle')
        .attr('class', 'player')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '25')
        .style('fill', 'orange')
        .call(drag);

  // svg.on('click', function(d) {
  //   var drag = d3.behavior.drag();
  //   player.call(drag);

  //   console.log('clicked');
  // });
};



setInterval(function() { updateAsteroids(genRandPos(10)); }, 1000);
setInterval(function() { updatePlayer([{x: 1, y: 1}]); }, 10 );

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