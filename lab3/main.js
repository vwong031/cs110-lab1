function Play(id) {
  var playerChoice = document.querySelector("." + id + " .xo");
  playerChoice.innerHTML = "X";
}

function Reset() {
  var playerChoice = document.getElementsByClassName("xo");

  for (var i = 0; i < playerChoice.length; ++i) {
    playerChoice[i].innerHTML = '';
  }
}
