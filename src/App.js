import { useCallback, useEffect, useState } from "react";
import "./App.css";
import nextMove from "./minimax";

/******************************************************************************
 *  utils
 *****************************************************************************/

function toIndex(row, col) {
  return row * 3 + col;
}

function toRowCol(index) {
  return [Math.floor(index / 3), index % 3];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/******************************************************************************
 *  components
 *****************************************************************************/

function Cell({ row, coll, children }) {
  return <div className="game__cell">{children}</div>;
}

function Banner({ message }) {
  return <h2 className="game__message-banner">{message}</h2>;
}

function Board({ board, onPlayerMove }) {
  return (
    <div className="game__board">
      {board.map((cell, index) => {
        const [row, col] = toRowCol(index);
        return (
          <div
            key={`${row},${col}`}
            onClick={() => {
              if (cell === "") {
                onPlayerMove(row, col);
              }
            }}
          >
            <Cell row={row} col={col}>
              {cell}
            </Cell>
          </div>
        );
      })}
    </div>
  );
}

/******************************************************************************
 *  game helpers
 *****************************************************************************/

function isLegalMove(board, row, col) {
  const index = toIndex(row, col);
  return board[index] === "";
}

function isDraw(board) {
  return board.filter((cell) => cell === "").length === 0;
}

function haveWinner(board) {
  const [a, b, c, d, e, f, g, h, i] = board;

  return !!(
    (a && b && c && a === b && b === c) || // rows...
    (d && e && f && d === e && e === f) ||
    (g && h && i && g === h && h === i) ||
    (a && d && g && a === d && d === g) || // columns...
    (b && e && h && b === e && e === h) ||
    (c && f && i && c === f && f === i) ||
    (a && e && i && a === e && e === i) || // diagonals...
    (c && e && g && c === e && e === g)
  );
}

function haveDraw(board) {
  return board.filter((cell) => cell === "").length === 0;
}

function generateMove(board, player) {
  return nextMove(board, player);
}

function updateBoard(row, col, player, board) {
  const newBoard = board.slice();
  const index = row * 3 + col;
  newBoard[index] = player;
  return newBoard;
}

/******************************************************************************
 *  app
 *****************************************************************************/

const initialBoard = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(initialBoard);
  const [message, setMessage] = useState();

  function handlePlayerMove(row, col) {
    if (haveWinner(board) || isDraw(board)) return;

    if (isLegalMove(board, row, col)) {
      const newBoard = updateBoard(row, col, player, board);
      setBoard(newBoard);

      if (haveWinner(newBoard)) {
        setMessage(`Player ${player} wins!`);
      } else if (haveDraw(newBoard)) {
        setMessage(`It's a draw!`);
      } else {
        setPlayer(player === "X" ? "O" : "X");
      }
    }
  }

  const handleComputerMove = useCallback(() => {
    if (haveWinner(board) || isDraw(board)) return;

    const [row, col] = generateMove(board, player);

    if (isLegalMove(board, row, col)) {
      const newBoard = updateBoard(row, col, player, board);
      setBoard(newBoard);

      if (haveWinner(newBoard)) {
        setMessage(`Player ${player} wins!`);
      } else if (haveDraw(newBoard)) {
        setMessage(`It's a draw!`);
      } else {
        setPlayer(player === "X" ? "O" : "X");
      }
    } else {
      handleComputerMove();
    }
  }, [player, board]);

  useEffect(() => {
    if (player === "O") {
      handleComputerMove();
    }
  }, [player, board, handleComputerMove]);

  return (
    <div className="wrapper">
      <Board board={board} onPlayerMove={handlePlayerMove} />
      {message && <Banner message={message} />}
    </div>
  );
}

export default App;
