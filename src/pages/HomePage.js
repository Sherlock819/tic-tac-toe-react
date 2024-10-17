// src/components/HomePage.js
import React from 'react';
import TicTacToeHistory from './TicTacToeHistory';
import '../css/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="title">Welcome to Tic Tac Toe</h1>
        <p className="intro-text">
          Dive into the fascinating history of one of the most popular and simplest games ever created!
        </p>
        <div className="button-container">
          <a href="#history-section" className="explore-button">
            Explore History
          </a>
        </div>
      </header>

      {/* Interactive History Section */}
      <section id="history-section">
        <TicTacToeHistory />
      </section>
    </div>
  );
};

export default HomePage;
