//"global" variables
var BOARD_DIM = 4;

var FIBMAX = 2 * Math.pow(BOARD_DIM, 2);

// generate dictionary of fibonacci numbers
function genfib() {
    var fib = [];

    fib[0] = 0;
    fib[1] = 1;
    for (var i = 2; i < FIBMAX; i++) {
        // Next fibonacci number = previous + one before previous
        // Translated to JavaScript:
        fib[i] = fib[i - 2] + fib[i - 1];
    }
    return fib;
}

//turn the list of fibonacci numbers into a list
function fibdict(list) {
    var fdict = [];
    for (var i = 1; i < list.length - 3; i++) {
        fdict[[list[i], list[i + 1]]] = list[i + 2];
        fdict[[list[i + 1], list[i]]] = list[i + 2];
        fdict[[0, list[i]]] = list[i];
        fdict[[list[i], 0]] = list[i];

    }
    return fdict;
}

//these are technically globals, which is still bad. 
var fib = genfib();
var fibdict = fibdict(fib);


// initialize the board.
function newboard() {
    var board = [];

    for (var i = 0; i < BOARD_DIM; i++) {
        board[i] = [];
    }
    return board
}


// fill board with the numbers 0 through 3.
// note that the board stores integers, not fibonacci numbers. 
function start_board(board, list) {
    for (var i = 0; i < BOARD_DIM; i++) {
        for (var j = 0; j < BOARD_DIM; j++) {
            num = Math.floor((Math.random() * 4));
            //console.log(i, j, num);
            board[i][j] = list[num]
        }
    }
    print_board(board);
    return board;
}

function print_board(board) {
  var html = '<table align="center" border= "1" style="width:200px"> <col width="50"><col width="50"><col width="50"><col width="50">';
  for (var i = 0; i < BOARD_DIM; i++) {
    html += "<tr>";
    for (var j = 0; j < BOARD_DIM; j++){
      if (board[i][j] != 0){
      html += "<td height=\"40\">" + board[i][j] + "</td>";
      }
      else{ html += "<td height=\"40\">" +"</td>";
      }
    }
    html += "</tr>";
  }
  html += "</table>"
  document.getElementById('game').innerHTML = html;
}


//prints the next piece
function print_piece(piece) {
    document.getElementById('next').innerHTML = "<br> next piece = " + fib[piece];
}

// returns the largest number on the board.
function largest(board) {
    var max = 0;
    for (var i = 0; i < BOARD_DIM; i++) {
        for (var j = 0; j < (BOARD_DIM - 1); j++) {
            if (board[i][j] > max) {
                max = board[i][j];
            }
        }
    }
    return max;
}



// for now, just return 1. fix later. 
function next_piece(board, list) {
    piecemax = Math.max(largest(board) - 1, 2);
    num = Math.random() / 2;
    return 1;
}

//returns true if the pair a, b is in the dictionary. 
function valid_pair(a, b, dict){
    return dict[[a, b]] != undefined
}

// valid_move_row(board[]) will return true if the line has a possible move.
function valid_move_row(row, dict) {
    //  console.log(83);
    for (var j = 0; j < (BOARD_DIM - 1); j++) {
        if (valid_pair(row[j], row[j + 1], dict)){
            return true
        }
    }
    return false;
}

//valid move returns true if a move to the left is true. 
function valid_move(board, dict) {
    for (var i = 0; i < BOARD_DIM; i++) {
        if (valid_move_row(board[i], dict)) {
            console.log("valid move");
            return true;
        }
    }
    return false;
}


/* instead of writing a billion functions for moving, I'm going to write a function for rotation by 90
 and flipping horizontally. This is the most efficient use of my time (although not so great algorithmically */

//flips board
function flip(board) {
    flipboard = newboard();
    for (var i = 0; i < BOARD_DIM; i++) {
        for (var j = 0; j < BOARD_DIM; j++) {
            flipboard[i][(BOARD_DIM - 1) - j] = board[i][j];
        }
    }
    return flipboard;
}


//rotates the board counterclockwise
function rotate(board) {
    rotated = newboard();
    for (var i = 0; i < BOARD_DIM; i++) {
        for (var j = 0; j < BOARD_DIM; j++) {
            rotated[i][j] = board[j][i];
        }
    }
    rotated = flip(rotated);
    return rotated;
}

//rotates the board clockwise
function backrotate(board) {
    return rotate(rotate(rotate(board)));
}


//functions for moving up, left, right, down:
//if something on the row has moved, then we can place the piece in that row.
function move_left(piece, board, dict) {
    //we only want to place the piece once.
    pieceplaced = false;
    if (valid_move(board, dict)) {
        for (var i = 0; i < BOARD_DIM; i++) {
            //has the row moved?
            rowmoved = false;
            for (var j = 1; j < BOARD_DIM; j++) {
                if (valid_pair(board[i][j - 1], board[i][j], dict)){
                    board[i][j - 1] = dict[[board[i][j], board[i][j-1]]];
                    board[i][j] = 0;
                    rowmoved = true;
                    console.log("shifted something left");
                } else {
                    console.log("did nothing");
                }
            }
            //if the piece hasn't been placed, and the row has moved, then place the piece.
            if (!pieceplaced && (board[i][BOARD_DIM - 1] == 0) && rowmoved == true) {
                board[i][BOARD_DIM - 1] = piece;
                pieceplaced = true;
            }
            //console.log(board[i]);
        }
        return board;
    } else {
        console.log("Invalid Move!");
        return board;
    }
}


function move_right(piece, board, dict) {
    board = flip(board);
    //document.write("miew");
    board = move_left(piece, board, dict);
    //document.write("miew");
    board = flip(board);
    //document.write("miew");
    return board;
}

function move_down(piece, board, dict) {
    board = rotate(board);
    //  document.write("rotated <br>");
    //  print_board(board);
    board = move_left(piece, board, dict);
    //  document.write("move_left<br>");
    //  print_board(board);
    board = backrotate(board);
    //document.write("rotated back<br>");
    //print_board(board);
    return board;
}

function move_up(piece, board, dict) {
    board = backrotate(board);
    board = move_left(piece, board, dict);
    board = rotate(board);
    return board;
}


//test to see if any of the moves are valid, and if none are, then end the game. 
function end_game(board, dict) {
    if (!valid_move(board, dict) && !valid_move(flip(board), dict) && !valid_move(rotate(board), dict) && !valid_move(backrotate(board), dict)) {
        return true;
    }
    return false;
}


/* STARTS EVERYTHING!!! */

var playerboard = start_board(newboard(), fib);
var piece = next_piece(playerboard, fib);
print_piece(piece);

/**
 * Handles keystrokes.
 */
function keyListener(event) {
    ///whatever we want to do goes in this block
    event = event || window.event; //capture the event, and ensure we have an event
    var key = event.key || event.which || event.keyCode; //find the key that was pressed
    //MDN is better at this: https://developer.mozilla.org/en-US/docs/DOM/event.which

    // left arrow
    if (key === 37 || key === 65 || key === 97) {
        playerboard = move_left(piece, playerboard, fibdict);
        console.log("left key pushed");

    }

    // up arrow
    else if (key === 38 || key === 87 || key === 119) {
        playerboard = move_up(piece, playerboard, fibdict);
        console.log("up key pushed");
    }

    // right arrow
    else if (key === 39 || key === 68 || key === 100) {
        playerboard = move_right(piece, playerboard, fibdict);
        console.log("right key pushed");
    }

    // down arrow
    else if (key == 40 || key === 83 || key === 115) {
        playerboard = move_down(piece, playerboard, fibdict);
        console.log("down key pushed");
    }
    //else, display the rules.  
    else {
        document.getElementById('keys').innerHTML = "use the (left, right, up, and down) or (WASD) keys to make moves!";
    }

    //print everything, test for end, etc. 
    print_board(playerboard);
    piece = next_piece(playerboard, fib);
    print_piece(piece);
    if (end_game(playerboard, fibdict)) {
      document.getElementById('next').innerHTML = "Oh no! There are no more possible moves! Try again?";
    }
}

//event listener. 
document.addEventListener('keyup', keyListener, false);
