import "./GameOverDialog.css";

interface GameOverProps {
  winner: string | null;
  reason: string;
  onRestart: () => void;
}

const GameOverDialog = ({ winner, reason, onRestart }: GameOverProps) => {
  return (
    <div className="modal-overlay">
      <div
        style={{
          width: "400px",
          height: "190px",
          backgroundColor: "#6f6fa5",
          textAlign: "center",
          border: "solid",
          borderColor: "black",
          borderWidth: "2px",
        }}
      >
        <h2>
          <u>Game Over!</u>
        </h2>
        <p>{reason}</p>
        {winner && <p>Winner: {winner}</p>}
        <button className="btn btn-success" onClick={onRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default GameOverDialog;
