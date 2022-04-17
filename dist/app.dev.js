"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//Set div for show
function PlayGame() {
  document.querySelector('.gameStart').style.display = "flex";
  document.querySelector('.gameMenu').style.display = "none";
  document.querySelector('.gameScores').style.display = "none";
}

function ShowScores() {
  document.querySelector('.gameScores').style.display = "block";
  document.querySelector('.gameMenu').style.display = "none";
  document.querySelector('.gameStart').style.display = "none";
}

function ShowMenu() {
  document.querySelector('.gameMenu').style.display = "block";
  document.querySelector('.gameStart').style.display = "none";
  document.querySelector('.gameScores').style.display = "none";
}

document.querySelector('.start').addEventListener('click', PlayGame);
document.querySelector('.scores').addEventListener('click', ShowScores);
document.querySelector('.backHome').addEventListener('click', ShowMenu);
document.querySelector('.backHome2').addEventListener('click', ShowMenu); //game condition

var turn = 0;
var p1S = 0;
var p2S = 0;
var Player1Score = document.getElementById('p1-score');
var Player2Score = document.getElementById('p2-score');
var boxes = document.querySelectorAll('.box'),
    playerEcho = document.querySelector('.playerEcho'),
    reSetBtn = document.getElementById('reSet'),
    players = ["X", "O"],
    arr = Array.from(Array(3), function () {
  return Array(3).fill(-1);
});

var getIndex = function getIndex(index) {
  return [x = index <= 3 ? 0 : 4 <= index && index <= 6 ? 1 : 2, index - x * 3 - 1];
};

boxes.forEach(function (box) {
  box.addEventListener('click', function () {
    if (box.innerText.trim() != "") return;
    box.innerText = players[turn % 2];

    var _getIndex = getIndex(parseInt(box.id)),
        _getIndex2 = _slicedToArray(_getIndex, 2),
        x = _getIndex2[0],
        y = _getIndex2[1];

    arr[x][y] = turn % 2;
    if (checkWinner()) return;
    turn += 1;
    updatePlayer();
  });
});

function updatePlayer() {
  var pIndex = turn % 2;
  playerEcho.innerHTML = "Player ".concat(pIndex + 1, " (").concat(players[pIndex], ")");
}

var checkWinner = function checkWinner() {
  return checkRows() || checkCols() || checkDiagonals() || checkDiagonals2();
};

function checkRows() {
  for (var row = 0; row < 3; row++) {
    var first = arr[row][0];
    var isOk = first != -1;

    for (var col = 0; col < 3; col++) {
      isOk &= arr[row][col] == first;
      if (!isOk) break;
    }

    if (isOk) {
      endGame(first);
      return true;
    }
  }

  return false;
}

function checkCols() {
  for (var col = 0; col < 3; col++) {
    var first = arr[0][col];
    var isOk = first != -1;

    for (var row = 0; row < 3; row++) {
      isOk &= arr[row][col] == first;
      if (!isOk) break;
    }

    if (isOk) {
      endGame(first);
      return true;
    }
  }

  return false;
}

function checkDiagonals() {
  var first = arr[0][0];
  var isOk = first != -1;

  for (var daig = 0; daig < 3; daig++) {
    isOk &= arr[daig][daig] == first;
    if (!isOk) break;
  }

  if (isOk) {
    endGame(first);
    return true;
  }

  return false;
}

function checkDiagonals2() {
  var first = arr[2][0];
  var isOk = first != -1;

  for (var row = 2, col = 0; row >= 0; row--, col++) {
    isOk &= arr[row][col] == first;
    if (!isOk) break;
  }

  if (isOk) {
    endGame(first);
    return true;
  }

  return false;
}

function endGame(index) {
  console.log("Winner is ".concat(players[index]));
  alert("Winner is ".concat(players[index]));
  setScores(index);
  turn = 0;
  updatePlayer();
  resetArr();
  boxes.forEach(function (box) {
    return box.innerText = "";
  });
  ShowMenu();
}

function resetArr() {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      arr[row][col] = -1;
    }
  }
}

function ReSet() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerText = "";
  }
}

reSetBtn.addEventListener("click", function () {
  ReSet();
});

function setScores(e) {
  if (e == 0) {
    p1S++;
    localStorage.setItem("PlayerOne", p1S.toString());
    var NOW1 = localStorage.getItem('PlayerOne');
    Player1Score.innerText = NOW1;
    console.log(Player1Score);
  } else {
    p2S++;
    localStorage.setItem("PlayerTwo", p2S.toString());
    var NOW2 = localStorage.getItem('PlayerTwo');
    console.log(NOW2);
    Player2Score.innerText = NOW2;
    console.log(Player2Score);
  }
}