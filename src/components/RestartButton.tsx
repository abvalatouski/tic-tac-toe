import {
  useGameContext,
} from "./GameContextProvider";

export default function RestartButton() {
  const gameContext = useGameContext();

  function onClick() {
    gameContext.setRestart(true);
  }

  return (
    <button
      id="restart-button"
      className="block mx-auto h-12 w-full py-1 bg-gray-200 hover:bg-gray-300 active:bg-stone-300"
      onClick={onClick}
    >Restart</button>
  );
}
