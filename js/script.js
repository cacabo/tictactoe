/*
 * FORMATTING
 */

$(document).ready(function() {
    var w = $('.slot').width();
    $('.slot').height(w);

    $(window).resize(function() {
        var w = $('.slot').width();
        $('.slot').height(w);
    });
});

/*
 * PROGRAM
 */

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
//  5 -> draw
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
    //TODO


    for (i = 0; i < 8; i++) {
        if (p1_status[i] === 3) {
            gameState = 3;
            return 1;
        } else if (p2_status[i] === 3) {
            gameState = 4;
            return 2;
        }
    }
    if (countMoves === 9) {
        gameState = 5;
        return 3;
    }
    //If no value has been returned yet, neither player has won
    return 0;
}

// var play = function() {
//     resetGame();
//     while (gameState !== 3 && gameState !== 4 && gameState !== 5) {
//         /*
//          * Wait for someone to click
//          */
//
//         checkWon();
//     }
// }

var getBoard = function() {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
}

var getP1Status = function() {
    return p1_status;
}

var getP2Status = function() {
    return p2_status;
}

//Update the status at the passed in index depending on current state
//Called whne it is P1's turn
var updateStatusP1 = function(i) {
    if (p2_status[i] <= 0) {
        p1_status[i]++;
    }
    p2_status[i] = -1;
}

//Update the status at the passed in index depending on current state
//Called whne it is P2's turn
var updateStatusP2 = function(i) {
    if (p1_status[i] <= 0) {
        p2_status[i]++;
    }
    p1_status[i] = -1;
}

var choose = function(row, col) {
    if (row > 3 || row < 0 || col > 3 || col < 0) {
        console.log("ERROR: passed in invalid coords");
        return;
    }
    // If this location has not yet been chosen
    if ((gameState === 1 || gameState === 2) && board[row][col] === 0) {
        countMoves++;
        //Assign either a 1 or 2 to the board depending on whose turn it is
        board[row][col] = gameState;

        //Update the point system
        if (gameState === 1) {
            switch (true) {
                case (row === 0 && col === 0):
                    updateStatusP1(0);
                    updateStatusP1(3);
                    updateStatusP1(6);
                    break;
                case (row === 0 && col === 1):
                    updateStatusP1(0);
                    updateStatusP1(4);
                    break;
                case (row === 0 && col === 2):
                    updateStatusP1(0);
                    updateStatusP1(5);
                    updateStatusP1(7);
                    break;
                case (row === 1 && col === 0):
                    updateStatusP1(1);
                    updateStatusP1(3);
                    break;
                case (row === 1 && col === 1):
                    updateStatusP1(1);
                    updateStatusP1(4);
                    updateStatusP1(6);
                    updateStatusP1(7);
                    break;
                case (row === 1 && col === 2):
                    updateStatusP1(1);
                    updateStatusP1(5);
                    break;
                case (row === 2 && col === 0):
                    updateStatusP1(2);
                    updateStatusP1(3);
                    updateStatusP1(7);
                    break;
                case (row === 2 && col === 1):
                    updateStatusP1(2);
                    updateStatusP1(4);
                    break;
                case (row === 2 && col === 2):
                    updateStatusP1(2);
                    updateStatusP1(5);
                    updateStatusP1(6);
                    break;
                default:
                    break;
            }
        } else {

            switch (gameState === 2) {
                case (row === 0 && col === 0):
                    updateStatusP2(0);
                    updateStatusP2(3);
                    updateStatusP2(6);
                    break;
                case (row === 0 && col === 1):
                    updateStatusP2(0);
                    updateStatusP2(4);
                    break;
                case (row === 0 && col === 2):
                    updateStatusP2(0);
                    updateStatusP2(5);
                    updateStatusP2(7);
                    break;
                case (row === 1 && col === 0):
                    updateStatusP2(1);
                    updateStatusP2(3);
                    break;
                case (row === 1 && col === 1):
                    updateStatusP2(1);
                    updateStatusP2(4);
                    updateStatusP2(6);
                    updateStatusP2(7);
                    break;
                case (row === 1 && col === 2):
                    updateStatusP2(1);
                    updateStatusP2(5);
                    break;
                case (row === 2 && col === 0):
                    updateStatusP2(2);
                    updateStatusP2(3);
                    updateStatusP2(7);
                    break;
                case (row === 2 && col === 1):
                    updateStatusP2(2);
                    updateStatusP2(4);
                    break;
                case (row === 2 && col === 2):
                    updateStatusP2(2);
                    updateStatusP2(5);
                    updateStatusP2(6);
                    break;
                default:
                    break;
            }
        }

        //switch whose turn it is
        gameState = (gameState === 1) ? 2 : 1;

        //Check if either player has won
        checkWon();
    }
}

//Reset the board visually
var resetBoard = function() {
    $('.slot').removeClass('p1');
    $('.slot').removeClass('p2');
}


//Add click event listeners to buttons and slots
$(document).ready(function() {
    $('#r0c0').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[0][0] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(0, 0);
        }
    });

    $('#r0c1').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[0][1] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(0, 1);
        }
    });

    $('#r0c2').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[0][2] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(0, 2);
        }
    });

    $('#r1c0').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[1][0] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(1, 0);
        }
    });

    $('#r1c1').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[1][1] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(1, 1);
        }
    });

    $('#r1c2').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[1][2] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(1, 2);
        }
    });

    $('#r2c0').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[2][0] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(2, 0);
        }
    });

    $('#r2c1').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[2][1] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(2, 1);
        }
    });

    $('#r2c2').click(function() {
        if (gameState === 1 || gameState === 2) {
            //Color the grid depending on who's turn it is
            //If the board is not yet colored
            if (board[2][2] === 0) {
                if (gameState === 1)
                    $(this).addClass('p1');
                else
                    $(this).addClass('p2');
            }
            //Perform backend action
            choose(2, 2);
        }
    });

    $('#reset').click(function() {
        resetGame();
        resetBoard();
    });

    $('#CPU').click(function() {
        var text = $('#CPU p').html();
        if (text === "Enable CPU")
            $('#CPU p').html("Disable CPU");
        else
            $('#CPU p').html("Enable CPU");
    });

    $('#end').click(function() {
        gameState = 5;
    });
});



//When the page has finished loading, start playing the game
$(document).ready(function() {
    resetGame();
});
