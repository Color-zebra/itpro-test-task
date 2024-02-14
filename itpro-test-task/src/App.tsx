import s from "./App.module.scss";
import { useTest } from "./store";

function App() {
  const { counter, inc } = useTest((store) => store);
  return (
    <div className={s.wrapper}>
      <div className={s.counter}>{counter}</div>
      <button className={s.button} onClick={inc}>
        Increment
      </button>
    </div>
  );
}

export default App;
