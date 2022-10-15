import {
  useEffect,
  useRef,
} from 'react';
import {
  Player,
  isInStrike,
  nextPlayer,
} from '../logic/types';
import {
  useGameContext,
} from './GameContextProvider';

export interface CellProps {
  i: number;
  x: number;
  y: number;
}

export default function Cell({
  i,
  x,
  y,
}: CellProps) {
  const gameContext = useGameContext();
  const buttonRef = useRef<HTMLButtonElement>(undefined!);
  const canvasRef = useRef<HTMLCanvasElement>(undefined!);
  const occupier = gameContext.board.getCellOccupier(x, y);

  useEffect(() => {
    const wrapper = buttonRef.current;
    const canvas  = canvasRef.current;
    canvas.width  = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d')!;

    canvasContext.lineWidth   = 5;
    canvasContext.strokeStyle = occupier === Player.XS
      ? '#60A5FA'
      : '#F87171';

    const x0 = canvas.width  * 1 / 8;
    const x1 = canvas.width  * 7 / 8;
    const y0 = canvas.height * 1 / 8;
    const y1 = canvas.height * 7 / 8;

    switch (occupier) {
    case Player.XS:
      canvasContext.beginPath();
      canvasContext.moveTo(x0, y0);
      canvasContext.lineTo(x1, y1);
      canvasContext.stroke();
      canvasContext.beginPath();
      canvasContext.moveTo(x1, y0);
      canvasContext.lineTo(x0, y1);
      canvasContext.stroke();
      break;
    case Player.OS:
      canvasContext.beginPath();
      canvasContext.ellipse(
        canvas.width  / 2,
        canvas.height / 2,
        canvas.width  / 2 * 3 / 4,
        canvas.height / 2 * 3 / 4,
        0,
        0,
        2 * Math.PI,
      );
      canvasContext.stroke();
      break;
    case undefined:
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      break;
    }
  }, [occupier]);

  function onClick() {
    if (occupier === undefined) {
      gameContext.board.occupyCell(x, y, gameContext.currentPlayer);
      checkForWin();
      gameContext.setCurrentPlayer(nextPlayer(gameContext.currentPlayer));
    }
  }

  function checkForWin() {
    const strike = gameContext.winChecker.check(gameContext.board);
    if (strike !== undefined) {
      gameContext.setWinner(gameContext.currentPlayer);
      gameContext.setWinStrike(strike);
    }
  }

  function renderClassName() {
    const base = 'w-24 h-24';
    if (occupier === undefined
        || gameContext.winStrike === undefined
        || !isInStrike(x, y, gameContext.winStrike!)) {
      return `${base} bg-gray-200 hover:bg-gray-300 active:bg-stone-300`;
    }

    switch (occupier) {
    case Player.XS:
      return `${base} bg-blue-200`;
    case Player.OS:
      return `${base} bg-red-200`;
    }
  }

  return (
    <button
      id={`cell-${i}`}
      className={renderClassName()}
      ref={buttonRef}
      onClick={onClick}
    >
      <canvas ref={canvasRef}></canvas>
    </button>
  );
}
