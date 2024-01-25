import Player from "./Component/Player";
import Gameboard from "./Component/Gameboard";
import { useState } from "react";
import Log from "./Component/log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Gameover from "./Component/GameOver";

const setPlayer = Math.random() > 0.5 ? "X" : "O";
console.log(setPlayer);

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameboard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameBoard[row][column] = player;
  }

  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function playerHandler(rI, cI) {
    setGameTurns((prevTurns) => {
      let currPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rI, column: cI }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function Reset() {
    setGameTurns([]);
  }

  function setPlayerNameHandler(symbol, newName) {
    setPlayerName((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={setPlayerNameHandler}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={setPlayerNameHandler}
          />
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} reset={Reset} />}
        <Gameboard turns={gameBoard} playerHandler={playerHandler} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
