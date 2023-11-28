// app state
import { count } from "./AppState";

import style from "./Swatchview.module.css";

type RightViewProps = {
  colour?: string;
};

export default function RightView({
  colour = "grey",
}: RightViewProps) {
  return (
    <div class={style.root}>
      {[...Array(count.value)].map((_, i) => (
        <NumberBox num={i + 1} colour={colour} />
      ))}
    </div>
  );
}

// A component for the box with a number in it.
type NumberBoxProps = {
  num: number;
  colour: string;
};

function NumberBox({ num, colour }: NumberBoxProps) {
  return <div style={{ background: colour }}>{num}</div>;
}

// class={style.box}
