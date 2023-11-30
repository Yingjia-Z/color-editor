// app state
import * as Model from "./AppState";

import style from "./Editor.module.css";

import { useEffect, useState } from "preact/hooks";

export default function EditorView() {
  const hslColour = `hsl(${Model.hue}deg, ${Model.sat}%, ${Model.lum}%)`;
  // const [inputValue, setInputValue] = useState(Model.hue.value);
  const [hueValue, setHueValue] = useState(Model.hue.value);
  const [satValue, setSatValue] = useState(Model.sat.value);
  const [lumValue, setLumValue] = useState(Model.lum.value);

  // update local state when app state changes
  // useEffect(() => {
  //   setHueValue(Model.hue.value);
  // }, [Model.hue.value]);

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
              value={hueValue}
              onInput={(e) => Model.checkText("hue", e)}
              onChange={setHueValue(Model.hue.value)}
              onKeyDown={(e) => Model.filterInvalid(e)}
            />

            <input
              id="hueRange"
              type="range"
              min="0"
              max="360"
              class={style.slider}
              value={hueValue}
              onInput={(e) => Model.checkText("hue", e)}
              onChange={setHueValue(Model.hue.value)}
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
              value={satValue}
              onInput={(e) => Model.checkText("sat", e)}
              onChange={setSatValue(Model.sat.value)}
              onKeyDown={(e) => Model.filterInvalid(e)}
            />
            <input
              id="satRange"
              type="range"
              min="0"
              max="100"
              class={style.slider}
              value={satValue}
              onInput={(e) => Model.checkText("sat", e)}
              onChange={setSatValue(Model.sat.value)}
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
              value={lumValue}
              onInput={(e) => Model.checkText("lum", e)}
              onChange={setLumValue(Model.lum.value)}
              onKeyDown={(e) => Model.filterInvalid(e)}
            />
            <input
              id="lumRange"
              type="range"
              min="0"
              max="100"
              class={style.slider}
              value={lumValue}
              onInput={(e) => Model.checkText("lum", e)}
              onChange={setLumValue(Model.lum.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
