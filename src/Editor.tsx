// app state
import * as Model from "./AppState";

import style from "./Editor.module.css";

export default function EditorView() {
  const hslColour = `hsl(${Model.hue}deg, ${Model.sat}%, ${Model.lum}%)`;
  return (
    <div class={style.editor}>
      <div
        class={style.coloredrect}
        style={{
          background: hslColour,
        }}
      ></div>
      <div class={style.hslform}>
        <form>
          <div>
            <label for="hue">Hue</label>
            <input
              id="hue"
              type="number"
              min="0"
              max="360"
              class={style.textfield}
            />
            <input
              id="hueRange"
              type="range"
              min="0"
              max="360"
              class={style.slider}
            />
          </div>

          <div>
            <label for="sat">Sat</label>
            <input
              id="sat"
              type="number"
              min="0"
              max="100"
              class={style.textfield}
            />
            <input
              id="satRange"
              type="range"
              min="0"
              max="100"
              class={style.slider}
            />
          </div>

          <div>
            <label for="lum">Lum</label>
            <input
              id="lum"
              type="number"
              min="0"
              max="100"
              class={style.textfield}
            />
            <input
              id="lumRange"
              type="range"
              min="0"
              max="100"
              class={style.slider}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
