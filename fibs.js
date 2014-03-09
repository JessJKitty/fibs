//"global" variables
var BOARD_DIM = 4;

var FIBMAX = 2 * Math.pow(BOARD_DIM, 2); 

// generate dictionary of fibonacci numbers
function genfib(){
  var fib = [];

  fib[0] = 0;
  fib[1] = 1;
  for(var i = 2; i < FIBMAX; i++)
  {
      // Next fibonacci number = previous + one before previous
      // Translated to JavaScript:
      fib[i] = fib[i-2] + fib[i-1];
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
function start_board(board){
  for (var i = 0; i < BOARD_DIM; i++)
  {
    for (var j = 0; j < BOARD_DIM; j++) 
    {
      num = Math.floor((Math.random()*4));
      console.log(i, j, num);
      if (num == 1) { 
        board[i][j] = 0;
      }
      else{
        board[i][j] = num;
      } 
    }
  }
  print_board(board);
  return board;
}


function print_board(board) {
  for (var i = 0; i < BOARD_DIM; i++) {
    document.write(board[i] + "<br>");
  }
  document.write("<br>");
}

// returns the largest number on the board.
function largest(board){
  var max = 0;
  for (var i = 0; i < BOARD_DIM; i++){
    for (var j = 0; j < (BOARD_DIM - 1); j++){
      if (board[i][j] > max){
        max = board[i][j];
      }
    }
  }
  return max;
}



// returns the next piece. Note that this is slightly inefficient, and I should do things more efficiently. 
function next_piece(board){
  piecemax = Math.max(largest(board) - 1, 2);
  num = Math.random()/2; 
  for (var i = piecemax; i >= 0; i--){
    if (num <= (1 / i^2)){
      return i;
    }
  }
}

// valid_move_row(board[]) will return true if the line has a possible move.
function valid_move_row(row){
//  console.log(83);
  for (var j = 0; j < (BOARD_DIM - 1); j++){
    if (row[j] == 0){
      return true;
    }
    else if (row[j] == row[j + 1] && row[j] == 2){
      return true;
    }
    else if (Math.abs(row[j] - row[j + 1]) == 1){
      return true;
    }
    else {
      return false;
      
    }
  }
}

//valid move returns true if a move to the left is true. 
function valid_move(board){
  for (var i = 0; i < BOARD_DIM; i++){
    if (valid_move_row(board[i])){
      return true;
    }
  }
  return false;
}



function move_left(piece, board){
//  console.log(0);
  pieceplaced = false;
//  console.log(board);
  if (valid_move(board)){
    console.log("valid move");
    for (var i = 0; i < BOARD_DIM; i++){  
      for (var j = 1; j < BOARD_DIM; j++){
        console.log(i, j);
        if (board[i][j - 1] == 0){
          board[i][j - 1] = board[i][j]; 
          board[i][j] = 0;
          console.log("shifted something left");
        }
        else if (board[i][j - 1] == board[i][j] && board[i][j] == 2){
          board[i][j - 1] == 3;
          board[i][j] == 0;
          console.log("combined two ones");
        }
        else if (Math.abs(board[i][j - 1] - board[i][j]) == 1){
          board[i][j - 1] = Math.max(board[i][j - 1], board[i][j]) + 1;
          board[i][j] = 0;
          console.log("combined two numbers");
        }
        else{
          console.log("did nothing");
        }
      }
      if (!pieceplaced && (board[i][BOARD_DIM - 1] == 0)){
        board[i][BOARD_DIM - 1] = piece;
        pieceplaced = true; 
      }
      //console.log(board[i]);
      console.log("---------------")
    }
    return board;
  }
  else{
    console.log("Invalid Move!");
    return board;
  }
}



/* instead of writing a billion functions for moving, I'm going to write a function for rotation by 90
 and flipping horizontally. This is the most efficient use of my time (although not so great algorithmically */
function flip(board){
  //document.write("miew");
  flipboard = newboard();
  for (var i = 0; i < BOARD_DIM; i++){
    for (var j = 0; j < BOARD_DIM; j++){
      //document.write("miew2")
      flipboard[i][(BOARD_DIM - 1) - j] = board[i][j];
      //document.write("miew"); 
    }
  }
  return flipboard;
}

function move_right(piece, board){
  board = flip(board);
  //document.write("miew");
  board = move_left(piece, board);
  //document.write("miew");
  board = flip(board);
  //document.write("miew");
  return board;
}

function rotate(board){
  rotated = newboard();
  for (var i = 0; i < BOARD_DIM; i++){
    for (var j = 0; j < BOARD_DIM; j++){
      rotated[i][j] = board[j][i];
    }
  }
  rotated = flip(rotated);
  return rotated;
}

function backrotate(board){
  return rotate(rotate(rotate(board)));
}

function move_down(piece, board){
  board = rotate(board);
//  document.write("rotated <br>");
//  print_board(board);
  board = move_left(piece, board);
//  document.write("move_left<br>");
//  print_board(board);
  board = backrotate(board);
  //document.write("rotated back<br>");
  //print_board(board);
  return board;
}

function move_up(piece, board){
  board = backrotate(board);
  board = move_left(piece, board);
  board = rotate(board);
  return board;
}

/* Testing functions for movement:
playerboard = move_left(3, start_board(newboard()));
print_board(playerboard);
document.write("left success <br>");
playerboard = move_right(3, playerboard);
print_board(playerboard);
document.write("right success <br>");


playerboard = start_board(newboard());
playerboard = move_up(2, playerboard);
print_board(playerboard);
document.write("up success <br>");


playerboard = start_board(newboard());
playerboard = move_down(3, playerboard); 
print_board(playerboard);
document.write("down success");
*/


// doing things, blah, like listen for the next thing that's clicked. 
// what happens when you click the correct button?
/**
 * Handles keystrokes.
 */

playerboard = start_board(newboard());
piece = next_piece(playerboard);
document.write("<br> next piece = ", piece)

function keyListener(event){ 
  //whatever we want to do goes in this block
  event = event || window.event; //capture the event, and ensure we have an event
  var key = event.key || event.which || event.keyCode; //find the key that was pressed
  //MDN is better at this: https://developer.mozilla.org/en-US/docs/DOM/event.which
  // left arrow
  if (key === 37 || key === 65 || key === 97)
  {  
    move_left(piece, playerboard);
    console.log("left key pushed");
  }

  // up arrow
  else if (key === 38 || key === 87 || key === 119)
  {
      move_up(piece, playerboard);
      console.log("up key pushed");
  }

  // right arrow
  else if (key === 39 || key === 68 || key === 100)
  {
      move_right(piece, playerboard);
      console.log("right key pushed");
  }

  // down arrow
  else if (event.keyCode == 40 || key === 83 || key === 115)
  {
      move_down(piece, playerboard);
      console.log("down key pushed");
  }
  else{
    alert("use the (left, right, up, and down) or (WASD) keys to make moves!")
  }
  print_board(playerboard);
  document.write("miew");
  piece = next_piece(playerboard);
  document.write("<br> next piece = ", piece)
}

document.addEventListener('keyup', keyListener, false);

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

/* this is in java lol. 
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
