function toIndex(row, col) {
  return row * 3 + col;
}

function toRowCol(index) {
  return [Math.floor(index / 3), index % 3];
}

function isDraw(board) {
  // console.log("checking for draw", board);
  return board.filter((cell) => cell === "").length === 0;
}

/**
 * Returns the winner or undefined
 * @param {*} board
 * @returns "X" || "O" || undefined
 */
function checkForWinner(board) {
  const [a, b, c, d, e, f, g, h, i] = board;

  // rows
  if (a === b && b === c && a !== "") return a;
  if (d === e && e === f && d !== "") return d;
  if (g === h && h === i && g !== "") return g;
  // columns
  if (a === d && d === g && a !== "") return a;
  if (b === e && e === h && b !== "") return b;
  if (c === f && f === i && c !== "") return c;
  // diagonals
  if (a === e && e === i && a !== "") return a;
  if (c === e && e === g && c !== "") return c;
}

const score = { X: 1, O: -1 };

function updateBoard(row, col, player, board) {
  const newBoard = board.slice();
  const index = toIndex(row, col);

  newBoard[index] = player;
  return newBoard;
}

export function minimax(board, isMaximising, currentPlayer) {
  const nextPlayer = currentPlayer === "X" ? "O" : "X";

  const winner = checkForWinner(board);
  if (winner) {
    return score[winner];
  }

  if (isDraw(board)) {
    return 0;
  }

  if (isMaximising) {
    const possibleBoards = [];
    board.forEach((cell, index) => {
      if (cell === "") {
        const [row, col] = toRowCol(index);
        possibleBoards.push(updateBoard(row, col, nextPlayer, board));
      }
    });

    return Math.max(
      ...possibleBoards.map((board) => minimax(board, false, nextPlayer))
    );
  } else {
    const possibleBoards = [];
    board.forEach((cell, index) => {
      if (cell === "") {
        const [row, col] = toRowCol(index);
        possibleBoards.push(updateBoard(row, col, nextPlayer, board));
      }
    });

    return Math.min(
      ...possibleBoards.map((board) => minimax(board, true, nextPlayer))
    );
  }
}

function nextMove(board) {
  let bestScore = Infinity;
  let bestMove;
  // TODO - can only generate moves for the minimising player, O
  const ai = "O";

  const possibleMoves = [];
  const possibleBoards = [];
  board.forEach((cell, index) => {
    if (cell === "") {
      const move = toRowCol(index);
      possibleMoves.push(move);
      const [row, col] = move;
      possibleBoards.push(updateBoard(row, col, ai, board));
    }
  });

  possibleBoards.forEach((board, i) => {
    const score = minimax(board, true, ai); // the nextPlayer will be maximising...

    console.log({ score, bestScore });

    // ai is minimising...
    if (score < bestScore) {
      bestScore = score;
      bestMove = possibleMoves[i];
    }
  });

  return bestMove;
}

export default nextMove;
