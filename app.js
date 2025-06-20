const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const vsAI = document.getElementById("vsAI");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

let currentPlayer = "X";
let gameGrid = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameGrid[a] && gameGrid[a] === gameGrid[b] && gameGrid[b] === gameGrid[c]) {
      boxes[a].classList.add("winner");
      boxes[b].classList.add("winner");
      boxes[c].classList.add("winner");

      gameActive = false;
      const winnerName = currentPlayer === "X" ? playerXInput.value || "Player X" : playerOInput.value || "Player O";
      setTimeout(() => alert(`${winnerName} wins!`), 200);
      return true;
    }
  }

  if (!gameGrid.includes("") && gameActive) {
    gameActive = false;
    setTimeout(() => alert("It's a Draw!"), 200);
    return true;
  }
  return false;
}

function handleClick(index) {
  if (!gameActive || gameGrid[index]) return;

  gameGrid[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;

  if (checkWinner()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (vsAI.checked && currentPlayer === "O") {
    setTimeout(aiMove, 300);
  }
}

function aiMove() {
  let emptyIndexes = gameGrid
    .map((val, i) => (val === "" ? i : null))
    .filter((val) => val !== null);

  if (emptyIndexes.length === 0) return;

  let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

  gameGrid[move] = "O";
  boxes[move].textContent = "O";

  if (checkWinner()) return;

  currentPlayer = "X";
}

function resetGame() {
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("winner");
  });
  currentPlayer = "X";
  gameActive = true;
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

resetBtn.addEventListener("click", resetGame);
