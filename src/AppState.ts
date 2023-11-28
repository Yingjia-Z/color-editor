import { signal } from "@preact/signals";

// state
export const count = signal(0);
export const selected = signal(1);

// mutations
export const increment = () => {
  count.value++;
};

export const decrement = () => {
  count.value--;
};
