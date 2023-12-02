// app state
import * as Model from "./AppState";
import { SatLumSquare, HueRect } from "./ColoredRect";

import style from "./Editor.module.css";

import { useRef, useEffect, useState, useLayoutEffect } from "preact/hooks";

export default function EditorView() {
  const hslColour = `hsl(${Model.hue}deg, ${Model.sat}%, ${Model.lum}%)`;
  // const [inputValue, setInputValue] = useState(Model.hue.value);
  const [hueValue, setHueValue] = useState(Model.hue.value);
  const [satValue, setSatValue] = useState(Model.sat.value);
  const [lumValue, setLumValue] = useState(Model.lum.value);
  const [rgbValue, setRgbValue] = useState(Model.rgb.value);
  const [hexValue, setHexValue] = useState(Model.hex.value);

  // update local state when app state changes
  useEffect(() => {
    setHexValue(Model.hex.value);
  }, [Model.hex.value]);

  // handler for input changes
  const handleHexInput = (e: Event) => {
    const newHex = (e.target as HTMLInputElement).value;
    // Update local state immediately
    setHexValue(newHex);

    // only if valid, update the app state
    if (Model.checkHex(newHex)) {
      console.log(newHex);
      console.log(Model.hex.value);
      // Model.hex.value = newHex;
      Model.updateHex(newHex);
      console.log(Model.hex.value);
    }
  };

  // set the open color configuration
  const [open, setOpen] = useState("hslForm");

  const renderForm = () => {
    if (open === "hslForm") {
      return (
        <form id="hslform">
          <div>
            <label for="hue">Hue</label>

            <input
              id="hue"
              type="number"
              min="0"
              max="360"
              class={style.textfield}
              value={hueValue}
              onInput={(e) => Model.checkColor("hue", e)}
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
              onInput={(e) => Model.checkColor("hue", e)}
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
              onInput={(e) => Model.checkColor("sat", e)}
              onChange={setSatValue(Model.sat.value)}
              // onInput={(e) => {
              //   Model.checkColor("sat", e);
              //   // use e.target.value to get the current input value
              //   const newSatValue = e.target.value;
              //   setSatValue(newSatValue); // Update state with the new value
              //   updateCanvas(newSatValue * 2, 200 - Model.lum.value * 2); // Use the new value for the canvas update
              // }}
              // onChange={setSatValue(Model.sat.value)}
              onKeyDown={(e) => Model.filterInvalid(e)}
            />
            <input
              id="satRange"
              type="range"
              min="0"
              max="100"
              class={style.slider}
              value={satValue}
              onInput={(e) => Model.checkColor("sat", e)}
              onChange={setSatValue(Model.sat.value)}
              // onInput={(e) => {
              //   Model.checkColor("sat", e);
              //   updateCanvas(Model.sat.value * 2, 200 - Model.lum.value * 2);
              // }}
              // onChange={(e) => {
              //   setSatValue(Model.sat.value);
              //   updateCanvas(Model.sat.value * 2, 200 - Model.lum.value * 2);
              // }}
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
              // onInput={(e) => Model.checkColor("lum", e)}

              // onInput={(e) => {
              //   Model.checkColor("lum", e);
              //   // use e.target.value to get the current input value
              //   const newLumValue = e.target.value;
              //   setLumValue(newLumValue); // Update state with the new value
              //   updateCanvas(Model.sat.value * 2, 200 - newLumValue * 2); // Use the new value for the canvas update
              // }}
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
              // onInput={(e) => {
              //   Model.checkColor("lum", e);
              //   updateCanvas(Model.sat.value * 2, 200 - Model.lum.value * 2);
              // }}
              // onChange={(e) => {
              //   setLumValue(Model.lum.value);
              //   updateCanvas(Model.sat.value * 2, 200 - Model.lum.value * 2);
              // }}
              onInput={(e) => Model.checkColor("lum", e)}
              onChange={setLumValue(Model.lum.value)}
            />
          </div>
        </form>
      );
    } else if (open === "rgbForm") {
      return (
        <form id="rgbForm">
          <div>
            <label for="r">R</label>

            <input
              id="r"
              type="number"
              min="0"
              max="255"
              class={style.textfield}
              value={rgbValue.r}
              onInput={(e) => Model.checkColor("r", e)}
              onChange={setRgbValue(Model.rgb.value)}
              onKeyDown={(e) => Model.filterInvalid(e)}
            />

            <input
              id="rRange"
              type="range"
              min="0"
              max="255"
              class={style.slider}
              value={rgbValue.r}
              onInput={(e) => Model.checkColor("r", e)}
              onChange={setRgbValue(Model.rgb.value)}
            />
          </div>

          <div>
            <label for="g">G</label>
            <input
              id="g"
              type="number"
              min="0"
              max="255"
              class={style.textfield}
              value={rgbValue.g}
              onInput={(e) => Model.checkColor("g", e)}
              onChange={setRgbValue(Model.rgb.value)}
              onKeyDown={(e) => Model.filterInvalid(e)}
            />
            <input
              id="gRange"
              type="range"
              min="0"
              max="255"
              class={style.slider}
              value={rgbValue.g}
              onInput={(e) => Model.checkColor("g", e)}
              onChange={setRgbValue(Model.rgb.value)}
            />
          </div>

          <div>
            <label for="b">B</label>
            <input
              id="b"
              type="number"
              min="0"
              max="255"
              class={style.textfield}
              value={rgbValue.b}
              onInput={(e) => Model.checkColor("b", e)}
              onChange={setRgbValue(Model.rgb.value)}
              onKeyDown={(e) => Model.filterInvalid(e)}
            />
            <input
              id="bRange"
              type="range"
              min="0"
              max="255"
              class={style.slider}
              value={rgbValue.b}
              onInput={(e) => Model.checkColor("b", e)}
              onChange={setRgbValue(Model.rgb.value)}
            />
          </div>
        </form>
      );
    } else if (open === "hexForm") {
      return (
        <div>
          <input
            id="hexTextfield"
            class={style.hexTextfield}
            value={hexValue}
            type="text"
            onInput={handleHexInput}
            // always leave input field with valid value
            onChange={() => setHexValue(Model.hex.value)}
          />
          {!Model.checkHex(hexValue) && (
            <p class={style.hexError}>Invalid: must be valid hex colour</p>
          )}
        </div>
      );
    }
    return null;
  };

  const [point, setPoint] = useState({
    x: Model.sat.value * 2,
    y: 200 - Model.lum.value * 2,
  });

  // // changes to color values trigger changes to canvas
  // const updateCanvas = (x: number, y: number) => {
  //   // console.log(`squareHandler (${point.x}, ${point.y}) => (${x}, ${y})`);
  //   setPoint({ x: x, y: y });
  //   // Model.sat.value = Math.floor(x / 2);
  //   // Model.lum.value = Math.floor((200 - y) / 2);
  //   // Model.updateColorValue();
  //   // Model.updateSwatches();
  // };

  // changes on sat-lum-square trigger changes to color values
  const squareHandler = (x: number, y: number) => {
    console.log(`squareHandler (${point.x}, ${point.y}) => (${x}, ${y})`);
    setPoint({ x: x, y: y });
    Model.sat.value = Math.floor(x / 2);
    Model.lum.value = Math.floor((200 - y) / 2);
    Model.updateColorValue();
    Model.updateSwatches();
  };

  const rectHandler = (x: number) => {
    console.log(`rectHandler (${hueValue}) => (${x})`);
    // setPoint({ x: x, y: y });
    setHueValue(x);
    // Model.sat.value = Math.floor(x / 2);
    // Model.lum.value = Math.floor((200 - y) / 2);
    Model.hue.value = x;
    Model.updateColorValue();
    Model.updateSwatches();
  };

  return (
    <div class={style.editor}>
      <div
        class={style.coloredrect}
        // style={{
        //   background: hslColour,
        // }}
      >
        <SatLumSquare
          selectedHue={Model.hue.value}
          point={{ x: Model.sat.value * 2, y: 200 - Model.lum.value * 2 }}
          // width="200"
          // height="200"
          callback={squareHandler}
        />
        <HueRect selectedHue={Model.hue.value} callback={rectHandler} />
      </div>
      <div class={style.colorform}>
        <div class={style.radioLabel}>
          <input
            id="hsl"
            type="radio"
            checked={open === "hslForm"}
            onChange={() => setOpen("hslForm")}
          />
          <label for="hsl">HSL</label>

          <input
            id="rgb"
            type="radio"
            checked={open === "rgbForm"}
            onChange={() => setOpen("rgbForm")}
          />
          <label for="rgb">RGB</label>

          <input
            id="hex"
            type="radio"
            checked={open === "hexForm"}
            onChange={() => setOpen("hexForm")}
          />
          <label for="hex">Hex</label>
        </div>

        {renderForm()}
      </div>
    </div>
  );
}
