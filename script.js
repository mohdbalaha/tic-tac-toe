let player = 'X';
let cpu = 'O';
let currentPlayer = player;
let winning = false;
let currentGame = ['', '', '', '', '', '', '', '', ''];
let winPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let cells = document.getElementsByClassName("cell");
for (let i = 0; i < 9; i++) {
  cells[i].addEventListener("click", function () {
    if (currentGame[i] === '') {
      cells[i].innerText = currentPlayer;
      currentGame[i] = currentPlayer;
      gameOver();
      turn();
      document.querySelector("p").innerText = "Turn: " + currentPlayer;
    }

  });
}
function turn() {
  if (currentPlayer === player) {
    currentPlayer = cpu;
    setTimeout(cpuTurn, 500);
  } else {
    currentPlayer = player;
  }
}

function gameOver() {
  winPattern.forEach(function (arr) {

    check(player, arr);
    check(cpu, arr);


  });

  if (currentGame.indexOf('') === -1&&winning===false) {
    document.getElementById("result").innerText = 'draw!';
    document.querySelector("table").style = "display:none;";
    document.querySelector("#end").style = "display:block;";
  }
}
function check(player, arr) {
  if (currentGame[arr[0]] == player && currentGame[arr[1]] == player && currentGame[arr[2]] == player) {
    document.getElementById("result").innerText = player + ' is winner';
    document.querySelector("table").style = "display:none;";
    document.querySelector("#end").style = "display:block;";
    winning = true;
  } 
}
function restartGame() {
  winning=false;
  currentGame = ['', '', '', '', '', '', '', '', ''];
  document.querySelector("#start").style = "display:inline-block;";
  document.querySelector("#table").style = "display:none;";
  document.querySelector("#end").style = "display:none;";
  document.getElementById("turn").innerText = "Turn: -";
  for (let i = 0; i < 9; i++) {
    cells[i].innerText = '';
  }
}
function startGame() {
  document.querySelector("#start").style = "display:none;";
  document.querySelector("#table").style = "display:inline-block;";
  document.querySelector("#end").style = "display:none;";
}

function cpuTurn() {
  let cpuGame = [];
  for (let i = 0; i < currentGame.length; i++) {
    if (currentGame[i] === '') {
      cpuGame.push(i);
    }
  }

  let rnd = Math.floor(Math.random() * cpuGame.length);
  cells[cpuGame[rnd]].innerText = currentPlayer;
  currentGame[cpuGame[rnd]] = currentPlayer;
  
  turn();
  gameOver();
  document.querySelector("p").innerText = "Turn: " + currentPlayer;

}

document.getElementById("restart-btn").addEventListener("click", restartGame);
document.getElementById("x-btn").addEventListener("click", function () {
  player = 'X';
  cpu = 'O';
  currentPlayer = 'X'
  document.getElementById("turn").innerText = "Turn: X";
  startGame();
});
document.getElementById("o-btn").addEventListener("click", function () {
  player = 'O';
  cpu = 'X';
  currentPlayer = 'O'
  document.getElementById("turn").innerText = "Turn: O";
  startGame();
});
