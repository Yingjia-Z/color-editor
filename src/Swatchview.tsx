// app state
import * as Model from "./AppState";
// import { swatches } from "./AppState";

import style from "./Swatchview.module.css";

import { useState } from "preact/hooks";

type SwatchViewProps = {
  colour?: string;
};

export default function SwatchView({ colour = "grey" }: SwatchViewProps) {
  // store the index of selectedSwatch
  const [selectedSwatch, setSelectedSwatch] = useState(0);

  // update the state and then separately update the Model.selected.value
  const handleSwatchClick = (swatchIndex) => {
    setSelectedSwatch(swatchIndex);
    Model.selectSwatch(swatchIndex);
    // console.log(Model.selected.value);
  };

  return (
    <div class={style.swatchview}>
      {Model.swatches.value.map((swatch, i) => (
        <SwatchItem
          key={i}
          swatch={swatch}
          onClick={() => handleSwatchClick(i)}
        />
      ))}
    </div>
  );
}

type SwatchItemProps = {
  swatch: Model.Swatch;
};

function SwatchItem({ swatch, onClick }: SwatchItemProps) {
  const hslColour = `hsl(${swatch.hue}deg, ${swatch.sat}%, ${swatch.lum}%)`;
  const swatchBorder = swatch.focus ? "1px solid black" : "1px solid lightgrey";

  return (
    <div
      onClick={onClick}
      style={{
        background: hslColour,
        border: swatchBorder,
      }}
    ></div>
  );
}

// class={style.box}
