import { Board } from "../gameComponents/Board";
import '../css/SinglePlayer.css';  // We'll create this CSS file

export const SinglePlayer = () => {
  return (
    <div className="single-player-page">
      <div className="instructions animated-text">
        <p>Challenge the AI in this classic game of strategy.</p>
        <p>You are <span className="player-x">X</span>, and the AI is <span className="player-o">O</span>.</p>
        <p className="highlight">Make your move by clicking on an empty square. Good luck!</p>
      </div>
      <div className="board-wrapper">
        <Board id="singleplayer" />
      </div>
    </div>
  );
};
