function Play(userSelection) {
  var unicode = userSelection.charCode ? userSelection.charCode : userSelection.keyCode;
  var playerChoice = document.getElementsByClassName("xo");

  if (unicode == 88 || unicode == 120) {
    playerChoice.innerHTML = "X";
  }
  else if (unicode == 79 || unicode == 111) {
    playerChoice.innerHTML = "O";
  }
}
