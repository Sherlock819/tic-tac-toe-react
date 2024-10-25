import { Tile } from "./Tile"
import { useSinglePlayerGameLogic } from "../hooks/useSinglePlayerGameLogic";
import { useMultiplayerPlayerGameLogic } from "../hooks/useMultiplayerPlayerGameLogic";
import { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

export const Board = (props) => {
    const { isMyTurn, isReady } = useContext(WebSocketContext);
    const singlePlayerLogic = useSinglePlayerGameLogic();
    const multiplayerLogic = useMultiplayerPlayerGameLogic();

    const { winner, board, setTile, winningCombination, resetGame } = 
        props.id === "singleplayer" ? singlePlayerLogic : multiplayerLogic;

    const handleTileClick = (index) => {
        if (props.id === "singleplayer" || (isReady && isMyTurn)) {
            setTile(index);
        }
    };

    return (
        <div className="game-container">
            {winner && (
                <div className="game-message show fade-in">
                    {winner === 'Tie' ? "It's a tie!" : `Player ${winner} wins!`}
                </div>
            )}
            <div className="board-container">
                <div className="game-board">
                    {board.map((value, index) => (
                        <Tile 
                            key={index} 
                            id={index} 
                            value={value} 
                            setTile={() => handleTileClick(index)} 
                            isWinningTile={winningCombination.includes(index)} 
                            winner={winner} 
                            isClickable={props.id === "singleplayer" || (isReady && isMyTurn)}
                        />
                    ))}
                </div>
            </div>
            {winner && (
                <button className="reset-btn bounce" onClick={resetGame}>
                    Restart Game
                </button>
            )}
        </div>
    );
}
