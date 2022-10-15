import {
  Board,
  Player,
  WinChecker,
  WinStrike,
} from './types';

export class JSBoard implements Board {
  constructor(
    private readonly cells: (Player | undefined)[][] = [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ],
    private emptyCells: number = 3 * 3,
  ) { }

  get hasEmptyCells(): boolean {
    return this.emptyCells !== 0;
  }

  getCellOccupier(x: number, y: number): Player | undefined {
    return this.cells[y][x];
  }

  occupyCell(x: number, y: number, player: Player): void {
    this.cells[y][x] = player;
    this.emptyCells -= 1;
  }
}

export class JSWinChecker implements WinChecker {
  check(board: Board): WinStrike | undefined {
    return this.checkRowsAndColumns(board) ?? this.checkDiagonals(board);
  }

  private checkRowsAndColumns(board: Board): WinStrike | undefined {
    for (let i = 0; i < 3; i += 1) {
      let xs1 = 0;
      let os1 = 0;
      let xs2 = 0;
      let os2 = 0;

      for (let j = 0; j < 3; j += 1) {
        switch (board.getCellOccupier(i, j)) {
        case Player.XS:
          xs1 += 1;
          break;
        case Player.OS:
          os1 += 1;
          break;
        }
        
        switch (board.getCellOccupier(j, i)) {
        case Player.XS:
          xs2 += 1;
          break;
        case Player.OS:
          os2 += 1;
          break;
        }
      }

      if (xs1 === 3 || os1 === 3) {
        return [
          { x: i, y: 0 },
          { x: i, y: 1 },
          { x: i, y: 2 },
        ];
      }

      if (xs2 === 3 || os2 === 3) {
        return [
          { x: 0, y: i },
          { x: 1, y: i },
          { x: 2, y: i },
        ];
      }
    }

    return undefined;
  }

  private checkDiagonals(board: Board): WinStrike | undefined {
    const c11 = board.getCellOccupier(1, 1);
    if (c11 === undefined) {
      return undefined;
    }
    
    const c00 = board.getCellOccupier(0, 0);
    const c22 = board.getCellOccupier(2, 2);
    if (c00 === c11 && c11 === c22 && c22 === c00) {
      return [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ];
    }

    const c20 = board.getCellOccupier(2, 0);
    const c02 = board.getCellOccupier(0, 2);
    if (c20 === c11 && c11 === c02 && c02 === c20) {
      return [
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ];
    }
    
    return undefined;
  }
}
