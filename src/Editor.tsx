// app state
import { count, increment } from "./AppState";

import style from "./Editor.module.css";

export default function EditorView() {
  return (
    <div class={style.root}>
      <button onClick={() => increment()}>{count.value}</button>
    </div>
  );
}
