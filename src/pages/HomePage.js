import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';
import TicTacToeHistory from '../components/TicTacToeHistory';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="title">Welcome to Tic-Tac-Toe Evolved!</h1>
        <p className="intro-text">
          Experience the classic game with a modern twist. Challenge our AI or play with friends online!
        </p>
      </header>

      <section className="game-modes">
        <h2 className="section-title">Choose Your Game Mode</h2>
        <div className="button-container">
          <Link to="/SinglePlayer" className="game-mode-button ai-mode">
            <span className="icon">🤖</span>
            <span className="mode-text">Play vs AI</span>
            <span className="mode-description">Test your skills against our intelligent AI opponent</span>
          </Link>
          <Link to="/Multiplayer" className="game-mode-button multiplayer-mode">
            <span className="icon">👥</span>
            <span className="mode-text">Multiplayer</span>
            <span className="mode-description">Challenge your friends in real-time online matches</span>
          </Link>
        </div>
      </section>

      <section className="history-section">
        <h2 className="section-title">Discover Tic-Tac-Toe's Rich History</h2>
        <TicTacToeHistory />
      </section>
    </div>
  );
};

export default HomePage;
