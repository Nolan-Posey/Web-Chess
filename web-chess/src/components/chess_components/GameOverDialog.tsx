import "./GameOverDialog.css";
import React from "react";

interface GameOverProps {
  winner: string | null;
  reason: string;
  onRestart: () => void;
}

function GameOverDialog({ winner, reason, onRestart }: GameOverProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          <u>Game Over!</u>
        </h2>
        <p>{reason}</p>
        {winner && <p>Winner: {winner}</p>}
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
};

export default GameOverDialog;
