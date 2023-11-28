// app state
import { count, increment, decrement } from "./AppState";

import style from "./Toolbar.module.css";

export default function ToolBarView() {
  return (
    <div class={style.root}>
      <button onClick={() => increment()}>Add</button>
      <button onClick={() => decrement()}>Delete</button>
    </div>
  );
}
