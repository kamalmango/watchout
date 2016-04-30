// start slingin' some d3 here.
// var asteroids = [];
var scores = {
  high: 0,
  current: 0,
  collisions: 0
};


var svg = d3.select('body').append('svg')
  .attr('width', '100%')
  .attr('height', '800');

var throttle = function(func, wait) {
  var throttled = false;
  return function() {
    var args = Array.prototype.slice.call(arguments).slice(2);
    if (!throttled) { 
      func.apply(this, args);
      throttled = true;
      setTimeout(function() {
        throttled = false;
      }, wait);
    }
  };
};

var getRandNum = function(min, max) {
  return Math.random() * (max - min) + min;
};


var genRandPos = function(num) {
  var positions = [];
  for (var i = 0; i < num; i++) {
    positions.push( {x: getRandNum(1, 700), y: getRandNum(1, 700)} );
  }
  return positions;
};

var updateAsteroids = function(data) {
  var asteroids = d3.select('svg').selectAll('.asteroid');
  // var asteroidPos = asteroids.data(data, function(d) { return d; });
  //update existing nodes with their mapped data

  asteroids.data(data)
    .transition()
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .duration(1000);
  
  //create new asteroids
  asteroids.data(data)
   .enter()
     //.append('circle')
     .append('image')
     //add asteroid class
      .attr('class', 'asteroid')
      // .attr('cx', function(d) { return d.x; })
      // .attr('cy', function(d) { return d.y; })
      // .attr('r', '30') //TODO create variating sizes
      .attr('xlink:href', 'asteroid.png')
      .attr('width', 100)
      .attr('height', 100)
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; });
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
        .attr('cx', '400')
        .attr('cy', '400')
        .attr('r', '15')
        .style('fill', 'orange')
        .call(drag);

  // svg.on('click', function(d) {
  //   var drag = d3.behavior.drag();
  //   player.call(drag);

  //   console.log('clicked');
  // });
};

var updateScore = function(data) {
  // var highScore = d3.select('.highscore').select('span');
  // var score = d3.select('.current').select('span');
  // var collisions = d3.select('.collisions').select('span');
  var scoreBoard = d3.select('.scoreboard').selectAll('span');

  scoreBoard.data(data).text(function(d) { return d; });
  // //update highScore
  // highScore.data([]).text();
  // // update score
  // score.text('test');
  // // update collisions
  // collisions.text('test');
};

var incrementScore = throttle(function() {
  scores.high = scores.current > scores.high ? scores.current : scores.high;
  scores.collisions++;
  scores.current = 0;
  updateScore([scores.high, scores.current, scores.collisions]);
}, 500);

var detectCollision = function(node1, node2) {
  var x1 = Number(node1.attr('x'));
  var y1 = Number(node1.attr('y'));
  var x2 = Number(node2.attr('cx'));
  var y2 = Number(node2.attr('cy'));
 
  var distance = Math.sqrt ( Math.pow( x2 - x1, 2 ) 
    + Math.pow( y2 - y1, 2 ) );
  
  return distance < 22.5;
};


var test = throttle(updateScore, 100);

//d3.select(node1).attr('cx')

var detectPlayerCollision = function() {
  var asteroids = d3.select('svg').selectAll('.asteroid');
  var player = d3.select('svg').selectAll('circle.player');

  //check distance between player and each asteroid
  for (var i = 0; i < asteroids[0].length; i++) {
    if ( detectCollision( d3.select(asteroids[0][i]), player ) ) {
      player.style('fill', 'green');
      incrementScore();
      // scores.high = scores.current > scores.high ? scores.current : scores.high;
      // scores.collisions++;
      // scores.current = 0;
      // updateScore([scores.high, scores.current, scores.collisions]);
    }
  }

};






setInterval(function() { updateAsteroids(genRandPos(10)); }, 1000);
setInterval(function() { updatePlayer([{x: 1, y: 1}]); }, 10 );
setInterval(function() { scores.current++; }, 1000);
setInterval(function() { updateScore([scores.high, scores.current, scores.collisions]); }, 1000);
setInterval(function() { detectPlayerCollision(); }, 10);



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