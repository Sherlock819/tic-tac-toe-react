import React from 'react';
import '../css/TicTacToeHistory.css';  // Updated to include TicTacToeHistory CSS

const TicTacToeHistory = () => {
  return (
    <div className="history-container">
      <h2 className="history-title">The History of Tic Tac Toe</h2>
      <div className="history-content">
        <div className="timeline-item">
          <h3>Ancient Origins</h3>
          <p>
            Did you know that Tic Tac Toe traces back to ancient Egypt and Rome? The game was a simple form of entertainment for all ages.
          </p>
        </div>
        <div className="timeline-item">
          <h3>The Classic Game</h3>
          <p>
            Tic Tac Toe, also known as Noughts and Crosses, became popular worldwide due to its simple rules and competitive nature.
          </p>
        </div>
        <div className="timeline-item">
          <h3>Modern Variations</h3>
          <p>
            Today, Tic Tac Toe has evolved with digital versions, advanced AI challenges, and multiplayer online games.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicTacToeHistory;
