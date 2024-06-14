import { Chessboard } from "react-chessboard";
import "./ChessboardPage.css";

function ChessboardPage() {

  return (
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard boardWidth={700}></Chessboard>
      </div>
    </div>
  );
}

export default ChessboardPage;
