document.addEventListener("DOMContentLoaded", function () {
    const mainMenu = document.getElementById("mainMenu");
    const guessNumber = document.getElementById("guessNumber");
    const ticTacToe = document.getElementById("ticTacToe");
    const rockPaperScissors = document.getElementById("rockPaperScissors");
    const backToMenu = document.querySelectorAll("#backToMenu");

    function showMenu() {
        mainMenu.style.display = "block";
        guessNumber.style.display = "none";
        ticTacToe.style.display = "none";
        rockPaperScissors.style.display = "none";
    }
    showMenu();

    function showGame(gameElement) {
        mainMenu.style.display = "none";
        guessNumber.style.display = "none";
        ticTacToe.style.display = "none";
        rockPaperScissors.style.display = "none";
        gameElement.style.display = "block";
    }

    document.getElementById("guessingGameBtn").addEventListener("click", function () {
        showGame(guessNumber);
    });

    document.getElementById("ticTacToeBtn").addEventListener("click", function () {
        showGame(ticTacToe);
    });

    document.getElementById("rockPaperScissorsBtn").addEventListener("click", function () {
        showGame(rockPaperScissors);
    });

    backToMenu.forEach(button => {
        button.addEventListener("click", showMenu);
        
    });

//Number Guessing Game
// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let lastGuess = null; // Track last guess

// Function to check the guess
function checkGuess() {
    let guessInput = document.getElementById("guessInput");
    let guessResult = document.getElementById("guessResult");
    let attemptsDisplay = document.getElementById("attemptsDisplay");
    let guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        guessResult.textContent = "🚨 Seriously?! Enter a number between 1 and 100!";
        guessResult.style.color = "light red";
        return;
    }

    attempts++; // Increment attempts

    // If the same guess is repeated
    if (guess === lastGuess) {
        guessResult.textContent = "🤔 You just guessed that! Try something new.";
        guessResult.style.color = "yellow";
        return;
    }
    lastGuess = guess; // Update last guess

    let difference = Math.abs(randomNumber - guess); // Distance from correct number

    // Funny reactions based on how close/far the guess is
    if (guess > randomNumber) {
        if (difference >= 50) {
            guessResult.textContent = "🌋 Lava hot! Try a much smaller number.";
        } else if (difference >= 30) {
            guessResult.textContent = "🔥 Scorching! But still too high.";
        } else if (difference >= 20) {
            guessResult.textContent = "🥵 It's getting warm, but still too high!";
        } else if (difference >= 15) {
            guessResult.textContent = "🌡️ Warm, but not quite there.";
        } else if (difference >= 10) {
            guessResult.textContent = "😲 Almost there! Try a little lower.";
        } else if (difference >= 5) {
            guessResult.textContent = "🔥 So close! Just a bit lower!";
        } else {
            guessResult.textContent = "💥 You're just one step away! Lower!";
        }
        guessResult.style.color = "pink";
    } else if (guess < randomNumber) {
        if (difference >= 50) {
            guessResult.textContent = "❄️ Ice cold! Try a much bigger number.";
        } else if (difference >= 30) {
            guessResult.textContent = "🧊 Arctic chill! You need a much higher number.";
        } else if (difference >= 20) {
            guessResult.textContent = "🥶 Pretty chilly, still too low!";
        } else if (difference >= 15) {
            guessResult.textContent = "🌬️ Cool breeze! Still a bit low.";
        } else if (difference >= 10) {
            guessResult.textContent = "😅 Getting warmer, but still too low!";
        } else if (difference >= 5) {
            guessResult.textContent = "🔥 You're getting really close! Try a little higher.";
        } else {
            guessResult.textContent = "💥 Almost there! Just a bit higher!";
        }
        guessResult.style.color = "lightblue";
    }     else {
        // Correct guess reactions
        let funnyResponses = [
            `🎉 BOOM! You nailed it in ${attempts} attempts!`,
            `🤯 Genius alert! You got it in ${attempts} tries!`,
            `😎 Easy-peasy! You guessed it in ${attempts} attempts.`,
            `👑 King/Queen of guessing! ${attempts} tries and done!`,
            `🥳 Victory dance! You got it in ${attempts} attempts!`
        ];
        guessResult.textContent = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
        guessResult.style.color = "green";
        guessInput.disabled = true; // Disable input after correct guess
        document.getElementById("submitButton").disabled = true;
        document.getElementById("restartButton").style.display = "inline"; // Show Restart Button
    }

    attemptsDisplay.textContent = `🔢 Attempts: ${attempts}`; // Update attempts display
    guessInput.value = ""; // Clear input field
}

// Restart the game
function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // New random number
    attempts = 0;
    lastGuess = null;
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("submitButton").disabled = false;
    document.getElementById("guessResult").textContent = "";
    document.getElementById("attemptsDisplay").textContent = "🔢 Attempts: 0";
    document.getElementById("restartButton").style.display = "none"; // Hide Restart Button
}

// Event listener for submit button
document.getElementById("submitButton").addEventListener("click", checkGuess);

// Allow Enter key to submit the guess
document.getElementById("guessInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// Event listener for restart button
document.getElementById("restartButton").addEventListener("click", restartGame);
});



//Tic Tac Toe Game
document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    let board = Array(9).fill("");
    let currentPlayer = "X";
    let gameActive = true;
    let wins = 0, losses = 0, draws = 0;

    function updateScoreboard() {
        document.getElementById("wins").textContent = wins;
        document.getElementById("losses").textContent = losses;
        document.getElementById("draws").textContent = draws;
    }

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === player)
        );
    }

    function getEmptyCells() {
        return board.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
    }

    function bestMove() {
        let emptyCells = getEmptyCells();
        if (emptyCells.length === 0 || !gameActive) return;

        let bestScore = -Infinity;
        let move;
        emptyCells.forEach(index => {
            board[index] = "O";
            let score = minimax(board, 0, false);
            board[index] = "";
            if (score > bestScore) {
                bestScore = score;
                move = index;
            }
        });

        if (move !== undefined) {
            board[move] = "O";
            cells[move].textContent = "O";
            if (checkWin("O")) {
                document.getElementById("ticTacToe-status").textContent = "💻 Alex Wins! Try Again!";
                gameActive = false;
                losses++;
                triggerCelebration("Alex Wins! 🎉");
            } else if (!board.includes("")) {
                document.getElementById("ticTacToe-status").textContent = "🤝 It's a Draw!";
                gameActive = false;
                draws++;
            } else {
                currentPlayer = "X";
            }
        }
        updateScoreboard();
    }

    function minimax(newBoard, depth, isMaximizing) {
        if (checkWin("O")) return 10 - depth;
        if (checkWin("X")) return depth - 10;
        if (!newBoard.includes("")) return 0;

        let emptyCells = getEmptyCells();
        if (isMaximizing) {
            let bestScore = -Infinity;
            emptyCells.forEach(index => {
                newBoard[index] = "O";
                bestScore = Math.max(bestScore, minimax(newBoard, depth + 1, false));
                newBoard[index] = "";
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            emptyCells.forEach(index => {
                newBoard[index] = "X";
                bestScore = Math.min(bestScore, minimax(newBoard, depth + 1, true));
                newBoard[index] = "";
            });
            return bestScore;
        }
    }

    function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");
        if (board[index] || !gameActive) return;
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            document.getElementById("ticTacToe-status").textContent = `🎉 Player ${currentPlayer} Wins!`;
            gameActive = false;
            wins++;
            triggerCelebration(`Player ${currentPlayer} Wins! 🎉`);
        } else if (!board.includes("")) {
            document.getElementById("ticTacToe-status").textContent = "🤝 It's a Draw!";
            gameActive = false;
            draws++;
        } else {
            currentPlayer = "O";
            setTimeout(bestMove, 500);
        }
        updateScoreboard();
    }

    function triggerCelebration(message) {
        const celebration = document.createElement("div");
        celebration.classList.add("celebration");
        celebration.textContent = message;
        document.body.appendChild(celebration);

        for (let i = 0; i < 30; i++) {
            let sparkle = document.createElement("div");
            sparkle.classList.add("sparkle");
            sparkle.style.left = `${Math.random() * 100}vw`;
            sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 4000);
        }

        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }

    function resetTicTacToe() {
        board.fill("");
        cells.forEach(cell => cell.textContent = "");
        document.getElementById("ticTacToe-status").textContent = "Your turn, Player X!";
        gameActive = true;
        currentPlayer = "X";
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    document.querySelector("#ticTacToe button").addEventListener("click", resetTicTacToe);
});



//Rock Paper Scissors Game
document.addEventListener("DOMContentLoaded", function () {
    let userScore = 0;
    let aiScore = 0;
    let draws = 0;

    // Update the scoreboard
    function updateScoreboard() {
        document.getElementById("wins").textContent = userScore;
        document.getElementById("losses").textContent = aiScore;
        document.getElementById("draws").textContent = draws;
    }

    // Play Rock Paper Scissors
    function playRPS(userChoice) {
        const aiChoice = getAIChoice();
        const result = determineWinner(userChoice, aiChoice);
        displayResult(result, userChoice, aiChoice);
    }

    // AI randomly chooses Rock, Paper, or Scissors
    function getAIChoice() {
        const choices = ["rock", "paper", "scissors"];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    // Determine the winner
    function determineWinner(userChoice, aiChoice) {
        if (userChoice === aiChoice) {
            return "draw";
        } else if (
            (userChoice === "rock" && aiChoice === "scissors") ||
            (userChoice === "paper" && aiChoice === "rock") ||
            (userChoice === "scissors" && aiChoice === "paper")
        ) {
            return "win";
        } else {
            return "lose";
        }
    }

    // Display the result and update scores
    function displayResult(result, userChoice, aiChoice) {
        let resultText;
        if (result === "win") {
            resultText = `🎉 You win! ${userChoice} beats ${aiChoice}!`;
            userScore++;
        } else if (result === "lose") {
            resultText = `💔 You lose! ${aiChoice} beats ${userChoice}.`;
            aiScore++;
        } else {
            resultText = `🤝 It's a draw! Both chose ${userChoice}.`;
            draws++;
        }
        document.getElementById("rpsResult").textContent = resultText;
        updateScoreboard();
        document.getElementById("restartButtonRPS").style.display = "inline";
    }

    // Restart the game
    function restartGame() {
        userScore = 0;
        aiScore = 0;
        draws = 0;
        document.getElementById("rpsResult").textContent = "";
        updateScoreboard();
        document.getElementById("restartButtonRPS").style.display = "none";
    }

    // Event listeners for buttons
    document.getElementById("rockBtn").addEventListener("click", () => playRPS("rock"));
    document.getElementById("paperBtn").addEventListener("click", () => playRPS("paper"));
    document.getElementById("scissorsBtn").addEventListener("click", () => playRPS("scissors"));
    document.getElementById("restartButtonRPS").addEventListener("click", restartGame);
    
});




