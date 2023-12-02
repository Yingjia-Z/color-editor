import { signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { hslToRgb, rgbToHex, hexToRgb, rgbToHsl } from "./Helper";

// state
export const count = signal(10);
// export const selected = signal(-1);
export const selected = signal<number | null>(null);

export const hue = signal(-1);
export const sat = signal(-1);
export const lum = signal(-1);
export const rgb = signal({ r: -1, g: -1, b: -1 });
export const hex = signal("#?");

export type Swatch = {
  id: number;
  focus: boolean;
  hue: number;
  sat: number;
  lum: number;
  rgb: object;
  hex: string;
};

// local helper function
function initializeSwatch() {
  let hueValue = Math.floor(Math.random() * 360);
  let satValue = Math.floor(Math.random() * 100);
  let lumValue = Math.floor(Math.random() * 100);
  let rgbValue = hslToRgb(hueValue, satValue, lumValue);
  return {
    hue: hueValue,
    sat: satValue,
    lum: lumValue,
    rgb: rgbValue,
    // hex: rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b),
    hex: rgbToHex(rgbValue),
    focus: false,
  };
}

// local helper function
const createSwatch = () => {
  const newSwatch = initializeSwatch();
  swatches.value = [...swatches.value, newSwatch];
};

export const updateSwatches = () => {
  swatches.value[selected.value - 1].hue = hue.value;
  swatches.value[selected.value - 1].sat = sat.value;
  swatches.value[selected.value - 1].lum = lum.value;
  swatches.value[selected.value - 1].rgb = rgb.value;
  swatches.value[selected.value - 1].hex = hex.value;
};

// update RGB and HEX value for app state from new HSL value
export const updateColorValue = () => {
  let updatedRGB = hslToRgb(hue.value, sat.value, lum.value);
  let updatedHEX = rgbToHex(updatedRGB);
  rgb.value = updatedRGB;
  hex.value = updatedHEX;
};

export const selectSwatch = (swatchIndex: number) => {
  selected.value = swatchIndex + 1;
  swatches.value.map((s) => (s.focus = false));
  swatches.value[swatchIndex].focus = true;
  // update HSL value for app state
  hue.value = swatches.value[swatchIndex].hue;
  sat.value = swatches.value[swatchIndex].sat;
  lum.value = swatches.value[swatchIndex].lum;

  // // update RGB and HEX value for app state
  // let updatedRGB = hslToRgb(hue.value, sat.value, lum.value);
  // let updatedHEX = rgbToHex(updatedRGB);
  // rgb.value = updatedRGB;
  // hex.value = updatedHEX;
  updateColorValue();
  console.log("rgb.value");
  console.log(rgb.value);
  console.log(hex.value);
};

// export const swatches = signal<Swatch[]>([]);
export const swatches = signal(Array.from({ length: 10 }, initializeSwatch));
selectSwatch(0);

// mutations
export const increment = () => {
  if (count.value == 16) {
    console.warn("Number of Swatches cannot exceed 16!!");
    return;
  }
  count.value++;
  createSwatch();
  selectSwatch(count.value - 1);
  console.log(swatches.value[count.value - 1]);
};

export const decrement = () => {
  if (count.value == 1) {
    console.warn("Number of Swatches cannot be below 1!!");
    return;
  }
  count.value--;
  let indexWithFocus = selected.value - 1;
  swatches.value = swatches.value.filter(
    (_, index) => index !== indexWithFocus
  );

  // if the last swatch is deleted, then need to select the current last swatch in current swatches
  if (indexWithFocus >= swatches.value.length) {
    selectSwatch(swatches.value.length - 1);
  } else {
    selectSwatch(indexWithFocus);
  }
};

// prevent 'e', '+', and any other non-numeric key from being entered
export const filterInvalid = (e: KeyboardEvent) => {
  const invalidChars = ["e", "E", "+", "-", "."];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
};

export const checkColor = (str: string, e: Event) => {
  let input = e.target as HTMLInputElement;
  let degree = input.value;

  degree = degree.replace(/\D/g, "");
  // degree = parseInt((e.target as HTMLInputElement).value, 10);
  degree = parseInt(degree, 10);

  console.log(degree);
  if (isNaN(degree) || degree < 0) {
    degree = 0;
  } else if (str === "hue" && degree > 360) {
    degree = 360;
  } else if ((str === "sat" || str === "lum") && degree > 100) {
    degree = 100;
  } else if ((str === "r" || str === "g" || str === "b") && degree > 255) {
    degree = 255;
  }

  // set the cleaned value back to the event so previous numbers entered won't be saved
  input.value = degree.toString();

  // Update the corresponding state
  if (str === "hue") {
    hue.value = degree;
  } else if (str === "sat") {
    sat.value = degree;
  } else if (str === "lum") {
    lum.value = degree;
  } else if (str === "r") {
    rgb.value.r = degree;
    // console.log("rftgyr");
    // console.log(degree);
    // console.log(rgb.value.r);
  } else if (str === "g") {
    rgb.value.g = degree;
  } else if (str === "b") {
    rgb.value.b = degree;
  }

  // first update hsl then update rgb and hex
  if (str === "hue" || str === "sat" || str === "lum") {
    // swatches.value[selected.value - 1].hue = hue.value;
    // swatches.value[selected.value - 1].sat = sat.value;
    // swatches.value[selected.value - 1].lum = lum.value;

    updateColorValue();

    // swatches.value[selected.value - 1].rgb = rgb.value;
    // swatches.value[selected.value - 1].hex = hex.value;
  }
  // first update rgb then update hsl and hex
  else if (str === "r" || str === "g" || str === "b") {
    // swatches.value[selected.value - 1].rgb = rgb.value;
    let updatedHSL = rgbToHsl(rgb.value);
    let updatedHEX = rgbToHex(rgb.value);
    hue.value = updatedHSL.h;
    sat.value = updatedHSL.s;
    lum.value = updatedHSL.l;

    // swatches.value[selected.value - 1].hue = hue.value;
    // swatches.value[selected.value - 1].sat = sat.value;
    // swatches.value[selected.value - 1].lum = lum.value;

    // updateColorValue();

    // swatches.value[selected.value - 1].rgb = rgb.value;
    // swatches.value[selected.value - 1].hex = hex.value;
  }

  // swatches.value[selected.value - 1].hue = hue.value;
  // swatches.value[selected.value - 1].sat = sat.value;
  // swatches.value[selected.value - 1].lum = lum.value;
  // swatches.value[selected.value - 1].rgb = rgb.value;
  // swatches.value[selected.value - 1].hex = hex.value;
  updateSwatches();
};

// regex validation
export const checkHex = (text: string) => /^#[0-9A-Fa-f]{6}$/.test(text);

export const updateHex = (text: string) => {
  hex.value = text;
  let updatedRGB = hexToRgb(hex.value);
  let updatedHSL = rgbToHsl(updatedRGB);
  rgb.value = updatedRGB;
  console.log(rgb.value);
  hue.value = updatedHSL.h;
  sat.value = updatedHSL.s;
  lum.value = updatedHSL.l;

  // swatches.value[selected.value - 1].hue = hue.value;
  // swatches.value[selected.value - 1].sat = sat.value;
  // swatches.value[selected.value - 1].lum = lum.value;
  // swatches.value[selected.value - 1].rgb = rgb.value;
  // swatches.value[selected.value - 1].hex = hex.value;
  updateSwatches();
};

// local helper function
// const createSwatch = () => {
//   let hueValue = Math.floor(Math.random() * 360);
//   let satValue = Math.floor(Math.random() * 100);
//   let lumValue = Math.floor(Math.random() * 100);
//   let rgbValue = hslToRgb(hueValue, satValue, lumValue);
//   swatches.value = [
//     ...swatches.value,
//     {
//       hue: hueValue,
//       sat: satValue,
//       lum: lumValue,
//       rgb: rgbValue,
//       hex: rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b),
//       focus: false,
//     },
//     // initializeSwatch(),
//   ];
// };
// // local helper function
// const createSwatch = () => {
//   const newSwatch = initializeSwatch();
//   swatches.value = [...swatches.value, newSwatch];
// };

// // local helper function
// // update RGB and HEX value for app state from new HSL value
// const updateColorValue = () => {
//   let updatedRGB = hslToRgb(hue.value, sat.value, lum.value);
//   let updatedHEX = rgbToHex(updatedRGB);
//   rgb.value = updatedRGB;
//   hex.value = updatedHEX;
// };
