import { Board } from "../gameComponents/Board";
import '../css/SinglePlayer.css';  // We'll create this CSS file

export const SinglePlayer = () => {
  return (
    <div className="single-player-page">
      <div className="instructions animated-text">
        <p>Play against the AI. You are X, and the AI is O.</p>
        <p className="highlight">Good luck!</p>
      </div>
      <div className="board-wrapper">
        <Board id="singleplayer" />
      </div>
    </div>
  );
};
