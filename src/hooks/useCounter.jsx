import { useState } from 'react';

export function useCounter(_max, { min = 0, start = 0 } = {}) {
  const [count, setCount] = useState(start);
  const [max, setMax] = useState(_max);

  function increment() {
    if (count < max) {
      setCount((prevCount) => prevCount + 1);
      return count + 1;
    }
    return null;
  }
  function decrement() {
    if (count > min) {
      setCount((prevCount) => prevCount - 1);
      return count - 1;
    }
    return null;
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
