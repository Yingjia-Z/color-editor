// app state
import { count, increment, decrement } from "./AppState";

import style from "./Toolbar.module.css";

export default function ToolBarView() {
  return (
    <div class={style.root}>
      <button disabled={count.value === 16} onClick={() => increment()}>Add</button>
      <button disabled={count.value === 1} onClick={() => decrement()}>Delete</button>
    </div>
  );
}
