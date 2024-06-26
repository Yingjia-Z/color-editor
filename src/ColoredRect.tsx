import { useRef, useEffect, useState, useLayoutEffect } from "preact/hooks";
import style from "./Editor.module.css";

type SatLumSquareProps = {
  selectedHue: number;
  point: { x: number; y: number };
  width?: number;
  height?: number;
  callback?: (x: number, y: number) => void;
};

export function SatLumSquare({
  selectedHue,
  point,
  width = 200,
  height = 200,
  callback,
}: SatLumSquareProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // initial point is set to point property
  const [movePoint, setMovePoint] = useState(point);

  const clickHandler = (e: MouseEvent) => {
    // send click point to parent
    if (callback) callback(e.offsetX, e.offsetY);
  };

  const moveHandler = (e: MouseEvent) => {
    // update local state
    setMovePoint({ x: e.offsetX, y: e.offsetY });
  };

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }),
    [movePoint];

  function draw(gc: CanvasRenderingContext2D) {
    gc.clearRect(0, 0, width, height);

    // draw white circle
    gc.strokeStyle = "white";
    gc.beginPath();
    gc.arc(point.x, point.y, 6, 0, 2 * Math.PI);
    gc.stroke();

    // draw black circle
    gc.strokeStyle = "black";
    gc.beginPath();
    gc.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    gc.stroke();
  }

  return (
    <>
      <canvas
        class={`${style.satlumsquare} ${style.square1}`}
        style={{
          background: `linear-gradient(to top, hsla(${selectedHue}, 50%, 0%, 1), hsla(${selectedHue}, 50%, 100%, 0))`,
        }}
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={moveHandler}
        onClick={clickHandler}
      />
      <canvas
        class={`${style.satlumsquare} ${style.square2}`}
        style={{
          background: `linear-gradient(to right, hsla(${selectedHue}, 0%, 50%, 0), hsla(${selectedHue}, 100%, 50%, 1))`,
        }}
        // ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={moveHandler}
        onClick={clickHandler}
      />
    </>
  );
}

type HueRectProps = {
  selectedHue: number;
  width?: number;
  height?: number;
  callback?: (x: number) => void;
};

export function HueRect({
  selectedHue,
  width = 20,
  height = 200,
  callback,
}: HueRectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // initial hue is set to hue property
  const [moveHue, setMoveHue] = useState(selectedHue);

  const clickHandler = (e: MouseEvent) => {
    // send click hue to parent
    console.log("e.offsetY");
    console.log(e.offsetY);

    if (callback) callback(Math.floor((e.offsetY * 360) / 200));
  };

  const moveHandler = (e: MouseEvent) => {
    // update local state
    setMoveHue(Math.floor((e.offsetY * 360) / 200));
  };

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }),
    [moveHue];

  function draw(gc: CanvasRenderingContext2D) {
    gc.clearRect(0, 0, width, height);

    const currentHue = Math.floor((selectedHue * 200) / 360);
    // draw white rectangle
    gc.strokeStyle = "white";
    gc.lineWidth = 4;
    gc.beginPath();
    gc.strokeRect(0, currentHue, 20, 5);
    gc.stroke();

    // Draw black rectangle
    gc.strokeStyle = "black";
    gc.lineWidth = 2;
    gc.beginPath();
    gc.strokeRect(0, currentHue, 20, 5);
    gc.stroke();
  }
  return (
    <canvas
      class={style.huerect}
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={moveHandler}
      onClick={clickHandler}
    />
  );
}
