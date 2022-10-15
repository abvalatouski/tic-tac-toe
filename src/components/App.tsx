import Board from './Board';
import Header from './Header';
import GameContextProvider from './GameContextProvider';
import RestartButton from './RestartButton';
import '../index.css';

export default function App() {
  return (
    <div className="h-screen grid place-items-center">
      <div>
        <GameContextProvider>
          <Header/>
          <Board/>
          <RestartButton/>
        </GameContextProvider>
      </div>
    </div>
  );
};
