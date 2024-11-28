import React, { useContext, useState, useEffect } from 'react';
import { Board } from '../gameComponents/Board';
import '../css/GamePage.css';
import { WebSocketContext } from '../contexts/WebSocketContext';
import { useMultiplayerPlayerGameLogic } from '../hooks/useMultiplayerPlayerGameLogic';

const GamePage = () => {
    const { gameId, isMyTurn, isReady } = useContext(WebSocketContext);
    const [copyButtonText, setCopyButtonText] = useState('Copy');
    const { winner, currentPlayer } = useMultiplayerPlayerGameLogic();
    const [gameStatus, setGameStatus] = useState('waiting');

    useEffect(() => {
        if (!isReady) {
            setGameStatus('waiting');
        } else if (winner) {
            setGameStatus('finished');
        } else {
            setGameStatus('playing');
        }
    }, [isReady, winner]);

    const getTurnMessage = () => {
        if (!isReady) {
            return "Waiting for another player to join...";
        } else if (winner) {
            return winner === 'Tie' ? "It's a tie!" : `Player ${winner} wins!`;
        } else if (isMyTurn) {
            return (
                <>
                    Your Turn - You are <span className={`player-symbol ${currentPlayer}`}>{currentPlayer}</span>
                </>
            );
        } else {
            return "Opponent's turn - Please wait";
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(gameId);
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
    };

    return (
        <div className="game-page">
            <div className={`game-content ${gameStatus}`}>
                <div className="game-info">
                    {gameId && (
                        <div className="game-id-container">
                            <span className="game-id">Game ID: {gameId}</span>
                            <button onClick={handleCopy} className={`copy-button ${copyButtonText === 'Copied!' ? 'copied' : ''}`}>
                                {copyButtonText}
                            </button>
                        </div>
                    )}
                    <div className="turn-message-container">
                        <div className={`turn-message ${isMyTurn ? 'your-turn' : ''}`}>
                            {getTurnMessage()}
                        </div>
                    </div>
                </div>
                <div className="board-wrapper">
                    <Board id="multiplayer" isReady={isReady} />
                </div>
            </div>
        </div>
    );
};

export default GamePage;
