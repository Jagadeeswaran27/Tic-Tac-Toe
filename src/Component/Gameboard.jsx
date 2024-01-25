// import { useState } from "react";

export default function Gameboard({ playerHandler, turns }) {
  // const [gameBoard, setGameboard] = useState(initialGameboard);

  // function gameBoardhandler(rI, cI) {
  //   setGameboard((gameBoard) => {
  //     const updatedGameboard = [...gameBoard.map((innerEl) => [...innerEl])];
  //     updatedGameboard[rI][cI] = activePlayerSymbol;
  //     return updatedGameboard;
  //   });
  //   playerHandler();
  // }

  return (
    <ol id="game-board">
      {turns.map((row, rIndex) => (
        <li key={rIndex}>
          <ol>
            {row.map((playerSymbol, pIndex) => (
              <li key={pIndex}>
                <button
                  onClick={() => playerHandler(rIndex, pIndex)}
                  disabled={playerSymbol}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
