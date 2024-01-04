import { WINNING_CONDITIONS } from "../../helper/winning-conditions";

export function getEmptyBoard() {
  return Array(3)
    .fill(null)
    .map(() => Array<string>(3).fill(""));
}

export function checkWinnerExists(board: string[][]) {
  for (let index = 0; index < WINNING_CONDITIONS.length; index++) {
    const condition = WINNING_CONDITIONS[index];
    if (
      board[condition[0].row][condition[0].col] &&
      board[condition[0].row][condition[0].col] ===
        board[condition[1].row][condition[1].col] &&
      board[condition[0].row][condition[0].col] ===
        board[condition[2].row][condition[2].col]
    ) {
      return true;
    }
  }

  return false;
}
