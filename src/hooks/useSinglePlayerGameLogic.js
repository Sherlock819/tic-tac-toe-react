import { makeAIMove } from "./Minimax";
import { useGameLogic } from "./useGameLogic";

export const useSinglePlayerGameLogic = () => {

    const {winner, setWinner, isWinningMove, currentPlayer, setCurrentPlayer, board, setBoard, winningCombination, resetGame} = useGameLogic()

    const setTile = (index) => {
        if (board[index]) return;

        const newBoard = [...board]; 
        newBoard[index] = currentPlayer; 

        setBoard(newBoard);

        if (isWinningMove(newBoard, index, currentPlayer)) {
            setWinner(currentPlayer);
        } else if (!newBoard.includes(null)) {
            setWinner("Tie");
        } else {
            // Switch to AI if current player is "X"
        if (currentPlayer === "X") {
            setCurrentPlayer("O"); // Switch to AI

            const aiMove = makeAIMove(newBoard); // Get AI's best move
            newBoard[aiMove] = "O"; // AI plays the best move
            setBoard(newBoard);

            // Check if AI has won
            if (isWinningMove(newBoard, aiMove, "O")) {
                setWinner("O");
            } else {
                // Switch back to human player
                setCurrentPlayer("X");
            }
        } else {
            // Switch back to human player if current player was already "O"
            setCurrentPlayer("X");
        }
        }
    };

    return {winner, currentPlayer, board, winningCombination, isWinningMove, setTile, resetGame}

}