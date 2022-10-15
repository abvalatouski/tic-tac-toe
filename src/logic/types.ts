export const enum Player {
  XS,
  OS,
}

export function nextPlayer(currentPlayer: Player) {
  switch (currentPlayer) {
  case Player.XS:
    return Player.OS;
  case Player.OS:
    return Player.XS;
  }
}

export interface Board {
  get hasEmptyCells(): boolean;
  getCellOccupier(x: number, y: number): Player | undefined;
  occupyCell(x: number, y: number, player: Player): void;
}

export interface BoardIndex {
  x: number;
  y: number;
}

export type WinStrike = [BoardIndex, BoardIndex, BoardIndex];
  
export function isInStrike(x: number, y: number, strike: WinStrike) {
  for (const index of strike) {
    if (x === index.x && y === index.y) {
      return true;
    }
  }

  return false;
}

export interface WinChecker {
  check(board: Board): WinStrike | undefined;
}
