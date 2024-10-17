

const evaluateBoard = (board) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] === 'X' ? -10 : 10; // 'X' loses = -10, 'O' wins = 10
        }
    }

    return 0; // Neutral score
};


const minimax = (board, depth, isMaximizing) => {
    const score = evaluateBoard(board);

    if (score !== null) {
        return score; // Return the score if it's a terminal state
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'O'; // AI plays
                const currentScore = minimax(board, depth + 1, false);
                board[i] = null; // Undo move
                bestScore = Math.max(bestScore, currentScore - depth); // Penalize longer wins
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'X'; // Human plays
                const currentScore = minimax(board, depth + 1, true);
                board[i] = null; // Undo move
                bestScore = Math.min(bestScore, currentScore + depth); // Penalize longer losses
            }
        }
        return bestScore;
    }
    
};

const makeAIMove = (currentBoard) => {
    // First, check if AI can win or block human from winning
    for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
            currentBoard[i] = "O"; // AI plays
            if (evaluateBoard(currentBoard) === 10) {
                return i; // AI can win
            }
            currentBoard[i] = null; // Undo move
        }
    }

    // Now check if the human is about to win and block
    for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
            currentBoard[i] = "X"; // Simulate human move
            if (evaluateBoard(currentBoard) === -10) {
                currentBoard[i] = null; // Undo move
                return i; // Block human from winning
            }
            currentBoard[i] = null; // Undo move
        }
    }

    // If no immediate win/block, use minimax
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
            currentBoard[i] = "O"; // AI plays
            const score = minimax(currentBoard, 0, false);
            currentBoard[i] = null; // Undo move

            if (score > bestScore) {
                bestScore = score;
                bestMove = i; // Store the best move
            }
        }
    }

    return bestMove; // Return the best move
};



export { makeAIMove };
