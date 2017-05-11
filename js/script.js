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

//Keeps count of the number of moves made
//Used to determine if a draw has been reached
var count_moves = 0;

//Keeps track of whether the CPU is enabled for player 27
var cpu_enabled = false;


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

    //Change the game state so the user can see
    if (gameState === 1) {
        $('#state').html("Player 1's Turn");
    } else {
        $('#state').html("Player 2's Turn");
    }

    p1_status = [0, 0, 0, 0, 0, 0, 0, 0];
    p2_status = [0, 0, 0, 0, 0, 0, 0, 0];

    count_moves = 0;
}

//Returns 0 if neither player has won
//Returns 1 if player 1 has won
//Returns 2 if player 2 has won
//Returns 3 if neither player has won yet the game has ended (draw)
var checkWon = function() {
    for (i = 0; i < 8; i++) {
        if (p1_status[i] === 3) {
            $('#state').html("Player 1 Won");
            gameState = 3;
            return 1;
        } else if (p2_status[i] === 3) {
            $('#state').html("Player 2 Won");
            gameState = 4;
            return 2;
        }
    }
    if (count_moves === 9) {
        $('#state').html("It's a draw!");
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
        count_moves++;
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
            switch (true) {
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

        if (gameState === 1)
            $('#state').html("Player 1's Turn");
        else if (gameState === 2) {
            $('#state').html("Player 2's Turn");
            if (cpu_enabled) {
                cpu_move();
            }
        }

    }
}

//Reset the board visually
var resetBoard = function() {
    $('.slot').removeClass('p1');
    $('.slot').removeClass('p2');
}

//Handle click to r0c0
var r0c0 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[0][0] === 0) {
            if (gameState === 1)
                $('#r0c0').addClass('p1');
            else
                $('#r0c0').addClass('p2');
        }
        //Perform backend action
        choose(0, 0);
    }
}

//Handle click to r0c1
var r0c1 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[0][1] === 0) {
            if (gameState === 1)
                $('#r0c1').addClass('p1');
            else
                $('#r0c1').addClass('p2');
        }
        //Perform backend action
        choose(0, 1);
    }
}

//Handle click to r0c2
var r0c2 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[0][2] === 0) {
            if (gameState === 1)
                $('#r0c2').addClass('p1');
            else
                $('#r0c2').addClass('p2');
        }
        //Perform backend action
        choose(0, 2);
    }
}

//Handle click to r1c0
var r1c0 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[1][0] === 0) {
            if (gameState === 1)
                $('#r1c0').addClass('p1');
            else
                $('#r1c0').addClass('p2');
        }
        //Perform backend action
        choose(1, 0);
    }
}

//Handle click to r1c1
var r1c1 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[1][1] === 0) {
            if (gameState === 1)
                $('#r1c1').addClass('p1');
            else
                $('#r1c1').addClass('p2');
        }
        //Perform backend action
        choose(1, 1);
    }
}

//Handle click to r1c2
var r1c2 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[1][2] === 0) {
            if (gameState === 1)
                $('#r1c2').addClass('p1');
            else
                $('#r1c2').addClass('p2');
        }
        //Perform backend action
        choose(1, 2);
    }
}

//Handle click to r2c0
var r2c0 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[2][0] === 0) {
            if (gameState === 1)
                $('#r2c0').addClass('p1');
            else
                $('#r2c0').addClass('p2');
        }
        //Perform backend action
        choose(2, 0);
    }
}

//Handle click to r2c1
var r2c1 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[2][1] === 0) {
            if (gameState === 1)
                $('#r2c1').addClass('p1');
            else
                $('#r2c1').addClass('p2');
        }
        //Perform backend action
        choose(2, 1);
    }
}

//Handle click to r2c2
var r2c2 = function() {
    if (gameState === 1 || gameState === 2) {
        //Color the grid depending on who's turn it is
        //If the board is not yet colored
        if (board[2][2] === 0) {
            if (gameState === 1)
                $('#r2c2').addClass('p1');
            else
                $('#r2c2').addClass('p2');
        }
        //Perform backend action
        choose(2, 2);
    }
}

//Choose the location in the grid based on the passed in row and column
//And update both the front and back ends
var cpu_choose = function(row, col) {
    var string = '#r' + row + 'c' + col;
    console.log("This is the string:" + string);

    switch (string) {
        case '#r0c0':
            r0c0();
            break;
        case '#r0c1':
            r0c1();
            break;
        case '#r0c2':
            r0c2();
            break;
        case '#r1c0':
            r1c0();
            break;
        case '#r1c1':
            r1c1();
            break;
        case '#r1c2':
            r1c2();
            break;
        case '#r2c0':
            r2c0();
            break;
        case '#r2c1':
            r2c1();
            break;
        case '#r2c2':
            r2c2();
            break;
    }
}

//Takes in a row and col, which can be either "x" for row and "y" for col
//If an integer is passed in, then we choose the open item in the passed in row
//or column
var place_in_line = function(row, col) {
    //Place in the sepcified column
    if (row === "x" && col !== "y") {
        for (j = 0; j < 3; j++) {
            if (board[j][col] === 0)
                cpu_choose(j, col);
        }
    }
    //Place in the specified row
    else if (col === "y" && row !== "x") {
        for (j = 0; j < 3; j++) {
            if (board[row][j] === 0)
                cpu_choose(row, j);
        }
    }
    //Place int eh diagonal from upper left to bottom right
    else if (row === "x" && col === "y") {
        for (j = 0; j < 3; j++) {
            if (board[j][j] === 0)
                cpu_choose(j, j);
        }
    }
    //Place in the diagonal from bottom left to upper right
    else if (row === "y" && col === "x") {
        for (j = 0; j < 3; j++) {
            if (board[2 - j][j] === 0)
                cpu_choose(2 - j, j);
        }
    }
}

//Returns 1 if the CPU wins, otherwise returns 0
var move_to_win_or_block = function() {
    var win_or_block = -1;
    for (i = 0; i < 8; i++) {
        if (p2_status[i] === 2) {
            win_or_block = i;
            break;
        }
    }
    if (win_or_block === -1) {
        for (k = 0; k < 8; k++) {
            if (p1_status[k] === 2) {
                win_or_block = k;
                break;
            }
        }
    }
    //If there is no 2 in a row on the board, return false
    if (win_or_block === -1) {
        return false;
    }
    switch (win_or_block) {
        case 0:
            place_in_line(0, "y");
            break;
        case 1:
            place_in_line(1, "y");
            break;
        case 2:
            place_in_line(2, "y");
            break;
        case 3:
            place_in_line("x", 0);
            break;
        case 4:
            place_in_line("x", 1);
            break;
        case 5:
            place_in_line("x", 2);
            break;
        case 6:
            place_in_line("x", "y");
            break;
        case 7:
            place_in_line("y", "x");
            break;
    }
    //If a three in a row was acheived or blocked, return true
    return true;
}

//Have the CPU move if the CPU is enabled
var cpu_move = function() {
    console.log("Time for cpu move");
    console.log("Number of moves: " + count_moves);
    //If no move has yet been made, pick a corner
    if (count_moves === 0) {
        var rand = Math.floor(Math.random() * 4);
        switch (rand) {
            case 0:
                r0c0();
                break;
            case 1:
                r0c2();
                break;
            case 2:
                r2c0();
                break;
            case 3:
                r2c2();
                break;
            default:
                break;
        }
    }
    // else if (count_moves === 3 && board[1][1] === 0) {
    // } TODO
    //Complete a 3 in a row if possible
    //Otherwise block a 3 in a row by player1
    else if (move_to_win_or_block()) {
        return;
    } else {
        console.log("Choosing a random position");
        //Find all open posiitons in the board
        var open = [];
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    open.push((i * 10) + j);
                }
            }
        }

        //Pick one of the open positions
        var rand = Math.floor(Math.random() * open.length);
        var choice = open[rand];

        var row = Math.floor(choice / 10);
        var col = choice % 10;

        cpu_choose(row, col);
    }
}


//Add click event listeners to buttons and slots
$(document).ready(function() {
    $('#r0c0').click(function() {
        r0c0();
    });

    $('#r0c1').click(function() {
        r0c1();
    });

    $('#r0c2').click(function() {
        r0c2();
    });

    $('#r1c0').click(function() {
        r1c0();
    });

    $('#r1c1').click(function() {
        r1c1();
    });

    $('#r1c2').click(function() {
        r1c2();
    });

    $('#r2c0').click(function() {
        r2c0();
    });

    $('#r2c1').click(function() {
        r2c1();
    });

    $('#r2c2').click(function() {
        r2c2();
    });

    //Reset the game
    $('#reset').click(function() {
        resetGame();
        resetBoard();
        if (cpu_enabled && (gameState === 2))
            cpu_move();
    });

    //If the enable/disable CPU button is clicked
    $('#CPU').click(function() {
        var text = $('#CPU p').html();
        if (text === "Enable CPU") {
            $('#CPU p').html("Disable CPU");
            cpu_enabled = true;
            if (gameState === 2)
                cpu_move();
        } else {
            $('#CPU p').html("Enable CPU");
            cpu_enabled = false;
        }
    });
});



//When the page has finished loading, start playing the game
$(document).ready(function() {
    resetGame();
});
