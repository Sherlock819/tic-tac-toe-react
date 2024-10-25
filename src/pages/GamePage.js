import React, { useContext, useState } from 'react';
import { Board } from '../gameComponents/Board';
import '../css/GamePage.css';
import { WebSocketContext } from '../contexts/WebSocketContext';
import { useMultiplayerPlayerGameLogic } from '../hooks/useMultiplayerPlayerGameLogic';

const GamePage = () => {
    const { gameId, isMyTurn, isReady, playerSymbol } = useContext(WebSocketContext);
    const [copyButtonText, setCopyButtonText] = useState('Copy');
    const { winner, currentPlayer } = useMultiplayerPlayerGameLogic();
    
    const getTurnMessage = () => {
        if (!isReady) {
            return "Waiting for another player to join...";
        } else if (isMyTurn) {
            return (
                <>
                    Your Turn - <span className={`player-symbol ${currentPlayer}`}>{currentPlayer}</span>
                </>
            );
        } else {
            return "Waiting for opponent to make a move";
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(gameId);
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
    };

    return (
        <div className="game-page">
            <div className="game-content">
                <div className="game-info">
                    <div className="game-id-container">
                        <span className="game-id">Game ID: {gameId}</span>
                        <button onClick={handleCopy} className={`copy-button ${copyButtonText === 'Copied!' ? 'copied' : ''}`}>
                            {copyButtonText}
                        </button>
                    </div>
                    {!winner && (
                        <div className="turn-message-container">
                            <div className={`turn-message ${isMyTurn ? 'your-turn' : ''}`}>
                                {getTurnMessage()}
                            </div>
                        </div>
                    )}
                </div>
                <div className="board-wrapper">
                    <Board id="multiplayer" isReady={isReady} />
                </div>
            </div>
        </div>
    );
};

export default GamePage;
