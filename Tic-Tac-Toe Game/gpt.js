let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let player1Input = document.querySelector("#player1Name");
let player2Input = document.querySelector("#player2Name");
let scoreboard = document.querySelector("#scoreboard");
let player1Display = document.querySelector("#player1Display");
let player2Display = document.querySelector("#player2Display");
let score1Elem = document.querySelector("#score1");
let score2Elem = document.querySelector("#score2");

let player1 = "";
let player2 = "";
let turnO = true; // O starts
let gameStarted = false;

let score = { X: 0, O: 0 };

const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];

// Start new game
const startGame = () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";
    player1Display.textContent = player1;
    player2Display.textContent = player2;
    scoreboard.classList.remove("hide");
    msgContainer.classList.add("hide");
    gameStarted = true;
    resetGame();
};

// Check for winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let valA = boxes[a].innerText;
        let valB = boxes[b].innerText;
        let valC = boxes[c].innerText;

        if (valA && valA === valB && valB === valC) {
            return valA; // Return 'X' or 'O'
        }
    }
    return null;
};

// Check for draw
const isDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
};

// Show winner
const showWinner = (winner) => {
    let winnerName = winner === "X" ? player2 : player1; // O = Player 1
    msg.innerText = `🎉 Congratulations, ${winnerName} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Show draw
const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable boxes
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Update score
const updateScore = (winner) => {
    score[winner]++;
    score1Elem.innerText = score["O"];
    score2Elem.innerText = score["X"];
};

// Reset game board (not scores)
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Box click logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameStarted || box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;

        let winner = checkWinner();
        if (winner) {
            showWinner(winner);
            updateScore(winner);
        } else if (isDraw()) {
            showDraw();
        } else {
            turnO = !turnO;
        }
    });
});

// Button listeners
newGameBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
