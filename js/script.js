//Initialize the game board (3x3 grid)
var board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

//Game state
//  0 -> game not started
//  1 -> player 1's turn
//  2 -> player 2's turn
//  3 -> player 1 has won
//  4 -> player 2 has won
//  5 -> neither player has won
var gameState = 0;

//The following counters assign point values to validity of a route of winning
//  Positions [0..2] -> 3 rows
//  Positions [3..5] -> 3 columns
//  Positions [6..7] -> 2 diagonals (top left to bottom right first)
//  Value of 0  -> neutral
//  Value of -1 -> cannot win this way
//  Value of 1  -> 1 in a row
//  Value of 2  -> 2 in a row
//  Value of 3  -> 3 in a row (victory)
var p1_status = [0, 0, 0, 0, 0, 0, 0, 0];
var p2_status = [0, 0, 0, 0, 0, 0, 0, 0];

count_moves = 0;

//Reset the game
var resetGame = function() {
  //Initialize the game board (3x3 grid)
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  //Reset the game state
  gameState = 0;

  //Randomly assign either player 1 or player 2 to start
  gameState = (Math.floor(Math.random() * 2)) + 1;

  p1_status = [0, 0, 0, 0, 0, 0, 0, 0];
  p2_status = [0, 0, 0, 0, 0, 0, 0, 0];

  countMoves = 0;
}

//Returns 0 if neither player has won
//Returns 1 if player 1 has won
//Returns 2 if player 2 has won
//Returns 3 if neither player has won yet the game has ended (draw)
var checkWon = function() {
  for (i = 0; i < 8; i++) {
    if (p1_status[i] === 3) {
      gameState = 3;
      return 1;
    }
    else if (p2_status[i] === 3) {
      gameState = 4;
      return 2;
    }
  }
  if (countMoves === 9)
    gameState = 5;
    return 3;
  //If no value has been returned yet, neither player has won
  return 0;
}

function play() {
  resetGame();
  while (gameState !== 3 && gameState !== 4 && gameState !== 5) {
    /*
     * Wait for someone to click
     */

    checkWon();
    gameState = 3;
  }
}

var getBoard = function() {
  return board;
}

var getP1Status = function() {
  return p1_status;
}

var getP2Status = function() {
  return p2_status;
}

var choose = function(row, col) {
  if (row > 3 || row < 0 || col > 3 || col < 0) {
    console.log("ERROR: passed in invalid coords");
    return;
  }
  // TODO
}
