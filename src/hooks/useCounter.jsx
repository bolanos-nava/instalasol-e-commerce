import { useState } from 'react';

export function useCounter(_max, { min = 0, start = 0 } = {}) {
  const [count, setCount] = useState(start);
  const [max, setMax] = useState(_max);

  function increment() {
    if (count < max) setCount((prevCount) => prevCount + 1);
  }
  function decrement() {
    if (count > min) setCount((prevCount) => prevCount - 1);
  }

  return {
    count,
    setCount,
    increment,
    decrement,
    max,
    setMax,
    min,
  };
}
