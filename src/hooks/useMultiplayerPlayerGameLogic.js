import { useGameLogic } from "./useGameLogic";
import useWebSocket from "./useWebSocket";
import { useEffect } from "react";

export const useMultiplayerPlayerGameLogic = () => {

    const {winner, setWinner, isWinningMove, currentPlayer, setCurrentPlayer, board, setBoard, winningCombination, resetGame} = useGameLogic()
    const { sendMove, onMoveReceived } = useWebSocket(); // Use WebSocket hook

    const checkWinnerAndUpdate = (newBoard, index, player) => {
        if (isWinningMove(newBoard, index, player)) {
            setWinner(player);
        } else if (!newBoard.includes(null)) {
            setWinner("Tie");
        }
        // Do not switch player here
    };
    

    const handleIncomingMove = (index, player) => {
        const newBoard = [...board];
        newBoard[index] = player; // Set the board based on the incoming player's move
        setBoard(newBoard);
        checkWinnerAndUpdate(newBoard, index, player);
        
        // Switch to the other player
        setCurrentPlayer(player === 'X' ? 'O' : 'X');
    };
    

    useEffect(() => {
        onMoveReceived(handleIncomingMove); // Listen for incoming moves
    }, [onMoveReceived]);

    const setTile = (index) => {
        if (board[index] || winner) return; // Ignore if already occupied or if there's a winner
    
        const newBoard = [...board];
        newBoard[index] = currentPlayer; // Set the move for the current player
        setBoard(newBoard);
        
        // Send move to the server via WebSocket
        sendMove(index, currentPlayer);
    
        // Check for a win or tie
        if (isWinningMove(newBoard, index, currentPlayer)) {
            setWinner(currentPlayer);
        } else if (!newBoard.includes(null)) {
            setWinner("Tie");
        } else {
            // Switch to the other player after sending the move
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };
    

    return { winner, currentPlayer, board, winningCombination, isWinningMove, setTile, resetGame };

}