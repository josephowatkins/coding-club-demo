import nextMove, { minimax } from "./minimax";

it("should return 1 when the maximising has won", () => {
  const currentPlayer = "X";
  const board = ["X", "X", "X", "", "O", "", "O", "", "O"];

  const actual = minimax(board, false, currentPlayer);

  expect(actual).toEqual(1);
});

it("should return -1 when the minimising has won", () => {
  const currentPlayer = "O";
  const board = ["X", "X", "", "O", "O", "O", "X", "", ""];

  const actual = minimax(board, 0, currentPlayer);

  expect(actual).toEqual(-1);
});

it("should return 0 when it is a draw", () => {
  const currentPlayer = "O";
  const board = ["X", "O", "X", "X", "O", "X", "O", "X", "O"];

  const actual = minimax(board, 0, currentPlayer, true, currentPlayer);

  expect(actual).toEqual(0);
});

it("it should return 1 when the maximising player will win next turn", () => {
  const currentPlayer = "O";
  const board = ["X", "O", "X", "X", "O", "O", "", "", ""];

  const actual = minimax(board, true, currentPlayer);

  expect(actual).toEqual(1);
});

// O O X
// X - - ->
// X - -
it("should return -1 when the maximising player will definitely lose", () => {
  const currentPlayer = "X";
  const board = ["O", "O", "X", "X", "", "", "X", "", ""];

  const actual = minimax(board, false, currentPlayer);

  expect(actual).toEqual(-1);
});

// O X -    O X -
// X O - -> X O -
// X - -    X - O
it("O should win next turn", () => {
  const board = ["O", "X", "", "X", "O", "", "X", "", ""];

  const expected = [2, 2];
  const actual = nextMove(board);
  expect(actual).toEqual(expected);
});

// - O X    - O X
// - X - -> - X -
// - x O    O X O
it("should block x from winning, case 1", () => {
  const board = ["", "X", "O", "", "X", "", "", "O", "X"];

  const expected = [0, 0];
  const actual = nextMove(board);
  expect(actual).toEqual(expected);
});

// O - -    O - -
// X X - -> X X O
// - - -    - - -
it("should block x from winning, case 2", () => {
  const board = ["O", "", "", "X", "X", "", "", "", ""];

  const expected = [1, 2];
  const actual = nextMove(board);
  expect(actual).toEqual(expected);
});

// X O X    X O X
// - - - -> - O -
// - - -    - - -
it("O should take the middle, case 1", () => {
  const board = ["X", "O", "X", "", "", "", "", "", ""];

  const expected = [1, 1];
  const actual = nextMove(board);

  expect(actual).toEqual(expected);
});

// - - -    - - -
// - - - -> - O -
// - - X    - - X
it("O should take the middle, case 2", () => {
  const board = ["", "", "", "", "", "", "", "", "X"];

  const expected = [1, 1];
  const actual = nextMove(board);

  expect(actual).toEqual(expected);
});

// can't test these right now -> can only get next move for the minimising player

// X O X    X O X
// X O O -> X O O
// - - -    X - _
it.skip("should suggest the best next move 1", () => {
  const currentPlayer = "X";
  const board = ["X", "O", "X", "X", "O", "O", "", "", ""];

  const expected = [2, 0];
  const actual = nextMove(board, currentPlayer);

  expect(actual).toEqual(expected);
});

// X O X    X O X
// O O X -> O O X
// - - -    - - X
it.skip("should suggest the best next move 2", () => {
  const currentPlayer = "X";
  const board = ["X", "O", "X", "O", "O", "X", "", "", ""];

  const expected = [2, 2];
  const actual = nextMove(board, currentPlayer);

  expect(actual).toEqual(expected);
});

// X - O    X - O
// X - - -> X X -
// O - -    O - -
it.skip("should block O from winning", () => {
  const currentPlayer = "X";
  const board = ["X", "", "O", "X", "", "", "O", "", ""];

  const expected = [1, 1];
  const actual = nextMove(board, currentPlayer);

  expect(actual).toEqual(expected);
});
