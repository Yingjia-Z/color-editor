import { render } from "preact";

// import LeftView from "./Left";
// import RightView from "./Right";
import ToolBarView from "./Toolbar";
import EditorView from "./Editor";
import RightView from "./Swatchview";
import StatusBarView from "./Statusbar";

// global styles (e.g. reset)
import "./style.css";

// component styles
import style from "./App.module.css";

console.log("style-module");

// get ref for node to insert the app
const app = document.querySelector("div#app");
if (!app) throw new Error("no app div");

export default function App() {
  return (
    // app "root"
    <div class={style.root}>
      {/* container */}
      <div class={style.panel}>
        {/* views */}
        <ToolBarView />
        <EditorView />
        <RightView />
        <StatusBarView />
      </div>
    </div>
  );
}

render(<App />, app);
