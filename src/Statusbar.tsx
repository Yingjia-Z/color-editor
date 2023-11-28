// app state
// import * as Model from "./AppState";
import { count, selected } from "./AppState";

import style from "./Statusbar.module.css";

export default function StatusBarView() {
  return (
    <div class={style.root}>
      <div>{count.value} swatches (selected # {selected.value})</div>
    </div>
  );
}
