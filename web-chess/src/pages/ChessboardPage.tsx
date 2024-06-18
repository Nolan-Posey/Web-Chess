import { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import "./ChessboardPage.css";
import MoveList from "../components/chess_components/MoveList";
import GameOverDialog from "../components/chess_components/GameOverDialog";
import { PromotionPieceOption } from "react-chessboard/dist/chessboard/types";
import {io} from "socket.io-client";

const socket = io('http://localhost:5000', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

function ChessboardPage() {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<{
    winner: string | null;
    reason: string;
  } | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('reconnect', (attempt) => {
      console.log(`Reconnected to server after ${attempt} attempts`);
    });

    socket.on('reconnect_error', (error) => {
      console.error('Reconnection error:', error);
    });

    socket.on('move', (move) => {
      setGame(prevGame => {
        const newGame = new Chess(prevGame.fen());
        newGame.move(move);
        setHistory([...history, move.san]);
        checkGameOver(newGame);
        return newGame;
      });
    });

    socket.on('reset', () => {
      resetGame();
    });

    return () => {
      socket.off('move');
      socket.off('reset');
    };
  }, [history]);

  const handlePieceDrop = (
    sourceSquare: string,
    targetSquare: string,
    piece: string,
    promotion?: string
  ) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotion || undefined,
      });

      if (move === null) {
        console.log(`Invalid move: ${sourceSquare} to ${targetSquare}`);
        return false; // Illegal move, do not update state
      }

      setGame(game);
      setHistory([...history, move.san]);
      checkGameOver(game);
      socket.emit('move', move);
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
    console.log(game.isThreefoldRepetition());
    if (game.isCheckmate()) {
      setGameOver({
        winner: game.turn() === "w" ? "Black" : "White",
        reason: "Checkmate",
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
    } else if (game.isDraw()) {
      setGameOver({
        winner: null,
        reason: "Draw",
      });
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setHistory([]);
    setGameOver(null);
    socket.emit("reset");
  };

  return (
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard
          boardWidth={700}
          position={game.fen()}
          onPieceDrop={handlePieceDrop}
          onPromotionPieceSelect={handlePromotionPieceSelect}
          arePremovesAllowed={true}
        ></Chessboard>
        <MoveList moves={history}></MoveList>
      </div>
      <div>
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
