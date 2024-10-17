import { useState } from "react"

export const useGameLogic = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [winningCombination, setWinningCombination] = useState([]);

    const isWinningMove = (board, index, player) => {
        const winConditions = {
            rows: [
                [0, 1, 2], [3, 4, 5], [6, 7, 8]
            ],
            columns: [
                [0, 3, 6], [1, 4, 7], [2, 5, 8]
            ],
            diagonals: [
                [0, 4, 8], [2, 4, 6]
            ]
        };

        // Get the row, column, and diagonal groups for the index
        const row = Math.floor(index / 3); // 0, 1, or 2
        const column = index % 3; // 0, 1, or 2

        // Check row
        if (winConditions.rows[row].every(i => board[i] === player)) {
            setWinningCombination(winConditions.rows[row]);
            return true;
        }

        // Check column
        if (winConditions.columns[column].every(i => board[i] === player)) {
            setWinningCombination(winConditions.columns[column]);
            return true;
        }

        // Check diagonals if the index is part of any diagonal
        if (index % 2 === 0) { // Only check diagonals for 0, 2, 4, 6, 8
            for (let diagonal of winConditions.diagonals) {
                if (diagonal.every(i => board[i] === player)) {
                    setWinningCombination(diagonal);
                    return true;
                }
            }
        }

        return false; // No win condition met
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
        setWinningCombination([]); // Reset winning combination
    };

    return {winner, setWinner, isWinningMove, currentPlayer, setCurrentPlayer, board, setBoard, winningCombination, resetGame}
}