import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  Board,
  Player,
  WinChecker,
  WinStrike,
} from '../logic/types';
import {
  JSBoard,
  JSWinChecker,
} from '../logic/js-impl';

export interface GameContextInterface {
  restart: boolean;
  setRestart(restart: boolean): void;
  currentPlayer: Player;
  setCurrentPlayer(player: Player): void;
  winner: Player | undefined;
  setWinner(winner: Player): void;
  winStrike: WinStrike | undefined;
  setWinStrike(strike: WinStrike): void;
  board: Board;
  winChecker: WinChecker;
}

const GameContext = createContext<GameContextInterface>(null!);

export function useGameContext() {
  return useContext(GameContext);
}

export interface GameContextProviderProps {
  children: JSX.Element[],
}

export default function GameContextProvider({
  children,
}: GameContextProviderProps) {
  const [restart, setRestart] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(Player.XS);
  const [winner, setWinner] = useState<Player | undefined>();
  const [winStrike, setWinStrike] = useState<WinStrike | undefined>();
  const [board, setBoard] = useState(new JSBoard());
  const winChecker = useMemo(() => new JSWinChecker(), []);

  useEffect(() => {
    setRestart(false);
    setCurrentPlayer(Player.XS);
    setWinner(undefined);
    setWinStrike(undefined);
    setBoard(new JSBoard());
  }, [restart]);

  const context = {
    restart,
    setRestart,
    currentPlayer,
    setCurrentPlayer,
    winner,
    setWinner,
    winStrike,
    setWinStrike,
    board,
    winChecker,
  };

  return (
    <GameContext.Provider value={context}>
      {children}
    </GameContext.Provider>
  );
}
