import { useState } from "react";
import { Chessboard } from "react-chessboard";

function App() {

  return (
    <>
      <div>
        <Chessboard id='BasicBoard' boardWidth={900}/>
      </div>
    </>
  );
}

export default App;
