import React, { useEffect, useRef } from "react";
import "./MoveList.css";

interface MoveListProps {
  moves: string[];
}

const MoveList = ({ moves }: MoveListProps) => {
  const moveListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moveListRef.current) {
      moveListRef.current.scrollTop = moveListRef.current.scrollHeight;
    }
  }, [moves]);

  const formatMoves = (moves: string[]) => {
    const formattedMoves = [];
    for (let i = 0; i < moves.length; i += 2) {
      formattedMoves.push(
        `${moves[i]}${moves[i + 1] ? ` ${moves[i + 1]}` : ""}`
      );
    }
    return formattedMoves;
  };

  return (
    <div className="moveListContainer">
      <h2>
        <u style={{color: "#6f6fa5"}}>
            <text style={{color: "#6f6fa5", outlineColor: "white", textShadow: "1px 1px 1px #ffffff"}}>Move History</text>
        </u>
      </h2>
      <div className="moveList" ref={moveListRef}>
        <ol>
          {formatMoves(moves).map((move, index) => (
            <li style={{color: "#ffffff"}} key={index}>{move}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MoveList;
