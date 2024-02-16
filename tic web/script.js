document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }

        if (!gameState.includes("")) {
            return "Tie";
        }

        return null;
    };

    const handleCellClick = (index) => {
        if (!gameActive || gameState[index] !== "") return;

        gameState[index] = currentPlayer;
        document.getElementById(`cell${index}`).textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === "Tie") {
                status.textContent = "It's a tie!";
            } else {
                status.textContent = `${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const resetGame = () => {
        currentPlayer = "X";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        status.textContent = `Player ${currentPlayer}'s turn`;
        board.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    };

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `cell${i}`;
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }

    resetButton.addEventListener("click", resetGame);

    status.textContent = `Player ${currentPlayer}'s turn`;
});
