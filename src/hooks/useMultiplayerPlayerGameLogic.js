import { useWebSocketContext } from "../contexts/WebSocketContext";
import { useGameLogic } from "./useGameLogic";
import eventEmitter from '../utilities/EventEmitter';
import { useEffect } from "react";
import { useCallback } from "react";

export const useMultiplayerPlayerGameLogic = () => {

    const {winner, setWinner, isWinningMove, currentPlayer, setCurrentPlayer, board, setBoard, winningCombination, resetGame} = useGameLogic()
    const { sendMoveContext } = useWebSocketContext();

    const checkWinnerAndUpdate = useCallback((newBoard, index, player) => {
        if (isWinningMove(newBoard, index, player)) {
            setWinner(player);
        } else if (!newBoard.includes(null)) {
            setWinner("Tie");
        }
        // Do not switch player here
    }, [isWinningMove, setWinner]);
    
    const handleIncomingMove = useCallback((index, player) => {
        const newBoard = [...board];
        newBoard[index] = player; // Set the board based on the incoming player's move
        setBoard(newBoard);
        checkWinnerAndUpdate(newBoard, index, player);
        
        // Switch to the other player
        setCurrentPlayer(player === 'X' ? 'O' : 'X');
    }, [board, checkWinnerAndUpdate, setBoard, setCurrentPlayer]);

    useEffect(() => {
        // Listener for received moves
        const onMoveReceived = ({position, symbol}) => {
            // Update board/game state based on the received move
            handleIncomingMove(position, symbol);
          };
    
          eventEmitter.on('moveReceived', onMoveReceived);
    
        // Cleanup to avoid memory leaks and adding multiple listeners
        return () => {
          eventEmitter.removeListener('moveReceived', onMoveReceived);
        };
      }, [handleIncomingMove]);

    const setTile = (index) => {
        if (board[index] || winner) return; // Ignore if already occupied or if there's a winner
    
        const newBoard = [...board];
        newBoard[index] = currentPlayer; // Set the move for the current player
        setBoard(newBoard);
        
        // Send move to the server via WebSocket
        sendMoveContext(index, currentPlayer);
    
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