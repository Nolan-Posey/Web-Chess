import { useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import "./ChessboardPage.css";
import MoveList from "../components/chess_components/MoveList";
import GameOverDialog from "../components/chess_components/GameOverDialog";
import { PromotionPieceOption } from "react-chessboard/dist/chessboard/types";

function ChessboardPage() {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<{
    winner: string | null;
    reason: string;
  } | null>(null);

  const handlePieceDrop = (
    sourceSquare: string,
    targetSquare: string,
    piece: string,
    promotion?: string
  ) => {
    try {
      const newGame = new Chess(game.fen()); // Create a new instance with the current position
      const move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotion || undefined,
      });

      if (move === null) {
        console.log(`Invalid move: ${sourceSquare} to ${targetSquare}`);
        return false; // Illegal move, do not update state
      }

      setGame(newGame);
      setHistory([...history, move.san]);

      console.log("Current History:", newGame.history())
      console.log("Current FEN:", newGame.fen())

      checkGameOver(newGame);
      return true; // Legal move, update state
    } catch (error) {
      console.error(
        `Error processing move: ${sourceSquare} to ${targetSquare}`,
        error
      );
      return false; // Handle the error and return false
    }
  };

  const handlePromotionPieceSelect = (
    piece: PromotionPieceOption | undefined,
    promoteFromSquare: Square | undefined,
    promoteToSquare: Square | undefined
  ): boolean => {
    if (!promoteFromSquare || !promoteToSquare || !piece) {
      return false;
    }

    const promotion = piece.toLowerCase();
    return handlePieceDrop(
      promoteFromSquare,
      promoteToSquare,
      piece,
      promotion[1]
    );
  };

  const checkGameOver = (game: Chess) => {
    if (game.isCheckmate()) {
      setGameOver({
        winner: game.turn() === "w" ? "Black" : "White",
        reason: "Checkmate",
      });
    } else if (game.isDraw()) {
      setGameOver({
        winner: null,
        reason: "Draw",
      });
    } else if (game.isStalemate()) {
      setGameOver({
        winner: null,
        reason: "Stalemate",
      });
    } else if (game.isThreefoldRepetition()) {
      setGameOver({
        winner: null,
        reason: "Threefold repetition",
      });
    } else if (game.isInsufficientMaterial()) {
      setGameOver({
        winner: null,
        reason: "Insufficient material",
      });
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setHistory([]);
    setGameOver(null);
  };

  return (
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard
          boardWidth={700}
          position={game.fen()}
          onPieceDrop={handlePieceDrop}
          onPromotionPieceSelect={handlePromotionPieceSelect}
        ></Chessboard>
        <MoveList moves={history}></MoveList>
      </div>
      <div className="p-button">
        <button onClick={resetGame} className="btn btn-success">
          Reset Game
        </button>
        {gameOver && (
          <GameOverDialog
            winner={gameOver.winner}
            reason={gameOver.reason}
            onRestart={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default ChessboardPage;
