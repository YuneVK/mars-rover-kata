/**
 * Mars Rover Kata - Ironhack Prework
 * 
 * @author Sonia Ruiz Cayuela <yune.vk@gmail.com>
 */

// Rovers config
var rovers = {
  foo: {
    name: 'Foo',
    alias: 'f',
    direction: 'N', 
    x: 0, 
    y: 0, 
    travelLog: []
  }, 
  bar: {
    name: 'Bar',
    alias: 'b',
    direction: 'N', 
    x: 9, 
    y: 9, 
    travelLog: []
  }
};

// Grid config
var gridSize = {
  x: 10,
  y: 10
};
var totalObstacles = 7;

var grid = [];

console.log('%c----- Mars Rover Kata -----', 'font-size: 16pt; font-weight: 900');
console.log('%cMade by Sonia Ruiz Cayuela', 'font-size: 8pt');

generateGrid(grid, gridSize);
addRovers(rovers, grid);
generateObstacles(grid, totalObstacles, gridSize);

console.log('%c\n\n-- Grid', 'font-size: 12pt; font-weight: 900');
console.table(grid);

console.log('%c\nLegend', 'font-size: 10pt; font-weight: 900');
console.log('\t# - Obstacle');
console.log('\tCapital Letters - Actual position of rovers');
console.log('\tLowercase Letters - Previous positions');

console.log('%c\n\n-- Instructions', 'font-size: 12pt; font-weight: 900');
console.log('Call the function "runSequence(sequence, rover)" passing the ' + 
            'following parameters: \n\n\tsequence - A string with all the commands ' + 
            ' that the rover will follow. These only can be:\n\t\t"f" (move forward), ' + 
            '"b" (move backward), "r" (turn right), or "l"(turn left). \n\t' + 
            'rover - The rover that will move.\n\nFor example:\n\t' + 
            'runSequence(\'rffrfflfrff\', rovers.foo)\n\n\nI hope you like it! :)\n\n');

/**
 * Takes the rover and change it's direction to turn left.
 * 
 * @param {Object} rover The rover that will move
 */
function turnLeft(rover){
  switch (rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }

  console.log('%cTurned left! New direction: ' + rover.direction, 'font-weight: 900; color: #03a9f4');
}

/**
 * Takes the rover and change it's direction to turn right
 * 
 * @param {Object} rover The rover that will move
 */
function turnRight(rover){
  switch (rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }

  console.log('%cTurned right! New direction: ' + rover.direction, 'font-weight: 900; color: #03a9f4');
}

/**
 * Takes the rover and move it forward according to its direction.
 * 
 * @param {Object} rover The rover
 * @param {Object} grid The grid that represents the board game
 */
function moveForward(rover, grid){
  // The position of the rover before the change
  var prevX = rover.x;
  var prevY = rover.y;

  switch (rover.direction) {
    case 'N':
      rover.y--;
      break;
    case 'S':
      rover.y++;
      break;
    case 'E':
      rover.x++;
      break;
    case 'W':
      rover.x--;
      break;
  }

  // If there's a collision, the rover will come back to its previous position.
  // Otherwise, the grid will be updated to show the rover's path.
  if (checkCollision(grid, rover)) {
    rover.x = prevX;
    rover.y = prevY;
  } else {
    // Add the previous position to the log
    rover.travelLog.push([prevX, prevY]);
    // Set the label previous position in the grid to lower case to indicate
    // that the rover isn't there now
    grid[prevY][prevX] = grid[prevY][prevX].toLowerCase();
    // Set the label actual position in the grid to upper case to indicate
    // that the rover is there now
    grid[rover.y][rover.x] += rover.alias.toUpperCase();

    console.log('%cMoved forward! New position: [' + rover.x + ',' + rover.y + ']',
                'font-weight: 900; color: #4caf50');
  }
}

/**
 * Takes the rover and move it backward according to its direction.
 * 
 * @param {Object} rover The rover
 * @param {Object} grid The grid that represents the board game
 */
function moveBackward(rover, grid){
  // The position of the rover before the change
  var prevX = rover.x;
  var prevY = rover.y;

  switch (rover.direction) {
    case 'N':
      rover.y++;
      break;
    case 'S':
      rover.y--;
      break;
    case 'E':
      rover.x--;
      break;
    case 'W':
      rover.x++;
      break;
  }

  // If there's a collision, the rover will come back to its previous position.
  // Otherwise, the grid will be updated to show the rover's path.
  if (checkCollision(grid, rover)) {
    rover.x = prevX;
    rover.y = prevY;
  } else {
    // Add the previous position to the log
    rover.travelLog.push([prevX, prevY]);
    // Set the label previous position in the grid to lower case to indicate
    // that the rover isn't there now
    grid[prevY][prevX] = grid[prevY][prevX].toLowerCase();
    // Set the label actual position in the grid to upper case to indicate
    // that the rover is there now
    grid[rover.y][rover.x] += rover.alias.toUpperCase();

    console.log('%cMoved backward! New position: [' + rover.x + ',' + rover.y + ']',
                'font-weight: 900; color: #4caf50');
  }
}

/**
 * Check if the rover has collision with an obstacle, another rover or has
 * exceeded the limits of the grid.
 * 
 * @param {Object} grid The grid that represents the board game
 * @param {Object} rover The rover
 * @returns {boolean} True if the rover has collisioned, otherwise returns false.
 */
function checkCollision(grid, rover) {
  // If the value of the new position in the grid is 'undefined', then that position
  // doesn't exist (exceeds the size), so isn't valid
  if (typeof grid[rover.x] === 'undefined' || typeof grid[rover.x][rover.y] === 'undefined') {
    console.log('%cOut of the grid!', 'font-weight: 900; color: #f44336');
    return true;
  // If there's an obstacle (identified by the '#' symbol), there's a collision too
  } else if (grid[rover.y][rover.x] === '#') {
    console.log('%cCollision with an obstacle!', 'font-weight: 900; color: #f44336');
    return true;
  // If the cell has any content (first condition) and it has any lowercase (second condition), 
  // that means there's another rover in that position
  } else if (grid[rover.y][rover.x].length > 0 && grid[rover.y][rover.x] !== grid[rover.y][rover.x].toLowerCase()) {
    console.log('%cCollision with a rover!', 'font-weight: 900; color: #f44336');
    return true;
  }

  // If there isn't any collision, then return false
  return false;
}

/**
 * Take the sequence and, for each character, execute the corresponding
 * command calling a function to move or rotate the rover.
 * 
 * @param {string} sequence A string with all the commands that the rover will follow
 * @param {Object} rover The rover that will follow the commands
 */
function runSequence(sequence, rover) {
  console.log('%c\n' + rover.name + '\'s turn!', 'font-size: 12pt');

  for (var i = 0; i < sequence.length; i++) {
    switch (sequence[i]) {
      case 'f':
        moveForward(rover, grid);
        break;
      case 'b':
        moveBackward(rover, grid);
        break;
      case 'r':
        turnRight(rover);
        break;
      case 'l':
        turnLeft(rover);
        break;
      default: // If the command isn't valid
        console.log('%cThe command "' + sequence[i] + '" is not valid! ' + 
                    'It can only be "f", "b", "r", or "l"', 'font-weight: 900; color: #f44336');
        break;
    }
  }

  console.log('%cTurn ended!\n', 'font-size: 12pt');

  // Generate and show the log
  var log = '';
  rover.travelLog.forEach(function(position) {
    log += '[' + position[0] + ',' + position[1] + '] ';
  });
  console.log('%c\tTravel log: ' + log, 'font-weight: 900');

  // Show the actual position of the rover
  console.log('%c\tActual position: [' + rover.x + ',' + rover.y + ']', 'font-weight: 900');

  // Show the actual grid in a table
  console.table(grid);
}

/**
 * Takes the 'grid' and generate on it a bidimensional array
 * (with empty values) with the size determined in 'gridSize'
 * 
 * @param {Object} grid The grid that represents the board game
 * @param {Object} gridSize An array with the size of the grid
 */
function generateGrid(grid, gridSize) {
  for (var i = 0; i < gridSize.x; i++) {
    grid[i] = [];
    for (var j = 0; j < gridSize.y; j++) {
      grid[i][j] = '';
    }
  }
}

/**
 * Takes the rovers, show its data in console and add it to the grid.
 * 
 * @param {Object} rovers Collection of rovers that will be added to the grid
 * @param {Object} grid The grid that will show the rovers
 */
function addRovers(rovers, grid) {
  console.log('%c\n\n-- Rovers', 'font-size: 12pt; font-weight: 900');

  for (var rover in rovers) {
    var alias = rovers[rover].alias;
    var x = rovers[rover].x;
    var y = rovers[rover].y;

    // Show its alias (in upper case) in the grid to indicate that it's the
    // actual position
    grid[x][y] += alias.toUpperCase();

    console.log('%c' + rover, 'font-size: 10pt; font-weight: 900');
    console.log('\tAlias: ' + alias + '\n\n');
  }
  console.log('Total rovers: ' + Object.keys(rovers).length);
}

/**
 * Generates, randomly, obstacles and put them on the grid. The number
 * of obstacles are determined by 'totalObstacles' and they are
 * identified in the grid by the '#' symbol.
 * 
 * @param {Object} grid The grid that represents the board game
 * @param {number} totalObstacles The number of obstacles that it will generate
 * @param {Object} gridSize An array with the size of the grid
 */
function generateObstacles(grid, totalObstacles, gridSize) {
  for (var i = 0; i <= totalObstacles; i++) {
    // Generate the random numbers that will determine the position
    var x = Math.floor(Math.random() * gridSize.x);
    var y = Math.floor(Math.random() * gridSize.y);

    // If the cell is empty (there isn't a rover), then put the obstacle there
    if (!grid[x][y]) {
      grid[x][y] = '#';
    }
  }
}