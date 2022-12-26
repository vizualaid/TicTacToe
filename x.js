/*

 an array with 9 items. Each item will have its index as a value. 


Additionally,we need a function that looks for winning combinations and returns true if it finds one, 
and a function that lists the indexes of available spots in the board.



 */

var origBoard = ['O',1 ,'X','X',4 ,'X', 6 ,'O','O'];

// human
var huPlayer = 'O';

// ai
var aiPlayer = 'X';

// returns list of the indexes of empty spots on the board
function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies
function winning(board, player){
 if (
 (board[0] == player && board[1] == player && board[2] == player) ||
 (board[3] == player && board[4] == player && board[5] == player) ||
 (board[6] == player && board[7] == player && board[8] == player) ||
 (board[0] == player && board[3] == player && board[6] == player) ||
 (board[1] == player && board[4] == player && board[7] == player) ||
 (board[2] == player && board[5] == player && board[8] == player) ||
 (board[0] == player && board[4] == player && board[8] == player) ||
 (board[2] == player && board[4] == player && board[6] == player)
 ) {
 return true;
 } else {
 return false;
 }
}


// the main minimax function

function minimax(newBoard, player){
  
    //available spots
    var availSpots = emptyIndexies(newBoard);

// to check for terminal states and return a value accordingly. If O wins you should return -10, if X wins you should return +10. In addition, if the length of the availableSpots array is zero, that means there is no more room to play, the game has resulted in a tie, and you should return zero.


  // checks for the terminal states such as win, lose, and tie 
  //and returning a value accordingly
 
 
  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }


// Next, you need to collect the scores from each of the empty spots to evaluate later. Therefore, make an array called moves and loop through empty spots while collecting each move’s index and score in an object called move.

// Then, set the index number of the empty spot that was stored as a number in the origBoard to the index property of the move object. Later, set the empty spot on the newboard to the current player and call the minimax function with other player and the newly changed newboard. Next, you should store the object resulted from the minimax function call that includes a score property to the score property of the move object.

// If the minimax function does not find a terminal state, it keeps recursively going level by level deeper into the game. This recursion happens until it reaches a terminal state and returns a score one level up.
// Finally, Minimax resets newBoard to what it was before and pushes the move object to the moves array.

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot 
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    /*collect the score resulted from calling minimax 
      on the opponent of the current player*/
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    // reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }
  
// Then, the minimax algorithm needs to evaluate the best move in the moves array. It should choose the move with the highest score when AI is playing and the move with the lowest score when the human is playing. Therefore, If the player is aiPlayer, it sets a variable called bestScore to a very low number and loops through the moves array, if a move has a higher score than bestScore, the algorithm stores that move. In case there are moves with similar score, only the first one will be stored.

// The same evaluation process happens when player is huPlayer, but this time bestScore would be set to a high number and Minimax looks for a move with the lowest score to store.

// At the end, Minimax returns the object stored in bestMove.

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the moves array
  return moves[bestMove];
}