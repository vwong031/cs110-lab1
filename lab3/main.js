  currentPlayer = "X";
  openSpots = 9;
  xScore = 0;
  oScore = 0;
  xMoves = [];
  oMoves = [];

function winCheck() {
  var winCombos = [
    ['one', 'four', 'seven'], ['two', 'five', 'eight'], ['three', 'six', 'nine'],
    ['one', 'two', 'three'], ['four', 'five', 'six'], ['seven', 'eight', 'nine'],
    ['one', 'five', 'nine'], ['seven', 'five', 'three']
  ];

  for (var i = 0; i < winCombos.length; ++i) {
    var combo = winCombos[i];

    if (combo.every(pos => xMoves.includes(pos))) {
      return 'X';
    }
    else if (combo.every(pos => oMoves.includes(pos))) {
      return 'O';
    }
  }

  if (openSpots <= 0) {
    return 'tie';
  }

  return null;
}

function Play(id) {
  var playerChoice = document.querySelector("." + id + " .xo");

  if (playerChoice.textContent !== '') {
    return;
  }

  playerChoice.innerHTML = currentPlayer;

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  document.querySelector("." + id).style.backgroundColor = "lightcoral";

  var currentPlayerName = currentPlayer === "X" ? "Player X" : "Player O";
  document.querySelector(".display_player").textContent = currentPlayerName;
  openSpots--;

  var pos = id;
  if (playerChoice.textContent === "X") {
    xMoves.push(pos);
  }
  else {
    oMoves.push(pos);
  }

  var result = winCheck();
  if (result === 'X') {
    xScore++;
    console.log("x wins");
    console.log("xScore: ", xScore);
    document.querySelector(".display-score-X").textContent = xScore;
    alert("Player X wins!");
  }
  else if (result === 'O') {
    oScore++;
    document.querySelector(".display-score-O").textContent = oScore;
    alert("Player O wins!");
  }
  else if (result === 'tie') {
    alert("It's a tie!");
  }
}


function Reset() {
  var playerChoice = document.getElementsByClassName("xo");

  for (var i = 0; i < playerChoice.length; ++i) {
    playerChoice[i].innerHTML = '';
  }

  var boxes = document.querySelectorAll('.game_board > .row > div');
  boxes.forEach(function(box) {
    box.style.backgroundColor = "pink"
  });

  currentPlayer = "X"; 
  openSpots = 9;
  xMoves = [];
  oMoves = [];
  xScore = 0;
  oScore = 0;
  document.querySelector(".display_player").textContent = "Player X"; 
} 

function newGame() {
  Reset();
  currentPlayer = "X"; 
  openSpots = 9; 
  // xScore = 0;
  // oScore = 0;
  xMoves = [];
  oMoves = [];
  document.querySelector(".display_player").textContent = "Player X"; 
  document.querySelector(".display-score-X").textContent = '';
  document.querySelector(".display-score-O").textContent = '';
}
