var currentPlayer = "X";
var openSpots = 9;
var xScore = 0;
var yScore = 0;
var xMoves = [];
var oMoves = [];


function Play(id) {
  var playerChoice = document.querySelector("." + id + " .xo");
  playerChoice.innerHTML = currentPlayer;

  
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  
  var currentPlayerName = currentPlayer === "X" ? "Player X" : "Player O";
  document.querySelector(".display_player").textContent = currentPlayerName;
  openSpots--;

  var className = row; 
  if (currentPlayer === "X") {
    xMoves.push(className);
  } else {
    oMoves.push(className);
  }

  if (winCheck()) {
    if (currentPlayer == "X")
    {
      xScore++;
      document.querySelector(".display-score-X").textContent = xScore;
    } else {
      yScore++;
      document.querySelector(".display-score-Y").textContent = yScore;
    }
  }

  if (openSpots == 0)
  {
    alert("Out of moves")
  }
}


function Reset() {
  var playerChoice = document.getElementsByClassName("xo");

  for (var i = 0; i < playerChoice.length; ++i) {
    playerChoice[i].innerHTML = '';
  }
}

function newGame() {
  Reset();
  currentPlayer = "X"; 
  openSpots = 9; 
  xScore = 0;
  yScore = 0;
  document.querySelector(".display_player").textContent = "Player X"; 
}
