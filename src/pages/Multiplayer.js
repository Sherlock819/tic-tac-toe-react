// src/pages/Multiplayer.js
import React from 'react';
import { useWebSocketContext } from '../contexts/WebSocketContext';
import '../css/Multiplayer.css';

export const Multiplayer = () => {
    const { gameId, setGameId, createGame, joinGameContext } = useWebSocketContext();

    return (
        <div className="multiplayer-container">
            <h2 className="animated-text">Multiplayer Tic-Tac-Toe</h2>
            <div className="game-options">
                <button className="game-button create animated-button" onClick={createGame}>Create New Game</button>
            </div>
            <div className="join-game-container">
                <p>Or join an existing game:</p>
                <input 
                    type="text" 
                    placeholder="Enter your friend's Game ID" 
                    value={gameId} 
                    onChange={(e) => setGameId(e.target.value)}
                    className="game-id-input animated-input"
                />
                <button className="join-game-button animated-button" onClick={joinGameContext}>Join Game</button>
            </div>
        </div>
    );
};
