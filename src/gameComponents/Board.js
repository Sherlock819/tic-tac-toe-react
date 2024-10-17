import { Tile } from "./Tile"
import { useSinglePlayerGameLogic } from "../hooks/useSinglePlayerGameLogic";
import { useMultiplayerPlayerGameLogic } from "../hooks/useMultiplayerPlayerGameLogic";

export const Board = (props) => {

    // Call both hooks unconditionally
    const singlePlayerLogic = useSinglePlayerGameLogic();
    const multiplayerLogic = useMultiplayerPlayerGameLogic();

    // Use the appropriate logic based on props.id
    const {
        winner,
        currentPlayer,
        board,
        winningCombination,
        setTile,
        resetGame,
    } = props.id === "singleplayer" ? singlePlayerLogic : multiplayerLogic;

    // const {winner, currentPlayer, board, winningCombination, setTile, resetGame} = props.id === "singleplayer" ? useSinglePlayerGameLogic() : useMultiplayerPlayerGameLogic()

    let endGameMessage = "It's a Tie";

    if(winner && winner !== "Tie")
    {
        endGameMessage = `Player ${winner} Wins!`;
    }

    return (
      <div className="game-container">
        {/* Animated current player or winner message */}
        <h2 className={`player-message ${winner ? 'text-zoom' : 'text-slide'}`}>
          {winner ? endGameMessage : `Current Player: ${currentPlayer}`}
        </h2>
  
        {/* Game message with a fade-in effect */}
        <div className={`game-message ${winner || (board.includes(null) === false && !winner) ? 'show fade-in' : ''}`}>
          {winner ? endGameMessage : 'Next Move!'}
        </div>
  
        {/* Tic Tac Toe Board */}
        <div className="tic-tac-toe-board">
          {board.map((value, index) => (
            <Tile key={index} id={index} value={value} setTile={setTile} isWinningTile={winningCombination.includes(index)} winner={winner} />
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