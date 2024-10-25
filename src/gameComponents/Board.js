import { Tile } from "./Tile"
import { useSinglePlayerGameLogic } from "../hooks/useSinglePlayerGameLogic";
import { useMultiplayerPlayerGameLogic } from "../hooks/useMultiplayerPlayerGameLogic";
import { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

export const Board = (props) => {

    // Call both hooks unconditionally
    const singlePlayerLogic = useSinglePlayerGameLogic();
    const multiplayerLogic = useMultiplayerPlayerGameLogic();

    const { isReady, isMyTurn } = useContext(WebSocketContext);

    // Use the appropriate logic based on props.id
    const {
        winner,
        currentPlayer,
        board,
        winningCombination,
        setTile,
        resetGame,
    } = props.id === "singleplayer" ? singlePlayerLogic : multiplayerLogic;


    let endGameMessage = "It's a Tie";
    const connecting = "Waiting for opponent to join...";

    if(winner && winner !== "Tie")
    {
        endGameMessage = `Player ${winner} Wins!`;
    }

    return (
      <div className="game-container">
        {/* Game message with a fade-in effect */}
        <div className={`game-message ${winner || (board.includes(null) === false && !winner) ? 'show fade-in' : ''}`}>
          {winner ? endGameMessage : ''}
        </div>
  
        {/* Tic Tac Toe Board */}
        <div className="tic-tac-toe-board">
          {board.map((value, index) => (
            <Tile 
              key={index} 
              id={index} 
              value={value} 
              setTile={setTile} 
              isWinningTile={winningCombination.includes(index)} 
              winner={winner} 
              isMyTurn={props.id === "singleplayer" ? true : props.isReady && isMyTurn} 
            />
          ))}
        </div>
  
        {/* Animated Reset Button */}
        {winner && (
          <button className="reset-btn bounce" onClick={resetGame}>
            Restart Game
          </button>
        )}
      </div>
    );
      
}
