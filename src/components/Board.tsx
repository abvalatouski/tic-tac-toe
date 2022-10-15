import Cell from '../components/Cell';
import {
  useGameContext,
} from './GameContextProvider';

export default function Board() {
  const gameContext = useGameContext();

  function renderClassName() {
    const base = 'grid grid-rows-3 grid-cols-3 gap-2.5 my-2.5';
    if (gameContext.winner === undefined) {
      return `${base}`;
    } else {
      return `${base} pointer-events-none`;
    }
  }

  const cells = [];
  for (let y = 0; y < 3; y += 1) {
    for (let x = 0; x < 3; x += 1) {
      const i = y * 3 + x;
      cells.push(<Cell key={i} i={i} x={x} y={y}/>)
    }
  }

  return (
    <div className={renderClassName()}>
      {cells}
    </div>
  );
}
