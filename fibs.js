//"global" variables
var BOARD_DIM = 4;

var FIBMAX = 2 * Math.pow(BOARD_DIM, 2); 

// generate dictionary of fibonacci numbers
function genfib(){}
  var fib = [];

  fib[0] = 0;
  fib[1] = 1;
  for(var i = 2; i < FIBMAX; i++)
  {
      // Next fibonacci number = previous + one before previous
      // Translated to JavaScript:
      fib[i] = fib[i-2] + fib[i-1];
      console.log(fib[i]);
  }
  return fib;
}

// initialize array

function newboard(){
  var board = [];

  for (var i = 0; i < BOARD_DIM; i ++)
  {
      board[i] = [];
  }
  return board
}


// fill board with the numbers 0 through 3.
// note that the board stores integers, not fibonacci numbers. 
function start_board(){
  for (var i = 0; i < BOARD_DIM; i++)
  {
    for (var j = 0; j < BOARD_DIM; j++) 
    {
      num = Math.floor((Math.random()*4));
      board[i][j] = num; 
    }
    console.log(board[i]);
  }
}

// doing things, blah, like 1. generate the next piece 2. listen for the next thing that's clicked. 




// what happens when you click the correct button?

function largest(board){
  var max = 0;
  for (var i = 0; i < BOARD_DIM; i++_{
    for (var j = 0; j < (BOARD_DIM - 1); j++){
      if (board[i][j] > max){
        max = board[i][j];
      }
    }
  }
  return max;
}

function next_piece(board){
  boardmax = largest(board);
  
}

// valid_move_row(board[]) will return true if the line has a possible move.
function valid_move_row(board){
  for (var j = 0; j < (BOARD_DIM - 1); j++){
    if (board[j + 1] == 0){
      return true
    }
    else if (Math.abs(board[j] - board[j + 1] == 1){
      return true
    }
    else {
      return false
      
    }
  }
}

//valid move returns true if a move to the left is true. 
function valid_move(board){
  for (var i = 0; i < BOARD_DIM; i++){
    if (valid_move_row(board[i])){
      return true
    }
  }
  return false
}



function move_left(piece, board){ 
  pieceplaced = false;
  if (valid_move(board)){
    for (var i = 0; i < BOARD_DIM; i++){ 
      for (var j = 1; j < BOARD_DIM; j++){
        if (board[i][j - 1] == 0){
           board[i][j - 1] = board[i][j]; 
           board[i][j] = 0;
        }
        else if (Math.abs(board[i][j - 1] - board[i][j]) == 1){
          board[i][j - 1] = Math.max(board[i][j - 1], board[i][j]) + 1;
          board[i][j] = 0;
        }
        else{
          console.log("you broke everything")
        }
      }
      if (!pieceplaced && board[i][BOARD_DIM - 1] == 0){
        pieceplaced = true; 
        board[i][BOARD_DIM - 1] == piece;
      }
    }
  }
  else{
    console.log("Invalid Move!");
    return board
  }
}


/*
    System.out.format("  ||");
    for (int i = 0; i < s[0].length; ++i) System.out.format(" %2d |", i);
    System.out.format("|\n" + new String(new char[4+5*s[0].length+1]).replace("\0", "=") + "\n");
    for (int i = s.length-1; i > 0; --i) {
      System.out.format("%c ||", 'A' + i);
      for (int j = 0; j < s[i].length; ++j) System.out.format(" %2d |", s[i][j]);
      System.out.format("|\n");

      System.out.format("--||");
      for (int j = 0; j < s[i].length; ++j) System.out.format("----|");
      System.out.format("|\n");
    }
    System.out.format("%c ||", 'A');
    for (int j = 0; j < s[0].length; ++j) System.out.format(" %2d |", s[0][j]);
    System.out.format("|\n" + new String(new char[4+5*s[0].length+1]).replace("\0", "=") + "\n");
*/





/* now useless code:


  // reverse the array to get a "dictionary"

var dict = []; 

for (var i = 0; i < 40; i++)
{
  dict[fib[i]] = i;
  console.log(fib[i], i);
}


var nopiecemoved = true;

*/