import { signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

// state
export const count = signal(10);
// export const selected = signal(-1);
export const selected = signal<number | null>(null);

export const hue = signal(-1);
export const sat = signal(-1);
export const lum = signal(-1);

export type Swatch = {
  // element: HTMLElement;
  id: number;
  focus: boolean;
  // border: string;
  hue: number;
  sat: number;
  lum: number;
  // html: string;
};

// local helper functions
function initializeSwatch() {
  return {
    hue: Math.floor(Math.random() * 360),
    sat: Math.floor(Math.random() * 100),
    lum: Math.floor(Math.random() * 100),
    focus: false,
  };
}

export const selectSwatch = (swatchIndex: number) => {
  selected.value = swatchIndex + 1;
  swatches.value.map((s) => (s.focus = false));
  swatches.value[swatchIndex].focus = true;
  hue.value = swatches.value[swatchIndex].hue;
  sat.value = swatches.value[swatchIndex].sat;
  lum.value = swatches.value[swatchIndex].lum;
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
  // console.log(swatches.value);
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

export const checkText = (str: string, e: Event) => {
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
  }
  swatches.value[selected.value - 1].hue = hue.value;
  swatches.value[selected.value - 1].sat = sat.value;
  swatches.value[selected.value - 1].lum = lum.value;
};

// local helper functions
const createSwatch = () => {
  swatches.value = [
    ...swatches.value,
    {
      hue: Math.floor(Math.random() * 360),
      sat: Math.floor(Math.random() * 100),
      lum: Math.floor(Math.random() * 100),
      focus: false,
    },
  ];
};
