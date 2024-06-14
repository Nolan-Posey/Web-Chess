import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from "react-chessboard";
import "./ChessboardPage.css";
import MoveList from '../components/chess_components/MoveList';

function ChessboardPage() {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState<string[]>([]);

  const handlePieceDrop = (sourceSquare: string, targetSquare: string, piece: string) => {
    const newGame = new Chess(game.fen());

    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    if(move === null) return false;

    setGame(newGame);
    setHistory([...history, move.san]);
    return true;
  };

  const resetGame = () => {
    setGame(new Chess());
    setHistory([]);
  };

  return (
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard boardWidth={700} position={game.fen()} onPieceDrop={handlePieceDrop}></Chessboard>
        <MoveList moves={history}></MoveList>
      </div>
      <div className="p-button">
      <button onClick={resetGame} className='btn btn-success'>Reset Game</button>
      </div>
    </div>
  );
}

export default ChessboardPage;
